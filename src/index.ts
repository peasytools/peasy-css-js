/**
 * peasy-css — Pure TypeScript CSS generator.
 *
 * 15 CSS generators: gradients, shadows, flexbox, grid, animations,
 * transforms, filters, transitions, media queries, typography,
 * border-radius, aspect-ratio, clamp, and glassmorphism.
 *
 * Zero dependencies. All functions are pure — no side effects.
 *
 * @packageDocumentation
 */

export type {
  AnimationOptions,
  ColorStop,
  FilterOptions,
  FlexAlign,
  FlexboxOptions,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  FontWeight,
  GlassmorphismOptions,
  GradientDirection,
  GradientOptions,
  GradientType,
  GridAutoFlow,
  GridTemplate,
  Keyframe,
  Shadow,
  TimingFunction,
  TransformOptions,
  TransitionOptions,
  TypographyOptions,
} from "./types.js";

export {
  animation,
  animationCss,
  aspectRatio,
  aspectRatioCss,
  borderRadius,
  borderRadiusCss,
  boxShadow,
  boxShadowCss,
  clamp,
  clampFontCss,
  cssFilter,
  filterCss,
  flexbox,
  flexboxCss,
  glassmorphism,
  glassmorphismCss,
  gradient,
  gradientCss,
  grid,
  gridCss,
  keyframes,
  mediaQuery,
  textShadow,
  textShadowCss,
  transform,
  transformCss,
  transition,
  transitionCss,
  typography,
  typographyCss,
} from "./engine.js";

// API Client
export { PeasyCss } from "./client.js";
export type {
  ListOptions,
  ListGuidesOptions,
  ListConversionsOptions,
  PaginatedResponse,
  Tool,
  Category,
  Format,
  Conversion,
  GlossaryTerm,
  Guide,
  UseCase,
  Site,
  SearchResult,
} from "./api-types.js";
