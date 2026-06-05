"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
        "inline-block max-w-full break-words transition-[opacity,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isActive ? "text-foreground opacity-100" : "text-foreground/45 opacity-100",
        className
      )}
      {...props}
      ref={ref as React.Ref<HTMLSpanElement>}
      onMouseEnter={handleActivate}
      onFocus={handleActivate}
      onClick={handleActivate}
      role="presentation"
    >
      {text}
    </span>
  );
});
TextStaggerHover.displayName = "TextStaggerHover";

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
  React.ImgHTMLAttributes<HTMLImageElement> & HoverSliderImageProps
>(({ index, imageUrl, className, alt, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn(
        "inline-block align-middle transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        isActive ? "opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
HoverSliderImage.displayName = "HoverSliderImage";
