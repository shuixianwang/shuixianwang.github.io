# Records Handbook Blog Design

Date: 2026-05-30
Status: Design approved for spec review

## Goal

Redesign `records.html` into a long-form paper-handbook page that first records the couple's story, then archives annual birthday letters like a personal blog. The first implementation should focus on framework, layout, animation, and maintainability. Real story text and final photo choices can remain placeholders until the user supplies content.

The homepage remains the photo-forward experience. `records.html` becomes the narrative and letter archive page.

## Approved Direction

Use the "handbook scroll" approach:

- First screen: a paper-journal cover for the records page.
- Main body: 5-6 photo-triggered story chapters.
- Featured letter: the 2026 birthday letter shown as the first complete annual letter.
- Archive: annual birthday letter cards for future years.

Visual style is a clean paper scrapbook: tactile paper grain, taped photo placeholders, date labels, small notes, light hand-drawn marks, and restrained decoration. It should feel personal and warm without becoming childish or cluttered.

## Visual Reference

Approved reference image:

![Records handbook blog reference](./assets/records-handbook-blog-reference.png)

Generated with the built-in `image_gen` tool as a preview/reference asset. It is not a final webpage screenshot and should not be used as a full-page background. Implementation should translate the reference into real HTML/CSS sections, structured content, existing photo assets, and scroll animations.

### Reference Prompt

```text
Use case: ui-mockup
Asset type: visual reference for a vertical scrolling website page
Primary request: Create a high-fidelity visual reference for a romantic Chinese personal blog page that feels like a clean paper scrapbook / handwritten journal. The page records a couple's story first, then archives annual birthday letters like a blog.
Scene/backdrop: A long vertical web page mockup, portrait orientation, showing multiple stacked scroll sections in one composition. Warm ivory paper background with subtle paper grain, soft shadows, folded page edges, taped photo placeholders, note cards, date labels, and small delicate hand-drawn illustration accents.
Subject: The page layout should include: 1) a first-screen journal cover hero, 2) several photo-triggered story chapters with one main photo sticker placeholder and body text blocks, 3) a featured full birthday letter section, 4) a bottom annual birthday letter archive/blog list.
Style/medium: polished editorial UI mockup, paper scrapbook, clean hand journal, romantic but restrained. Sophisticated and personal, not childish.
Composition/framing: vertical 9:16 webpage mockup; show enough of the page to communicate scrolling. Use sticky-looking photo frames, layered papers, washi tape, handwritten annotation marks, and blog archive cards. Keep the layout readable and structured.
Lighting/mood: soft natural daylight, warm nostalgic mood, gentle shadows, tactile paper feel.
Color palette: ivory, warm white, muted rose, soft ink black, faded blue-gray, tiny red accent marks.
Text: Use mostly realistic text blocks and simple short labels, but exact text is not important. Avoid gibberish-heavy large headings; if text appears, keep it minimal and elegant.
Constraints: Reference image only, not a final webpage screenshot. Do not use real identifiable faces; photo areas should be soft blurred couple-photo placeholders or abstract image crops. No logos, no watermarks, no browser chrome. Avoid clutter, sticker overload, neon colors, dark archive style, or childish scrapbook decoration.
```

## Information Architecture

### 1. Records Cover

The opening viewport introduces the page as a journal rather than a landing page. It should include:

- Page title: "我们的信和记录"
- Short supporting copy explaining that this page collects the story, birthday letters, and future additions.
- A soft background photo or photo placeholder treated as part of the paper surface.
- Subtle paper texture and date/archive markers.

The existing page tabs remain cross-page navigation: `首页` and `信与记录`.

### 2. Photo-Triggered Story Chapters

Create 5-6 chapters for the first version. Each chapter is a structured record with:

- Chapter label, for example `Story 01`
- Date placeholder
- Title placeholder
- Body placeholder paragraphs
- One main photo from `photos.ts`, or a placeholder photo id
- Optional small illustration/note marker
- Layout variant such as `photo-left`, `photo-right`, or `stacked`

Each chapter should read like a page in a physical handbook: photo sticker, paper note, date stamp, and text block. Content is placeholder-first; the user will provide final words later.

### 3. Featured 2026 Birthday Letter

After the story chapters, show the 2026 birthday letter as a long letter sheet. It should support:

- Year and date
- Title
- Excerpt
- Several body paragraphs
- Optional cover photo
- Reading-focused typography

Initial content can be placeholder text, but the section must make it clear how a complete letter will look once filled.

### 4. Annual Letter Archive

At the bottom, add a blog-style archive of annual birthday letters. First version:

- 2026 appears as the featured/current full letter.
- Future years appear as reserved archive cards.
- Each card supports year, date, title, status, excerpt, and cover photo.

