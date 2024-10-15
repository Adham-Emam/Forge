"use client";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const AnimatedItem = ({ children, initial, animate, transition }) => {
  // Get the reference to the div element and a boolean indicating if it is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Percentage of visibility to trigger animation
  });

  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px breakpoint for mobile devices
    };

    handleResize(); // Set the initial state

    window.addEventListener("resize", handleResize); // Update on window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // If on mobile, skip the animation
  if (isMobile) {
    return <div ref={ref}>{children}</div>;
  }

  // Render the animated div with the children and the animation props
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref} // Pass the reference to the div element
        initial={initial} // Pass the initial values for the animation
        animate={inView ? animate : initial} // Pass the animated values when the component is in view
        transition={transition} // Pass the transition options for the animation
      >
        {children} {/* Render the children wrapped with the animated div */}
      </m.div>
    </LazyMotion>
  );
};

export default AnimatedItem;
