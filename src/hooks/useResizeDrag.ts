import { useEffect, useRef, useState } from 'react';

interface UseResizeDragOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  minHeight?: number;
  disabled?: boolean;
}

export function useResizeDrag({ containerRef, minHeight = 120, disabled = false }: UseResizeDragOptions) {
  const [isDragging, setIsDragging] = useState(false);

  const startYRef     = useRef(0);
  const startHeightRef = useRef(0);

  const onMouseMove = useRef<(e: MouseEvent) => void>(() => {});
  const onMouseUp   = useRef<(e: MouseEvent) => void>(() => {});
  const onTouchMove = useRef<(e: TouchEvent) => void>(() => {});
  const onTouchEnd  = useRef<() => void>(() => {});

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onMouseMove.current);
      document.removeEventListener('mouseup', onMouseUp.current);
      document.removeEventListener('touchmove', onTouchMove.current);
      document.removeEventListener('touchend', onTouchEnd.current);
      document.removeEventListener('touchcancel', onTouchEnd.current);
      document.body.classList.remove('select-none');
      document.body.style.cursor = '';
    };
  }, []);

  function handleMouseDown(e: React.MouseEvent) {
    if (disabled || !containerRef.current) return;
    e.preventDefault();

    startYRef.current      = e.clientY;
    startHeightRef.current = containerRef.current.offsetHeight;
    setIsDragging(true);
    document.body.classList.add('select-none');
    document.body.style.cursor = 'se-resize';

    onMouseMove.current = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const newHeight = Math.max(minHeight, startHeightRef.current + (ev.clientY - startYRef.current));
      containerRef.current.style.height = `${newHeight}px`;
    };

    onMouseUp.current = () => {
      setIsDragging(false);
      document.body.classList.remove('select-none');
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove.current);
      document.removeEventListener('mouseup', onMouseUp.current);
    };

    document.addEventListener('mousemove', onMouseMove.current);
    document.addEventListener('mouseup', onMouseUp.current);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (disabled || !containerRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    startYRef.current      = touch.clientY;
    startHeightRef.current = containerRef.current.offsetHeight;
    setIsDragging(true);

    onTouchMove.current = (ev: TouchEvent) => {
      if (!containerRef.current) return;
      const newHeight = Math.max(minHeight, startHeightRef.current + (ev.touches[0].clientY - startYRef.current));
      containerRef.current.style.height = `${newHeight}px`;
    };

    onTouchEnd.current = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', onTouchMove.current);
      document.removeEventListener('touchend', onTouchEnd.current);
      document.removeEventListener('touchcancel', onTouchEnd.current);
    };

    document.addEventListener('touchmove', onTouchMove.current, { passive: false });
    document.addEventListener('touchend', onTouchEnd.current);
    document.addEventListener('touchcancel', onTouchEnd.current);
  }

  return { isDragging, handleMouseDown, handleTouchStart };
}
