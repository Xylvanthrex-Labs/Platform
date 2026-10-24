import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome-stable', headless:'new', args:['--no-sandbox','--disable-dev-shm-usage'] })
for (const width of [320, 360, 390]) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 400, deviceScaleFactor: 2 })
  await page.goto('http://127.0.0.1:8787/', { waitUntil:'networkidle0' })
  const info = await page.evaluate(() => {
    const b = document.querySelector('.brand'), n = document.querySelector('.brand__name'), h = document.querySelector('.header__inner')
    return { brand: b.getBoundingClientRect().toJSON(), name: n.getBoundingClientRect().toJSON(), inner: h.getBoundingClientRect().toJSON(), scroll: document.documentElement.scrollWidth, width: window.innerWidth }
  })
  console.log(width, JSON.stringify(info))
  await (await page.$('.header')).screenshot({ path: `/tmp/opencode/shots/header-${width}.png` })
  await page.close()
}
await browser.close()
