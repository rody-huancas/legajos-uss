import React from 'react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-secondary-100 text-secondary-800 p-4"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="text-[250px] font-bold text-secondary-800 mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-2xl text-center text-secondary-800 mb-2"
      >
        Oops! Página no encontrada
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-lg text-center text-secondary-800 mb-8"
      >
        La página que estás buscando no existe o ha sido movida.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={handleGoBack}
        className="px-6 py-3 bg-uss-purple-100 text-white rounded-lg hover:bg-uss-purple-200 transition-colors shadow-lg"
      >
        Volver atrás
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;