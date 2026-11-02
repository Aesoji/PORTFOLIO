/* Import images/videos like this (paths relative to this file):
   import natHero from "../assets/projects/nat/hero.jpg";
   import natVideo from "../assets/projects/nat/demo.mp4";
   Then use them below, e.g.  media: { type: "image", src: natHero }
   Leave them out and grey placeholders show instead. */

export interface ProjectMedia {
    type: "image" | "video";
    src?: string;
    poster?: string;
    alt?: string;
}

export interface CaseStudyLink {
    label: string;
    href: string;
}

export interface ProjectOverview {
    organization: string;
    headline: string;
    media?: ProjectMedia;
    goal: string;
    reflection: Reflection[];
    role: string;
    timeline: string;
    skills: string[];
    caseStudies?: CaseStudyLink[];
}


export interface Reflection {
    title: string;
    text: string;
}


export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    cover?: string;
    thumbnails?: string[];
    alt?: string;
    overview: ProjectOverview;
}


export const projectHref = (project: Project) => `/projects/${project.id}`;


export const projects: Project[] = [
    
    {
        id: "igem",
        title: "GLEYECO",
        subtitle: "iGEM • UI/UX designer & Front-End Developer",
        description: "Leading the project in both its design and software engineering. Transforming complex synthetic biology research into an accessible, transparent, and user-centered experience, creating multiple products that connects the science, patients, clinicians, and stakeholders.",
        
        overview: {
            organization: "UAlberta International Genetically Engineered Machine (iGEM) Team",
            headline: "What does science communication mean?",
            media: { type: "image" },

            goal: "In an effort to propose a better solution to tackling dry eye disease, our team developed gleyeco. As their UI/UX Designer & Front-End Developer, my role was to translate an incredibly complex scientific concept into an accessible, intuitive, and transparent website that can be accessed and understood by any individual irrespective of their education background. We needed to communicate the science behind the product, explain the research and development process, and build confidence in the project's potential among very different audiences: patients, clinicians, researchers, and potential investors. This meant finding the balance between scientific accuracy and accessible communication. Through both the project’s brand identity and website, I was responsible for making the science approachable and cohesive without oversimplying it.",
            reflection: [
                { 
                    title: "Designing for understanding.",
                    text: "Scientific accuracy and accessibility don't always come together naturally. With iGEM(gleyeco), I learned how to break down complex research into digestible information without stripping away the science that makes it credible." 
                },
                { 
                    title: "Transparency is part of the user experience.",
                    text: "Communicating a product's potential also means communicating its limitations. I learned that building trust requires showing the research, rationale, and uncertainties behind the design. More importantly, I learnt to communicate with external stakeholders and clients to ensure that the design aligned with their vision and goals." 
                
                },
                { 
                    title: "You don't need to know everything, you just need to be willing to learn.",
                    text: "Working alongside a team who specialized in biology and chemistry pushed me into unfamiliar territory. I learned to ask better questions, challenge assumptions, and translate specialized knowledge into experiences people can actually understand." 
                },
            ],
      
            role: "UI/UX Designer & Front-End Developer",
            timeline: "January 2026 – December 2026 (1 Year)",
            skills: ["Figma", "React", "Procreate", "Davinci Resolve", "Affinity", "Responsive Design", "UI Design", "UI Prototyping", "Brand Identity", "Video Editing", "Marketing Research"],
            
            caseStudies: [
                { label: "see ui/ux & usability testing journey", href: "#" },
                { label: "see brand identity details", href: "#" },
            ],
        },
    },


    {
        id: "nat",
        title: "NAT REDESIGN",
        subtitle: "NAT • Product Designer",
        description: "Responsible for redesigning the website to clearly communicate the company’s missions and core values. All while juggling the many audiences that the non-profit organization serves.",
    
        overview: {
            organization: "Network for Applied Technologies (NAT)",
            headline: "How to design for a diverse ecosystem?",
            media: { type: "image" },
            
            goal: "NAT is a biotech startup that advocates for interdisciplinary innovation. Being at the intersection of science, art, design, and business, the goal of this website redesign was to better communicate NAT’s mission. With the many diverse stakeholders that NAT talks to in its network, the website is also responsible for better communicating what NAT needs from the ecosystem and what it can provide. At its core, the aspired result was a modern, accessible, and scalable platform, designed to turn interest into meaningful participation and collaboration.",
            reflection: [
                { 
                    title: "Designing for multiple people.",
                    text: "Since NAT serves people with very different motivations. I learned to think beyond a single user journey and design pathways that help each stakeholder understand where they fit and how they can contribute."
                },
                { 
                    title: "A mission is more than its catchy line.",
                    text: "Communicating NAT's vision meant making its value tangible. I learned the importance of translating broad ambitions into clear messaging, meaningful calls to action, and measurable impact."
                
                },
                { 
                    title: "A website needs to work behind the scenes, too.",
                    text: "Designing for NAT also meant considering the internal team responsible for maintaining it. I learned to think about content management, scalability, and long-term usability."                
                },
            ],
      
            role: "Product Designer",
            timeline: "January 2026 – August 2026 (7 months)",
            skills: ["Figma", "UX Research", "UI Prototyping", "Adobe Photoshop", "Interactive Design", "Responsive Design"],
            
            caseStudies: [
                { label: "see full case study", href: "#" }
            ],      
        },
    },


    {
        id: "sentimenti",
        title: "SENTIMENTI",
        subtitle: "FigBuild 2026 • Product Designer",
        description: "In a hypothetical scenario where one could measure and visualize an aspect of the human sensory experience unbeknownst to current technologies; we designed and proposed a new mobile app with a new mobile app that can track one's emotions.",
    
        overview: {
            organization: "FigBuild 2026",
            headline: "How to design realistic fiction?",
            media: { type: "image" },

            goal: "Sentimenti explores the intersection of emotional awareness and human perception through the concept of clairempathy, the ability to perceive and understand emotions through visualization. Developed during FIGBUILD 2026, the project challenged us to rethink how people recognize and respond to their emotional states. We designed a speculative emotional wellness tool that translates physiological signals, such as heart rate and stress indicators, into intuitive visual and sensory feedback. As a Product Designer, I helped shape the concept into a cohesive, high-fidelity Figma prototype, exploring how complex emotional data could become more accessible, understandable, and actionable.",
            reflection: [
                { 
                    title: "Design for something you can't always see.",
                    text: "Scientific accuracy and accessibility don't always come naturally together. I learned how to break down complex research into digestible information without stripping away the science that makes it credible." 
                },
                { 
                    title: "Less is more.",
                    text: "Visualizing physiological data challenged me to balance accuracy with simplicity. I learned that the goal isn't to show users everything, but to help them recognize what actually matters."                
                },
                { 
                    title: "Speculative design still fulfills a real world responsibility.",
                    text: "Exploring emotional data brought privacy, consent, and accessibility into the conversation. I learned that imagining new possibilities also means questioning their implications."
                
                },
            ],
                  
            role: "Product Designer",
            timeline: "82 Hours",
            skills: ["Figma", "Affinity", "UI Design", "UI Prototyping", "Brand Identity", "Video Editing", "UX Research"],
            
            caseStudies: [
                { label: "see full case study", href: "#" },
            ],
        },
    },

];