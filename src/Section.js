import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Section({ children, id }) {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the section is visible
    triggerOnce: true, // Only trigger once per scroll
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      className="h-screen flex items-center justify-center bg-black text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export default Section;
