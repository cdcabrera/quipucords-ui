import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getResizeObserver } from '@patternfly/react-core';

interface SpotlightProps {
  selector: string;
  resizeSelector?: string;
}

interface BoundingClientRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Spotlight: React.FC<SpotlightProps> = ({ selector, resizeSelector }) => {
  const [boundingRect, setBoundingRect] = useState<BoundingClientRect | null>(null);
  const unObserver = useRef<(() => void) | null>(null);

  const updateBoundingRect = useCallback(() => {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      setBoundingRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
  }, [selector]);

  useEffect(() => {
    updateBoundingRect();

    const resizeTarget = resizeSelector ? document.querySelector(resizeSelector) : document.body;
    if (resizeTarget) {
      const debounceResize = () => {
        setTimeout(updateBoundingRect, 100);
      };
      unObserver.current = getResizeObserver(resizeTarget as Element, debounceResize);
    }

    const handleScroll = () => {
      updateBoundingRect();
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updateBoundingRect);

    return () => {
      if (unObserver.current) {
        unObserver.current();
      }
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updateBoundingRect);
    };
  }, [selector, resizeSelector, updateBoundingRect]);

  if (!boundingRect) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: boundingRect.top - 4,
        left: boundingRect.left - 4,
        width: boundingRect.width + 8,
        height: boundingRect.height + 8,
        border: '2px solid #0066cc',
        borderRadius: '4px',
        pointerEvents: 'none',
        zIndex: 1000,
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
      }}
    />
  );
};

export default Spotlight;
