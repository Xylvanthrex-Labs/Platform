import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome-stable', headless:'new', args:['--no-sandbox','--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width:1440, height:900 })
await page.goto('http://127.0.0.1:8787/', { waitUntil:'networkidle0' })
const before = await page.evaluate(() => {
  const r = document.querySelector('.reveal')
  const card = document.querySelector('.split-card')
  return { reduce: matchMedia('(prefers-reduced-motion: reduce)').matches, cls: r?.className, opacity: r ? getComputedStyle(r).opacity : null, cardHeight: card?.getBoundingClientRect().height, cardText: card?.textContent?.slice(0,40) }
})
console.log('before', JSON.stringify(before,null,2))
await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=600) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,100)) } window.scrollTo(0,0) })
await new Promise(r=>setTimeout(r,1000))
const after = await page.evaluate(() => {
  const r = document.querySelector('.reveal')
  const card = document.querySelector('.split-card')
  return { cls: r?.className, opacity: r ? getComputedStyle(r).opacity : null, transform: r ? getComputedStyle(r).transform : null, y: window.scrollY, cardHeight: card?.getBoundingClientRect().height, cardText: card?.textContent?.slice(0,40) }
})
console.log('after', JSON.stringify(after,null,2))
await browser.close()
