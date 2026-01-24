import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants/data';
import { MenuIcon, CloseIcon } from './icons';

const Navigation = memo(({ scrolled, onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg text-espresso-dark' : 'bg-transparent text-beige-light'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Основная навигация">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="text-2xl font-serif font-bold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
            whileHover={{ scale: 1.05 }}
            aria-label="CoffeeTrip — На главную"
          >
            CoffeeTrip
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 font-medium font-serif" role="list">
            {NAV_ITEMS.map((item, index) => (
              <motion.li key={item.id}>
                <motion.a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="hover:text-gold transition-colors duration-300 focus:outline-none focus:text-gold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Order Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onOrderClick}
              className="bg-gold text-white px-6 py-2 rounded-full hover:bg-terracotta transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Заказать
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-beige-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="py-4 space-y-2" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="block py-3 px-4 rounded-lg hover:bg-beige-medium transition-colors focus:outline-none focus:bg-beige-medium font-serif"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;