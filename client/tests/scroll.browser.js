// On a freshly loaded Vite home page, run in the browser console:
// (await import('/tests/scroll.browser.js')).testScrollAnimations()
// Repeat with a mobile viewport and CPU throttling to check slower devices.
export async function testScrollAnimations() {
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const about = document.querySelector('#about')
  const heading = about.querySelector('h2')
  const timeline = about.querySelector('.divide-y').lastElementChild
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top: 0, behavior: 'instant' })
  await pause(100)
  assert(timeline.dataset.reveal === 'hidden', 'Fresh offscreen content must start hidden')
  assert(
    getComputedStyle(timeline).opacity === (reducedMotion ? '1' : '0'),
    'Reveal content must not flash before its first entrance',
  )

  for (const top of [about.offsetTop, 0, about.offsetTop + 300, 0, about.offsetTop]) {
    window.scrollTo({ top, behavior: 'instant' })
    await pause(150)
    const expected = top === 0 && !reducedMotion ? '0' : '1'
    assert(getComputedStyle(heading).opacity === expected, 'About must catch up after fast scrolling')
  }

  // Each text block must visibly animate, including the stacked md layout.
  for (const node of about.querySelectorAll('[data-scroll-fade]')) {
    const documentTop = node.getBoundingClientRect().top + scrollY
    window.scrollTo({ top: documentTop - innerHeight * 0.8, behavior: 'instant' })
    await pause(150)
    const opacity = Number(getComputedStyle(node).opacity)
    assert(reducedMotion ? opacity === 1 : opacity > 0 && opacity < 1, 'Text must have an intermediate fade state')
    window.scrollTo({ top: documentTop - innerHeight * 0.6 + 2, behavior: 'instant' })
    await pause(150)
    assert(getComputedStyle(node).opacity === '1', 'Text must finish fading while still in view')
  }

  window.scrollTo({ top: timeline.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' })
  await pause(1600)
  assert(timeline.dataset.reveal === 'visible', 'Timeline must reveal on entry')
  assert(getComputedStyle(timeline).opacity === '1', 'Timeline must finish revealing')
  window.scrollTo({ top: 0, behavior: 'instant' })
  await pause(100)
  assert(timeline.dataset.reveal === 'visible', 'Reversing scroll must not reset revealed content')
  return 'Scroll animation regression checks passed'
}
