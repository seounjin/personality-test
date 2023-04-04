import { useRef, useState, useEffect } from 'react';

export const useSlide = () => {
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'transform 1s';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
      };

      slideRef.current.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        slideRef.current &&
          slideRef.current.removeEventListener(
            'transitionend',
            handleTransitionEnd,
          );
      };
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((currentSlide) => currentSlide + 1);
    }
  };

  const resetSlide = () => {
    slideRef.current.style.transition = 'none';
    slideRef.current.style.transform = `translateX(0)`;
    setCurrentSlide(0);
  };

  return { slideRef, currentSlide, nextSlide, resetSlide, isTransitioning };
};

// import { useRef, useState, useEffect } from 'react';

// export const useSlide = () => {
//   const slideRef = useRef(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     slideRef.current.style.transition = 'transform 1s';
//     slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
//   }, [currentSlide]);

//   const nextSlide = () => {
//     setCurrentSlide((currentSlide) => currentSlide + 1);
//   };

//   const resetSlide = () => {
//     slideRef.current.style.transition = 'none';
//     slideRef.current.style.transform = `translateX(0)`;
//     setCurrentSlide(0);
//   };

//   return { slideRef, currentSlide, nextSlide, resetSlide };
// };
