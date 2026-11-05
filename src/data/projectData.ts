import sentimentiCover from "../assets/projects/SENTIMENTI_COVER.gif";
import sentimentiHeader from "../assets/projects/SENTIMENTI_HEADER.png";
import sentimentiTimeline from "../assets/projects/SENTIMENTI_TIMELINE.png";
import sentimentiPrototype from "../assets/projects/SENTIMENTI_PROTOTYPE.png";
import sentimentiPrototype_V2 from "../assets/projects/SENTIMENTI_PROTOTYPE_V2.png";


import natCover from "../assets/projects/NAT_COVER.png";
import natHeader from "../assets/projects/NAT_HEADER.png";
import natPersonas from "../assets/projects/NAT_PERSONAS.png";
import natUserflow from "../assets/projects/NAT_USERFLOW.png";
import natPrototype from "../assets/projects/NAT_PROTOTYPE.png";

import igemCover from "../assets/projects/IGEM_COVER.mp4";
import igemHeader from "../assets/projects/IGEM_HEADER.png";


export interface ProjectMedia {
    type: "image" | "video";
    src?: string;
    poster?: string;
    alt?: string;
    autoplay?: boolean;
}


export interface TextBlock {
    title: string;
    text: string;
}


export interface CaseStudyBlock {
    title: string;
    paragraphs: string[];
    media?: ProjectMedia;
    layout?: "side" | "wide";
}


export interface CaseStudySection {
    title: string;
    blocks: CaseStudyBlock[];
}


export interface ProjectOverview {
    organization: string;
    headline: string;
    media?: ProjectMedia;
    summaryColors?: string[];
    goal: string;
    techniques?: TextBlock[];
    reflection: TextBlock[];
    caseStudy?: CaseStudySection[];
}


export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    cover?: string;
    thumbnails?: string[];
    singleImage?: boolean;
    coverVideo?: string;
    transparent?: boolean;
    alt?: string;
    overview: ProjectOverview;
}


export const projectHref = (project: Project) => `/projects/${project.id}`;

