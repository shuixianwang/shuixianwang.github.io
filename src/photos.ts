export type PhotoOrientation = "wide" | "tall";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  orientation: PhotoOrientation;
};

export const photos: Photo[] = [
  {
    id: "day-001-scoreboard",
    src: "/assets/photos/06-day-001-scoreboard.jpg",
    width: 1086,
    height: 724,
    alt: "李富悦和王水先站在 001 天倒计时牌旁",
    caption: "高考倒计时旁边",
    orientation: "wide",
  },
  {
    id: "school-market",
    src: "/assets/photos/07-school-market.jpg",
    width: 768,
    height: 1024,
    alt: "穿校服在便利店自拍",
    caption: "便利店的购物篮",
    orientation: "tall",
  },
  {
    id: "night-market",
    src: "/assets/photos/03-night-market.jpg",
    width: 1024,
    height: 768,
    alt: "李富悦和王水先在夜市摊位前自拍",
    caption: "夜市的灯",
    orientation: "wide",
  },
  {
    id: "room-selfie",
    src: "/assets/photos/01-room-selfie.jpg",
    width: 768,
    height: 1024,
    alt: "室内近距离自拍",
    caption: "室内的一张靠近",
    orientation: "tall",
  },
  {
    id: "night-walk",
    src: "/assets/photos/08-night-walk.jpg",
    width: 1024,
    height: 768,
    alt: "夜晚树下散步自拍",
    caption: "夜晚散步",
    orientation: "wide",
  },
  {
    id: "sun-hats",
    src: "/assets/photos/02-sun-hats.jpg",
    width: 768,
    height: 1024,
    alt: "晴天户外戴帽子的合照",
    caption: "海边的帽子",
    orientation: "tall",
  },
  {
    id: "hotpot-peace",
    src: "/assets/photos/05-hotpot-peace.jpg",
    width: 1024,
    height: 768,
    alt: "火锅店里两个人比剪刀手合照",
    caption: "火锅店的剪刀手",
    orientation: "wide",
  },
  {
    id: "spring-branches",
    src: "/assets/photos/09-spring-branches.jpg",
    width: 1024,
    height: 768,
    alt: "春天花枝下的仰拍合照",
    caption: "春天抬头",
    orientation: "wide",
  },
  {
    id: "neon-closeup",
    src: "/assets/photos/04-neon-closeup.jpg",
    width: 768,
    height: 1024,
    alt: "夜市霓虹下的近距离自拍",
    caption: "镜片里的霓虹",
    orientation: "tall",
  },
];

export const heroPhotoIds = {
  backdrop: "spring-branches",
  floats: ["room-selfie", "sun-hats", "neon-closeup"],
  marquee: ["night-market", "sun-hats", "room-selfie"],
} as const;

export function getPhoto(id: string): Photo {
  const photo = photos.find((candidate) => candidate.id === id);
  if (!photo) {
    throw new Error(`Unknown photo id: ${id}`);
  }

  return photo;
}
