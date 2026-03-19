/** Card item: title, meta, image (required), optional video for overlay/card media, optional link (e.g. to work page) */
export type GalleryCardItem = {
  title: string;
  meta: string;
  image: string;
  video?: string;
  href?: string;
};

/** Gallery tab – assets from public/Gallery/ */
export const galleryItems: GalleryCardItem[] = [
  { title: "Roga", meta: "Finance", image: "/Gallery/Roga.png", href: "/design-gallery/roga" },
  { title: "AI Chat Auto Fill", meta: "Chat Prompt", image: "/Gallery/ai-chat.png" },
  { title: "Root Task Table", meta: "Databases", image: "/Gallery/root-task-table.png" },
  { title: "Polar Systems", meta: " Cyber Security", image: "/Gallery/Polar-Systems%2003.png", href: "/design-gallery/polar-systems" },
  { title: "Valentia", meta: "Dashboard", image: "/Gallery/Valentia/Valentia2.png", href: "/design-gallery/valentia" },
  { title: "Eva", meta: "Config Management", image: "/Gallery/Eva.mp4", video: "/Gallery/Eva.mp4", href: "/design-gallery/eva" },
  { title: "Luna", meta: "Code Editor", image: "/Gallery/luna.mp4", video: "/Gallery/luna.mp4" },
  { title: "Code Editor", meta: "Software Dev", image: "/Gallery/code-editor.jpeg" },
  { title: "GRN - Wallet Balance", meta: "Finance", image: "/Gallery/grn.jpeg" },
  { title: "Balance Chart", meta: "Animation", image: "/Gallery/balance-chart.mp4", video: "/Gallery/balance-chart.mp4" },
  { title: "Node Menu", meta: "Navigation", image: "/Gallery/node-menu.mp4", video: "/Gallery/node-menu.mp4" },
  { title: "Integration Manual", meta: "Documentation", image: "/Gallery/integration-manual.mp4", video: "/Gallery/integration-manual.mp4" },
];

/** Design tab – images from public/Work/; href links to work project page */
export const designItems: GalleryCardItem[] = [
  { title: "Dribbble", meta: "More Designs", image: "/Work/Dribbble.png", href: "https://dribbble.com/atencium-ui" },
  { title: "Korn Ferry", meta: "Design", image: "/Work/KornFerry/korn-ferry.png", href: "/work/korn-ferry" },
  { title: "MCM", meta: "Design", image: "/Work/MCM.avif", href: "/work/mcm" },
  { title: "Novo", meta: "Design", image: "/Work/Novo.avif", href: "/work/novo" },
  { title: "SLAI", meta: "Design", image: "/Work/SLAI.avif", href: "/work/slai" },
  { title: "The Trade Desk", meta: "Design", image: "/Work/TheTradeDesk/theTradedesk.webp", href: "/work/the-trade-desk" },
];

/** Development tab – assets from public/DevProjects/; href = external link (no overlay) */
export const developmentItems: GalleryCardItem[] = [
  { title: "StarTracker", meta: "Interactive 3D satellite tracker", image: "/DevProjects/0kOADLLCp3Pc6tZDpMfC2Z1H3Q.avif", href: "https://startracker.app/" },
  { title: "LuminosJP", meta: "Japanese Study Assistant", image: "/DevProjects/0O5LO5dmIfiZVzgBnuuXlbZHEU.webp", href: "https://luminos-jp.vercel.app/" },
  { title: "Pomodash", meta: "Pomodoro time tracker", image: "/DevProjects/y6uSycd7e8u2Bvc9EXBTZugNI.avif", href: "https://pomodash.app/" },
];
