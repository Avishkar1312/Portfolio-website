import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    triggerOnce: true,
    margin: '-50px'
  });

  return { ref, isInView };
};