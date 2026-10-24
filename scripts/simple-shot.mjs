import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const routes = ['/', '/ventures', '/research', '/philosophy', '/about', '/contact', '/nope']
const widths = [1440, 1024, 390, 320]
const report = { pages: [], consoleErrors: [], pageErrors: [] }

for (const width of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900 })
  page.on('console', (msg) => {
    if (msg.type() === 'error') report.consoleErrors.push(`${width} ${msg.text()}`)
  })
  page.on('pageerror', (err) => report.pageErrors.push(`${width} ${err.message}`))

  for (const route of routes) {
    await page.goto('http://127.0.0.1:8787' + route, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 250))
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      docHeight: document.documentElement.scrollHeight,
    }))
    report.pages.push({ width, route, ...info, overflow: info.scrollWidth > info.innerWidth + 1 })
    const name = route === '/' ? 'home' : route.replace('/', '')
    await page.screenshot({
      path: `/tmp/opencode/shots3/${name}-${width}.png`,
      fullPage: true,
    })
  }
  await page.close()
}

// Form check at 390
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  page.on('console', (msg) => { if (msg.type() === 'error') report.consoleErrors.push(`form ${msg.text()}`) })
  await page.goto('http://127.0.0.1:8787/contact', { waitUntil: 'networkidle0' })
  await page.click('button[type=submit]')
  await new Promise((r) => setTimeout(r, 200))
  const emptyError = await page.$eval('.field__error', (el) => el.textContent).catch(() => null)
  await page.type('input[type=email]', 'qa-simple@example.com')
  await page.select('select', 'cloud')
  await page.click('button[type=submit]')
  await new Promise((r) => setTimeout(r, 900))
  const success = await page.$eval('.form__status', (el) => el.textContent).catch(() => null)
  report.form = { emptyError, success }
  await page.screenshot({ path: '/tmp/opencode/shots3/contact-submitted-390.png', fullPage: true })
  await page.close()
}

await browser.close()
console.log(JSON.stringify(report, null, 2))
