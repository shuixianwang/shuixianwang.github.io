export type LocalDate = {
  year: number;
  month: number;
  day: number;
};

export type RelationshipDuration = {
  elapsedDays: number;
  years: number;
  months: number;
  days: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const START_DATE: LocalDate = { year: 2023, month: 9, day: 17 };
const FALLBACK_DURATION: RelationshipDuration = {
  elapsedDays: 986,
  years: 2,
  months: 8,
  days: 13,
};

function toUtcDay(date: LocalDate): number {
  return Date.UTC(date.year, date.month - 1, date.day) / DAY_MS;
}

function fromDate(date: Date): LocalDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function compareDate(a: LocalDate, b: LocalDate): number {
  return toUtcDay(a) - toUtcDay(b);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function addYears(date: LocalDate, years: number): LocalDate {
  const year = date.year + years;
  return {
    year,
    month: date.month,
    day: Math.min(date.day, daysInMonth(year, date.month)),
  };
}

function addMonths(date: LocalDate, months: number): LocalDate {
  const monthIndex = date.month - 1 + months;
  const year = date.year + Math.floor(monthIndex / 12);
  const month = ((monthIndex % 12) + 12) % 12 + 1;

  return {
    year,
    month,
    day: Math.min(date.day, daysInMonth(year, month)),
  };
}

function elapsedDaysBetween(start: LocalDate, current: LocalDate): number {
  return Math.max(0, toUtcDay(current) - toUtcDay(start));
}

export function calculateRelationshipDuration(
  currentDate: Date | LocalDate = new Date(),
  startDate: LocalDate = START_DATE
): RelationshipDuration {
  const current = currentDate instanceof Date ? fromDate(currentDate) : currentDate;

  if (compareDate(current, startDate) <= 0) {
    return { elapsedDays: 0, years: 0, months: 0, days: 0 };
  }

  let years = current.year - startDate.year;
  if (compareDate(current, addYears(startDate, years)) < 0) {
    years -= 1;
  }

  const yearCursor = addYears(startDate, years);
  let months = (current.year - yearCursor.year) * 12 + current.month - yearCursor.month;
  if (compareDate(current, addMonths(yearCursor, months)) < 0) {
    months -= 1;
  }

  const monthCursor = addMonths(yearCursor, months);
  const days = elapsedDaysBetween(monthCursor, current);

  return {
    elapsedDays: elapsedDaysBetween(startDate, current),
    years,
    months,
    days,
  };
}

function setText(root: ParentNode, selector: string, value: string): void {
  const target = root.querySelector<HTMLElement>(selector);
  if (target) {
    target.textContent = value;
  }
}

function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

function animateDayCount(target: HTMLElement, finalValue: number): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || finalValue <= 0) {
    target.textContent = String(finalValue);
    return;
  }

  const durationMs = 1100;
  const range = Math.min(180, Math.max(24, Math.round(finalValue * 0.18)));
  const startValue = Math.max(0, finalValue - range);
  const startedAt = performance.now();

  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / durationMs);
    const value = Math.round(startValue + (finalValue - startValue) * easeOutCubic(progress));
    target.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    target.textContent = String(finalValue);
  };

  target.textContent = String(startValue);
  requestAnimationFrame(tick);
}

function resolveDuration(): RelationshipDuration {
  try {
    return calculateRelationshipDuration();
  } catch {
    return FALLBACK_DURATION;
  }
}

export function initRelationshipCounter(): void {
  const counter = document.querySelector<HTMLElement>("[data-relationship-counter]");
  if (!counter) return;

  const duration = resolveDuration();
  const dayNumber = counter.querySelector<HTMLElement>("[data-counter-days]");

  counter.classList.add("is-enhanced");

  setText(counter, "[data-counter-years]", String(duration.years));
  setText(counter, "[data-counter-months]", String(duration.months));
  setText(counter, "[data-counter-remaining-days]", String(duration.days));
  setText(counter, "[data-counter-summary]", `我们已经在一起 ${duration.elapsedDays} 天`);

  if (dayNumber) {
    animateDayCount(dayNumber, duration.elapsedDays);
  }

  requestAnimationFrame(() => {
    counter.classList.add("is-ready");
  });
}
