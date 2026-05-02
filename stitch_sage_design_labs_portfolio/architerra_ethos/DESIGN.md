# Design System Documentation: The Sustainable Monolith

## 1. Overview & Creative North Star
**Creative North Star: "The Sustainable Monolith"**

This design system is a digital extension of architectural precision. It is designed to reflect the ethos of SAGE Design Labs: resilient structures harmonized with organic environments. We reject the "template" look of modern SaaS platforms. Instead, we embrace a high-end editorial experience that prioritizes intentional asymmetry, vast negative space, and tonal depth. 

The interface should feel like a high-end architectural blueprint—structured and authoritative, yet breathing with the vitality of natural elements. We break the grid through overlapping images and "floating" typography, creating a sense of forward-thinking movement and environmental fluidity.

---

## 2. Colors
Our palette is rooted in the deep blues of structural integrity and the soft, earthy greens of sustainable life.

### Palette Strategy
- **Primary & Secondary Layers:** Use `primary` (#002d56) for moments of absolute authority—navigation bars, primary headlines, and core CTAs. Use `secondary` (#4e6353) and `tertiary` (#232f25) to anchor the "Sage" green identity, primarily in environmental data visualizations or success states.
- **The "No-Line" Rule:** To maintain a premium, architectural feel, **1px solid borders are prohibited** for sectioning content. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `background` (#f8f9f9) area to create a clean, modern break.
- **Surface Hierarchy & Nesting:** Treat the UI as a physical model. Use the `surface-container` tiers to create depth. A `surface-container-highest` card should host information nested within a `surface-container-low` section. This "stacked paper" effect replaces traditional shadows for a more contemporary look.
- **The "Glass & Gradient" Rule:** For hero sections and immersive components, utilize the "Glassmorphism" effect. Use `surface-container-lowest` at 60% opacity with a `backdrop-filter: blur(20px)`. 
- **Signature Textures:** Apply subtle linear gradients transitioning from `primary` (#002d56) to `primary_container` (#124376) at a 135-degree angle for large action surfaces to add "soul" and dimension.

---

## 3. Typography
The type system balances the intellectual weight of a Serif with the technical precision of a modern Sans-Serif.

- **Display & Headlines (Noto Serif):** Headings use `display-lg` through `headline-sm`. This serif choice provides an elegant, editorial rhythm reminiscent of high-end architectural journals. Use wide letter-spacing (-0.02em) for a more bespoke feel.
- **Body & Titles (Manrope):** All functional text uses Manrope. Its geometric construction feels technical and "built." 
- **Hierarchy as Brand:** Use extreme contrast in scale. A `display-lg` headline should often be paired directly with a `body-md` description to emphasize the "Monolithic" scale of the firm's projects.

---

## 4. Elevation & Depth
We eschew traditional "Material" shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#edeeee) background. The subtle shift in hex code provides enough contrast to signify importance without the clutter of a stroke.
- **Ambient Shadows:** When a floating element (like a Modal or FAB) is required, use "Ambient Shadows." These must be extra-diffused: `box-shadow: 0 20px 40px rgba(25, 28, 28, 0.06)`. The shadow color is derived from `on-surface` (#191c1c) at a very low opacity to mimic natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at 20% opacity. **Never use 100% opaque borders.**
- **Glassmorphism:** Navigation menus and overlays should use semi-transparent surface colors. This allows the lush photography of architectural projects to bleed through the UI, softening the interface.

---

## 5. Components

### Buttons
- **Primary:** Background `primary` (#002d56), text `on-primary` (#ffffff). Use `md` (0.375rem) corner radius. No border.
- **Secondary:** Background `secondary-container` (#d1e9d4), text `on-secondary-container` (#546959).
- **States:** On hover, primary buttons should transition to `primary-container` (#124376) with a subtle `xl` (0.75rem) ambient shadow.

### Cards & Lists
- **The No-Divider Rule:** Forbid the use of divider lines. Separate list items or card sections using vertical white space (32px or 48px) or subtle tonal shifts between `surface-container-low` and `surface-container-high`.
- **Architectural Imagery:** Cards should feature full-bleed imagery with typography overlaid using a `surface-container-lowest` glass effect at the bottom of the card.

### Input Fields
- **Styling:** Use a "Minimalist Tray" style. No full box. Only a bottom border using `outline` (#737780) at 30% opacity. 
- **Focus State:** On focus, the bottom border animates to `primary` (#002d56) at 2px thickness.

### Additional Components: "The Project Blueprint"
- **The Blueprint Overlay:** A custom component for SAGE Design Labs. A semi-transparent layer (`surface-tint` at 10% opacity) that reveals a technical grid or "blueprint" lines when hovering over project hero images.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use generous white space. Architecture is about the space between walls; the UI should reflect this.
- **Do** use `notoSerif` for storytelling and `manrope` for technical data.
- **Do** leverage the `surface-container` tiers to create a "nested" physical hierarchy.
- **Do** ensure all text on `primary` backgrounds uses `on-primary` (#ffffff) for AA accessibility.

### Don’t:
- **Don’t** use 1px solid borders to separate sections.
- **Don’t** use high-opacity, dark drop shadows. They feel "cheap" and digital.
- **Don’t** crowd the layout. If a section feels full, add 24px of additional padding.
- **Don’t** use "pure" black. Always use `on-background` (#191c1c) to maintain a soft, professional tone.