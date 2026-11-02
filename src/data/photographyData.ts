interface PhotoEntry {
  file: string;
  alt?: string;
  caption?: string;
}


export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}


const PHOTOGRAPHY_ORDER: PhotoEntry[] = [
  { file: "01.JPEG", alt: "" },
  { file: "02.JPEG", alt: "" },
  { file: "03.JPEG", alt: "" },

  { file: "04.JPEG", alt: "" },
  { file: "05.PNG", alt: "" },
  { file: "06.JPEG", alt: "" },

  { file: "07.JPEG", alt: "" },
  { file: "08.JPEG", alt: "" },
  { file: "09.JPEG", alt: "" },

  { file: "10.JPEG", alt: "" },
  { file: "11.JPEG", alt: "" },
  { file: "12.JPEG", alt: "" },
];


const OUTSIDE_ORDER: PhotoEntry[] = [
  {
    file: "10.JPEG",
    alt: "Icons for Photoshop, InDesign, Illustrator, DaVinci Resolve, Blender and Procreate",
    caption: "Contact Information.",
  },
  {
    file: "03.JPEG",
    alt: "Music player mockup",
    caption: "Songs.",
  },
  {
    file: "11.JPEG",
    alt: "Music player mockup",
    caption: "The tools I can use (so far).",
  },
  {
    file: "12.JPEG",
    alt: "Music player mockup",
    caption: "Languages.",
  },
];


const files = import.meta.glob<string>("../assets/photography/*", {
  eager: true,
  import: "default",
});


const resolve = (order: PhotoEntry[]): Photo[] =>
  order.flatMap(({ file, alt = "", caption }) => {
    const src = files[`../assets/photography/${file}`];
    if (!src) {
      if (import.meta.env.DEV) {
        console.warn(`[photos] "${file}" not found in src/assets/photography/`);
      }
      return [];
    }
    return [{ src, alt, caption }];
  });


export const photography = resolve(PHOTOGRAPHY_ORDER);
export const outside = resolve(OUTSIDE_ORDER);