No dynamic routing or separate article pages are required in the first version.

## Data Model

Move records content out of `records.html` into a TypeScript data file named `src/recordsData.ts`.

Proposed types:

```ts
export type StoryLayout = "photo-left" | "photo-right" | "stacked";

export type StoryChapter = {
  id: string;
  label: string;
  date: string;
  title: string;
  body: string[];
  photoId: string;
  illustration?: string;
  layout: StoryLayout;
};

export type LetterStatus = "featured" | "reserved";

export type BirthdayLetter = {
  year: number;
  date: string;
  title: string;
  status: LetterStatus;
  excerpt: string;
  body: string[];
  coverPhotoId?: string;
};
```

The renderer should resolve `photoId` and `coverPhotoId` through the existing `getPhoto()` API in `src/photos.ts`. The first version should not duplicate image paths in the records data.

## Components And Rendering

Keep the implementation small and close to the current Vite/TypeScript architecture.

Recommended units:

- `recordsData.ts`: story and letter content.
- `recordsRender.ts`: creates the cover, chapters, featured letter, and archive cards.
- `recordsScroll.ts`: manages scroll activation state for chapter animations.
- `records.ts`: imports shared CSS, renders generated background assets if needed, renders records content, and initializes scroll behavior.
- `site.css`: shared page chrome plus records-specific visual styles.

HTML should keep semantic section containers and empty render targets, similar to the existing gallery pattern.

## Scroll Animation

The desired animation level is strong interaction:

- Chapters activate as they enter the viewport.
- Main photo appears as a taped sticker with slight rotation and settling motion.
- Text, date labels, and note marks animate in separately.
- Sticky chapter staging creates a short "reading stop" before the next paper layer moves in.
- Paper sheets and note cards use transform/opacity rather than layout-changing animation.

Implementation should avoid heavy animation libraries in the first version. Use:

- `IntersectionObserver` for active/past chapter state.
- CSS `position: sticky` for staged reading moments.
- CSS custom properties and classes such as `is-active` / `is-past`.
- `transform` and `opacity` transitions.

## Reduced Motion And Performance

The page must remain readable when motion is reduced or device performance is limited.

Requirements:

- Respect `prefers-reduced-motion: reduce`.
- In reduced motion, disable sticky theatrics, rotation, large parallax, and staggered movement. Keep simple opacity changes only.
- On small screens, shorten or remove sticky stop duration so the page scrolls naturally.
- Use stable dimensions for photo frames and letter cards to avoid layout shift.
- Use existing optimized photo assets; do not introduce large uncompressed images for layout decoration.

## Visual Details

Use the visual reference for mood and composition, but implement details as web-native UI:

- Paper background through CSS texture layers plus the existing generated paper asset where it improves the letter/handbook surface.
- Photo stickers with real `<img>` elements, border/padding, soft shadow, small rotations.
- Tape and labels with CSS pseudo-elements or simple HTML spans.
- Handwritten annotation feel through typography, small mono labels, and restrained marks.
- Blog archive cards with consistent height, clear year/date/title/excerpt hierarchy.

Avoid:

- Overloaded stickers or cute decoration.
- Neon/dark archive styling.
- Large unreadable generated text inside raster images.
- One giant image background replacing the page layout.

## Error Handling

If records data references an unknown `photoId`, the renderer should fail clearly during development. Reuse the current `getPhoto()` behavior where possible.

If optional fields are missing:

- Missing `coverPhotoId` falls back to a paper-only archive card.
- Missing `illustration` simply omits the decorative mark.
- Empty `body` renders a placeholder paragraph only if the data explicitly contains placeholder content; the renderer should not invent content.

## Testing And Verification

Manual verification:

- `npm run export:legacy` succeeds.
- `/records.html` renders with 5-6 story chapters, the featured 2026 letter, and archive cards.
- Page tabs switch between `/` and `/records.html`.
- All referenced images load successfully.
- Desktop viewport shows strong handbook scroll behavior without overlapping text.
- Mobile viewport preserves reading order and avoids cramped fixed panels.
- Reduced-motion mode disables strong movement while keeping content visible.

Browser verification should include screenshots of:

- Records cover.
- At least one active story chapter during scroll.
- Featured letter section.
- Archive section.

## Out Of Scope For First Implementation

- Real final story copy.
- Separate route/page per yearly letter.
- Markdown or CMS authoring.
- Search, tags, comments, RSS, or pagination.
- Generating final project illustration assets beyond this approved visual reference.

## Implementation Context

The current repo has uncommitted page changes from earlier work that already introduced `records.html`. The implementation plan should account for that state and preserve user-visible progress instead of reverting it.
