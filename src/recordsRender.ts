import { getPhoto, type Photo } from "./photos";
import { birthdayLetters, recordsCover, storyChapters, type BirthdayLetter, type StoryChapter } from "./recordsData";

function image(photo: Photo, alt = photo.alt): HTMLImageElement {
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = alt;
  img.width = photo.width;
  img.height = photo.height;
  img.loading = "lazy";
  img.decoding = "async";
  return img;
}

function text(tagName: string, className: string, value: string): HTMLElement {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = value;
  return element;
}

function appendParagraphs(target: HTMLElement, paragraphs: string[]): void {
  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    target.append(p);
  });
}

export function renderRecordsCover(): void {
  const target = document.querySelector<HTMLElement>("[data-records-cover]");
  if (!target) return;

  const background = getPhoto(recordsCover.backgroundPhotoId);
  const backgroundFrame = document.createElement("figure");
  backgroundFrame.className = "records-cover-photo";
  backgroundFrame.setAttribute("aria-hidden", "true");
  backgroundFrame.append(image(background, ""));

  const content = document.createElement("div");
  content.className = "records-cover-content";

  const label = text("p", "eyebrow", recordsCover.eyebrow);
  const title = text("h1", "records-title", recordsCover.title);
  title.id = "records-title";
  const intro = text("p", "records-cover-copy", recordsCover.intro);
  const date = text("p", "records-cover-date", recordsCover.dateLabel);

  content.append(label, title, intro, date);
  target.replaceChildren(backgroundFrame, content);
}

function createPhotoSticker(chapter: StoryChapter): HTMLElement {
  const photo = getPhoto(chapter.photoId);
  const figure = document.createElement("figure");
  figure.className = "story-photo";
  figure.append(image(photo));

  const tape = document.createElement("span");
  tape.className = "story-tape";
  tape.setAttribute("aria-hidden", "true");

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption;

  figure.append(tape, caption);
  return figure;
}

function createChapter(chapter: StoryChapter, index: number): HTMLElement {
  const article = document.createElement("article");
  article.className = `story-chapter layout-${chapter.layout}`;
  article.dataset.storyChapter = chapter.id;

  const sheet = document.createElement("div");
  sheet.className = "story-sheet";

  const body = document.createElement("div");
  body.className = "story-copy";

  const meta = document.createElement("div");
  meta.className = "story-meta";
  meta.append(text("span", "story-label", chapter.label), text("time", "story-date", chapter.date));

  const title = text("h2", "story-title", chapter.title);
  const paragraphs = document.createElement("div");
  paragraphs.className = "story-body";
  appendParagraphs(paragraphs, chapter.body);

  const illustration = document.createElement("span");
  illustration.className = "story-illustration";
  illustration.textContent = chapter.illustration ?? `note ${String(index + 1).padStart(2, "0")}`;

  body.append(meta, title, paragraphs, illustration);
  sheet.append(createPhotoSticker(chapter), body);
  article.append(sheet);

  return article;
}

export function renderStoryChapters(): void {
  const target = document.querySelector<HTMLElement>("[data-story-chapters]");
  if (!target) return;

  target.replaceChildren(...storyChapters.map(createChapter));
}

function createFeaturedLetter(letter: BirthdayLetter): HTMLElement {
  const section = document.createElement("div");
  section.className = "featured-letter-sheet";

  const intro = document.createElement("div");
  intro.className = "featured-letter-intro";
  const title = text("h2", "featured-letter-title", letter.title);
  title.id = "letter-title";
  intro.append(
    text("p", "eyebrow", `Letter / ${letter.date}`),
    title,
    text("p", "featured-letter-excerpt", letter.excerpt)
  );

  const paper = document.createElement("article");
  paper.className = "letter-paper-card";
  paper.append(text("span", "letter-year-stamp", String(letter.year)));

  if (letter.coverPhotoId) {
    const photo = getPhoto(letter.coverPhotoId);
    const figure = document.createElement("figure");
    figure.className = "letter-cover-photo";
    figure.append(image(photo), text("figcaption", "", photo.caption));
    paper.append(figure);
  }

  const body = document.createElement("div");
  body.className = "letter-body";
  appendParagraphs(body, letter.body);
  paper.append(body);

  section.append(intro, paper);
  return section;
}

export function renderFeaturedLetter(): void {
  const target = document.querySelector<HTMLElement>("[data-featured-letter]");
  if (!target) return;

  const featured = birthdayLetters.find((letter) => letter.status === "featured");
  if (!featured) return;

  target.replaceChildren(createFeaturedLetter(featured));
}

function createArchiveCard(letter: BirthdayLetter): HTMLElement {
  const article = document.createElement("article");
  article.className = `letter-archive-card is-${letter.status}`;

  const year = text("span", "archive-year", String(letter.year));
  const date = text("time", "archive-date", letter.date);
  const title = text("h3", "archive-title", letter.title);
  const excerpt = text("p", "archive-excerpt", letter.excerpt);
  const status = text(
    "span",
    "archive-status",
    letter.status === "featured" ? "已写入" : "待补上"
  );

  article.append(year, date, title, excerpt, status);

  if (letter.coverPhotoId) {
    const photo = getPhoto(letter.coverPhotoId);
    const figure = document.createElement("figure");
    figure.className = "archive-thumb";
    figure.append(image(photo, ""));
    article.append(figure);
  }

  return article;
}

export function renderLetterArchive(): void {
  const target = document.querySelector<HTMLElement>("[data-letter-archive]");
  if (!target) return;

  target.replaceChildren(...birthdayLetters.map(createArchiveCard));
}

export function renderRecordsPage(): void {
  renderRecordsCover();
  renderStoryChapters();
  renderFeaturedLetter();
  renderLetterArchive();
}
