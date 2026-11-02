'use client';

import React, { forwardRef } from 'react';

// Lightweight, zero-runtime shim for Framer Motion during transition to GSAP.
// Completely eliminates the 100KB+ framer-motion library from bundle.

type MotionProps = React.HTMLAttributes<any> & {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  whileInView?: any;
  whileHover?: any;
  whileTap?: any;
  viewport?: any;
  layout?: any;
  layoutId?: any;
  onAnimationComplete?: any;
  [key: string]: any;
};

function createMotionComponent(ComponentOrTag: any) {
  const Component = forwardRef<any, MotionProps>(({
    initial,
    animate,
    exit,
    transition,
    variants,
    whileInView,
    whileHover,
    whileTap,
    viewport,
    layout,
    layoutId,
    onAnimationComplete,
    ...props
  }, ref) => {
    return React.createElement(ComponentOrTag, { ...props, ref });
  });
  Component.displayName = `MotionCompat(${typeof ComponentOrTag === 'string' ? ComponentOrTag : 'Component'})`;
  return Component;
}

const motionHandler: ProxyHandler<any> = {
  get: (_target, prop: string) => {
    if (prop === 'create') {
      return (Component: any) => createMotionComponent(Component);
    }
    return createMotionComponent(prop as any);
  },
  apply: (_target, _thisArg, argumentsList) => {
    return createMotionComponent(argumentsList[0]);
  },
};

export const motion: any = new Proxy(function () {}, motionHandler);

export function AnimatePresence({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return <>{children}</>;
}

export function useScroll(_options?: any) {
  return {
    scrollY: { get: () => 0 },
    scrollYProgress: { get: () => 0 },
  };
}

export function useTransform(_value: any, _input: any, output: any) {
  return output?.[0] ?? 0;
}

export function useInView(_ref: any, _options?: any) {
  return true;
}

export type Variants = Record<string, any>;
