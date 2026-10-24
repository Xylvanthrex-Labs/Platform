import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const out = '/tmp/opencode/shots5'
fs.mkdirSync(out, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const themes = ['light', 'dark']
const widths = [1440, 1024, 390, 320]
const routes = ['/', '/ventures', '/research', '/philosophy', '/about', '/contact', '/nope']
const report = { pages: [], consoleErrors: [], pageErrors: [] }

for (const theme of themes) {
  for (const width of widths) {
    const page = await browser.newPage()
    await page.setViewport({ width, height: 1000 })
    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem('theme', t)
      } catch {}
    }, theme)
    page.on('console', (msg) => {
      if (msg.type() === 'error') report.consoleErrors.push(`${theme} ${width} ${msg.text()}`)
    })
    page.on('pageerror', (err) => report.pageErrors.push(`${theme} ${width} ${err.message}`))

    for (const route of routes) {
      await page.goto('http://127.0.0.1:8787' + route, { waitUntil: 'networkidle0' })
      await page.evaluate(() => document.fonts.ready)
      await page.addStyleTag({
        content:
          '.reveal{opacity:1!important;transform:none!important;transition:none!important}',
      })
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.75
        const height = document.documentElement.scrollHeight
        for (let y = 0; y < height; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 80))
        }
        window.scrollTo(0, 0)
      })
      await new Promise((r) => setTimeout(r, 900))

      const info = await page.evaluate(() => ({
        title: document.title,
        theme: document.documentElement.dataset.theme,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        docHeight: document.documentElement.scrollHeight,
        hiddenReveals: document.querySelectorAll('.reveal:not(.is-visible)').length,
      }))
      report.pages.push({ theme, width, route, ...info, overflow: info.scrollWidth > info.innerWidth + 1 })

      const name = route === '/' ? 'home' : route.replace('/', '')
      await page.screenshot({ path: `${out}/${theme}-${name}-${width}.png`, fullPage: true })
    }
    await page.close()
  }
}

await browser.close()
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2))
console.log(JSON.stringify({ pages: report.pages.length, consoleErrors: report.consoleErrors, pageErrors: report.pageErrors, overflow: report.pages.filter((p) => p.overflow), hidden: report.pages.filter((p) => p.hiddenReveals) }, null, 2))
