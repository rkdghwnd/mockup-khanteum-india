import { MouseEvent, PropsWithChildren, TouchEvent, useRef } from "react";

const Swiper = ({ children }: PropsWithChildren) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveX = useRef(0).current;
  const movey = useRef(0).current;

  const touchHandler = (e: TouchEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
  };

  const MouseDownHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    console.log(e.clientX);
    console.log(e.clientY);
  };
  const MouseUpHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    console.log(e.clientX);
    console.log(e.clientY);
  };
  return (
    <div
      ref={targetRef}
      onTouchMove={touchHandler}
      onMouseDown={MouseDownHandler}
      onMouseUp={MouseUpHandler}
    >
      {children}
    </div>
  );
};

export default Swiper;
