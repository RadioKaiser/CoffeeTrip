import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const OrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    // Здесь можно добавить отправку на сервер
    alert(`Спасибо, ${formData.name}! Ваш заказ принят. Мы свяжемся с вами по номеру ${formData.phone}`);
    setFormData({ name: '', phone: '', street: '', city: '' });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-dark/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-beige-light rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 text-espresso-medium hover:text-espresso-dark transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-serif text-espresso-dark mb-2">
                  Оформить заказ
                </h2>
                <div className="w-16 h-1 bg-gold mx-auto mb-4" />
                <p className="text-espresso-medium">
                  Заполните форму и мы свяжемся с вами
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-espresso-dark mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-beige-dark focus:border-gold focus:outline-none transition-colors text-espresso-dark"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-espresso-dark mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-beige-dark focus:border-gold focus:outline-none transition-colors text-espresso-dark"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-espresso-dark mb-2">
                    Улица и дом
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-beige-dark focus:border-gold focus:outline-none transition-colors text-espresso-dark"
                    placeholder="ул. Пушкина, д. 15"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-espresso-dark mb-2">
                    Город
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-beige-dark focus:border-gold focus:outline-none transition-colors text-espresso-dark"
                    placeholder="Москва"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gold text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-terracotta transition-colors duration-300 shadow-lg mt-6"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Отправить заказ
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
