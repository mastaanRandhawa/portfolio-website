"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLiteAnimations } from "@/lib/use-reduced-motion";

interface TextStaggerHoverProps {
  text: string;
  index: number;
}

interface HoverSliderImageProps {
  index: number;
  imageUrl: string;
}

interface HoverSliderProps {}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined);

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    );
  }
  return context;
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    []
  );

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref as React.Ref<HTMLDivElement>} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;
  const handleActivate = () => changeSlide(index);

  return (
    <span
      className={cn(
        "inline-block max-w-full break-words transition-colors duration-300 ease-out",
        isActive ? "text-foreground" : "text-foreground/50",
        className
      )}
      {...props}
      ref={ref as React.Ref<HTMLSpanElement>}
      onMouseEnter={handleActivate}
      onFocus={handleActivate}
      role="presentation"
    >
      {text}
    </span>
  );
});
TextStaggerHover.displayName = "TextStaggerHover";

const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

const opacityVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  );
});
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, className, alt, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  const liteAnimations = useLiteAnimations();
  const isActive = activeSlide === index;

  return (
    <motion.img
      src={imageUrl}
      alt={alt}
      className={cn("inline-block align-middle will-change-[opacity,clip-path]", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: liteAnimations ? 0.45 : 0.65 }}
      variants={liteAnimations ? opacityVariants : clipPathVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  );
});
HoverSliderImage.displayName = "HoverSliderImage";
