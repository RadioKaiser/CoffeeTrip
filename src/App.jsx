import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import About from './components/About';
import Menu from './components/Menu';
import Locations from './components/Locations';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navigation scrolled={scrolled} onOrderClick={() => setIsOrderModalOpen(true)} />
      <Hero onOrderClick={() => setIsOrderModalOpen(true)} />
      <About />
      <Menu />
      <Locations />
      <Gallery />
      <Footer />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}

export default App;
