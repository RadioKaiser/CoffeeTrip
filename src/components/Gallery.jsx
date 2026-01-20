import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600',
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="галерея" className="py-32 bg-beige-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-6 text-espresso-dark">
            Галерея
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          <p className="text-lg text-espresso-medium max-w-2xl mx-auto">
            Моменты, которые вдохновляют нас каждый день
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={image}
                  alt={`Coffee ${index + 1}`}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-beige-light">
                    <p className="text-sm font-medium">CoffeeTrip</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
