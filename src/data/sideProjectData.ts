import bybnImage from "../assets/sideProjects/BYBN.png";
import amfImage from "../assets/sideProjects/AMF.png";
import kanataHubImage from "../assets/sideProjects/KANATAHUB.png";
import sparkCsImage from "../assets/sideProjects/SPARKCS.png";
import humanImage from "../assets/sideProjects/HUMAN.png";



export interface SideProject {
    src?: string;
    alt?: string;
};


export interface ProjectItem {
    id: string;
    title: string;
    description: string;
    media: SideProject;
    link?: { label: string; href: string };
}


export const sideProject: ProjectItem[] = [
    {
        id: "sideProject-01",
        title: "BYBN",
        description: "Creating a Tagalog to Baybayin Transcription software that includes the two writing variations.",
        media: { src: bybnImage, alt: "Hi"},
        link: { label: "Open", href: "https://github.com/Aesoji/BYBYN" },
    },
    {
        id: "sideProject-02",
        title: "KANATAHUB",
        description: "Hackathon Case Competition that challenged how to visualize information from an HR perspective of Canadians from different backgrounds, ethnicities, ages, and economic status. (Won 2nd Place in the UI/UX Division)",
        media: { src: kanataHubImage, alt: "Hi"},
    },
    {
        id: "sideProject-03",
        title: "SPARKCS",
        description: "Creating the brand identity and banner for the UAlberta Computer Sciences Scholarship of Pedagogy and Application of Research Knowledge Program.",
        media: { src: sparkCsImage, alt: "Hi"},
    },
    {
        id: "sideProject-04",
        title: "HUMAN",
        description: "Creating merch for fun.",
        media: { src: humanImage, alt: "Hi"},
    },
    {
        id: "sideProject-05",
        title: "AMF",
        description: "Creating a banner for advertisements for the UAlberta Advanced Microscopy Facility.",
        media: { src: amfImage, alt: "Hi"},
    },
   
]
