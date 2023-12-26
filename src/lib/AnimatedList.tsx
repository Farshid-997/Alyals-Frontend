// components/AnimatedList.tsx
import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedListProps {
  items: JSX.Element[];
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const AnimatedList: React.FC<AnimatedListProps> = ({ items }) => {
  return (
    <motion.div
      style={{ display: 'flex',justifyContent:"space-around",gap:"10px"}}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          style={{ marginRight: '30px' }}
          variants={itemVariants}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;
