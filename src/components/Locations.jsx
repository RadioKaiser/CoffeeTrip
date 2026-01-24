import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LOCATIONS } from '../constants/data';
import { LocationIcon, ClockIcon, PhoneIcon } from './icons';

const LocationCard = memo(({ location, index, isInView }) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ delay: index * 0.2, duration: 0.8 }}
    whileHover={{ y: -10 }}
    className="bg-espresso-medium rounded-2xl p-8 hover:bg-espresso-light transition-all duration-300 cursor-pointer group"
  >
    <div className="h-48 bg-linear-to-br from-gold to-terracotta rounded-xl mb-6 overflow-hidden">
      <img
        src={`https://images.unsplash.com/${location.image}?w=400&h=300&fit=crop`}
        alt={`Интерьер кофейни ${location.name}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        decoding="async"
        width={400}
        height={300}
      />
    </div>

    <h3 className="text-2xl font-serif mb-4 text-gold">{location.name}</h3>

    <address className="space-y-3 text-beige-medium not-italic">
      <div className="flex items-start">
        <LocationIcon className="w-5 h-5 mr-3 mt-1 text-gold shrink-0" />
        <span>{location.address}</span>
      </div>
      <div className="flex items-start">
        <ClockIcon className="w-5 h-5 mr-3 mt-1 text-gold shrink-0" />
        <span>{location.hours}</span>
      </div>
      <div className="flex items-start">
        <PhoneIcon className="w-5 h-5 mr-3 mt-1 text-gold shrink-0" />
        <a
          href={`tel:${location.phone.replace(/\D/g, '')}`}
          className="hover:text-gold transition-colors focus:outline-none focus:text-gold"
        >
          {location.phone}
        </a>
      </div>
    </address>
  </motion.article>
));

LocationCard.displayName = 'LocationCard';

const Locations = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="locations"
      className="py-32 bg-espresso-dark text-beige-light"
      aria-labelledby="locations-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 id="locations-title" className="text-5xl md:text-6xl font-serif mb-6">
            Наши кофейни
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" aria-hidden="true" />
          <p className="text-lg text-beige-medium max-w-2xl mx-auto">
            Посетите нас и насладитесь атмосферой настоящего кофе
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {LOCATIONS.map((location, index) => (
            <LocationCard
              key={location.name}
              location={location}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Locations.displayName = 'Locations';

export default Locations;
