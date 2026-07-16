import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "佳乐考研 · Jiale Graduate",
    short_name: "佳乐考研",
    description: "AI驱动的新一代考研学习平台",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F7FB",
    theme_color: "#3157D5",
    lang: "zh-CN",
    orientation: "portrait-primary",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }],
  };
}
