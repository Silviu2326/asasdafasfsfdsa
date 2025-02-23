import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactElement;
  content: string;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content,
  delay = 200 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (targetRef.current && tooltipRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        // Calcular posición centrada arriba del elemento
        const left = rect.left + (rect.width - tooltipRect.width) / 2;
        const top = rect.top - tooltipRect.height - 8;

        setPosition({ top, left });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const childrenWithProps = React.cloneElement(children, {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    ref: targetRef
  });

  return (
    <>
      {childrenWithProps}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm pointer-events-none transform -translate-y-1 opacity-90"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};
