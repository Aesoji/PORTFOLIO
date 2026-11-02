import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";


export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconType;
}


export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:kennjakea@gmail.com",
    icon: FiMail,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kennethjake/",
    icon: FaLinkedinIn,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Aesoji/",
    icon: FaGithub,
  },
];