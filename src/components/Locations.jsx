import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const locations = [
  {
    name: 'CoffeeTrip Центр',
    address: 'ул. Пушкина, 15',
    hours: 'Пн-Вс: 8:00 - 22:00',
    phone: '+7 (495) 123-45-67',
  },
  {
    name: 'CoffeeTrip Арбат',
    address: 'Арбатская ул., 28',
    hours: 'Пн-Вс: 9:00 - 23:00',
    phone: '+7 (495) 234-56-78',
  },
  {
    name: 'CoffeeTrip Парк',
    address: 'Парковая ул., 42',
    hours: 'Пн-Вс: 7:00 - 21:00',
    phone: '+7 (495) 345-67-89',
  },
];

const Locations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="кофейни" className="py-32 bg-espresso-dark text-beige-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-6">
            Наши кофейни
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          <p className="text-lg text-beige-medium max-w-2xl mx-auto">
            Посетите нас и насладитесь атмосферой настоящего кофе
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="bg-espresso-medium rounded-2xl p-8 hover:bg-espresso-light transition-all duration-300 cursor-pointer group"
            >
              <div className="h-48 bg-gradient-to-br from-gold to-terracotta rounded-xl mb-6 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${
                    index === 0 ? '1501339847302-ac426a4a7cbb' :
                    index === 1 ? '1511920170033-f8396924c348' :
                    '1445116572660-236099ec97a0'
                  }?w=400&h=300&fit=crop`}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <h3 className="text-2xl font-serif mb-4 text-gold">
                {location.name}
              </h3>
              
              <div className="space-y-3 text-beige-medium">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location.address}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{location.hours}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{location.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
