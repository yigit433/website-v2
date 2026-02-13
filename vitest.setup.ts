import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

afterEach(() => {
  cleanup();
});

// Mock next/image — renders a plain <img> tag
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return React.createElement("img", rest);
  },
}));

// Mock next/link — renders a plain <a> tag
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => React.createElement("a", { href, ...rest }, children),
}));

// Mock framer-motion — pass through children without animations
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef(function MotionComponent(
          {
            children,
            initial,
            animate,
            exit,
            transition,
            whileHover,
            whileInView,
            whileTap,
            viewport,
            variants,
            layout,
            layoutId,
            style,
            className,
            onClick,
            href,
            target,
            rel,
            ...rest
          }: Record<string, unknown>,
          ref: React.Ref<HTMLElement>
        ) {
          return React.createElement(
            prop as string,
            {
              style,
              className,
              onClick,
              href,
              target,
              rel,
              ref,
              ...rest,
            },
            children as React.ReactNode
          );
        });
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}));
