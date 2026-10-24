import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome-stable', headless:'new', args:['--no-sandbox','--disable-dev-shm-usage'] })
for (const width of [620, 400, 390, 320]) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900 })
  await page.goto('http://127.0.0.1:8787/', { waitUntil:'networkidle0' })
  const out = await page.evaluate(() => {
    const g = (sel) => { const el = document.querySelector(sel); return el ? getComputedStyle(el).gridTemplateColumns : null }
    return {
      inner: window.innerWidth,
      heroCounts: g('.hero__counts'),
      heroFacts: g('.hero-facts'),
      boardCounts: g('.board__counts'),
      layerGrid: g('.layer-grid'),
      ventureGrid: g('.venture-grid'),
      boardRow: g('.board__row'),
      headerH: getComputedStyle(document.querySelector('.header')).height,
    }
  })
  console.log(width, JSON.stringify(out))
  await page.close()
}
await browser.close()
