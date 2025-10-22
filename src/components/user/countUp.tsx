"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../lib/utils";

// Helper function
const formatValue = (val: number, precision: number, sep: string): string => {
  return val.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};

export function CountUp({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  easing = "easeOut",
  separator = ",",
  interactive = false,
  triggerOnView = true,
  className,
  numberClassName,
  animationStyle = "default",
  colorScheme = "default",
  customColor,
  onAnimationComplete,
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const containerRef = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);

  const easingFunctions = {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  };

  const animationStyles = {
    default: { type: "tween" },
    bounce: { type: "spring", bounce: 0.25 },
    spring: { type: "spring", stiffness: 100, damping: 10 },
    gentle: { type: "spring", stiffness: 60, damping: 15 },
    energetic: { type: "spring", stiffness: 300, damping: 20 },
  };

  const animationConfig = {
    ...(animationStyles[animationStyle] as any),
    ease: easingFunctions[easing],
    duration: animationStyle === "default" ? duration : undefined,
  };

  // Listen for count value changes
  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(formatValue(latest, decimals, separator));
  });

  // Animate logic
  useEffect(() => {
    const startAnimation = () => {
      animate(count, value, {
        ...animationConfig,
        onComplete: () => {
          setHasAnimated(true);
          onAnimationComplete?.();
        },
      });
    };

    if (!triggerOnView) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [value, triggerOnView, hasAnimated]);

  const colorSchemes = {
    default: "text-foreground",
    gradient:
      "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600",
    primary: "text-primary",
    secondary: "text-secondary",
    custom: "",
  };

  const colorClass =
    colorScheme === "custom" && customColor ? "" : colorSchemes[colorScheme];

  const getHoverAnimation = () =>
    interactive
      ? {
          whileHover: {
            scale: 1.05,
            filter: "brightness(1.1)",
            transition: { duration: 0.2 },
          },
          whileTap: {
            scale: 0.95,
            filter: "brightness(0.95)",
            transition: { duration: 0.1 },
          },
        }
      : {};

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-flex items-center justify-center text-4xl font-bold text-black",
        className
      )}
    >
      <motion.div
        {...getHoverAnimation()}
        className={cn("flex items-center transition-all", colorClass, numberClassName)}
        style={
          colorScheme === "custom" && customColor
            ? { color: customColor }
            : undefined
        }
      >
        {prefix && <span className="mr-1">{prefix}</span>}
        <motion.span>{displayValue}</motion.span>
        {suffix && <span className="ml-1">{suffix}</span>}
      </motion.div>
    </div>
  );
}
