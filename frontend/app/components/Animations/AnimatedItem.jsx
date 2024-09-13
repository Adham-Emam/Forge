"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedItem = ({ children, initial, animate, transition }) => {
  // Get the reference to the div element and a boolean indicating if it is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Percentage of visibility to trigger animation
  });

  // Render the animated div with the children and the animation props
  return (
    <motion.div
      ref={ref} // Pass the reference to the div element
      initial={initial} // Pass the initial values for the animation
      animate={inView ? animate : initial} // Pass the animated values when the component is in view
      transition={transition} // Pass the transition options for the animation
    >
      {children} {/* Render the children wrapped with the animated div */}
    </motion.div>
  );
};

export default AnimatedItem;
