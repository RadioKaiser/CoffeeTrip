import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer id="контакты" className="bg-espresso-dark text-beige-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-serif mb-4">CoffeeTrip</h3>
            <p className="text-beige-medium mb-6 leading-relaxed">
              Путешествие в каждой чашке. Откройте для себя мир изысканного кофе.
            </p>
            <div className="flex space-x-4">
              {[
                { 
                  name: 'Instagram', 
                  icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                },
                { 
                  name: 'Facebook', 
                  icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                },
                { 
                  name: 'VK', 
                  icon: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.147-1.744-1.147-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z'
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-espresso-medium rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif mb-4 text-gold">Навигация</h4>
            <ul className="space-y-2">
              {['О нас', 'Меню', 'Кофейни', 'Галерея', 'Контакты'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-beige-medium hover:text-gold transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-serif mb-4 text-gold">Контакты</h4>
            <ul className="space-y-3 text-beige-medium">
              <li>+7 (495) 123-45-67</li>
              <li>info@coffeetrip.ru</li>
              <li>Москва, ул. Пушкина, 15</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-serif mb-4 text-gold">Рассылка</h4>
            <p className="text-beige-medium mb-4 text-sm">
              Подпишитесь на новости и специальные предложения
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full px-4 py-2 rounded-lg bg-espresso-medium text-beige-light placeholder-beige-medium/50 focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <motion.button
                type="submit"
                className="w-full bg-gold text-white px-6 py-2 rounded-lg hover:bg-terracotta transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Подписаться
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-espresso-medium pt-8 flex flex-col md:flex-row justify-between items-center text-beige-medium text-sm">
          <p>© 2026 CoffeeTrip. Все права защищены.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              className="hover:text-gold transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Политика конфиденциальности
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-gold transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Условия использования
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
