import { describe, it, expect } from "vitest";
import {
  gradient,
  gradientCss,
  boxShadow,
  boxShadowCss,
  textShadow,
  textShadowCss,
  borderRadius,
  borderRadiusCss,
  flexbox,
  flexboxCss,
  grid,
  gridCss,
  animation,
  animationCss,
  keyframes,
  transform,
  transformCss,
  cssFilter,
  filterCss,
  transition,
  transitionCss,
  mediaQuery,
  typography,
  typographyCss,
  aspectRatio,
  aspectRatioCss,
  clamp,
  clampFontCss,
  glassmorphism,
  glassmorphismCss,
} from "../src/index.js";

// ── Gradient ──────────────────────────────────────────────────────

describe("gradient", () => {
  it("creates a linear gradient", () => {
    expect(gradient(["#ff0000", "#0000ff"])).toBe(
      "linear-gradient(to right, #ff0000, #0000ff)",
    );
  });

  it("creates a radial gradient", () => {
    expect(
      gradient(["#ff0000", "#0000ff"], { gradientType: "radial" }),
    ).toBe("radial-gradient(circle, #ff0000, #0000ff)");
  });

  it("creates a conic gradient", () => {
    expect(
      gradient(["red", "blue", "green"], { gradientType: "conic" }),
    ).toBe("conic-gradient(red, blue, green)");
  });

  it("creates a repeating gradient", () => {
    const result = gradient(["red", "blue"], { repeating: true });
    expect(result).toMatch(/^repeating-linear-gradient\(/);
  });

  it("handles color stops with positions", () => {
    const stops = [
      { color: "red", position: "0%" },
      { color: "blue", position: "100%" },
    ];
    const result = gradient(stops);
    expect(result).toContain("red 0%");
    expect(result).toContain("blue 100%");
  });

  it("accepts a custom direction", () => {
    const result = gradient(["red", "blue"], { direction: "to bottom" });
    expect(result).toContain("to bottom");
  });

  it("generates a complete CSS rule", () => {
    const result = gradientCss(".bg", ["red", "blue"]);
    expect(result).toContain(".bg {");
    expect(result).toContain("background:");
  });
});

// ── Box Shadow ────────────────────────────────────────────────────

describe("boxShadow", () => {
  it("creates a single shadow", () => {
    const result = boxShadow({
      x: "2px",
      y: "4px",
      blur: "8px",
      color: "black",
    });
    expect(result).toBe("2px 4px 8px 0px black");
  });

  it("creates an inset shadow", () => {
    const result = boxShadow({ inset: true });
    expect(result).toMatch(/^inset /);
  });

  it("creates multiple shadows", () => {
    const result = boxShadow(
      { x: "0px", y: "2px", blur: "4px" },
      { x: "0px", y: "4px", blur: "8px", color: "blue" },
    );
    expect(result).toContain(", ");
  });

  it("generates a complete CSS rule", () => {
    const result = boxShadowCss(".card", {});
    expect(result).toContain(".card {");
    expect(result).toContain("box-shadow:");
  });
});

// ── Text Shadow ───────────────────────────────────────────────────

describe("textShadow", () => {
  it("creates a text shadow", () => {
    expect(textShadow("2px", "2px", "4px", "gray")).toBe("2px 2px 4px gray");
  });

  it("generates a complete CSS rule", () => {
    const result = textShadowCss("h1");
    expect(result).toContain("h1 {");
    expect(result).toContain("text-shadow:");
  });
});

// ── Border Radius ─────────────────────────────────────────────────

describe("borderRadius", () => {
  it("returns uniform value when all corners match", () => {
    expect(borderRadius("8px", "8px", "8px", "8px")).toBe("8px");
  });

  it("returns individual values when corners differ", () => {
    expect(borderRadius("8px", "16px", "8px", "0px")).toBe(
      "8px 16px 8px 0px",
    );
  });

  it("generates a complete CSS rule", () => {
    const result = borderRadiusCss(".btn", "4px", "4px", "4px", "4px");
    expect(result).toContain(".btn {");
    expect(result).toContain("border-radius: 4px;");
  });
});

// ── Flexbox ───────────────────────────────────────────────────────

describe("flexbox", () => {
  it("creates default flexbox", () => {
    const result = flexbox();
    expect(result).toContain("display: flex;");
    expect(result).toContain("flex-direction: row;");
  });

  it("includes gap when non-zero", () => {
    const result = flexbox({ gap: "1rem" });
    expect(result).toContain("gap: 1rem;");
  });

  it("omits gap when zero", () => {
    const result = flexbox({ gap: "0px" });
    expect(result).not.toContain("gap:");
  });

  it("generates a complete CSS rule", () => {
    const result = flexboxCss(".flex", {
      justify: "center",
      align: "center",
    });
    expect(result).toContain(".flex {");
    expect(result).toContain("justify-content: center;");
  });
});

// ── Grid ──────────────────────────────────────────────────────────

describe("grid", () => {
  it("creates default grid", () => {
    const result = grid();
    expect(result).toContain("display: grid;");
    expect(result).toContain("grid-template-columns: 1fr 1fr 1fr;");
  });

  it("creates custom grid", () => {
    const result = grid({
      columns: "repeat(4, 1fr)",
      gap: "2rem",
    });
    expect(result).toContain("repeat(4, 1fr)");
    expect(result).toContain("gap: 2rem;");
  });

  it("includes auto-flow when specified", () => {
    const result = grid({ autoFlow: "dense" });
    expect(result).toContain("grid-auto-flow: dense;");
  });

  it("generates a complete CSS rule", () => {
    const result = gridCss(".grid");
    expect(result).toContain(".grid {");
  });
});

// ── Animation ────────────────────────────────────────────────────

describe("animation", () => {
  it("creates animation shorthand", () => {
    const result = animation("fadeIn", {
      duration: "0.5s",
      timing: "ease-in",
    });
    expect(result).toBe("fadeIn 0.5s ease-in 0s 1 normal none");
  });

  it("generates keyframes", () => {
    const frames = [
      { selector: "from", properties: { opacity: "0" } },
      { selector: "to", properties: { opacity: "1" } },
    ];
    const result = keyframes("fadeIn", frames);
    expect(result).toContain("@keyframes fadeIn {");
    expect(result).toContain("from { opacity: 0; }");
    expect(result).toContain("to { opacity: 1; }");
  });

  it("generates a complete CSS rule", () => {
    const result = animationCss(".fade", "fadeIn");
    expect(result).toContain(".fade {");
    expect(result).toContain("animation:");
  });
});

// ── Transform ────────────────────────────────────────────────────

describe("transform", () => {
  it("returns none when empty", () => {
    expect(transform()).toBe("none");
  });

  it("creates translate", () => {
    const result = transform({ translateX: "10px", translateY: "20px" });
    expect(result).toContain("translate(10px, 20px)");
  });

  it("creates rotate", () => {
    expect(transform({ rotate: "45deg" })).toContain("rotate(45deg)");
  });

  it("creates combined transforms", () => {
    const result = transform({
      translateX: "10px",
      rotate: "45deg",
      scaleX: "1.5",
    });
    expect(result).toContain("translate(");
    expect(result).toContain("rotate(");
    expect(result).toContain("scale(");
  });

  it("generates a complete CSS rule", () => {
    const result = transformCss(".box", { rotate: "90deg" });
    expect(result).toContain(".box {");
    expect(result).toContain("transform:");
  });
});

// ── Filter ───────────────────────────────────────────────────────

describe("cssFilter", () => {
  it("returns none when empty", () => {
    expect(cssFilter()).toBe("none");
  });

  it("creates a blur filter", () => {
    expect(cssFilter({ blur: "5px" })).toBe("blur(5px)");
  });

  it("creates multiple filters", () => {
    const result = cssFilter({
      blur: "2px",
      brightness: "120%",
      grayscale: "50%",
    });
    expect(result).toContain("blur(2px)");
    expect(result).toContain("brightness(120%)");
    expect(result).toContain("grayscale(50%)");
  });

  it("generates a complete CSS rule", () => {
    const result = filterCss(".img", { blur: "3px" });
    expect(result).toContain(".img {");
    expect(result).toContain("filter:");
  });
});

// ── Transition ───────────────────────────────────────────────────

describe("transition", () => {
  it("creates a transition", () => {
    expect(transition("opacity", { duration: "0.3s", timing: "ease-in" })).toBe(
      "opacity 0.3s ease-in 0s",
    );
  });

  it("generates a complete CSS rule", () => {
    const result = transitionCss(".btn", "background", { duration: "0.2s" });
    expect(result).toContain(".btn {");
    expect(result).toContain("transition:");
  });
});

// ── Media Query ──────────────────────────────────────────────────

describe("mediaQuery", () => {
  it("creates a min-width media query", () => {
    const result = mediaQuery("768px", ".container { width: 100%; }");
    expect(result).toContain("@media (min-width: 768px)");
    expect(result).toContain(".container { width: 100%; }");
  });

  it("creates a max-width media query", () => {
    const result = mediaQuery(
      "480px",
      "body { font-size: 14px; }",
      "max-width",
    );
    expect(result).toContain("@media (max-width: 480px)");
  });
});

// ── Typography ───────────────────────────────────────────────────

describe("typography", () => {
  it("creates default typography", () => {
    const result = typography();
    expect(result).toContain("font-family:");
    expect(result).toContain("font-size: 1rem;");
    expect(result).toContain("line-height: 1.5;");
  });

  it("creates custom typography", () => {
    const result = typography({
      fontFamily: "'Inter', sans-serif",
      fontSize: "1.25rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    });
    expect(result).toContain("'Inter', sans-serif");
    expect(result).toContain("letter-spacing: 0.05em;");
    expect(result).toContain("text-transform: uppercase;");
  });

  it("generates a complete CSS rule", () => {
    const result = typographyCss("body");
    expect(result).toContain("body {");
  });
});

// ── Aspect Ratio ─────────────────────────────────────────────────

describe("aspectRatio", () => {
  it("returns the ratio", () => {
    expect(aspectRatio("16 / 9")).toBe("16 / 9");
    expect(aspectRatio("1 / 1")).toBe("1 / 1");
  });

  it("generates a complete CSS rule", () => {
    const result = aspectRatioCss(".video", "16 / 9");
    expect(result).toContain("aspect-ratio: 16 / 9;");
  });
});

// ── Clamp ────────────────────────────────────────────────────────

describe("clamp", () => {
  it("creates a clamp value", () => {
    expect(clamp("1rem", "2.5vw", "3rem")).toBe("clamp(1rem, 2.5vw, 3rem)");
  });

  it("generates a fluid font-size CSS rule", () => {
    const result = clampFontCss("h1", "1.5rem", "4vw", "3rem");
    expect(result).toContain("h1 {");
    expect(result).toContain("font-size: clamp(1.5rem, 4vw, 3rem);");
  });
});

// ── Glassmorphism ────────────────────────────────────────────────

describe("glassmorphism", () => {
  it("creates default glassmorphism", () => {
    const result = glassmorphism();
    expect(result).toContain("backdrop-filter: blur(10px);");
    expect(result).toContain("-webkit-backdrop-filter:");
    expect(result).toContain("background:");
    expect(result).toContain("border:");
  });

  it("creates custom glassmorphism", () => {
    const result = glassmorphism({
      blur: "20px",
      background: "rgba(0,0,0,0.5)",
    });
    expect(result).toContain("blur(20px)");
    expect(result).toContain("rgba(0,0,0,0.5)");
  });

  it("generates a complete CSS rule", () => {
    const result = glassmorphismCss(".modal");
    expect(result).toContain(".modal {");
  });
});
