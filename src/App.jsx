import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundVideo from './components/BackgroundVideo'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Education from './pages/Education'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative isolate min-h-screen bg-ink text-bone selection:bg-amber selection:text-ink">
        <BackgroundVideo />
        <div className="noise-overlay" />
        <ScrollProgress />
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  )
}
