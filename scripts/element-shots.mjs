import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome-stable', headless:'new', args:['--no-sandbox','--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width:1440, height:1000 })
const shots = [
  ['/', '.hero-card', 'hero-card'],
  ['/', '.split-card', 'home-research'],
  ['/ventures', '.tree', 'tree'],
  ['/philosophy', '.principle-grid', 'principles'],
  ['/about', '.about-split', 'about-split'],
]
for (const [route, sel, name] of shots) {
  await page.goto('http://127.0.0.1:8787'+route, { waitUntil:'networkidle0' })
  await page.evaluate(async (s) => {
    const el = document.querySelector(s); el.scrollIntoView({block:'center'});
    for (let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}
    el.scrollIntoView({block:'center'})
  }, sel)
  await new Promise(r=>setTimeout(r,1600))
  const el = await page.$(sel)
  await el.screenshot({ path: `/tmp/opencode/shots/el-${name}.png` })
}
await browser.close()
