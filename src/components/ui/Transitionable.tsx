import { HTMLMotionProps, motion } from "motion/react";

interface TransitionableProps extends HTMLMotionProps<"div"> {
  className?: string;
  rotatable?: boolean;
}

const Transitionable: React.FC<TransitionableProps> = ({
  className,
  children,
  rotatable,
  ...props
}) => {
  if (rotatable) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
        transition={{ duration: .2, ease: "easeInOut" }}
        className={`cursor-pointer h-8 md:h-6 ${className || ""}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
        transition={{ duration: .2, ease: "easeInOut" }}
        className={`cursor-pointer h-8 md:h-6 ${className || ""}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
};

export default Transitionable;
