import { getPhoto, type Photo } from "./photos";
import { birthdayLetters, type BirthdayLetter, type BirthdayLetterPhoto } from "./recordsData";

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

function createPhotoCard(letterPhoto: BirthdayLetterPhoto, index: number): HTMLElement {
  const photo = getPhoto(letterPhoto.photoId);
  const figure = document.createElement("figure");
  figure.className = `birthday-photo-card is-${letterPhoto.placement}`;

  const tape = document.createElement("span");
  tape.className = "birthday-photo-tape";
  tape.setAttribute("aria-hidden", "true");

  const marker = document.createElement("span");
  marker.className = "birthday-photo-marker";
  marker.textContent = String(index + 1).padStart(2, "0");
  marker.setAttribute("aria-hidden", "true");

  const caption = document.createElement("figcaption");
  caption.textContent = letterPhoto.caption || photo.caption;

  figure.append(tape, marker, image(photo), caption);
  return figure;
}

function createLetterPaper(letter: BirthdayLetter): HTMLElement {
  const article = document.createElement("article");
  article.className = "birthday-letter-paper";
  article.setAttribute("aria-labelledby", "birthday-letter-title");

  const stamp = text("span", "birthday-letter-stamp", String(letter.year));
  stamp.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "birthday-letter-body";

  letter.body.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    body.append(p);
  });

  article.append(stamp, body);
  return article;
}

function createDetail(letter: BirthdayLetter): HTMLElement {
  const shell = document.createElement("section");
  shell.className = "birthday-detail-shell";
  shell.setAttribute("aria-labelledby", "birthday-letter-title");

  const cover = document.createElement("header");
  cover.className = "birthday-detail-cover";

  const meta = document.createElement("p");
  meta.className = "birthday-detail-meta";
  meta.append(letter.label ?? "LETTER", " / ", letter.date);

  const title = text("h1", "birthday-detail-title", letter.title);
  title.id = "birthday-letter-title";

  const excerpt = text("p", "birthday-detail-excerpt", letter.excerpt);

  const backLink = document.createElement("a");
  backLink.className = "birthday-back-link";
  backLink.href = "/records.html#archive";
  backLink.textContent = "返回记录";

  cover.append(meta, title, excerpt, backLink);

  const stage = document.createElement("div");
  stage.className = "birthday-detail-stage";

  const photos = letter.detailPhotos ?? [];
  const openingPhoto = photos.find((photo) => photo.placement === "opening");
  const closingPhoto = photos.find((photo) => photo.placement === "closing");

  if (openingPhoto) {
    stage.append(createPhotoCard(openingPhoto, photos.indexOf(openingPhoto)));
  }

  stage.append(createLetterPaper(letter));

  if (closingPhoto) {
    stage.append(createPhotoCard(closingPhoto, photos.indexOf(closingPhoto)));
  }

  const footer = document.createElement("footer");
  footer.className = "birthday-detail-footer";

  const archiveLink = document.createElement("a");
  archiveLink.href = "/records.html#archive";
  archiveLink.textContent = "回到生日信归档";

  const recordsLink = document.createElement("a");
  recordsLink.href = "/records.html";
  recordsLink.textContent = "继续看信与记录";

  footer.append(archiveLink, recordsLink);

  shell.append(cover, stage, footer);
  return shell;
}

function createMissingState(year: number): HTMLElement {
  const section = document.createElement("section");
  section.className = "birthday-detail-shell birthday-detail-missing";

  const title = text("h1", "birthday-detail-title", "这封信还没有写入。");
  const copy = text("p", "birthday-detail-excerpt", `${year} 年的生日信暂时没有找到。`);
  const link = document.createElement("a");
  link.className = "birthday-back-link";
  link.href = "/records.html#archive";
  link.textContent = "返回记录";

  section.append(title, copy, link);
  return section;
}

export function renderBirthdayLetterPage(year = 2026): void {
  const target = document.querySelector<HTMLElement>("[data-birthday-letter-detail]");
  if (!target) return;

  const letter = birthdayLetters.find((candidate) => candidate.year === year);
  if (!letter) {
    target.replaceChildren(createMissingState(year));
    return;
  }

  document.title = `${letter.title} | 李富悦 × 王水先`;
  target.replaceChildren(createDetail(letter));
}
