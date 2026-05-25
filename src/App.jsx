import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Facts from './sections/Facts'
import Services from './sections/Services'
import Clients from './sections/Clients'
import Contact from './sections/Contact'
import FooterSection from './sections/FooterSection'

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Home />
        <About />
        <Facts />
        <Services />
        <Clients />
        <Contact />
      </main>
      <FooterSection />
    </div>
  )
}

export default App
