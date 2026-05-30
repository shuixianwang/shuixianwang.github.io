export type StoryLayout = "photo-left" | "photo-right" | "stacked";

export type RecordsCover = {
  eyebrow: string;
  title: string;
  intro: string;
  dateLabel: string;
  backgroundPhotoId: string;
};

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

export const recordsCover: RecordsCover = {
  eyebrow: "Letters / Records",
  title: "我们的信和记录",
  intro:
    "首页留给照片和那种一下子被看见的瞬间。这一页慢慢收东西：生日要说的话、照片背后的路、日期、地点，还有之后每一次值得补上的小记录。",
  dateLabel: "Handbook / 2026.05.26",
  backgroundPhotoId: "beach-kiss",
};

export const storyChapters: StoryChapter[] = [
  {
    id: "story-01",
    label: "Story 01",
    date: "YYYY.MM.DD",
    title: "把第一张照片贴在这里",
    body: [
      "这一段先作为占位手记。之后可以写下这张照片出现的那天、走过的路、天气、心情，或者一句只有你们懂的话。",
      "保留两段文字的结构，是为了之后写长一点时仍然有舒服的阅读节奏。",
    ],
    photoId: "beach-kiss",
    illustration: "pressed flower",
    layout: "photo-left",
  },
  {
    id: "story-02",
    label: "Story 02",
    date: "YYYY.MM.DD",
    title: "一段还没写完的路",
    body: [
      "这里可以记录一段从照片开始的故事：为什么拍下、后来想起时记住了什么、还有当时没说出口的细节。",
      "小标签和便签会跟着滚动轻轻出现，像把片段一点点贴进手帐。",
    ],
    photoId: "restaurant-glasses",
    illustration: "small note",
    layout: "photo-right",
  },
  {
    id: "story-03",
    label: "Story 03",
    date: "YYYY.MM.DD",
    title: "写给某个普通晚上",
    body: [
      "这是一段夜晚、散步、吃饭或赶路都可以放进去的占位文字。",
      "如果以后有更具体的故事，只需要替换数据里的标题和段落。",
    ],
    photoId: "race-packet-night",
    illustration: "moon label",
    layout: "photo-left",
  },
  {
    id: "story-04",
    label: "Story 04",
    date: "YYYY.MM.DD",
    title: "照片背后的声音",
    body: [
      "这里可以写一张照片之外的东西：旁边的人声、手机屏幕、海风、操场、或者那天一直没有停下来的笑。",
      "章节可以承载照片，也可以承载一段很短的信。",
    ],
    photoId: "mcdonalds-gifts",
    illustration: "tape strip",
    layout: "stacked",
  },
  {
    id: "story-05",
    label: "Story 05",
    date: "YYYY.MM.DD",
    title: "留给未来补上的一页",
    body: [
      "这一页先空出来，等你把真正想写的话放进来。",
      "它会保持现在的手帐结构：照片、日期、标题、正文和一个很轻的插图记号。",
    ],
    photoId: "mountain-view",
    illustration: "route mark",
    layout: "photo-right",
  },
  {
    id: "story-06",
    label: "Story 06",
    date: "YYYY.MM.DD",
    title: "然后把信夹在后面",
    body: [
      "故事长卷的最后一页会把阅读自然带到生日信。",
      "这里不需要马上写完整内容，只要先把未来可以继续追加的框架搭好。",
    ],
    photoId: "mirror-hug",
    illustration: "paper clip",
    layout: "photo-left",
  },
];

export const birthdayLetters: BirthdayLetter[] = [
  {
    year: 2026,
    date: "2026.05.26",
    title: "水先，生日快乐。",
    status: "featured",
    excerpt: "这一封先作为 2026 年的生日信占位。等正文写好后，它会成为这一页最完整的一篇信。",
    body: [
      "这是一段生日信占位正文。之后可以把真正想说的开场放在这里，让它像夹在手帐里的长信纸一样展开。",
      "第二段可以写一段具体的回忆，或者写下这一年里最想认真保存的一个瞬间。",
      "最后一段可以留给生日当天，也可以写给以后每一年回来翻到这里的你们。",
    ],
    coverPhotoId: "restaurant-glasses",
  },
  {
    year: 2027,
    date: "2027.05.26",
    title: "下一封生日信",
    status: "reserved",
    excerpt: "这一年先占一个位置，等以后把新的生日信补上。",
    body: [],
  },
  {
    year: 2028,
    date: "2028.05.26",
    title: "继续写下去",
    status: "reserved",
    excerpt: "每一年都可以新增一张卡片，形成真正的生日信 archive。",
    body: [],
  },
];
