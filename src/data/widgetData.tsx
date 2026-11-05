import illustratorLogo from "../assets/tools/Adobe_Illustrator.webp";
import indesignLogo from "../assets/tools/Adobe_Indesign.webp";
import photoshopLogo from "../assets/tools/Adobe_Photoshop.webp";
import affinityLogo from "../assets/tools/Affinity.webp";
import blenderLogo from "../assets/tools/Blender.webp";
import davinciLogo from "../assets/tools/DaVinci_Resolve.png";
import figmaLogo from "../assets/tools/Figma.png";
import procreateLogo from "../assets/tools/Procreate.webp";
import reactLogo from "../assets/tools/React.png";

export interface Tool {
  name: string;
  logo: string;
}

export const tools: Tool[] = [
  { name: "Adobe Photoshop", logo: photoshopLogo },
  { name: "Adobe Illustrator", logo: illustratorLogo },
  { name: "Adobe InDesign", logo: indesignLogo },
  { name: "Affinity", logo: affinityLogo },
  { name: "Blender", logo: blenderLogo },
  { name: "DaVinci Resolve", logo: davinciLogo },
  { name: "Procreate", logo: procreateLogo },
  { name: "React", logo: reactLogo },
  { name: "Figma", logo: figmaLogo },
];