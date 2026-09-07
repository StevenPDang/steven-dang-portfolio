import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
// import Services from '../components/Services'
import Projects from '../components/Projects'
import Personal from '../components/Personal'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        {/* <Services /> */}
        <Projects />
        <Personal />
        <Contact />
      </main>
    </div>
  )
}
