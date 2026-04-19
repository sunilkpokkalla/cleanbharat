# Design System Strategy: The Civic Architect

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built to evoke the precision of modern architecture and the transparency of a high-functioning civic institution. We are moving away from the "standard tech dashboard" and toward a **"Digital Curator"** aesthetic—an editorial approach that treats information as a high-value asset.

The system breaks traditional templates by utilizing **intentional asymmetry** and **expansive negative space**. By allowing elements to breathe—sometimes with "wasteful" amounts of white space—we signal a premium, unhurried confidence. We reject the cluttered "utility-first" look in favor of a "clarity-first" philosophy where every pixel serves a purpose.

## 2. Colors & Surface Philosophy
The palette utilizes high-fidelity blues and greens against a foundation of "Hyper-Whites."

### Surface Hierarchy & The "No-Line" Rule
To achieve a premium feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined solely through background color shifts or tonal transitions.
- **Nesting Logic:** Treat the UI as physical layers of fine paper. Use `surface` (#fcf8f8) as your base. To define a content area, nest a `surface-container-low` (#f7f3f2) section within it. To elevate a card within that section, use `surface-container-lowest` (#ffffff).
- **The Glass & Gradient Rule:** For floating navigation or modal overlays, use **Glassmorphism**. Apply `surface` at 80% opacity with a `backdrop-filter: blur(20px)`. This prevents the UI from feeling "pasted on" and maintains a sense of environmental depth.
- **Signature Accents:** Use `primary` (#0058bd) for authoritative actions and `secondary` (#006e2c) for success or growth-oriented data. Avoid flat fills for large areas; instead, use a subtle linear gradient from `primary` to `primary_container` to add "soul" and dimension to CTAs.

## 3. Typography: Editorial Authority
The type scale balances the structural rigor of *Plus Jakarta Sans* with the approachable clarity of *Inter*.

*   **Display & Headline (Plus Jakarta Sans):** Used for high-level messaging. Use `display-lg` (3.5rem) with tight letter-spacing to create a "masthead" feel. These should act as the anchor for the layout’s asymmetry.
*   **Title & Body (Inter):** Designed for maximum readability. `body-lg` (1rem) is our workhorse. Ensure a generous line-height (1.6) to maintain the "clean and professional" aesthetic.
*   **Labels (Inter):** Small, often all-caps with increased tracking (+5%) to denote metadata or "civic" categories.

## 4. Elevation & Depth
We eschew "Material" shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card sitting on a `surface-container-low` background provides enough contrast to signify lift without a single shadow pixel.
*   **Ambient Shadows:** If a shadow is required (e.g., a floating Action Button), it must be "Ambient." Use a 32px blur, 0px spread, and 6% opacity of `on_surface`. This mimics natural, soft daylight.
*   **The "Ghost Border":** If accessibility requires a stroke (e.g., in high-contrast modes), use `outline_variant` at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons
*   **Primary:** A gradient fill from `primary` to `primary_container`. `Roundedness-md` (0.75rem). No border.
*   **Secondary:** `surface_container_highest` background with `on_primary_fixed_variant` text. This provides a "soft-touch" tactile feel.
*   **Tertiary:** Pure text with a `primary` underline that appears only on hover.

### Cards & Lists
*   **The Rule of Separation:** Forbid divider lines. Separate list items using `1.5rem` of vertical white space or by alternating background tones between `surface` and `surface_container_low`.
*   **Cards:** Use `roundedness-lg` (1rem). Content should be padded by at least `2rem` to maintain the "Civic Duty" sense of order and calm.

### Input Fields
*   **Field Style:** Use "Soft Fills" instead of outlines. An input should be a `surface_container_high` block. Upon focus, it transitions to `surface_container_lowest` with a subtle `primary` 2px bottom-accent.
*   **Helper Text:** Always use `label-md` in `on_surface_variant`. Precision is key for trust.

### Specialized Components
*   **The Civic Badge:** A high-contrast `secondary_fixed` chip used for status. It signifies "verified" or "complete" with high-end authority.
*   **The Progress Track:** A 4px thin line using `outline_variant` as the track and a `primary` to `secondary` gradient as the fill, representing the flow of civic progress.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. For example, a header might have a 15% left margin but a 5% right margin to create visual tension and interest.
*   **Do** prioritize "Over-spacing." If a section feels "done," add 16px of extra white space to see if it improves the premium feel.
*   **Do** use color to direct the eye. A single `secondary` (#006e2c) icon in a sea of monochrome text is a powerful way to denote "Trust."

### Don't:
*   **Don't** use 100% black (#000000). Always use `on_surface` (#1c1b1b) for text to keep the aesthetic soft and sophisticated.
*   **Don't** use "Card-in-Card" layouts with borders. This creates "visual noise" and breaks the minimalist ethos. Use background tonal shifts instead.
*   **Don't** use standard "drop shadows." They feel dated and "out-of-the-box." Stick to tonal layering and ambient blurs.