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
  {
    id: "restaurant-glasses",
    src: "/assets/photos/10-restaurant-glasses.jpg",
    width: 1024,
    height: 768,
    alt: "餐厅里戴眼镜的近距离合照",
    caption: "餐厅里的靠近",
    orientation: "wide",
  },
  {
    id: "restaurant-chopsticks",
    src: "/assets/photos/11-restaurant-chopsticks.jpg",
    width: 768,
    height: 1024,
    alt: "餐桌前夹菜的单人照片",
    caption: "认真夹菜",
    orientation: "tall",
  },
  {
    id: "beach-kiss",
    src: "/assets/photos/12-beach-kiss.jpg",
    width: 1024,
    height: 768,
    alt: "海边亲吻的侧身照片",
    caption: "海边的风",
    orientation: "wide",
  },
  {
    id: "beach-phone",
    src: "/assets/photos/13-beach-phone.jpg",
    width: 768,
    height: 1024,
    alt: "海边沙滩上拿着手机的照片",
    caption: "沙滩自拍",
    orientation: "tall",
  },
  {
    id: "track-crossed-arms",
    src: "/assets/photos/14-track-crossed-arms.jpg",
    width: 1024,
    height: 768,
    alt: "操场上两个人抱臂合照",
    caption: "操场合照",
    orientation: "wide",
  },
  {
    id: "winter-campus",
    src: "/assets/photos/15-winter-campus.jpg",
    width: 1920,
    height: 1080,
    alt: "冬天校园里戴围巾的合照",
    caption: "冬天的校园",
    orientation: "wide",
  },
  {
    id: "mcdonalds-gifts",
    src: "/assets/photos/16-mcdonalds-gifts.jpg",
    width: 1024,
    height: 768,
    alt: "麦当劳窗边拿着礼物的合照",
    caption: "窗边礼物",
    orientation: "wide",
  },
  {
    id: "mountain-view",
    src: "/assets/photos/17-mountain-view.jpg",
    width: 1086,
    height: 724,
    alt: "山上远眺城市和湖面的合照",
    caption: "山上的风景",
    orientation: "wide",
  },
  {
    id: "race-packet-night",
    src: "/assets/photos/18-race-packet-night.jpg",
    width: 1024,
    height: 768,
    alt: "夜晚赛事领物处前的自拍",
    caption: "夜晚领物",
    orientation: "wide",
  },
  {
    id: "mirror-hug",
    src: "/assets/photos/19-mirror-hug.jpg",
    width: 768,
    height: 1024,
    alt: "室内镜子前拥抱自拍",
    caption: "镜子前抱住",
    orientation: "tall",
  },
  {
    id: "race-sunglasses",
    src: "/assets/photos/20-race-sunglasses.jpg",
    width: 768,
    height: 1024,
    alt: "赛事现场戴墨镜和奖牌的自拍",
    caption: "赛场墨镜",
    orientation: "tall",
  },
  {
    id: "race-finish-selfie",
    src: "/assets/photos/21-race-finish-selfie.jpg",
    width: 768,
    height: 1024,
    alt: "赛事结束后两个人微笑自拍",
    caption: "完赛之后",
    orientation: "tall",
  },
  {
    id: "birthday-2026-burger",
    src: "/assets/photos/22-birthday-2026-burger.jpg",
    width: 768,
    height: 1024,
    alt: "李富悦和王水先在快餐店里拿着汉堡合照",
    caption: "一起吃汉堡的日常",
    orientation: "tall",
  },
  {
    id: "birthday-2026-mirror-brush",
    src: "/assets/photos/23-birthday-2026-mirror-brush.jpg",
    width: 768,
    height: 1024,
    alt: "李富悦和王水先在浴室镜子前刷牙自拍",
    caption: "一起刷牙的日常",
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
