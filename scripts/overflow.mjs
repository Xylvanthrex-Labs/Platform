import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 320, height: 900 })
await page.goto('http://127.0.0.1:8787/', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 500))
const offenders = await page.evaluate(() => {
  const out = []
  for (const el of document.querySelectorAll('*')) {
    const rect = el.getBoundingClientRect()
    if (rect.right > window.innerWidth + 0.5 && rect.width > 0) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString().slice(0, 80),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
      })
    }
  }
  return out.slice(0, 25)
})
console.log(JSON.stringify(offenders, null, 2))
await browser.close()
