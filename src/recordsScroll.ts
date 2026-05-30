function updatePastState(chapters: HTMLElement[]): void {
  const checkpoint = window.innerHeight * 0.34;

  chapters.forEach((chapter) => {
    const rect = chapter.getBoundingClientRect();
    chapter.classList.toggle("is-past", rect.bottom < checkpoint);
  });
}

function activateClosestChapter(chapters: HTMLElement[]): void {
  const center = window.innerHeight * 0.48;
  let closest: HTMLElement | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  chapters.forEach((chapter) => {
    const rect = chapter.getBoundingClientRect();
    const chapterCenter = rect.top + rect.height / 2;
    const distance = Math.abs(chapterCenter - center);

    if (rect.bottom > 0 && rect.top < window.innerHeight && distance < closestDistance) {
      closest = chapter;
      closestDistance = distance;
    }
  });

  chapters.forEach((chapter) => {
    chapter.classList.toggle("is-active", chapter === closest);
  });
}

export function initRecordsScroll(): void {
  const chapters = [...document.querySelectorAll<HTMLElement>("[data-story-chapter]")];
  if (chapters.length === 0) return;

  const sync = () => {
    updatePastState(chapters);
    activateClosestChapter(chapters);
  };

  const supportsIntersectionObserver = "IntersectionObserver" in globalThis;

  if (!supportsIntersectionObserver) {
    chapters[0]?.classList.add("is-active");
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
      sync();
    },
    {
      rootMargin: "-12% 0px -18%",
      threshold: [0.18, 0.42, 0.66],
    }
  );

  chapters.forEach((chapter) => observer.observe(chapter));
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
}
