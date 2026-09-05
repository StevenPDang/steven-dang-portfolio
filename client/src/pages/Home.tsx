import { useRef } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
// import Services from '../components/Services'
import Projects from '../components/Projects'
import Personal from '../components/Personal'
import Contact from '../components/Contact'

export default function Home() {
  // Shared so About's intro text can finish revealing exactly when the marquee arrives.
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main>
        <Hero />
        <Marquee sectionRef={marqueeRef} />
        <About marqueeRef={marqueeRef} />
        {/* <Services /> */}
        <Projects />
        <Personal />
        <Contact />
      </main>
    </div>
  )
}
