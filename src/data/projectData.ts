import sentimentiCover from "../assets/projects/SENTIMENTI_COVER.gif";
import sentimentiHeader from "../assets/projects/SENTIMENTI_HEADER.png";
import sentimentiTimeline from "../assets/projects/SENTIMENTI_TIMELINE.png";
import sentimentiPrototype from "../assets/projects/SENTIMENTI_PROTOTYPE.png";
import sentimentiPrototypeV2 from "../assets/projects/SENTIMENTI_PROTOTYPE_V2.png";

import natCover from "../assets/projects/NAT_COVER.png";
import natHeader from "../assets/projects/NAT_HEADER.png";
import natPersonas from "../assets/projects/NAT_PERSONAS.png";
import natUserflow from "../assets/projects/NAT_USERFLOW.png";
import natPrototype from "../assets/projects/NAT_PROTOTYPE.png";

import igemCover from "../assets/projects/IGEM_COVER.mp4";
import igemHeader from "../assets/projects/IGEM_HEADER.png";
import gleyecoBrandIdentity from "../assets/projects/GLEYECO_BRAND_IDENTITY.png";
import gleyecoBuddies from "../assets/projects/GLEYECOBUDDIES.png";
import igemNavbar from "../assets/projects/GLEYECO_NAVIGATION_BAR.mp4";
import igemPopup from "../assets/projects/GLEYECO_POP.mp4";
import igemCitations from "../assets/projects/GLEYECO_CITATIONS.mp4";


export interface ProjectMedia {
  type: "image" | "video";
  src?: string; 
  poster?: string;
  alt?: string;  
  autoplay?: boolean;
  zoom?: boolean;
}


export interface TextSection {
  title: string;
  paragraphs: string[];
}


export interface CaseStudyBlock {
  title?: string;
  paragraphs?: string[];
  media?: ProjectMedia;
  /** "side" = media beside the text (default)
      "wide" = full-width media above the text, cropped to 3:2
      "full" = full-width media, whole image shown (no cropping) */
  layout?: "side" | "wide" | "full";
}


export interface CaseStudySection {
  title?: string;
  blocks: CaseStudyBlock[];
}


export interface ProjectLink {
  label: string;
  href: string;
}


