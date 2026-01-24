import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { CloseIcon } from './icons';

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  street: '',
  city: '',
};

const OrderModal = memo(({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useLockBodyScroll(isOpen);
  useFocusTrap(isOpen, modalRef);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Введите имя';
      }
      if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Введите корректный номер телефона';
      }
      if (!formData.street.trim()) {
        newErrors.street = 'Введите адрес';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'Введите город';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      const submittedData = { ...formData };

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      setFormData(INITIAL_FORM_STATE);
      setIsSubmitting(false);

      onSuccess?.(submittedData);
    },
    [formData, onSuccess]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-espresso-dark/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-beige-light rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 max-h-[90vh] overflow-y-auto"
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-espresso-medium hover:text-espresso-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded-full p-1"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Закрыть"
            >
              <CloseIcon />
            </motion.button>

            <div className="text-center mb-8">
              <h2 id="modal-title" className="text-4xl font-serif text-espresso-dark mb-2">
                Оформить заказ
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-4" aria-hidden="true" />
              <p className="text-espresso-medium">Заполните форму и мы свяжемся с вами</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="order-name"
                  className="block text-sm font-medium text-espresso-dark mb-2"
                >
                  Имя{' '}
                  <span className="text-terracotta" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="order-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-colors text-espresso-dark focus:outline-none ${
                    errors.name
                      ? 'border-terracotta focus:border-terracotta'
                      : 'border-beige-dark focus:border-gold'
                  }`}
                  placeholder="Иван Иванов"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-terracotta" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="order-phone"
                  className="block text-sm font-medium text-espresso-dark mb-2"
                >
                  Телефон{' '}
                  <span className="text-terracotta" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="tel"
                  id="order-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  inputMode="tel"
                  autoComplete="tel"
                  className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-colors text-espresso-dark focus:outline-none ${
                    errors.phone
                      ? 'border-terracotta focus:border-terracotta'
                      : 'border-beige-dark focus:border-gold'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-terracotta" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="order-street"
                  className="block text-sm font-medium text-espresso-dark mb-2"
                >
                  Улица и дом{' '}
                  <span className="text-terracotta" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="order-street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.street}
                  aria-describedby={errors.street ? 'street-error' : undefined}
                  autoComplete="street-address"
                  className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-colors text-espresso-dark focus:outline-none ${
                    errors.street
                      ? 'border-terracotta focus:border-terracotta'
                      : 'border-beige-dark focus:border-gold'
                  }`}
                  placeholder="ул. Пушкина, д. 15"
                  disabled={isSubmitting}
                />
                {errors.street && (
                  <p id="street-error" className="mt-1 text-sm text-terracotta" role="alert">
                    {errors.street}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="order-city"
                  className="block text-sm font-medium text-espresso-dark mb-2"
                >
                  Город{' '}
                  <span className="text-terracotta" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="order-city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                  autoComplete="address-level2"
                  className={`w-full px-4 py-3 rounded-xl bg-white border-2 transition-colors text-espresso-dark focus:outline-none ${
                    errors.city
                      ? 'border-terracotta focus:border-terracotta'
                      : 'border-beige-dark focus:border-gold'
                  }`}
                  placeholder="Москва"
                  disabled={isSubmitting}
                />
                {errors.city && (
                  <p id="city-error" className="mt-1 text-sm text-terracotta" role="alert">
                    {errors.city}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gold text-white px-6 py-4 rounded-xl text-lg font-medium hover:bg-terracotta transition-colors duration-300 shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  'Отправить заказ'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

OrderModal.displayName = 'OrderModal';
export default OrderModal;
