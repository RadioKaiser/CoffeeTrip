import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons';

const Toast = memo(({ message, isVisible, onClose, duration = 5000, type = 'success' }) => {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-espresso-dark';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className={`fixed bottom-6 right-6 ${bgColor} text-beige-light px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-4 max-w-md`}
          role="alert"
          aria-live="polite"
        >
          <p>{message}</p>
          <button
            onClick={onClose}
            className="shrink-0 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Закрыть уведомление"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Toast.displayName = 'Toast';
export default Toast;
