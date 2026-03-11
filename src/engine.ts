/**
 * peasy-css engine — Pure TypeScript CSS generation.
 *
 * 15 CSS generators: gradients, shadows, flexbox, grid, animations,
 * transforms, filters, transitions, media queries, typography,
 * border-radius, aspect-ratio, clamp, and glassmorphism.
 *
 * Zero dependencies. All functions are pure — no side effects.
 */

import type {
  AnimationOptions,
  ColorStop,
  FilterOptions,
  FlexboxOptions,
  GlassmorphismOptions,
  GradientOptions,
  GridTemplate,
  Keyframe,
  Shadow,
  TransformOptions,
  TransitionOptions,
  TypographyOptions,
} from "./types.js";

// ── Helpers ──────────────────────────────────────────────────────

function rule(selector: string, body: string): string {
  return `${selector} {\n  ${body}\n}`;
}

function colorStopStr(stop: string | ColorStop): string {
  if (typeof stop === "string") return stop;
  return stop.position ? `${stop.color} ${stop.position}` : stop.color;
}

// ── Gradient ─────────────────────────────────────────────────────

/** Generate a CSS gradient value string. */
export function gradient(
  colors: (string | ColorStop)[],
  options: GradientOptions = {},
): string {
  const {
    direction = "to right",
    gradientType = "linear",
    repeating = false,
  } = options;

  const stops = colors.map(colorStopStr).join(", ");
  const prefix = repeating ? "repeating-" : "";

  if (gradientType === "radial") {
    return `${prefix}radial-gradient(circle, ${stops})`;
  }
  if (gradientType === "conic") {
    return `${prefix}conic-gradient(${stops})`;
  }
  return `${prefix}linear-gradient(${direction}, ${stops})`;
}

/** Generate a complete CSS rule with gradient background. */
export function gradientCss(
  selector: string,
  colors: (string | ColorStop)[],
  options: GradientOptions = {},
): string {
  return rule(selector, `background: ${gradient(colors, options)};`);
}

// ── Box Shadow ───────────────────────────────────────────────────

/** Generate a box-shadow CSS value from one or more shadows. */
export function boxShadow(...shadows: Shadow[]): string {
  return shadows
    .map((s) => {
      const x = s.x ?? "0px";
      const y = s.y ?? "0px";
      const blur = s.blur ?? "0px";
      const spread = s.spread ?? "0px";
      const color = s.color ?? "rgba(0, 0, 0, 0.1)";
      const parts = s.inset
        ? ["inset", x, y, blur, spread, color]
        : [x, y, blur, spread, color];
      return parts.join(" ");
    })
    .join(", ");
}

/** Generate a complete CSS rule with box-shadow. */
export function boxShadowCss(selector: string, ...shadows: Shadow[]): string {
  return rule(selector, `box-shadow: ${boxShadow(...shadows)};`);
}

// ── Text Shadow ──────────────────────────────────────────────────

/** Generate a text-shadow CSS value. */
export function textShadow(
  x = "1px",
  y = "1px",
  blur = "2px",
  color = "rgba(0, 0, 0, 0.3)",
): string {
  return `${x} ${y} ${blur} ${color}`;
}

/** Generate a complete CSS rule with text-shadow. */
export function textShadowCss(
  selector: string,
  x = "1px",
  y = "1px",
  blur = "2px",
  color = "rgba(0, 0, 0, 0.3)",
): string {
  return rule(selector, `text-shadow: ${textShadow(x, y, blur, color)};`);
}

// ── Border Radius ────────────────────────────────────────────────

/** Generate a border-radius CSS value. */
export function borderRadius(
  topLeft = "0px",
  topRight = "0px",
  bottomRight = "0px",
  bottomLeft = "0px",
): string {
  if (
    topLeft === topRight &&
    topRight === bottomRight &&
    bottomRight === bottomLeft
  ) {
    return topLeft;
  }
  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
}

/** Generate a complete CSS rule with border-radius. */
export function borderRadiusCss(
  selector: string,
  topLeft = "0px",
  topRight = "0px",
  bottomRight = "0px",
  bottomLeft = "0px",
): string {
  const value = borderRadius(topLeft, topRight, bottomRight, bottomLeft);
  return rule(selector, `border-radius: ${value};`);
}

