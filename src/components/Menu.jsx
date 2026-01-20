import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const menuData = {
  coffee: [
    { name: 'Эспрессо', description: 'Классический итальянский кофе', price: '150 ₽', image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=300&fit=crop' },
    { name: 'Капучино', description: 'Эспрессо с молочной пенкой', price: '220 ₽', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
    { name: 'Флэт Уайт', description: 'Двойной эспрессо с бархатным молоком', price: '250 ₽', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop' },
    { name: 'Латте', description: 'Нежный кофе с молоком', price: '240 ₽', image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop' },
    { name: 'Американо', description: 'Эспрессо с горячей водой', price: '180 ₽', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop' },
    { name: 'Раф кофе', description: 'Авторский кофе со сливками', price: '280 ₽', image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&h=300&fit=crop' },
  ],
  tea: [
    { name: 'Зелёный чай', description: 'Японская сенча премиум', price: '200 ₽', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop' },
    { name: 'Чёрный чай', description: 'Цейлонский листовой', price: '180 ₽', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=300&fit=crop' },
    { name: 'Улун', description: 'Молочный улун с медовыми нотами', price: '250 ₽', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
    { name: 'Пуэр', description: 'Выдержанный китайский чай', price: '300 ₽', image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&h=300&fit=crop' },
  ],
  desserts: [
    { name: 'Круассан', description: 'Классический французский', price: '180 ₽', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
    { name: 'Чизкейк', description: 'Нью-Йорк стиль', price: '320 ₽', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop' },
    { name: 'Тирамису', description: 'Итальянский десерт с маскарпоне', price: '350 ₽', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
    { name: 'Брауни', description: 'Шоколадный с орехами', price: '250 ₽', image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop' },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { id: 'coffee', label: 'Кофе' },
    { id: 'tea', label: 'Чай' },
    { id: 'desserts', label: 'Десерты' },
  ];

  return (
    <section id="меню" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-6 text-espresso-dark">
            Наше меню
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          <p className="text-lg text-espresso-medium max-w-2xl mx-auto">
            Каждый напиток готовится с любовью и вниманием к деталям
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-16 space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
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

        {/* Menu Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {menuData[activeCategory].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-beige-light rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif text-espresso-dark group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-xl font-semibold text-gold">
                    {item.price}
                  </span>
                </div>
                <p className="text-espresso-medium leading-relaxed">
                  {item.description}
                </p>
                <motion.div
                  className="mt-4 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
