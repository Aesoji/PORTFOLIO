import bybynVideo from "../assets/projects/BYBYN.mp4";
import bybynPoster from "../assets/projects/BYBYN_POSTER.png";


export interface GalleryMedia {
  type: "image" | "video";
  src?: string;
  poster?: string;
  alt?: string;
}


export interface GalleryItem {
  id: string;
  title: string;
  year?: string;
  description: string;
  media: GalleryMedia;
  link?: { label: string; href: string };
}


export const gallery: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "BYBN",
    year: "2025",
    description: "Tagalog to Baybayin",
    media: { type: "video", src: bybynVideo, poster: bybynPoster},
    // link: { label: "Open", href: "#" },
  },
  {
    id: "gallery-2",
    title: "KANATA HUB",
    year: "2026",
    description: "A UI case study for a speculative platform that connects Indigenous communities and organizations across Canada.",
    media: { type: "image" },
  },
  {
    id: "gallery-3",
    title: "SPARK CS",
    year: "2026",
    description: "Creating a logo for TA computer science education.",
    media: { type: "video" },
  },
  {
    id: "gallery-4",
    title: "AMF",
    year: "2026",
    description: "Creating the branding identity.",
    media: { type: "image" },
  },
];