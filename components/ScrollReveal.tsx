"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const generateVariants = (direction: Direction) => {
  const isHorizontal = direction === "left" || direction === "right";
  const value = direction === "right" || direction === "down" ? 60 : -60;

  return {
    hidden: {
      filter: "blur(8px)",
      opacity: 0,
      x: isHorizontal ? value : 0,
      y: isHorizontal ? 0 : value,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };
};

interface ScrollRevealProps
  extends Omit<HTMLMotionProps<"div">, "children" | "variants"> {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  amount?: number;
}

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      direction = "up",
      delay = 0,
      once = true,
      amount = 0.3,
      ...rest
    },
    ref
  ) => {
    const baseVariants = generateVariants(direction);
    const variants = {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...baseVariants.visible.transition,
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{ once, amount }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";
export default ScrollReveal;