// ── Flexbox ──────────────────────────────────────────────────────

/** Generate flexbox CSS properties. */
export function flexbox(options: FlexboxOptions = {}): string {
  const {
    direction = "row",
    wrap = "nowrap",
    justify = "flex-start",
    align = "stretch",
    gap = "0px",
  } = options;

  const lines = [
    "display: flex;",
    `flex-direction: ${direction};`,
    `flex-wrap: ${wrap};`,
    `justify-content: ${justify};`,
    `align-items: ${align};`,
  ];

  if (gap !== "0px" && gap !== "0") {
    lines.push(`gap: ${gap};`);
  }

  return lines.join("\n  ");
}

/** Generate a complete CSS rule with flexbox layout. */
export function flexboxCss(
  selector: string,
  options: FlexboxOptions = {},
): string {
  return rule(selector, flexbox(options));
}

// ── Grid ─────────────────────────────────────────────────────────

/** Generate CSS Grid properties. */
export function grid(template?: GridTemplate): string {
  const t = template ?? {};
  const columns = t.columns ?? "1fr 1fr 1fr";
  const rows = t.rows ?? "auto";
  const gap = t.gap ?? "1rem";

  const lines = [
    "display: grid;",
    `grid-template-columns: ${columns};`,
    `grid-template-rows: ${rows};`,
    `gap: ${gap};`,
  ];

  if (t.autoFlow) {
    lines.push(`grid-auto-flow: ${t.autoFlow};`);
  }

  return lines.join("\n  ");
}

/** Generate a complete CSS rule with grid layout. */
export function gridCss(
  selector: string,
  template?: GridTemplate,
): string {
  return rule(selector, grid(template));
}

// ── Animation ────────────────────────────────────────────────────

/** Generate a CSS animation shorthand value. */
export function animation(
  name: string,
  options: AnimationOptions = {},
): string {
  const {
    duration = "1s",
    timing = "ease",
    delay = "0s",
    iterationCount = 1,
    direction = "normal",
    fillMode = "none",
  } = options;
  return `${name} ${duration} ${timing} ${delay} ${iterationCount} ${direction} ${fillMode}`;
}

/** Generate a complete CSS rule with animation. */
export function animationCss(
  selector: string,
  name: string,
  options: AnimationOptions = {},
): string {
  return rule(selector, `animation: ${animation(name, options)};`);
}

/** Generate a @keyframes CSS rule. */
export function keyframes(name: string, frames: Keyframe[]): string {
  const body = frames
    .map((f) => {
      const props = Object.entries(f.properties)
        .map(([k, v]) => `${k}: ${v};`)
        .join(" ");
      return `  ${f.selector} { ${props} }`;
    })
    .join("\n");
  return `@keyframes ${name} {\n${body}\n}`;
}

// ── Transform ────────────────────────────────────────────────────

/** Generate a CSS transform value. */
export function transform(options: TransformOptions = {}): string {
  const parts: string[] = [];

  const tx = options.translateX;
  const ty = options.translateY;
  if (tx || ty) {
    parts.push(`translate(${tx ?? "0"}, ${ty ?? "0"})`);
  }

  if (options.rotate) {
    parts.push(`rotate(${options.rotate})`);
  }

  const sx = options.scaleX;
  const sy = options.scaleY;
  if (sx || sy) {
    parts.push(`scale(${sx ?? "1"}, ${sy ?? "1"})`);
  }

  if (options.skewX || options.skewY) {
    parts.push(`skew(${options.skewX ?? "0"}, ${options.skewY ?? "0"})`);
  }

  return parts.length > 0 ? parts.join(" ") : "none";
}

/** Generate a complete CSS rule with transform. */
export function transformCss(
  selector: string,
  options: TransformOptions = {},
): string {
  return rule(selector, `transform: ${transform(options)};`);
}

// ── Filter ───────────────────────────────────────────────────────

