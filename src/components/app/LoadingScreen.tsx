import { motion } from "framer-motion";
import Background from "../ui/Background";

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Background />
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