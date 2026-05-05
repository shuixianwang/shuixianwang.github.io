export type GeneratedAssetId = "heroFilmGrain" | "letterPaper" | "ledGlow";

export type GeneratedAsset = {
  id: GeneratedAssetId;
  src: string;
  width: number;
  height: number;
  label: string;
};

export const generatedAssets: Record<GeneratedAssetId, GeneratedAsset> = {
  heroFilmGrain: {
    id: "heroFilmGrain",
    src: "/assets/generated/hero-film-grain.png",
    width: 1672,
    height: 941,
    label: "film grain and light leak texture",
  },
  letterPaper: {
    id: "letterPaper",
    src: "/assets/generated/letter-paper.png",
    width: 1672,
    height: 941,
    label: "soft paper and blossom shadow texture",
  },
  ledGlow: {
    id: "ledGlow",
    src: "/assets/generated/led-glow.png",
    width: 1672,
    height: 941,
    label: "red LED countdown glow texture",
  },
};

export function getGeneratedAsset(id: GeneratedAssetId): GeneratedAsset {
  return generatedAssets[id];
}
