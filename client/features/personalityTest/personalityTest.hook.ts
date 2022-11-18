import { useRef, useState, useEffect } from 'react';

export const useSlide = () => {
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    slideRef.current.style.transition = 'transform 1s';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const resetSlide = () => {
    slideRef.current.style.transition = 'none';
    slideRef.current.style.transform = `translateX(0)`;
    setCurrentSlide(0);
  };

  return { slideRef, currentSlide, nextSlide, resetSlide };
};
