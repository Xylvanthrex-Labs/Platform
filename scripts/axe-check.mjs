import puppeteer from 'puppeteer-core'
import { readFileSync } from 'node:fs'
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8')
const browser = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome-stable', headless:'new', args:['--no-sandbox','--disable-dev-shm-usage'] })
const report = []
const routes = ['/', '/ventures', '/research', '/philosophy', '/about', '/contact']
async function run(page, label) {
  await page.evaluate(axeSource)
  const res = await page.evaluate(async () => {
    const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] } })
    return r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0,6).map(n => ({ target: n.target, summary: (n.failureSummary||'').split('\n').slice(0,3).join(' | ') })) }))
  })
  report.push({ label, violations: res })
}
for (const width of [1440, 390]) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 1000 })
  for (const route of routes) {
    await page.goto('http://127.0.0.1:8787'+route, { waitUntil:'networkidle0' })
    await new Promise(r=>setTimeout(r, 1400))
    await run(page, `${route} @${width}`)
  }
  await page.close()
}
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000 })
  await page.goto('http://127.0.0.1:8787/', { waitUntil:'networkidle0' })
  await page.click('.search-btn')
  await new Promise(r=>setTimeout(r,300))
  await run(page, 'palette @1440')
  await page.close()
}
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:8787/', { waitUntil:'networkidle0' })
  await page.click('.menu-btn')
  await new Promise(r=>setTimeout(r,300))
  await run(page, 'mobile menu @390')
  await page.close()
}
await browser.close()
const flat = report.filter(r => r.violations.length)
console.log(JSON.stringify(flat, null, 2))
console.log('pages with violations:', flat.length, 'of', report.length)
