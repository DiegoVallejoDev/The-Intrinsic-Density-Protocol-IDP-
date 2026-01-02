# The Intrinsic Density Protocol (IDP)

[![npm version](https://img.shields.io/npm/v/idp-framework.svg)](https://www.npmjs.com/package/idp-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Demo](https://img.shields.io/badge/demo-live-success.svg)](https://the-intrinsic-density-protocol.vercel.app/)

<img src="./src/demo/IDP_logo.png" alt="IDP Logo" width="39%">

> A CSS framework for high-density, container-driven layouts using golden ratio proportions.

**[📺 Live Demo](https://the-intrinsic-density-protocol.vercel.app/)** | **[📦 npm](https://www.npmjs.com/package/idp-framework)** | **[📖 GitHub](https://github.com/DiegoVallejoDev/The-Intrinsic-Density-Protocol-IDP-)**

```bash
npm install idp-framework
```

**Version:** 1.0.1 | **License:** MIT

## The Manifesto: Stop Designing for the iPhone 5

The Intrinsic Density Protocol (IDP) is a rejection of the "Web 2012" responsive design paradigm. It asserts that the standard 12-column grid and the "Mobile First" single-column stack are obsolete artifacts of an era defined by low-resolution displays (320px width) and limited bandwidth.

**We are currently designing software for ghosts.**

Modern hardware—from 6.7" Retina mobile displays (400ppi+) to 49" Ultrawide monitors—demands **Information Density**, not whitespace. IDP provides the technical and philosophical framework to reclaim wasted pixels and respect the user's cognitive bandwidth.

## The Historical Failure

### The 12-Column Stagnation

In 2011-2012, frameworks like Bootstrap and Foundation standardized the web. They solved the chaos of the early mobile web by imposing a strict rule: **On mobile, stack everything vertically.**

This was necessary when a phone screen was 3.5 inches and 320 pixels wide. It is negligence today.

### The Hardware/Software Divergence

* **Hardware (2025):** Handheld devices have higher resolution than desktop monitors from 2015. Ultrawide monitors (21:9) are standard in productivity environments.

* **Software (2025):** We still force users to scroll through 4,000 pixels of vertical height to consume data that could fit in a single 500px "Bento" grid. We still center content on ultrawide monitors, leaving 50% of the screen as dead `margin-auto` space.

IDP creates a new standard: **Density as a Service.**

## The Three Axioms

### Axiom I: The Mobile Density Paradox

**Premise:** Scrolling is cognitively expensive ("The Scroll Tax"). Scanning with peripheral vision is cheap.
**Observation:** Western design fetishizes "whitespace" and "minimalism," often at the cost of utility. Eastern design (notably Japanese mobile web) prioritizes high information density, minimizing scroll depth.
**The IDP Solution:**
We reject the single-column mobile stack. By using CSS Grid with `minmax` and `auto-fill`, IDP layouts automatically render 2 or even 3 functional columns on modern mobile devices.

> **Rule:** If a metric can be displayed above the fold without compromising legibility, hiding it below the fold is a design failure.

### Axiom II: The Component Singularity

**Premise:** Viewport Media Queries (`@media (min-width: 768px)`) are a crude instrument. They measure the *browser window*, not the *context* of the component.
**The IDP Solution:**
IDP relies exclusively on **Container Queries**. A card component should not know what device it is on; it should only know how much space it has.

* If a card has 300px: Display vertical stack.

* If a card has 500px: Display horizontal "Swimlane".

* This happens independently of whether the user is on a Tablet, Desktop, or an Ultrawide sidebar.

### Axiom III: The Ultrawide Mandate

**Premise:** The standard `container { max-width: 1200px; margin: 0 auto; }` is hostile to 21:9 displays. It isolates content in the center of the screen, far from OS controls, surrounded by "The Void."
**The IDP Solution:**
**The Cockpit Layout.**

1. **Anchor Left:** The primary reading content is anchored to the left-center (The Reading Zone).

2. **Reclaim Right:** The massive empty space on the right is converted into a **Context Panel**. This panel houses metadata, table of contents, related links, or live diagnostics. It is never empty.

## Technical Implementation

IDP is agnostic to framework (React, Vue, Svelte) but strict on CSS implementation. It requires no JavaScript for layout logic.

### 1. The Bento Grid (Layout Engine)

Replace rigid column classes (`col-6`, `w-1/2`) with intrinsic grid logic.

```css
.bento-grid {
  display: grid;
  gap: 1rem;
  /* * The Magic:
   * 1. auto-fill: Fits as many columns as possible.
   * 2. minmax(180px, 1fr): Cards never shrink below 180px.
   * On a 390px iPhone 14, this mathematically forces 2 columns.
   * On a Desktop, it flows to 6.
   */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
```

### 1.5. The Golden Ratio Grid System

IDP uses the **golden ratio (φ ≈ 1.618)** as a core design principle for creating harmonious layouts. Derived from the Fibonacci sequence, this mathematical constant creates proportions that the human eye naturally finds pleasing.

**The 4-Column Golden Layout:**

```css
/* Ultrawide optimization: all columns follow golden proportions */
grid-template-columns: 0.23fr 2.09fr 1.30fr 0.38fr;
/*                      nav    main   context  aux     */

/* Ratio relationships:
 * main / context  ≈ 1.607 (≈φ)
 * context / aux   ≈ 3.42  (≈φ²)
 * nav / aux       ≈ 0.605 (≈1/φ)
 */
```

**2D Golden Grid (Recursive Golden Rectangles):**

```css
.golden-grid-2d {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  grid-template-rows: 1.618fr 1fr;
  gap: var(--spacing);
}
```

> **Why Golden Ratio?** Found in nature (nautilus shells, sunflowers), used in art (Mona Lisa, Parthenon), and proven to create visual harmony. Each element relates to others through φ, creating recursive beauty.

### 2. The Intrinsic Card (Component Engine)

Components define their own reality.

```css
.card-container {
  container-type: inline-size;
}

/* Internal logic based on self-width, not screen-width */
@container (min-width: 400px) {
  .card-layout {
    display: grid;
    grid-template-columns: 2fr 1fr; /* Image Left, Data Right */
    align-items: center;
  }
}
```

### 3. Typography Physics

Text lines must never exceed `75ch` (characters) for readability. In Legacy web, this width limitation creates margins. In IDP, this width limitation creates *opportunity* for side panels.

```css
p {
  max-width: 70ch;
  /* Remaining space is yielded to the Grid Context */
}
```

### 4. Included Components

IDP includes a suite of high-density, unopinionated UI components designed for professional applications:

*   **Forms**: Density-optimized inputs, floating labels, and compact groups.
*   **Data Vis**: Tables, badges, and metric cards.
*   **Feedback**: Alerts, callouts, and toast placeholders.
*   **Navigation**: Sidebar-first principles with mobile fallbacks.

All components adhere to **Axiom II** (Container Queries) and automatically adapt to their available space.

## Installation & Usage

### Import the Framework

Add the IDP CSS to your project:

```html
<link rel="stylesheet" href="dist/idp-framework.min.css">
```

Or import in your CSS/JS:

```css
@import 'idp-framework/dist/idp-framework.min.css';
```

```javascript
import 'idp-framework/dist/idp-framework.min.css';
```

### Basic Layout

```html
<body class="idp-shell has-context">
    <nav class="region-nav">...</nav>
    <main class="region-main">...</main>
    <aside class="region-context">...</aside>
</body>
```

### Demo
if built with `pnpm run build-demo-website`, The `dist/index.html` file contains an interactive demo of the IDP framework. Open it in any modern browser (Chrome/Edge 105+, Safari 16+, Firefox 110+) and toggle the "Legacy Mode" button to compare IDP with traditional responsive design.

## Philosophy: Pixel Economics

**1. The Pixel is Expensive.**
A pixel on a user's screen represents attention and battery life. Do not squander it on decorative emptiness.

**2. Respect the Thumb.**
On mobile, the bottom 30% of the screen is the primary interaction zone. IDP favors placing dense navigation and control grids here, rather than hamburger menus at the top.

**3. Data-Ink Ratio.**
Borrowing from Edward Tufte: Minimize the non-data ink. Remove heavy borders, drop shadows, and decorative backgrounds. Use spacing (tight) and alignment to define hierarchy.



## License

This project is open source under the MIT License. You are free to fork, modify, and use IDP in commercial applications. We only ask that you stop building single-column websites for high-resolution devices.