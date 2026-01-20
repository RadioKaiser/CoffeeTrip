import { motion } from 'framer-motion';

const Navigation = ({ scrolled, onOrderClick }) => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-serif font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          CoffeeTrip
        </motion.div>
        
        <div className="hidden md:flex space-x-8 font-medium">
          {['О нас', 'Меню', 'Кофейни', 'Галерея', 'Контакты'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={(e) => handleNavClick(e, `#${item.toLowerCase().replace(' ', '-')}`)}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
        
        <motion.button
          onClick={onOrderClick}
          className="bg-gold text-white px-6 py-2 rounded-full hover:bg-terracotta transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Заказать
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
