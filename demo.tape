Output demo.gif

Set Shell zsh
Set Width 900
Set Height 550
Set FontSize 14
Set Padding 15
Set TypingSpeed 40ms

Type `node`
Enter
Sleep 1s

Type `const css = await import('./dist/index.js')`
Enter
Sleep 1s

Type `// CSS gradient generation`
Enter
Sleep 300ms
Type `css.gradient(['#ff6b35', '#4ecdc4'], { direction: '135deg' })`
Enter
Sleep 1.5s

Type `// Box shadow`
Enter
Sleep 300ms
Type `css.boxShadow({ x: '0px', y: '4px', blur: '12px', color: 'rgba(0,0,0,0.15)' })`
Enter
Sleep 1.5s

Type `// Glassmorphism — frosted glass effect`
Enter
Sleep 300ms
Type `css.glassmorphism({ blur: 12, opacity: 0.25, saturation: 180 })`
Enter
Sleep 1.5s

Type `// Full CSS rule generation`
Enter
Sleep 300ms
Type `css.gradientCss('.hero', ['#667eea', '#764ba2'], { direction: 'to bottom right' })`
Enter
Sleep 2s

Type `.exit`
Enter
Sleep 500ms
