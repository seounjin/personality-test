import { useState, useEffect, useCallback, useRef } from 'react';

const useInfiniteScroll = (target) => {
  const [Intersecting, setIntersecting] = useState(false);
  const oberverRef = useRef(null);

  const getObserver = useCallback(() => {
    if (!oberverRef.current) {
      oberverRef.current = new IntersectionObserver((entries) =>
        setIntersecting(entries.some((entry) => entry.isIntersecting)),
      );
    }
    return oberverRef.current;
  }, [oberverRef.current]);

  useEffect(() => {
    if (target.current) {
      // 관찰 등록
      getObserver().observe(target.current);
    }
    return () => {
      // 관찰 중지
      getObserver().disconnect();
    };
  }, [target.current]);

  return Intersecting;
};

export default useInfiniteScroll;
