import illustratorLogo from "../assets/tools/Adobe_Illustrator.webp";
import indesignLogo from "../assets/tools/Adobe_Indesign.webp";
import photoshopLogo from "../assets/tools/Adobe_Photoshop.webp";
import affinityLogo from "../assets/tools/Affinity.webp";
import blenderLogo from "../assets/tools/Blender.webp";
import davinciLogo from "../assets/tools/Davinci_Resolve.png";
import figmaLogo from "../assets/tools/Figma.png";
import procreateLogo from "../assets/tools/Procreate.webp";
import reactLogo from "../assets/tools/React.png";

export interface Tool {
    name: string;
    logo: string; 
}

export const tools: Tool[] = [ 
    { name: "Adobe_Photoshop.", logo: photoshopLogo },
    { name: "Adobe_Illustrator", logo: illustratorLogo },
    { name: "Adobe_Indesign", logo: indesignLogo },
    { name: "Affinity", logo: affinityLogo },
    { name: "Blender", logo: blenderLogo },
    { name: "Figma", logo: figmaLogo },
    { name: "Procreate", logo: procreateLogo },
    { name: "Davinci_Resolve", logo: davinciLogo },
    { name: "React", logo: reactLogo },
];

