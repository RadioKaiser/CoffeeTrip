import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants/data';

const GalleryImage = memo(({ image, index, isInView }) => (
  <motion.figure
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
    className="break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl"
  >
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        decoding="async"
        width={600}
        height={400}
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-espresso-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <figcaption className="absolute bottom-6 left-6 text-beige-light">
          <p className="text-sm font-medium">CoffeeTrip</p>
        </figcaption>
      </div>
    </div>
  </motion.figure>
));

GalleryImage.displayName = 'GalleryImage';

const Gallery = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gallery" className="py-32 bg-beige-light" aria-labelledby="gallery-title">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="gallery-title"
            className="text-5xl md:text-6xl font-serif mb-6 text-espresso-dark"
          >
            Галерея
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" aria-hidden="true" />
          <p className="text-lg text-espresso-medium max-w-2xl mx-auto">
            Моменты, которые вдохновляют нас каждый день
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryImage key={image.src} image={image} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
