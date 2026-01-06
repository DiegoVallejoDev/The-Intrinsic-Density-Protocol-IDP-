# Accessibility in IDP

> **Density Without Compromise**: How the Intrinsic Density Protocol achieves high information density while maintaining full WCAG 2.1 Level AA compliance.

## Table of Contents

- [Philosophy](#philosophy)
- [IDP's Approach](#idps-approach)
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Touch Target Requirements](#touch-target-requirements)
- [Color Contrast Guidelines](#color-contrast-guidelines)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Reduced Motion](#reduced-motion)
- [High Contrast Mode](#high-contrast-mode)
- [Best Practices](#best-practices)
- [Testing Recommendations](#testing-recommendations)
- [Resources](#resources)

## Philosophy

The conventional wisdom in web accessibility suggests that accessible interfaces require generous whitespace, large touch targets, and simplified layouts. While well-intentioned, this approach often creates bloated interfaces that force users to scroll through multiple screens of content that could fit in a single viewport.

**IDP rejects this false dichotomy.** We believe that:

1. **Accessibility and density are complementary, not contradictory**
2. **Smart density reduces cognitive load** by minimizing scrolling and context-switching
3. **Modern CSS and HTML standards** enable both high information density and full accessibility
4. **Golden ratio proportions** create natural, harmonious spacing that enhances both aesthetics and usability

## IDP's Approach

IDP achieves accessible high-density layouts through:

### 1. Mathematical Precision

Using the golden ratio (φ ≈ 1.618) and Fibonacci sequence for all spacing ensures:
- Consistent, predictable spacing patterns
- Natural visual rhythm
- Efficient space utilization without cramming
- Harmonious proportions that reduce visual fatigue

### 2. Container Queries Over Media Queries

Components adapt to their available space, not the viewport:
- Cards reorganize based on their width, not screen size
- Enables higher density on larger screens
- Maintains accessibility on smaller viewports
- Component-level responsive design

### 3. Semantic HTML Foundation

Always use proper semantic markup:
- Heading hierarchy (`h1` → `h2` → `h3`)
- Landmark regions (`<nav>`, `<main>`, `<aside>`)
- Native form controls
- Proper `<table>` structure for tabular data

### 4. Progressive Enhancement

Core functionality works without JavaScript:
- CSS-only layouts
- Native HTML controls
- Server-rendered content
- JavaScript enhances, doesn't enable

## WCAG 2.1 Compliance

IDP is designed to meet **WCAG 2.1 Level AA** standards out of the box.

### Perceivable

**1.1 Text Alternatives**
- All non-text content has text alternatives via `alt` attributes
- Decorative images use `aria-hidden="true"` or empty `alt=""`
- Icon buttons include `aria-label` attributes

**1.3 Adaptable**
- Proper semantic HTML structure
- Logical heading hierarchy
- Landmark regions for navigation
- `<table>` markup with `<th>` and proper scope

**1.4 Distinguishable**
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text and UI components
- Links distinguishable by underlines, not just color
- Focus indicators have 3:1 contrast against background

### Operable

**2.1 Keyboard Accessible**
- All functionality available via keyboard
- Visible focus indicators (`:focus-visible`)
- Skip links for bypassing navigation
- No keyboard traps

**2.4 Navigable**
- Clear heading structure
- Descriptive page titles
- Multiple ways to navigate (nav, TOC, search)
- Focus order follows reading order

**2.5 Input Modalities**
- **Minimum 44×44px touch targets** (WCAG 2.5.5)
- Pointer cancellation support
- No motion-based activation without alternatives

### Understandable

**3.1 Readable**
- Language specified (`lang="en"`)
- Clear, concise text
- Appropriate reading level

**3.2 Predictable**
- Consistent navigation patterns
- Consistent component behavior
- No unexpected context changes

**3.3 Input Assistance**
- Clear form labels
- Error identification and suggestions
- Instructions for complex inputs

### Robust

**4.1 Compatible**
- Valid HTML
- Proper ARIA usage
- Compatible with assistive technologies

## Touch Target Requirements

**WCAG 2.5.5 (Level AAA, but IDP adopts as standard)**: Target size of at least 44×44 CSS pixels.

### Implementation

IDP enforces minimum touch targets through CSS:

```css
/* Automatic minimum height for interactive elements */
button:not(.btn--icon),
[role="button"],
a.nav-link,
.checkbox,
.radio {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
}

/* Touch target utility class */
.touch-target {
    min-width: 44px;
    min-height: 44px;
}
```

### Density Optimization

You can maintain density while meeting touch targets:

1. **Vertical Padding**: Can be minimal (5-8px) as long as total height ≥ 44px
2. **Horizontal Spacing**: Use gap utilities to separate targets
3. **Hit Area vs Visual Size**: Touch area can exceed visible button size

**Example:**
```css
.btn--compact {
    padding: var(--s-fib-5) var(--s-fib-8);  /* 5px × 8px */
    min-height: 44px;  /* Ensures compliance */
}
```

This creates a visually compact button (13px total height from padding) but maintains the 44px touch target through `min-height`.

## Color Contrast Guidelines

IDP's color palette is designed for WCAG compliance:

### Text Contrast (WCAG 1.4.3)

| Element | Color | Contrast Ratio | WCAG Level |
|---------|-------|----------------|------------|
| Primary text on white | `#111827` | 16.5:1 | AAA |
| Secondary text on white | `#4B5563` | 7.1:1 | AAA |
| Tertiary text on white | `#9CA3AF` | 3.5:1 | AA (large text only) |
| Accent blue on white | `#0044CC` | 7.9:1 | AAA |
| White on accent blue | `#FFFFFF` | 7.9:1 | AAA |

### UI Component Contrast (WCAG 1.4.11)

All borders, focus indicators, and UI controls maintain at least 3:1 contrast:

```css
/* Strong borders for high contrast */
--c-border-strong: #111827;  /* 16.5:1 contrast */

/* Focus indicators */
:focus-visible {
    outline: 3px solid var(--c-accent);  /* 7.9:1 contrast */
    outline-offset: 2px;
}
```

### Don't Rely on Color Alone

IDP ensures information isn't conveyed by color alone:

- **Links**: Underlined by default
- **Form validation**: Icons + text, not just red/green borders
- **Status indicators**: Badges include text labels
- **Charts**: Patterns or labels, not just colors

## Keyboard Navigation

All IDP components are fully keyboard accessible.

### Focus Management

**Enhanced Focus Indicators:**

```css
:focus-visible {
    outline: 3px solid var(--c-accent);
    outline-offset: 2px;
    border-radius: var(--r-sm);
}

/* Dark mode adaptation */
[data-theme="dark"] :focus-visible {
    outline-color: #FFFFFF;
}
```

### Tab Order

- Follows logical reading order (left-to-right, top-to-bottom)
- Skip links allow bypassing navigation
- `tabindex="0"` for custom interactive elements
- Never use positive `tabindex` values

### Skip Links

All templates include skip links:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#table-of-contents" class="skip-link">Skip to table of contents</a>
```

Skip links are visually hidden but appear on focus:

```css
.skip-link {
    position: absolute;
    top: -100%;
    /* ... positioned off-screen ... */
}

.skip-link:focus {
    top: var(--s-md);  /* Appears at top when focused */
}
```

### Keyboard Shortcuts

Common keyboard patterns:

- **Tab**: Move focus forward
- **Shift + Tab**: Move focus backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals/dropdowns
- **Arrow keys**: Navigate within composite components

## Screen Reader Support

### Landmark Regions

Always include ARIA landmarks:

```html
<nav role="navigation" aria-label="Main navigation">
<main role="main" id="main-content">
<aside role="complementary" aria-label="Filters and options">
<footer role="contentinfo">
```

### Heading Hierarchy

**Never skip heading levels:**

```html
<!-- ✅ Correct -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

<!-- ❌ Wrong -->
<h1>Page Title</h1>
  <h3>Section</h3>  <!-- Skipped h2 -->
```

Use CSS to adjust visual size:

```css
/* h3 that looks like h2 */
.heading-large {
    font-size: var(--text-2xl);
}
```

### ARIA Labels

Use `aria-label` for icon buttons and context:

```html
<!-- Icon button -->
<button aria-label="Close dialog">
    <span aria-hidden="true">×</span>
</button>

<!-- Descriptive navigation -->
<nav aria-label="User account">
  <a href="/profile">Profile</a>
  <a href="/settings">Settings</a>
</nav>
```

### Screen Reader Only Content

Use the `.sr-only` utility for content that should only be read by screen readers:

```html
<button>
    <span aria-hidden="true">🔍</span>
    <span class="sr-only">Search</span>
</button>
```

### Live Regions

For dynamic content updates:

```html
<div aria-live="polite" aria-atomic="true">
    <!-- Content that updates without page reload -->
</div>
```

- `aria-live="polite"`: Announces when user is idle
- `aria-live="assertive"`: Announces immediately (use sparingly)
- `aria-atomic="true"`: Reads entire region on update

## Reduced Motion

Respect user preferences for reduced motion:

### CSS Approach

IDP includes a `.reduce-motion` utility:

```css
.reduce-motion,
.reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}
```

### Media Query

Use `prefers-reduced-motion` for global motion reduction:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

**Note:** IDP animations are minimal by design (fast, subtle transitions), so reduced motion has less impact than in heavily animated frameworks.

## High Contrast Mode

Support Windows High Contrast Mode (forced-colors):

```css
@media (forced-colors: active) {
    .btn,
    .card,
    .input,
    .badge {
        border: 2px solid currentColor;
    }
    
    :focus-visible {
        outline: 3px solid currentColor;
    }
}
```

In forced colors mode:
- Use semantic colors
- Ensure borders are visible
- Don't rely on background colors
- Use `currentColor` for borders

## Best Practices

### 1. Start with Semantic HTML

```html
<!-- ✅ Good: Semantic -->
<button onclick="handleClick()">Submit</button>

<!-- ❌ Bad: Needs ARIA -->
<div onclick="handleClick()" role="button" tabindex="0">Submit</div>
```

### 2. Provide Context

```html
<!-- ✅ Good: Clear context -->
<button aria-label="Delete invoice #12345">Delete</button>

<!-- ❌ Bad: Ambiguous -->
<button>Delete</button>
```

### 3. Use Native Controls

Prefer native HTML over custom widgets:
- `<select>` over custom dropdowns
- `<input type="checkbox">` over custom toggles
- `<button>` over styled `<div>` elements

### 4. Test with Real Users

Automated tools catch ~30% of accessibility issues. Test with:
- Keyboard-only users
- Screen reader users
- Users with low vision
- Users with motor impairments

### 5. Progressive Disclosure

In dense layouts, use progressive disclosure:
- Show essential information first
- Provide "Show more" options for details
- Use collapsible sections for optional content

## Testing Recommendations

### Automated Testing

**Tools:**
1. **axe DevTools** (Chrome/Firefox extension)
2. **Lighthouse** (Chrome DevTools)
3. **WAVE** (Web accessibility evaluation tool)
4. **pa11y** (Command-line tool)

Run automated tests on:
- All template examples
- Each component in isolation
- Different viewport sizes
- Light and dark themes

### Manual Testing

#### Keyboard Navigation

1. **Tab through the page**
   - All interactive elements reachable?
   - Focus indicators visible?
   - Tab order logical?

2. **Use only keyboard**
   - Can you complete all tasks?
   - Any keyboard traps?
   - Shortcuts work as expected?

#### Screen Readers

Test with:
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

Check:
- Heading navigation
- Landmark navigation
- Form controls properly labeled
- Dynamic content announced
- Proper reading order

#### Visual Testing

1. **Color blindness**: Use Color Oracle or browser DevTools
2. **High contrast**: Enable Windows High Contrast mode
3. **Zoom**: Test at 200% and 400% zoom
4. **Reflow**: Ensure no horizontal scroll at 320px width

#### Mobile Testing

1. **Touch targets**: All ≥ 44×44px?
2. **Orientation**: Works in portrait and landscape?
3. **Text size**: Can users increase text size?
4. **Spacing**: Adequate spacing between interactive elements?

### Checklist

Before shipping, verify:

- [ ] All images have alt text
- [ ] Heading hierarchy is correct (no skipped levels)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥ 44×44px
- [ ] Forms have visible labels
- [ ] Error messages are clear
- [ ] No keyboard traps
- [ ] Landmark regions defined
- [ ] ARIA labels where needed
- [ ] Reduced motion support
- [ ] High contrast mode works
- [ ] Screen reader tested
- [ ] Mobile tested

## Resources

### WCAG Guidelines

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- [Touch Target Size (2.5.5)](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers

- [NVDA](https://www.nvaccess.org/) (Windows, free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- VoiceOver (macOS: Cmd+F5, iOS: Settings → Accessibility)
- TalkBack (Android: Settings → Accessibility)

### Learning Resources

- [WebAIM](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

### IDP-Specific

- [IDP Framework Documentation](../README.md)
- [Template Examples](../templates/)
- [Component Reference](../src/components/)

---

## Summary

**Accessibility and density are not opposing forces.** The Intrinsic Density Protocol demonstrates that with:

1. **Mathematical precision** (golden ratio, Fibonacci spacing)
2. **Modern CSS** (container queries, CSS Grid)
3. **Semantic HTML** (proper markup, ARIA when needed)
4. **Thoughtful design** (color contrast, touch targets, focus states)

...you can create interfaces that are both information-rich **and** universally accessible.

The templates in `templates/` demonstrate these principles in action. Use them as starting points for your own accessible, high-density interfaces.

**Remember:** Accessibility benefits everyone. A well-designed accessible interface is simply a well-designed interface.
