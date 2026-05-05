import { getPhoto, heroPhotoIds, photos, type Photo } from "./photos";

function image(photo: Photo, alt = photo.alt): HTMLImageElement {
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = alt;
  img.width = photo.width;
  img.height = photo.height;
  return img;
}

export function renderHeroBackdrop(): void {
  const target = document.querySelector<HTMLElement>("[data-hero-backdrop]");
  if (!target) return;

  target.append(image(getPhoto(heroPhotoIds.backdrop), ""));
}

export function renderHeroFloats(): void {
  const target = document.querySelector<HTMLElement>("[data-hero-floats]");
  if (!target) return;

  heroPhotoIds.floats.forEach((id, index) => {
    const figure = document.createElement("figure");
    figure.className = `float-photo float-photo-${String.fromCharCode(97 + index)}`;
    figure.append(image(getPhoto(id)));
    target.append(figure);
  });
}

export function renderHeroMarquee(): void {
  const target = document.querySelector<HTMLElement>("[data-hero-marquee]");
  if (!target) return;

  const group = [
    { type: "text", value: "When ordinary days" },
    { type: "image", value: heroPhotoIds.marquee[0] },
    { type: "text", value: "become our love log" },
    { type: "image", value: heroPhotoIds.marquee[1] },
  ];

  Array.from({ length: 3 }).forEach(() => {
    group.forEach((item) => {
      if (item.type === "text") {
        const text = document.createElement("span");
        text.textContent = item.value;
        target.append(text);
        return;
      }

      const thumb = document.createElement("span");
      thumb.className = "marquee-thumb";
      thumb.append(image(getPhoto(item.value), ""));
      target.append(thumb);
    });
  });
}

export function renderGallery(): void {
  const target = document.querySelector<HTMLElement>("[data-gallery-stage]");
  if (!target) return;

  photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = `index-card card-${photo.orientation}`;
    figure.dataset.index = String(index + 1);
    figure.dataset.caption = photo.caption;

    const caption = document.createElement("figcaption");
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(4, "0");
    caption.append(number, photo.caption);

    figure.append(image(photo), caption);
    target.append(figure);
  });
}
