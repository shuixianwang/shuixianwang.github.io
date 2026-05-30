# Homepage Relationship Counter Design

Date: 2026-05-30
Status: Design approved for spec review

## Goal

Replace the homepage hero opening copy panel with a relationship day counter based on the approved visual reference. The homepage should keep its current photo-forward birthday landing experience, but the selected `hero-copy-panel` should become a clear anniversary-style timer card instead of a paragraph card.

The implementation should not change the records page, the photo archive behavior, the hero background, the floating photos, or the marquee content except where layout spacing is required to fit the new counter cleanly.

## Approved Direction

Use option 1 from brainstorming: a reference-image-style panel replacement.

- The existing `hero-copy-panel` becomes a wide frosted-glass counter card.
- The counter emphasizes the large day number as the main visual.
- The old opening paragraph and `看照片` button are removed.
- Existing `Scroll` affordance remains responsible for moving users into the photo archive.
- The design follows the generated reference mood: romantic archive, soft glass, large numeric center, quiet supporting chips, and no extra dashboard-like controls.

## Visual Reference

Approved reference image:

![Homepage relationship counter reference](./assets/homepage-relationship-counter-reference.png)

Generated with the built-in `image_gen` tool as a visual reference. The image is not a final screenshot and should not be used as a bitmap background. Implementation should translate the reference into real HTML, CSS, and TypeScript-driven text.

The reference contains a generated-text typo around `SINCE`. The final webpage must render all labels as real HTML text, so the correct label is exactly `SINCE 2023.09.17`.

### Reference Prompt

```text
Use case: ui-mockup
Asset type: visual reference for replacing the homepage hero copy panel with a relationship day counter
Primary request: Create a high-fidelity website hero mockup showing the existing romantic birthday homepage style, but replace the lower frosted copy panel with a clear relationship timer/count-up module. This is only a visual reference, not final implementation.
Scene/backdrop: A full desktop webpage hero, 16:10 landscape composition. Background is a soft, dimmed couple-photo collage feel with a subtle rose grid overlay, small polaroid photos floating on the right, and a fixed pill navigation in the top right. Keep the mood close to a romantic photo archive landing page.
Subject: The lower panel should be a large frosted-glass timer card in the same position as the original copy panel. It should feel like a precise counter, not a paragraph card. Include a thin top rule, compact label, very large day number, and small supporting date fields.
Style/medium: polished editorial web UI mockup, modern romantic archive, tactile but clean, subtle glass and paper blend. Sophisticated, personal, not childish.
Composition/framing: The timer card spans most of the lower hero width. Left side has label and since date. Center has oversized number. Right side has compact stacked time chips. Preserve visual hierarchy: the day number is the main focus.
Lighting/mood: warm nostalgic dusk, soft contrast, readable over photo background.
Color palette: ink black, warm white, muted rose accent, translucent pale blue glass, soft gray text.
Text (verbatim): "TO SHUI XIAN"; "SINCE 2023.09.17"; "DAY"; "987"; "我们已经在一起"; "2 YEARS"; "8 MONTHS"; "13 DAYS".
Constraints: The timer replaces the old opening copy panel only. Do not show implementation code. Make the timer readable and realistic as a web UI component. Keep all text inside the panel aligned and uncluttered. Avoid excessive decorative stickers, neon, childish style, or a generic SaaS dashboard look. No watermarks, no browser chrome.
```

The prompt's sample `987` was based on inclusive-day exploration. The approved implementation uses elapsed days instead, so on 2026-05-30 the main value is `986`.

## User Decisions

- Counter style: large day number first, matching the reference image.
- Start date: `2023-09-17`.
- Day-count rule: elapsed days, not inclusive days. The start date itself is day `0`.
- Example value for 2026-05-30: `DAY 986`.
- Calendar breakdown example for 2026-05-30: `2 YEARS`, `8 MONTHS`, `13 DAYS`.
- CTA handling: remove the `看照片` button from this card.
- Dynamic behavior: compute from the visitor's current local date.
- Main animation: the large day number rolls/counts up to the current value on page load.
- Supporting chips: year/month/day chips fade in only; they do not roll.
- Chinese line: `我们已经在一起`.

## Content And Layout

The card has three logical regions.

### 1. Left Context Column

Purpose: preserve the intimate letter-like tone from the original panel.

Content:

- `TO SHUI XIAN`
- `我们已经在一起`
- `SINCE 2023.09.17`

Style notes:

- Uppercase mono labels should reuse the homepage's existing label language.
- The Chinese line should be visually important but secondary to the day number.
- Use a small rose accent mark or line only if it supports the reference mood without clutter.

### 2. Center Day Counter

Purpose: become the primary visual replacement for the old paragraph.

Content:

- Large numeric elapsed-day value.
- `DAY` label beside or below the number.

Behavior:

- Value is computed from local calendar dates, using elapsed days from `2023-09-17`.
- On page load, animate the large number from a smaller starting value to the final value.
- The animation should run once and settle quickly. It should not keep ticking after load.
- For reduced motion, skip the rolling count and render the final value immediately.

