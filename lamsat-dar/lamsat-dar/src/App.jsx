import { useState } from 'react'
import useLenis from './hooks/useLenis'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Offers from './components/Offers'
import ServiceAreas from './components/ServiceAreas'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  const [booking, setBooking] = useState({ open: false, service: '' })
  // Every CTA calls onBook(); a service id preselects step 1.
  const onBook = service => setBooking({ open: true, service: typeof service === 'string' ? service : '' })
  return (
    <>
      <Header onBook={onBook} />
      <main>
        <Hero onBook={onBook} />
        <About />
        <Services onBook={onBook} />
        <Portfolio />
        <Offers onBook={onBook} />
        <ServiceAreas />
      </main>
      <Footer />
      <BookingModal open={booking.open} preset={booking.service} onClose={() => setBooking(b => ({ ...b, open: false }))} />
    </>
  )
}
