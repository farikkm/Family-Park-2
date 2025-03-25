import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.img
        src="/logo/logo.svg"
        alt="Loading..."
        className="w-28 h-28"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default LoadingScreen;