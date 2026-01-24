import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, SOCIAL_LINKS, CONTACT_INFO } from '../constants/data';
import { SocialIcon } from './icons';

const Footer = memo(() => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const timeoutRef = useRef(null);

  // Cleanup при unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    setSubmitStatus('success');
    setEmail('');
    setIsSubmitting(false);

    timeoutRef.current = setTimeout(() => setSubmitStatus(null), 3000);
  }, []);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <footer
      id="contacts"
      className="bg-espresso-dark text-beige-light pt-20 pb-10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-serif mb-4">CoffeeTrip</h3>
            <p className="text-beige-medium mb-6 leading-relaxed">
              Путешествие в каждой чашке. Откройте для себя мир изысканного кофе.
            </p>
            <ul className="flex space-x-4" aria-label="Социальные сети">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-espresso-medium rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Мы в ${social.name}`}
                  >
                    <SocialIcon path={social.icon} />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Дополнительная навигация">
            <h4 className="text-xl font-serif mb-4 text-gold">Навигация</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-beige-medium hover:text-gold transition-colors duration-300 focus:outline-none focus:text-gold"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-xl font-serif mb-4 text-gold">Контакты</h4>
            <address className="space-y-3 text-beige-medium not-italic">
              <p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                  className="hover:text-gold transition-colors focus:outline-none focus:text-gold"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-gold transition-colors focus:outline-none focus:text-gold"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>{CONTACT_INFO.address}</p>
            </address>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-4 text-gold">Рассылка</h4>
            <p className="text-beige-medium mb-4 text-sm">
              Подпишитесь на новости и специальные предложения
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email для рассылки
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full px-4 py-2 rounded-lg bg-espresso-medium text-beige-light placeholder-beige-medium/50 focus:outline-none focus:ring-2 focus:ring-gold"
                required
                disabled={isSubmitting}
                aria-describedby={submitStatus ? 'newsletter-status' : undefined}
              />
              <motion.button
                type="submit"
                className="w-full bg-gold text-white px-6 py-2 rounded-lg hover:bg-terracotta transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso-dark"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Подписаться'}
              </motion.button>
              {submitStatus === 'success' && (
                <p id="newsletter-status" className="text-green-400 text-sm" role="status">
                  Вы успешно подписались!
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-espresso-medium pt-8 flex flex-col md:flex-row justify-between items-center text-beige-medium text-sm">
          <p>© {new Date().getFullYear()} CoffeeTrip. Все права защищены.</p>
          <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Юридическая информация">
            <motion.a
              href="/privacy"
              className="hover:text-gold transition-colors duration-300 focus:outline-none focus:text-gold"
              whileHover={{ y: -2 }}
            >
              Политика конфиденциальности
            </motion.a>
            <motion.a
              href="/terms"
              className="hover:text-gold transition-colors duration-300 focus:outline-none focus:text-gold"
              whileHover={{ y: -2 }}
            >
              Условия использования
            </motion.a>
          </nav>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
