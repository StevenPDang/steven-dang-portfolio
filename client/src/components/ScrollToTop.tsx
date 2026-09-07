import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// HashRouter doesn't reset scroll on navigation, so switching pages otherwise
// keeps whatever scroll position the previous page was left at.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
