/**
 * peasy-css types — TypeScript interfaces for CSS generation.
 */

/** A color stop with optional position for gradients. */
export interface ColorStop {
  color: string;
  position?: string;
}

/** Box/text shadow configuration. */
export interface Shadow {
  x?: string;
  y?: string;
  blur?: string;
  spread?: string;
  color?: string;
  inset?: boolean;
}

/** CSS Grid template configuration. */
export interface GridTemplate {
  columns?: string;
  rows?: string;
  gap?: string;
  autoFlow?: string;
}

/** A single keyframe in a CSS animation. */
export interface Keyframe {
  selector: string;
  properties: Record<string, string>;
}

/** Gradient direction. */
export type GradientDirection =
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to top right"
  | "to top left"
  | "to bottom right"
  | "to bottom left";

/** Gradient type. */
export type GradientType = "linear" | "radial" | "conic";

/** Flexbox direction. */
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

/** Flexbox wrap mode. */
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

/** Flexbox justify-content values. */
export type FlexJustify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

/** Flexbox align-items values. */
export type FlexAlign =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

/** Grid auto-flow mode. */
export type GridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense";

/** CSS timing function. */
export type TimingFunction =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

/** Font weight values. */
export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/** Options for gradient generation. */
export interface GradientOptions {
  direction?: GradientDirection | string;
  gradientType?: GradientType;
  repeating?: boolean;
}

/** Options for flexbox generation. */
export interface FlexboxOptions {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: string;
}

/** Options for animation generation. */
export interface AnimationOptions {
  duration?: string;
  timing?: TimingFunction;
  delay?: string;
  iterationCount?: string | number;
  direction?: string;
  fillMode?: string;
}

/** Options for transform generation. */
export interface TransformOptions {
  translateX?: string;
  translateY?: string;
  rotate?: string;
  scaleX?: string;
  scaleY?: string;
  skewX?: string;
  skewY?: string;
}

/** Options for CSS filter generation. */
export interface FilterOptions {
  blur?: string;
  brightness?: string;
  contrast?: string;
  grayscale?: string;
  saturate?: string;
  sepia?: string;
  hueRotate?: string;
  invert?: string;
  opacity?: string;
  dropShadow?: string;
}

/** Options for transition generation. */
export interface TransitionOptions {
  duration?: string;
  timing?: TimingFunction;
  delay?: string;
}

/** Options for typography generation. */
export interface TypographyOptions {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: FontWeight;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  wordSpacing?: string;
}

/** Options for glassmorphism generation. */
export interface GlassmorphismOptions {
  blur?: string;
  background?: string;
  borderColor?: string;
}