/** Generate a CSS filter value. */
export function cssFilter(options: FilterOptions = {}): string {
  const parts: string[] = [];

  if (options.blur) parts.push(`blur(${options.blur})`);
  if (options.brightness) parts.push(`brightness(${options.brightness})`);
  if (options.contrast) parts.push(`contrast(${options.contrast})`);
  if (options.grayscale) parts.push(`grayscale(${options.grayscale})`);
  if (options.saturate) parts.push(`saturate(${options.saturate})`);
  if (options.sepia) parts.push(`sepia(${options.sepia})`);
  if (options.hueRotate) parts.push(`hue-rotate(${options.hueRotate})`);
  if (options.invert) parts.push(`invert(${options.invert})`);
  if (options.opacity) parts.push(`opacity(${options.opacity})`);
  if (options.dropShadow) parts.push(`drop-shadow(${options.dropShadow})`);

  return parts.length > 0 ? parts.join(" ") : "none";
}

/** Generate a complete CSS rule with filter. */
export function filterCss(
  selector: string,
  options: FilterOptions = {},
): string {
  return rule(selector, `filter: ${cssFilter(options)};`);
}

// ── Transition ───────────────────────────────────────────────────

/** Generate a CSS transition value. */
export function transition(
  property = "all",
  options: TransitionOptions = {},
): string {
  const { duration = "0.3s", timing = "ease", delay = "0s" } = options;
  return `${property} ${duration} ${timing} ${delay}`;
}

/** Generate a complete CSS rule with transition. */
export function transitionCss(
  selector: string,
  property = "all",
  options: TransitionOptions = {},
): string {
  return rule(
    selector,
    `transition: ${transition(property, options)};`,
  );
}

// ── Media Query ──────────────────────────────────────────────────

/** Wrap CSS in a media query. */
export function mediaQuery(
  breakpoint: string,
  cssBlock: string,
  type = "min-width",
): string {
  return `@media (${type}: ${breakpoint}) {\n  ${cssBlock}\n}`;
}

// ── Typography ───────────────────────────────────────────────────

/** Generate typography CSS properties. */
export function typography(options: TypographyOptions = {}): string {
  const {
    fontFamily = "system-ui, -apple-system, sans-serif",
    fontSize = "1rem",
    fontWeight = "normal",
    lineHeight = "1.5",
    letterSpacing,
    textTransform,
    wordSpacing,
  } = options;

  const lines = [
    `font-family: ${fontFamily};`,
    `font-size: ${fontSize};`,
    `font-weight: ${fontWeight};`,
    `line-height: ${lineHeight};`,
  ];

  if (letterSpacing) lines.push(`letter-spacing: ${letterSpacing};`);
  if (textTransform) lines.push(`text-transform: ${textTransform};`);
  if (wordSpacing) lines.push(`word-spacing: ${wordSpacing};`);

  return lines.join("\n  ");
}

/** Generate a complete CSS rule with typography. */
export function typographyCss(
  selector: string,
  options: TypographyOptions = {},
): string {
  return rule(selector, typography(options));
}

// ── Aspect Ratio ─────────────────────────────────────────────────

/** Return the aspect-ratio CSS value (pass-through validation). */
export function aspectRatio(ratio: string): string {
  return ratio;
}

/** Generate a complete CSS rule with aspect-ratio. */
export function aspectRatioCss(selector: string, ratio: string): string {
  return rule(selector, `aspect-ratio: ${ratio};`);
}

// ── Clamp ────────────────────────────────────────────────────────

/** Generate a CSS clamp() value for fluid sizing. */
export function clamp(min: string, preferred: string, max: string): string {
  return `clamp(${min}, ${preferred}, ${max})`;
}

/** Generate a complete CSS rule with fluid font-size. */
export function clampFontCss(
  selector: string,
  min: string,
  preferred: string,
  max: string,
): string {
  return rule(selector, `font-size: ${clamp(min, preferred, max)};`);
}

// ── Glassmorphism ────────────────────────────────────────────────

/** Generate glassmorphism (frosted glass) CSS properties. */
export function glassmorphism(options: GlassmorphismOptions = {}): string {
  const {
    blur = "10px",
    background = "rgba(255, 255, 255, 0.25)",
    borderColor = "rgba(255, 255, 255, 0.18)",
  } = options;

  return [
    `backdrop-filter: blur(${blur});`,
    `-webkit-backdrop-filter: blur(${blur});`,
    `background: ${background};`,
    `border: 1px solid ${borderColor};`,
  ].join("\n  ");
}

/** Generate a complete CSS rule with glassmorphism. */
export function glassmorphismCss(
  selector: string,
  options: GlassmorphismOptions = {},
): string {
  return rule(selector, glassmorphism(options));
}
