import { useEffect, useRef } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

const useScrollbar = (root, hasScroll, config = {}) => {
  const scrollbarsRef = useRef(null);

  useEffect(() => {
    if (root.current && hasScroll) {
      scrollbarsRef.current = OverlayScrollbars(root.current, config);
    }

    return () => {
      if (scrollbarsRef.current) {
        scrollbarsRef.current.destroy();
      }
    };
  }, [root, hasScroll, config]);

  return [root, hasScroll];
};

export { useScrollbar };
