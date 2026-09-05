import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import DebugMotion from './pages/DebugMotion'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/debug/motion" element={<DebugMotion />} />
      </Routes>
    </BrowserRouter>
  )
}
