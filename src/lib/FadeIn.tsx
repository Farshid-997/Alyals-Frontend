import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
interface Props {
  children: JSX.Element;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.3, // Adjust the delay between each item
    },
  },
};
export const FadeIn = ({ children }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const mainControls = useAnimation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 85,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 2, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
