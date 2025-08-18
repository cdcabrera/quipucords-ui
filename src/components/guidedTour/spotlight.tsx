import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getResizeObserver } from '@patternfly/react-core';
import './guidedTour.css';

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

  // Create clip-path to cut out the target element area
  const clipPath = `polygon(
    0% 0%, 
    0% 100%, 
    ${boundingRect.left}px 100%, 
    ${boundingRect.left}px ${boundingRect.top}px, 
    ${boundingRect.left + boundingRect.width}px ${boundingRect.top}px, 
    ${boundingRect.left + boundingRect.width}px ${boundingRect.top + boundingRect.height}px, 
    ${boundingRect.left}px ${boundingRect.top + boundingRect.height}px, 
    ${boundingRect.left}px 100%, 
    100% 100%, 
    100% 0%
  )`;

  return (
    <>
      {/* Full screen overlay with clip-path hole */}
      <div
        className="guided-tour__spotlight guided-tour__spotlight--overlay"
        style={{ clipPath }}
      />
      
      {/* Blue border around the target element */}
      <div
        className="guided-tour__spotlight--border"
        style={{
          top: boundingRect.top - 4,
          left: boundingRect.left - 4,
          width: boundingRect.width + 8,
          height: boundingRect.height + 8
        }}
      />
    </>
  );
};

export default Spotlight;
