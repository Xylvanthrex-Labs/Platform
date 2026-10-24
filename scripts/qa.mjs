import puppeteer from 'puppeteer-core'
import { mkdir, writeFile } from 'node:fs/promises'

const BASE = 'http://127.0.0.1:8787'
const OUT = '/tmp/opencode/shots'
await mkdir(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
})

const report = { pages: [], consoleErrors: [], pageErrors: [], interactions: {} }

async function open(path, width, height = 900) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  page.on('console', (msg) => {
    if (msg.type() === 'error') report.consoleErrors.push(`${path} ${width}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => report.pageErrors.push(`${path} ${width}: ${err.message}`))
  await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 70))
    }
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 400))
  })
  await new Promise((r) => setTimeout(r, 350))
  return page
}

async function audit(page, path, width) {
  const data = await page.evaluate(() => {
    const el = document.documentElement
    const h1 = document.querySelector('h1')
    const parsed = getComputedStyle(document.body).fontFamily
    return {
      title: document.title,
      h1: h1?.textContent?.replace(/\s+/g, ' ').trim() ?? null,
      scrollWidth: el.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: el.scrollWidth > window.innerWidth + 1,
      bodyFont: parsed,
      serifLoaded: document.fonts.check('16px Newsreader'),
      sansLoaded: document.fonts.check('16px "IBM Plex Sans"'),
      monoLoaded: document.fonts.check('16px "IBM Plex Mono"'),
      boardRows: document.querySelectorAll('.board__row').length,
      boardCounts: document.querySelectorAll('.board__count').length,
      sections: document.querySelectorAll('section').length,
    }
  })
  report.pages.push({ path, width, ...data })
  return data
}

const routes = ['/', '/ventures', '/research', '/philosophy', '/about', '/contact']
const widths = [1440, 1200, 1024, 860, 768, 620, 390, 320]

for (const width of widths) {
  for (const route of routes) {
    const page = await open(route, width, 900)
    const data = await audit(page, route, width)
    if ([1440, 1024, 390, 320].includes(width)) {
      const name = `${route === '/' ? 'home' : route.slice(1)}-${width}.png`
      await page.screenshot({ path: `${OUT}/${name}`, fullPage: true })
    }
    if (data.overflow) report.consoleErrors.push(`OVERFLOW ${route} @${width}: ${data.scrollWidth}px`)
    await page.close()
  }
}

// Desktop interactions
{
  const page = await open('/', 1440, 1000)
  await page.click('.search-btn')
  await new Promise((r) => setTimeout(r, 250))
  await page.screenshot({ path: `${OUT}/palette-1440.png` })
  await page.type('.palette__input', 'cloud')
  await new Promise((r) => setTimeout(r, 200))
  await page.screenshot({ path: `${OUT}/palette-query-1440.png` })
  report.interactions.paletteRows = await page.$$eval('.palette__row', (rows) => rows.length)
  report.interactions.paletteFirst = await page.$eval('.palette__row', (row) =>
    row.textContent?.replace(/\s+/g, ' ').trim(),
  )
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 150))

  await page.hover('.mega-wrap')
  await new Promise((r) => setTimeout(r, 400))
  report.interactions.megaOpen = await page.$eval('.mega', (el) => getComputedStyle(el).opacity)
  await page.screenshot({ path: `${OUT}/mega-1440.png` })

  // Contact form: client validation then a real submit
  await page.goto(BASE + '/contact?venture=cloud', { waitUntil: 'networkidle0' })
  await page.click('.form button[type="submit"]')
  await new Promise((r) => setTimeout(r, 200))
  report.interactions.emptyEmailError = await page.$eval('.field__error', (el) => el.textContent)
  report.interactions.preselectedVenture = await page.$eval('select[name="venture"]', (el) => el.value)

  await page.type('input[name="email"]', 'qa@xylvanthrex.test')
  await page.type('textarea[name="note"]', 'QA submission from the automated check.')
  await page.click('.form button[type="submit"]')
  await new Promise((r) => setTimeout(r, 900))
  report.interactions.formSuccess = await page
    .$eval('.form__status', (el) => el.textContent)
    .catch(() => null)
  await page.screenshot({ path: `${OUT}/contact-success-1440.png` })
  await page.close()
}

// Mobile sheet
{
  const page = await open('/', 390, 844)
  await page.click('.menu-btn')
  await new Promise((r) => setTimeout(r, 350))
  await page.screenshot({ path: `${OUT}/mobile-menu-390.png` })
  report.interactions.mobileMenuOpen = await page.$eval('.mobile-menu', (el) =>
    getComputedStyle(el).display,
  )
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 200))
  report.interactions.mobileMenuClosed = (await page.$('.mobile-menu')) === null
  await page.close()
}

await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

await browser.close()