### 3. Right Breakdown Chips

Purpose: make the counter feel intentional and complete without competing with the main day number.

Content:

- `N YEARS`
- `N MONTHS`
- `N DAYS`

Behavior:

- These values are the calendar difference between the start date and the visitor's local current date.
- They fade in after the main counter begins.
- They do not animate as rolling numbers.

## Date Calculation

Use local calendar-day semantics rather than millisecond time elapsed from the user's current clock. This avoids time-zone or daylight-saving surprises.

Rules:

- Start date is fixed: `2023-09-17`.
- Main day count is elapsed whole calendar days.
- `2023-09-17` displays `DAY 0`.
- `2023-09-18` displays `DAY 1`.
- `2026-05-30` displays `DAY 986`.

Calendar breakdown:

- Compute full years first.
- Then compute full months after those years.
- Then compute remaining days.
- For 2026-05-30, output `2 YEARS`, `8 MONTHS`, `13 DAYS`.

Implementation should keep this calculation in a small dedicated function so it can be tested independently of DOM rendering.

## Components And Rendering

Keep the change close to the current Vite/TypeScript architecture.

Recommended units:

- `src/index.html`: replace the `hero-copy-panel` inner markup with static semantic containers for the counter.
- `src/main.ts`: initialize the counter after existing generated assets and hero renderers.
- `src/relationshipCounter.ts`: calculate elapsed days, calendar breakdown, and render/update the counter values.
- `src/styles/site.css`: replace or extend `hero-copy-panel`, `panel-*`, and new counter classes.

The existing generated hero background assets and photo rendering in `src/render.ts` should remain unchanged.

## Accessibility

The counter must be understandable without relying on animation.

Requirements:

- The panel keeps an accessible label such as `aria-label="在一起天数计时器"`.
- The day number and `DAY` label should have readable text equivalents.
- The animated number should avoid verbose repeated screen-reader announcements. Prefer updating visible text once, or marking the animated numeric element in a way that does not spam assistive tech during the roll.
- Reduced-motion users see the final value immediately.
- The card remains keyboard-neutral; there is no button after CTA removal.

## Responsive Behavior

Desktop:

- Use the reference-like three-column layout.
- Card can be wider than the current copy panel if needed, but it should not cover the main hero title or right-side floating photos in a visually incoherent way.
- Maintain the frosted-glass panel feel, thin rule, soft border, and strong day-number hierarchy.

Mobile:

- Stack content vertically inside the panel.
- Show left labels first, then the large day value, then chips.
- Avoid horizontal overflow and text overlap with hero title or floating photos.
- Keep the card readable above the fold if possible, while preserving the existing photo-forward hero feel.

## Motion

Main day number:

- Counts upward to the final value once on initial page load.
- Duration should feel quick and ceremonial, roughly 900-1400ms.
- Use `requestAnimationFrame` or CSS-driven numeric updates without heavy libraries.

Supporting chips:

- Fade in with a small delay.
- No rolling number animation.

Reduced motion:

- Disable number rolling.
- Disable chip delay if it causes content to feel hidden.
- Preserve the final layout and all values.

## Visual Details

Use the reference as mood guidance, not as a literal raster asset:

- Frosted-glass card with soft white/translucent fill.
- Thin inner rule or divider.
- Large dark numeric typography.
- Rose accent for `DAY`, small marks, or underline.
- Right chips with subtle border and transparent fill.
- Preserve the surrounding homepage visual language: darkened photo background, rose grid, polaroid floats, and mono labels.

Avoid:

- SaaS dashboard styling.
- Neon gradients.
- Extra CTA buttons inside the counter.
- Overloaded stickers or decorative marks.
- Text rendered inside generated images.

## Error Handling

If the calculation fails for any reason, the page should still render a stable fallback:

- Day count fallback: `986`.
- Breakdown fallback: `2 YEARS`, `8 MONTHS`, `13 DAYS`.
- Since date remains visible.

The fallback is only for resilience. Normal rendering should calculate from the current local date.

## Testing And Verification

Automated or focused checks:

- Date helper returns `DAY 0` for 2023-09-17.
- Date helper returns `DAY 1` for 2023-09-18.
- Date helper returns `DAY 986` and `2 / 8 / 13` for 2026-05-30.
- Negative dates before the start date should clamp to zero rather than showing a negative love-log count.

Manual verification:

- `npm run export:legacy` succeeds.
- Homepage renders the counter in place of the old opening copy.
- Old `看照片` button is absent from the counter card.
- Existing `Scroll` link still works.
- Desktop viewport matches the approved visual reference's hierarchy and mood.
- Mobile viewport has no horizontal overflow or text/photo overlap.
- Reduced-motion mode shows the final values immediately.
- Browser console has no errors.

Browser screenshots should include:

- Desktop homepage hero with the new counter.
- Mobile homepage hero with the stacked counter.
- A reduced-motion or static-final-value check if practical.
