import { memo, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { MENU_DATA, MENU_CATEGORIES } from '../constants/data';

const MenuItem = memo(({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="bg-beige-light rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
  >
    <div className="h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        decoding="async"
        width={400}
        height={300}
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-serif text-espresso-dark group-hover:text-gold transition-colors duration-300">
          {item.name}
        </h3>
        <span className="text-xl font-semibold text-gold">{item.price}</span>
      </div>
      <p className="text-espresso-medium leading-relaxed">{item.description}</p>
      <div
        className="mt-4 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"
        aria-hidden="true"
      />
    </div>
  </motion.article>
));

MenuItem.displayName = 'MenuItem';

const Menu = memo(() => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  return (
    <section id="menu" className="py-32 bg-white" aria-labelledby="menu-title">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 id="menu-title" className="text-5xl md:text-6xl font-serif mb-6 text-espresso-dark">
            Наше меню
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" aria-hidden="true" />
          <p className="text-lg text-espresso-medium max-w-2xl mx-auto">
            Каждый напиток готовится с любовью и вниманием к деталям
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div
          className="flex justify-center mb-16 space-x-4"
          role="tablist"
          aria-label="Категории меню"
        >
          {MENU_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`panel-${category.id}`}
              id={`tab-${category.id}`}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                activeCategory === category.id
                  ? 'bg-gold text-white shadow-lg'
                  : 'bg-beige-light text-espresso-dark hover:bg-beige-medium'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {MENU_DATA[activeCategory].map((item, index) => (
            <MenuItem key={item.name} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Menu.displayName = 'Menu';

export default Menu;
