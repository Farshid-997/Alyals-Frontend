import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
interface Props {
  children: JSX.Element;
  
}

export const Reveal = ({ children }:Props) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    console.log('inView:', inView);
    if (inView) {
      mainControls.start('visible');
    }
  }, [inView,mainControls]);

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