export const projects: Project[] = [
    {
        id: "igem",
        title: "GLEYECO",
        subtitle: "iGEM • Lead Front-End Developer & Lead Product Designer",
        description: "Leading the project in both its design and software, I was responsible for translating the complexities of synthetic biology research into an accessible and user-centered experience; creating multiple products that connect the science with stakeholders.",
        coverVideo: igemCover,
        singleImage: true,
        transparent: true,

        overview: {
            organization: "UAlberta International Genetically Engineered Machine (iGEM) Team",
            headline: "What does science communication mean?",
            media: { 
                type: "image", 
                src: igemHeader, 
                autoplay: true 
            },
            summaryColors: ["#B7BBF4", "#F1D5A4", "#F9C0C0"],

            goal: "In an effort to propose a better solution to tackling dry eye disease, our team developed gleyeco. An potentially alternative solution to current eye drop and contact lens therapeutics. As their UI/UX Designer & Front-End Developer, my role was to translate an incredibly complex scientific concept into an accessible and intuitive website that can be accessed and understood by any individual irrespective of their education background. We needed to communicate the science behind the product, explain the research and development process, and build confidence in the project's potential among a diverse audience. This meant finding the balance between scientific accuracy and accessible communication. Through both the project's brand identity and website, I was responsible for making the science approachable and cohesive without oversimplifying it.",
            
            techniques: [
                {
                    title: "Stakeholder Communication",
                    text: "???",
                },
                {
                    title: "Storytelling & Visual Hierarchy",
                    text: "Through these design techniques, it becomes easier for people to digest rather complicated information.",
                },
                {
                    title: "????",
                    text: "???",
                },
            ],

            reflection: [
                {
                    title: "Design for understanding, not just interaction.",
                    text: "Scientific accuracy and accessibility don't always come naturally together. I learned how to break down complex research into digestible information without stripping away the science that makes it credible.",
                },
                {
                    title: "Transparency is part of the user experience.",
                    text: "Communicating a product's potential also means communicating its limitations. I learned that building trust requires showing the research, rationale, and uncertainties behind the every design decision. More importantly, I learnt to communicate with external stakeholders spanner multiple disciplines, ensuring the project's goals were comprehensible to move the project forward.",
                },
                {
                    title: "You don't need to know everything, you just need to be willing to learn.",
                    text: "Working alongside a team who specialized in biology and chemistry pushed me into unfamiliar territory. I learned to ask better questions, challenge assumptions, and translate specialized knowledge into experiences people can actually understand.",
                },
            ],

            caseStudy: [
                {
                    title: "The Context",
                    blocks: [
                        {
                            title: "What is iGEM?",
                            
                            paragraphs: [
                                "In the realm of synthetic biology, the International Genetically Engineered Machine (abbreviated as iGEM because that is a mouthful) is a renowned international not-for-profit organization that fosters the synthetic biology community. Their mission is to help solve real-world problems using synthetic biology through interdisciplinary education and collaboration, all with a spice of competition.",
                                "Our team decided to tackle dry eye disease; more specifically, developing and proposing a new approach to enhance an eye-dropper's specificity and retention. That means people apply eye drops less often, saving them both time and money.",
                            ],
                            
                            media: { type: "image" }
                        },
                    ],
                },
        
                {
                    title: "UI/UX & Usability Testing",
                    blocks: [
                        {
                            title: "Challenge #1: Making the science understandable",
                            
                            paragraphs: [
                                "To admit, the details of our project are complex, and those without a foundational understanding of glycobiology, or even just general biology, will have a difficult time understanding the information. If our team aspires to market this project, it is our responsibility to translate the science and project details with full transparency.",
                                "Effectively sharing this information with patients, clinicians, investors, and other researchers is vital to ensuring everyone knows our project's values. More importantly, we needed to communicate what problem we are tackling, what our proposed solution is, and prove that gleyeco is a viable product, clear to market and safe to use.",
                            ],

                            media: { type: "image" }
                        },
                    {
                    
                        title: "Challenge #2: Showing the rationale",
                        paragraphs: [
                            "Then, there is the nitty-gritty of the project. How are we developing an eye-dropper, let alone from scratch? What are the 'ingredients', and how did we fact-check the usability and safety? What are the limitations of our approach, and do they affect marketability?",
                            "Our rationale behind every lab decision needed to be transparent and grounded in research, especially since our intention is to bring gleyeco beyond the lab.",
                        ],
                        media: { type: "image" },
                        },
                        {
                        title: "The Solution",
                        paragraphs: [
                            "[TO WRITE] How does the website solve Challenges #1 and #2? Describe the key pages or features (e.g. how the science is explained, where the research and limitations are shown) and why you designed them that way.",
                        ],
                        media: { type: "image" },
                        layout: "wide",
                        },
                        {
                        title: "Usability Testing Results",
                        paragraphs: [
                            "[TO WRITE] Who did you test with (patients, clinicians, researchers?), what tasks did you give them, what did you find, and what did you change because of it?",
                        ],
                        },
                    ],
                    },
                    {
                    title: "Brand Identity",
                    blocks: [
                        {
                        title: "The Logo",
                        paragraphs: [
                            "[TO WRITE] What does the gleyeco logo represent, and how did it evolve from your first sketches?",
                        ],
                        media: { type: "image" },
                        layout: "wide",
                        },
                        {
                        title: "Colour & Typography",
                        paragraphs: [
                            "[TO WRITE] Which colours and typefaces did you choose, and how do they make the science feel approachable yet credible?",
                        ],
                        media: { type: "image" },
            },
          ],
        },
      ],
    },
  },

  {
    id: "nat",
    title: "NAT REDESIGN",
    subtitle: "NAT • Product Designer & UX Researcher",
    description:
      "Responsible for redesigning the website to clearly communicate the company's missions and core values. All while juggling the many audiences that the non-profit organization serves.",
    cover: natCover,
    singleImage: true,
    transparent: true,

    overview: {
      organization: "Network for Applied Technologies (NAT)",
      headline: "How to design for a diverse ecosystem?",
      media: { type: "image", src: natHeader,},
      summaryColors: ["#FFC3DC", "#F069A7", "#FFE98D"],

      goal: "NAT is a biotech startup that advocates for interdisciplinary innovation. Being at the intersection of science, art, design, and business, the goal of this website redesign was to better communicate NAT's mission. With the many diverse stakeholders that NAT talks to in its network, the website is also responsible for better communicating what NAT needs from the ecosystem and what it can provide. At its core, the aspired result was a modern, accessible, and scalable platform, designed to turn interest into meaningful participation and collaboration.",
      techniques: [
        {
          title: "Stakeholder mapping",
          text: "I identified the distinct groups NAT serves (industry partners, ecosystem partners, government funders, youth, and NAT's own team) and what each of them needs from the website.",
        },
        {
          title: "Audience-specific pathways",
          text: "Instead of a single user journey, I designed pathways that guide each stakeholder to the sections relevant to them, with calls to action specific to their field and what they can do.",
        },
        {
          title: "Content strategy",
          text: "I translated NAT's broad ambitions into clear messaging: what NAT does, who it serves, and the value it provides to participants, partners, and potential funders.",
        },
      ],
      reflection: [
        {
          title: "Designing for multiple people.",
          text: "Since NAT serves people with very different motivations, I learned to think beyond a single user journey and design pathways that help each stakeholder understand where they fit and how they can contribute.",
        },
        {
          title: "A mission is more than its catchy line.",
          text: "Communicating NAT's vision meant making its value tangible. I learned the importance of translating broad ambitions into clear messaging, meaningful calls to action, and measurable impact.",
        },
        {
          title: "A website needs to work behind the scenes, too.",
          text: "Designing for NAT also meant considering the internal team responsible for maintaining it. I learned to think about content management, scalability, and long-term usability.",
        },
      ],

    

      caseStudy: [
        {
          title: "The Research",
          blocks: [
            {
              title: "Current Pain Points",
              paragraphs: [
                "The redesign needed to prioritize clear communication of NAT's mission and its value. Stakeholders had to be guided to the sections relevant to them, and calls to action needed to be specific to their field and what they can do.",
                "That meant clarifying NAT's value proposition (what NAT does, who it serves, and the value it provides to participants, partners, and potential funders) and demonstrating its measurable impact. Interdisciplinary innovation is at the forefront of NAT's messaging, but the website also had to preserve its STEM foundation.",
              ],
              media: { type: "image", src: natUserflow },
            },
            {
              title: "The Perspectives",
              paragraphs: [
                "NAT's vision is to break the barriers of division and isolation, and foster an emerging ecosystem whose members can ultimately benefit from one another. The redesign had to speak to each of them: industry partners looking to fund solutions to real-world problems; NPO and ecosystem partners like accelerators and incubators interested in collaborating and exchanging resources; government and institutional funders looking to invest in innovation and see tangible outcomes; and youth interested in hackathons and workshops to grow their skills as young innovators.",
                "The website also had to serve NAT's internal team, with a manageable content publishing system, event management capabilities, and documentation to support ongoing maintenance.",
              ],
              media: { type: "image", src: natPersonas },
            },
          ],
        },
        {
          title: "",
          blocks: [
            {
              title: "What is Addressed",
              paragraphs: [
                "The end result is a modern, accessible, and mobile-friendly website that serves as both a clear introduction to what NAT is and a strategic platform to engage stakeholder interest.",
                "[TO WRITE] Walk through the key screens: how does each one address the pain points and stakeholders above?",
              ],
              media: { type: "image", src: natPrototype},
              layout: "wide",
            },
          ],
        },
        {
          title: "The Iterative Design",
          blocks: [
            {
              title: "Concurrent Think Aloud",
              paragraphs: [
                "[TO WRITE] Who took part, which tasks did they complete while thinking aloud, and what did they say or struggle with? A couple of short quotes work well here.",
              ],
            },
            {
              title: "Usability Testing Results",
              paragraphs: [
                "[TO WRITE] What were the main findings (e.g. task success, confusing sections, standout feedback), and what did you change in the design because of them?",
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "sentimenti",
    title: "SENTIMENTI",
    subtitle: "FigBuild 2026 • Product Designer",
    description:
      "In a hypothetical scenario where one could measure and visualize an aspect of the human sensory experience unbeknownst to current technologies; we designed and proposed a new mobile app that can track one's emotions.",
    cover: sentimentiCover,
    singleImage: true,

    overview: {
      organization: "FigBuild 2026",
      headline: "How to design realistic fiction?",
      media: { type: "image" , src: sentimentiHeader, alt: "Sentimenti app screens showing the app's interface and visualizations of emotional data." },
      summaryColors: ["#B5AEEB", "#CECECE", "#EDEBFC"],

      goal: "Sentimenti explores the intersection of emotional awareness and human perception through the concept of clairempathy, the ability to perceive and understand emotions through visualization. Developed during FIGBUILD 2026, the project challenged us to rethink how people recognize and respond to their emotional states. We designed a speculative emotional wellness tool that translates physiological signals, such as heart rate and stress indicators, into intuitive visual and sensory feedback. As a Product Designer, I helped shape the concept into a cohesive, high-fidelity Figma prototype, exploring how complex emotional data could become more accessible, understandable, and actionable.",
      techniques: [
        {
          title: "Speculative design",
          text: "We imagined a technology that doesn't exist yet, clairempathy, and designed it as if it were real, while questioning what it would mean for privacy, consent, and accessibility.",
        },
        {
          title: "Data visualization",
          text: "We translated physiological signals such as heart rate and stress indicators into intuitive visual and sensory feedback that people can recognize at a glance.",
        },
        {
          title: "High-fidelity prototyping",
          text: "I helped shape the concept into a cohesive, high-fidelity Figma prototype to show how complex emotional data could become accessible, understandable, and actionable.",
        },
      ],
      reflection: [
        {
          title: "Design for something you can't always see.",
          text: "Emotions are deeply personal and difficult to quantify. I learned how to translate abstract, multidimensional experiences into visual systems that feel intuitive without oversimplifying them.",
        },
        {
          title: "Less is more.",
          text: "Visualizing physiological data challenged me to balance accuracy with simplicity. I learned that the goal isn't to show users everything, but to help them recognize what actually matters.",
        },
        {
          title: "Speculative design still fulfills a real world responsibility.",
          text: "Exploring emotional data brought privacy, consent, and accessibility into the conversation. I learned that imagining new possibilities also means questioning their implications.",
        },
      ],



      caseStudy: [
        {
          title: "The Concept",
          blocks: [
            {
              title: "Clairempathy",
              paragraphs: [
                "Sentimenti is built around clairempathy: the ability to perceive and understand emotions through visualization. Emotions are deeply personal and difficult to quantify, so FIGBUILD 2026 challenged us to rethink how people recognize and respond to their emotional states.",
                "[TO WRITE] What was the exact FIGBUILD prompt, and who is Sentimenti designed for?",
              ],
              media: { type: "image", src: sentimentiTimeline},
              layout: "wide",
            },
          ],
        },
        {
          title: "",
          blocks: [
            {
              title: "The Prototype",
              paragraphs: [
                "Our speculative emotional wellness tool translates physiological signals, such as heart rate and stress indicators, into intuitive visual and sensory feedback. Rather than showing users everything, each screen focuses on helping them recognize what actually matters.",
                "[TO WRITE] Walk through the key screens of the prototype and the design decisions behind them.",
              ],
              media: { type: "image", src: sentimentiPrototype },
              layout: "wide",
            },
            {
              title: "The Prototype",
              paragraphs: [
                "Our speculative emotional wellness tool translates physiological signals, such as heart rate and stress indicators, into intuitive visual and sensory feedback. Rather than showing users everything, each screen focuses on helping them recognize what actually matters.",
                "[TO WRITE] Walk through the key screens of the prototype and the design decisions behind them.",
              ],
              media: { type: "image", src: sentimentiPrototype_V2 },
              layout: "wide",
            }
          ],
        },
      ],
    },
  },
];