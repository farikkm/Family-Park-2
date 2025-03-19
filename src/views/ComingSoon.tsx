import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold">
          Скоро появится{dots}
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-gray-300">
          Мы готовим что-то удивительное для вас. Оставайтесь с нами!
        </p>
        <Link
          to="/"
          className="bg-white inline-block mt-10 text-blue-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-200 transition-all"
        >
          Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
}
