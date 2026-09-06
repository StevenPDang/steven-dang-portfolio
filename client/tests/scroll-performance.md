# Scroll performance checks

Measured against the Vite production preview, Chrome at 390 × 844, DPR 3,
6× CPU throttling. A 3.5-second requestAnimationFrame sweep repeatedly scrolled
between 0 and 1200px: `600 + 600 * Math.sin(elapsed / 350)`.

| Change | Layout reads during sweep | CSS animations | Frame interval p95 |
| --- | ---: | ---: | ---: |
| Baseline | 1,239 | 8 | 9.2ms |
| Cached geometry and direct style updates | 0 | 8 | 9.2ms |
| Phone gradient simplification | 0 | 2 | 9.2ms |

Kept to reduce scroll-path layout work and mobile compositing surfaces. This
desktop emulation did not reproduce physical-phone frame drops and does not
establish a frame-rate improvement. Confirm on the affected phone after deployment.
The phone gradient fills have no blur filters; all eight desktop hero animations
pause when the hero is offscreen. Full trails remain available from 768px upward.

`scroll.browser.js` passed against the production build at widths 390, 768, 1024,
and 1280 with 6× CPU throttling. It checks initial reveal visibility, fast scroll
reversals, intermediate opacity, completion while text is visible, and retention
of completed section reveals. Use a fresh home-page load for each run.
