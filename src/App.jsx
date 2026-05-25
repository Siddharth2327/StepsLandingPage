import React, { lazy, Suspense, memo } from 'react'
import Navbar from './components/Navbar'
import FooterSection from './sections/FooterSection'

// Lazy-load all sections for code splitting and faster initial load
const Home = lazy(() => import('./sections/Home'))
const About = lazy(() => import('./sections/About'))
const Facts = lazy(() => import('./sections/Facts'))
const Services = lazy(() => import('./sections/Services'))
const Clients = lazy(() => import('./sections/Clients'))
const Contact = lazy(() => import('./sections/Contact'))

// Minimal height placeholder prevents CLS during chunk loading
const SectionLoader = () => (
  <div style={{ minHeight: '100vh' }} aria-hidden="true" />
)

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <Home />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Facts />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Clients />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <FooterSection />
    </>
  )
}

export default memo(App)