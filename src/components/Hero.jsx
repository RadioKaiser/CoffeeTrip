import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = memo(({ onOrderClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={ref} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-linear-to-br from-espresso-dark via-espresso-medium to-espresso-light"
      >
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920')" }}
          role="presentation"
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center text-beige-light px-6 max-w-5xl"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-serif mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          CoffeeTrip
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-4xl mb-8 font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Путешествие в каждой чашке
        </motion.p>
        
        <motion.p
          className="text-lg md:text-xl mb-12 text-beige-medium max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Откройте для себя мир изысканного кофе премиум класса
        </motion.p>
        
        <motion.button
          onClick={onOrderClick}
          className="bg-gold text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-terracotta transition-all duration-300 shadow-2xl hover:shadow-gold/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-espresso-dark"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Заказать доставку
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-beige-light rounded-full flex justify-center">
          <div className="w-1 h-3 bg-beige-light rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;