export interface ProjectOverview {
  organization: string;
  headline: string;
  links?: ProjectLink[];
  media?: ProjectMedia;  
  summaryColors?: string[];
  summary: TextSection[];
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


const HEADING = {
  roleOverview: "Role Overview",
  usabilityMethods: "Usability Testing Methods",
  reflection: "Reflection",
};


export const projects: Project[] = [
  {
    id: "igem",
    title: "GLEYECO",
    subtitle: "iGEM • Lead Front-End Developer & Lead Product Designer",
    description:
      "Leading the project in both its design and software, I was responsible for translating the complexities of synthetic biology research into an accessible and user-centered experience; creating multiple products that connect the science with stakeholders.",
    coverVideo: igemCover,
    singleImage: true,
    transparent: true,

    overview: {
      organization: "UAlberta International Genetically Engineered Machine (iGEM) Team",
      headline: "What does science communication mean?",
      links: [{ label: "see the actual site", href: "https://2026.igem.wiki/ualberta/" }],
      media: { type: "image", src: igemHeader, alt: "gleyeco website and branding", zoom: false },
      summaryColors: ["#bfc2e7", "#E1E1E1", "#f7d5d5"],

      summary: [
        {
          title: HEADING.roleOverview,
          paragraphs: [
            "In an effort to propose a better solution to tackling dry eye disease, our team developed gleyeco. As their UI/UX Designer & Front-End Developer, my role was to translate an incredibly complex scientific concept into an accessible, intuitive, and transparent website that can be accessed and understood by any individual irrespective of their education background.",
            "We needed to communicate the science behind the product, explain the research and development process, and build confidence in the project's potential among very different audiences: patients, clinicians, researchers, and potential investors.",
            "This meant finding the balance between scientific accuracy and accessible communication. Through both the project's brand identity and website, I was responsible for making the science approachable and cohesive without oversimplifying it.",
          ],
        },
        {
          title: "Usability Testing Method",
          paragraphs: [
            "Concurrent Think Aloud was used. [TO WRITE] Who took part, what tasks did they do while thinking aloud, and what did you learn?",
          ],
        },
      ],

      caseStudy: [
        {
          title: "Science Communication",
          blocks: [
            {
              title: "What is the Challenge?",
              paragraphs: [
                "[TO WRITE] This section repeated the Role Overview word for word, so it was left out. Describe the challenge in your own words here.",
              ],
            },
            {
              title: "Challenge #1",
              paragraphs: [
                "To admit, the details of our project are complex, and those without a foundational understanding of glycobiology, or even just general biology, will have a difficult time understanding the information. If our team aspires to market this project, it is our responsibility to translate the science and project details with full transparency. Effectively sharing this information with patients, clinicians, investors, and other researchers is vital to ensuring everyone knows our project's values. Though, more importantly, we needed to communicate what problem we are tackling, what our proposed solution is, and prove that gleyeco is a viable product, clear to market and safe to use.",
              ],
            },
            {
              title: "Challenge #2",
              paragraphs: [
                "Then, there is the nitty-gritty of the project. How are we developing an eye-dropper, let alone from scratch? What are the 'ingredients' and how did we fact-check the usability and safety? What are the limitations of our approach, and do they affect marketability? Our rationale in every lab decision made needs to be transparent and grounded in research, especially since our intention is to bring gleyeco beyond the lab.",
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
                "The gleyeco logo and branding are designed to be intuitive: an eye with a sparkling star embodying the pupil. More hidden is the hexagonal eye's shine. Since glycans contain hexagonal structures, the hexagon represents our glycan-based construct entering an eye. Taking inspiration from the visual language of glycans, which employs clear representative diagrams, simple shapes became the defining feature of our project's aesthetics.",
              ],
            },
            {
              title: "Colour",
              paragraphs: [
                "The heart of our branding is its deliberate colour choices. We chose a palette suited to the widest range of colour blindness conditions to allow the wiki's information to be engaged with by more people. This was critical to our goal of fostering inclusion across every part of the project.",
                "Our branding guideline was used consistently throughout the earlier stages of the project to establish our cohesive visual identity. The colour palette was selected to maintain visual consistency across our website, presentation materials, and most importantly, our gleyecobuddies. We also used a colour blindness test to evaluate the accessibility of our chosen colours and identify potential issues with colour perception. Choosing this palette was important to our team both to ensure cohesion within gleyeco's visual identity and to remain accessible to those with different forms of colour vision deficiency.",
              ],
            },
            {
              media: { type: "image", src: gleyecoBrandIdentity, alt: "gleyeco brand guideline and colour blindness test" },
              layout: "full",
            },
            {
              title: "Gleyecobuddies",
              paragraphs: [
                "The personification of our proteins made our product more digestible and appealing to general audiences. It simplifies the main concepts of our project for people without a background in biology. Each character was designed with careful consideration to show some resemblance to their real-life counterparts, whether through their physical appearance or function. The term 'gleyecobuddies' is the umbrella term for all the characters we created.",
                "Lecto is the lectin (Galectin-3) that interacts with our glycan (Core 1). As such, Lecto's design reflects the function of Galectin-3. IL-1RA and HABpep are adjacent to Galectin-3, forming the \"buddy-buddy-like\" structure as they bind together. Lecto's design mirrors its real-life counterpart extensively, embedding the binding site function into their character design.",
                "Ana is a red plus sign, the universal symbol for health and medicine. Since Ana is the therapeutic component of the project that treats inflamed cells within the eye, their character design embodies healing.",
                "Lastly, HABpep is a quirky blue rectangle inspired by their function. HABpep is responsible for retention, mitigating the loss of the drug's medicinal properties as they are washed away by tear fluid. HABpep is a sturdy embodiment of a wall, a metaphor for their function of retaining and holding strong in the eye.",
                "Our three fusion protein domains serve unique functions and work together to treat inflammation. Using symbolism and characters makes gleyeco's science more accessible. The gleyecobuddies enable us to reach and connect with audiences of all backgrounds.",
              ],
            },
            {
              media: { type: "image", src: gleyecoBuddies, alt: "The gleyecobuddies: Lecto, Ana and HABpep" },
              layout: "full",
            },
          ],
        },
        {
          title: "The Website's Features",
          blocks: [
            {
              title: "Navigation Bar",
              paragraphs: ["[TO WRITE] What does the navigation bar do, and why did you design it this way?"],
              media: { type: "video", src: igemNavbar, autoplay: true, alt: "The gleyeco website's navigation bar in use" },
            },
            {
              title: "Popup",
              paragraphs: ["[TO WRITE] What do the popups show, and how do they help people understand the science?"],
              media: { type: "video", src: igemPopup, autoplay: true, alt: "A popup explaining a term on the gleyeco website" },
            },
            {
              title: "Citations",
              paragraphs: ["[TO WRITE] How do citations work on the site, and how do they support transparency?"],
              media: { type: "video", src: igemCitations, autoplay: true, alt: "Citations being opened on the gleyeco website" },
            },
          ],
        },
        {
          title: HEADING.reflection,
          blocks: [
            {
              title: "Design for understanding, not just interaction.",
              paragraphs: [
                "Scientific accuracy and accessibility don't always come naturally together. I learned how to break down complex research into digestible information without stripping away the science that makes it credible.",
              ],
            },
            {
              title: "Transparency is part of the user experience.",
              paragraphs: [
                "Communicating a product's potential also means communicating its limitations. I learned that building trust requires showing the research, rationale, and uncertainties behind the design, not just selling the idea.",
              ],
            },
            {
              title: "You don't have to be the expert to design for experts.",
              paragraphs: [
                "Working alongside a scientific team pushed me into unfamiliar territory. I learned to ask better questions, challenge assumptions, and translate specialized knowledge into experiences people can actually understand.",
              ],
            },
            {
              paragraphs: [
                "This project fundamentally expanded my understanding of what product design can accomplish beyond the traditional scope of designing interfaces and improving usability.",
                "One of my biggest takeaways was learning how to design for understanding, not just interaction. When working with highly technical subject matter, the challenge isn't necessarily making information look appealing; it's making sure people can actually understand what they're looking at, why it matters, and how it affects them. I learned to approach content as an integral part of the user experience, treating information architecture, storytelling, and visual hierarchy as equally important design tools.",
                "I also learned the importance of designing with transparency, particularly when working in a science-driven and healthcare-adjacent space. It wasn't enough to communicate the potential benefits of gleyeco. We also needed to acknowledge the research behind our decisions, explain the limitations of our approach, and avoid making claims that hadn't yet been validated. This reinforced the importance of building trust through honest, evidence-informed communication rather than relying on persuasive visuals alone.",
                "Another significant learning experience was navigating a greenfield project with a multidisciplinary team. Working alongside people with specialized scientific knowledge pushed me to ask better questions, challenge assumptions, and become comfortable designing in unfamiliar territory. I learned that a Product Designer doesn't need to be the subject-matter expert, but does need to understand the subject well enough to translate it responsibly.",
                "Ultimately, this project taught me that good product design isn't just about making complex things easier to use; it's about making complex ideas easier to understand, evaluate, and trust. It strengthened my ability to connect research, communication, and design strategy, and showed me how thoughtful design can help bridge the gap between scientific innovation and the people it aims to serve.",
              ],
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
      "NAT is a biotech startup advocating for interdisciplinary innovation at the intersection of science, art, design, and business. Responsible for redesigning their website to improve the delivery of their mission and core values while accommodating the emerging ecosystem of diverse stakeholders to foster meaningful collaboration.",
    cover: natCover,
    singleImage: true,
    transparent: true,

    overview: {
      organization: "Network for Applied Technologies (NAT)",
      headline: "How to design for a diverse ecosystem?",
      media: { type: "image", src: natHeader, alt: "NAT website redesign", zoom: false },
      summaryColors: ["#FFC3DC", "#E1E1E1", "#FFF8DC"],

      summary: [
        {
          title: HEADING.roleOverview,
          paragraphs: [
            "NAT's website redesign was, in principle, proposed to strengthen their presence in the biotech ecosystem, fostering collaboration between various stakeholders of different backgrounds. As a Product Designer, my role involved understanding the different needs of these stakeholders and ensuring the website could communicate what we offer, and how they can contribute too. Since NAT serves a diverse network of people with very different motivations, the challenge was trying to communicate NAT's interdisciplinary vision while simultaneously maintaining stakeholder interest.",
          ],
        },
        {
          title: HEADING.usabilityMethods,
          paragraphs: [
            "Since NAT is interdisciplinary, I was required to delve into the multiple perspectives and motivations for each stakeholder group. Stakeholder Mapping helped identify the different audiences NAT needed to serve and the value each group could both contribute to and receive from the ecosystem. This method helps prioritize the main objectives of each group and how each type of stakeholder can have their own way of calling to action.",
          ],
        },
      ],

      caseStudy: [
        {
          title: "The Journey",
          blocks: [
            {
              title: "Current Pain Points",
              paragraphs: [
                "Admittedly, the interdisciplinary nature of NAT's network creates a pain point in trying to understand every type of audience member. As the team's Product Designer, it took multiple conversations with various stakeholders to gauge what each member needed, what they can do to participate, and how their expectations align with the organization's values.",
              ],
            },
            {
              media: { type: "image", src: natUserflow, alt: "NAT website navigation pain points and user flow" },
              layout: "full",
            },
            {
              paragraphs: [
                "Another pain point was communication. More specifically, translating the ambitious interdisciplinary vision into something that can be understood between the various stakeholders. Since NAT takes people from various backgrounds (STEM, art, design, and business), the website needed to clearly communicate its biotechnology and vision while balancing the jargon needed to streamline information.",
                "Finally, the website needed to accommodate NAT's internal operations. The previous website was visually appealing at the cost of maintenance from a content resource management (CRM) perspective. Therefore, content publishing, event management, and maintenance documentation became an important consideration in the redesign.",
              ],
            },
            {
              media: { type: "image", src: natPersonas, alt: "NAT stakeholder personas" },
              layout: "full",
            },
            {
              title: "Designed to Grab Attention",
              paragraphs: [
                "The website needed to capture attention while establishing a recognizable visual identity. The design therefore needed to balance visual engagement with informational clarity. While the interdisciplinary intersection offers a more expressive visual direction, the website still needed to prioritize the content and call to action initiatives. As such, capturing attention was only the first step. Visual hierarchy, content organization, and strategically placed calls to action needed to guide visitors toward meaningful engagement rather than leaving them with an impression of the organization without understanding what to do next.",
              ],
            },
            {
              media: { type: "image", src: natPrototype, alt: "NAT high-fidelity website prototype" },
              layout: "full",
            },
            {
              title: "Designed for Modularity (CRM)",
              paragraphs: [
                "NAT's growing ecosystem meant that its digital platform needed to accommodate new initiatives, partnerships, events, and content over time, which is why we considered the maintenance of the website and introduced modular content management. Rather than treating every page as a static design, we considered the ability to support reusable content structures that could be updated and expanded without requiring design or intensive development work. Thinking about the website as a scalable system rather than a collection of individual pages shifted how I approached the design, reinforcing the importance of considering not only the immediate user experience but also the people and processes responsible for sustaining it.",
              ],
            },
          ],
        },
        {
          title: HEADING.reflection,
          blocks: [
            {
              paragraphs: [
                "Being a Product Designer for NAT taught me that building for a diverse audience requires more than accommodating different types of users; it requires understanding how their individual interests can contribute to a shared ecosystem. A website can communicate an organization's mission, but that mission becomes meaningless if people do not understand said values, or do not know how to participate, collaborate, or contribute. I also learnt that good product design extends beyond what the end user sees. The internal systems, content structures, and processes supporting an experience are equally important to its long-term success. The redesign challenged me to think of a website as infrastructure, where the organization of how each piece is laid out and maintained is just as important as, if not more important than, the visual appeal.",
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
      "In a hypothetical scenario where it became possible to measure and visualize the emotions of others as well as your own, current technologies do not have a way to track it. Presenting Sentimenti, a new fictional mobile app that is designed to measure what our current senses cannot: clairempathy.",
    cover: sentimentiCover,
    singleImage: true,

    overview: {
      organization: "FigBuild 2026",
      headline: "How to design realistic fiction?",
      media: {
        type: "image",
        src: sentimentiHeader,
        alt: "Sentimenti app screens showing the app's interface and visualizations of emotional data.",
        zoom: false,
      },
      summaryColors: ["#cdc8f3", "#CECECE", "#EDEBFC"],

      summary: [
        {
          title: HEADING.roleOverview,
          paragraphs: [
            "Developed during FigBuild 2026, the project challenged us to rethink how people recognize and respond to their emotional states. Sentimenti is our solution to that question. Taking on the Product Designer role consisted of understanding a problem that did not exist in reality, but still needed to be treated with the same realism and care as real products.",
            "Knowing these caveats and pain points, I helped propose and design a mobile tracking app (that can also be connected to your watch) that measures one's emotional fluctuations throughout the day, week, and month. In addition, we also measure one's heart rate, blood pressure, and sweat. By intertwining the fictional concept of Clairempathy with reality, we strengthen the product's feasibility by synthesizing data from multiple points. Although Sentimenti is tracking something fictional, the business outcome for designing a product that tracks emotional data brought privacy, consent, and accessibility into the conversation. Overall, this role challenged the way I question what makes a design truly impactful and truly actionable.",
          ],
        },
        {
          title: HEADING.usabilityMethods,
          paragraphs: [
            "Due to the constraints of the project, a Cognitive Walkthrough was used to understand our potential audience, and a Discount Evaluation checked against Nielsen's Heuristics was used to guide design intuitiveness. Although these methods can introduce biased search patterns, the nature of this method is to force our product to undergo an onboarding process, in which we can identify usability barriers and points of confusion. In particular, it allows us to evaluate the learnability of our app by identifying gaps between user expectations and interface feedback, ultimately giving additional insight that could have been initially neglected during the design process.",
          ],
        },
      ],


      caseStudy: [
        {
          blocks: [
            {
              media: { type: "image", src: sentimentiTimeline, alt: "Sentimenti project timeline" },
              layout: "full",
            },
          ],
        },
        {
          title: "The Prototype",
          blocks: [
            {
              title: "Soft-Therapeutic Solution (Aid Not Replacement)",
              paragraphs: [
                "Sentimenti is designed for individuals that want a more intuitive way to recognize, understand, and reflect on their emotional states. More specifically, it builds around the concept of Clairempathy, which is the ability to perceive, understand, and visualize the emotions of yourself and others. Sentimenti takes advantage of the visual aspect of Clairempathy. However, admittedly, emotions are difficult to quantify as they are subjective with objective signs. Therefore, Sentimenti takes information from multiple metrics so one's emotions are not quantified through Clairempathy alone.",
              ],
            },
            {
              media: { type: "image", src: sentimentiPrototype, alt: "Sentimenti high-fidelity prototype screens" },
              layout: "full",
            },
            {
              title: "Designed for Quick Access",
              paragraphs: [
                "Sentimenti prioritizes information being quickly accessible. As such, screens are designed to show a lot of information to reduce the interaction cost. However, it is worth noting that cognitive overload due to the amount of information seen simultaneously can be overwhelming for the user. To mitigate this issue, we take advantage of colours and grouping (also known as the Gestalt principle of Proximity) to guide the user's eyes into compartmentalizing related information more easily. The design prioritizes information, but has considerations to reduce the cognitive effort required. This compromises the two major issues of disengagement because of cognitive overload and disengagement because the user finds no meaning in using our app.",
              ],
            },
            {
              title: "Designed for Trust and Safety",
              paragraphs: [
                "Sentimenti has personal emotional information, and we only learnt how insecure our app was because of our cognitive walkthroughs. An oversight as the team's Product Designer, but it only emphasizes more how important putting yourself in the shoes of a user is. Privacy and user autonomy are crucial considerations that we needed to add to our design process. Sentimenti can be used as a therapeutic assistant, but it also needs to establish trust between the user and the product.",
              ],
            },
            {
              media: { type: "image", src: sentimentiPrototypeV2, alt: "Sentimenti watch app and security screens" },
              layout: "full",
            },
          ],
        },
        {
          title: HEADING.reflection,
          blocks: [
            {
              paragraphs: [
                "Sentimenti is a fictional product with a fictitious concept. However, the principles of design and the way we approach gaps in the market for our product to address are all the same. At a fundamental level, the challenges of making a palatable mobile app still exist: understanding who we are designing for, what they need, and how the app can meaningfully serve them. It is through these principles that I have reinforced the notion that good design does not depend on the reality it is based upon, but rather the thought we put into making it feasible.",
              ],
            },
          ],
        },
      ],
    },
  },
];