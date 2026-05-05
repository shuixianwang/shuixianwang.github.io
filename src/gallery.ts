type ThresholdStep = {
  threshold: number;
  trailLength: number;
};

type TrailEntry = {
  card: HTMLElement;
  index: number;
  x: number;
  y: number;
};

const thresholdSteps: ThresholdStep[] = [
  { threshold: 20, trailLength: 9 },
  { threshold: 40, trailLength: 7 },
  { threshold: 80, trailLength: 5 },
  { threshold: 140, trailLength: 5 },
  { threshold: 200, trailLength: 4 },
];

let thresholdIndex = 2;
let currentIndex = -1;
let lastPoint = { x: 0, y: 0 };
let trail: TrailEntry[] = [];

function format(value: number): string {
  return String(value).padStart(4, "0");
}

function renderCounter(counter: HTMLOutputElement | null, index: number, total: number): void {
  if (!counter) return;
  const value = `${format(index)} / ${format(total)}`;
  counter.value = value;
  counter.textContent = value;
}

function renderThreshold(thresholdValue: HTMLOutputElement | null): void {
  if (!thresholdValue) return;
  const value = format(thresholdSteps[thresholdIndex].threshold);
  thresholdValue.value = value;
  thresholdValue.textContent = value;
}

function setCard(stage: HTMLElement, card: HTMLElement, point: TrailEntry, zIndex: number): void {
  const rect = stage.getBoundingClientRect();
  const x = point.x - rect.width / 2;
  const y = point.y - rect.height / 2;

  card.style.zIndex = String(zIndex);
  card.style.opacity = "1";
  card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0.6)`;
}

function paintTrail(stage: HTMLElement, cards: HTMLElement[]): void {
  const { trailLength } = thresholdSteps[thresholdIndex];
  const visibleTrail = trail.slice(-trailLength);

  cards.forEach((card) => {
    if (!visibleTrail.some((entry) => entry.card === card)) {
      card.style.opacity = "0";
    }
  });

  visibleTrail.forEach((entry, index) => {
    setCard(stage, entry.card, entry, index + 1);
  });
}

function syncArchiveHeader(archive: HTMLElement | null): void {
  if (!archive) return;

  const rect = archive.getBoundingClientRect();
  const midpoint = window.innerHeight / 2;
  const isActive = rect.top <= midpoint && rect.bottom >= midpoint;
  document.body.classList.toggle("is-archive-active", isActive);
}

export function initCursorGallery(): void {
  const stage = document.querySelector<HTMLElement>("[data-gallery-stage]");
  const archive = document.querySelector<HTMLElement>(".archive");
  const cards = [...document.querySelectorAll<HTMLElement>(".index-card")];
  const counter = document.querySelector<HTMLOutputElement>("#archiveCounter");
  const thresholdValue = document.querySelector<HTMLOutputElement>("#thresholdValue");
  const thresholdButtons = document.querySelectorAll<HTMLButtonElement>("[data-threshold]");

  if (!stage || cards.length === 0) return;

  const galleryStage = stage;

  renderCounter(counter, 0, cards.length);
  renderThreshold(thresholdValue);

  function revealAt(clientX: number, clientY: number, force = false): void {
    const rect = galleryStage.getBoundingClientRect();
    const point = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    const isInside =
      point.x >= 0 && point.x <= rect.width && point.y >= 0 && point.y <= rect.height;
    if (!isInside) return;

    const { threshold } = thresholdSteps[thresholdIndex];
    const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
    if (!force && distance <= threshold) return;

    lastPoint = point;
    currentIndex = (currentIndex + 1) % cards.length;

    trail = [
      ...trail.filter((entry) => entry.card !== cards[currentIndex]),
      {
        card: cards[currentIndex],
        x: point.x,
        y: point.y,
        index: currentIndex,
      },
    ].slice(-cards.length);

    paintTrail(galleryStage, cards);
    renderCounter(counter, currentIndex + 1, cards.length);
  }

  galleryStage.addEventListener("pointermove", (event) => {
    revealAt(event.clientX, event.clientY);
  });

  galleryStage.addEventListener("pointerdown", (event) => {
    revealAt(event.clientX, event.clientY, true);
  });

  thresholdButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.threshold === "plus" ? 1 : -1;
      thresholdIndex = Math.max(
        0,
        Math.min(thresholdSteps.length - 1, thresholdIndex + direction)
      );

      renderThreshold(thresholdValue);
      paintTrail(galleryStage, cards);
    });
  });

  const sync = () => syncArchiveHeader(archive);
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", () => {
    paintTrail(galleryStage, cards);
    sync();
  });
  window.addEventListener("hashchange", () => window.setTimeout(sync, 80));
}
