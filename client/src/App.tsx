import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </HashRouter>
  )
}
