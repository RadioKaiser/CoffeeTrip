import { useState, lazy, Suspense } from 'react';
import { useScrolled } from './hooks/useScrolled';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

// Lazy load компоненты ниже fold
const About = lazy(() => import('./components/About'));
const Menu = lazy(() => import('./components/Menu'));
const Locations = lazy(() => import('./components/Locations'));
const Gallery = lazy(() => import('./components/Gallery'));
const Footer = lazy(() => import('./components/Footer'));
const OrderModal = lazy(() => import('./components/OrderModal'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const scrolled = useScrolled(50);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModal = () => setIsOrderModalOpen(true);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  return (
    <div className="overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Перейти к основному содержимому
      </a>

      <Navigation scrolled={scrolled} onOrderClick={openOrderModal} />

      <main id="main-content">
        <Hero onOrderClick={openOrderModal} />

        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Menu />
          <Locations />
          <Gallery />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        {isOrderModalOpen && <OrderModal isOpen={isOrderModalOpen} onClose={closeOrderModal} />}
      </Suspense>
    </div>
  );
}

export default App;
