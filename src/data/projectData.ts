/* ============================================================
   PROJECTS — all content lives here.

   Home page card     → title, subtitle, description, cover…
   Case study page    → everything inside `overview`
                        (lives at /projects/<id>)

   Images / videos: import them at the top of this file, then use
   them as `src`. Leave `src` out and a grey placeholder shows.
     image: { type: "image", src: myImage, alt: "What it shows" }
     video: { type: "video", src: myVideo, autoplay: true }
   ============================================================ */

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

/* ---------- Types ---------- */

export interface ProjectMedia {
  type: "image" | "video";
  src?: string;
  /** Video only: still frame shown before it plays */
  poster?: string;
  /** Describes the image/video for screen readers */
  alt?: string;
  /** Video only: true = plays silently on a loop, no controls */
  autoplay?: boolean;
}

/** A titled piece of text, e.g. "Role Overview" in the summary */
export interface TextSection {
  title: string;
  paragraphs: string[];
}

/** One part of a case study section. Use any mix of title, text and media. */
export interface CaseStudyBlock {
  title?: string;
  paragraphs?: string[];
  media?: ProjectMedia;
  /** "side" = media beside the text (default)
      "wide" = full-width media above the text, cropped to 3:2
      "full" = full-width media, whole image shown (no cropping) */
  layout?: "side" | "wide" | "full";
}

/** A case study section, e.g. "The Research". The title is optional. */
export interface CaseStudySection {
  title?: string;
  blocks: CaseStudyBlock[];
}

export interface ProjectOverview {
  organization: string;
  headline: string;
  /** Big image/video under the headline (14:6) */
  media?: ProjectMedia;
  /** Gradient colours behind the summary: two or more, spread evenly
      from the top-right to the bottom-left. Leave out for the default. */
  summaryColors?: string[];
  /** Shown together on the soft gradient card under "Project Summary" */
  summary: TextSection[];
  /** The full case study, shown under the summary */
  caseStudy?: CaseStudySection[];
}

export interface Project {
  /** Unique id — also the URL: /projects/<id> */
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

/** Link to a project's case study page */
export const projectHref = (project: Project) => `/projects/${project.id}`;

/* Sections still to be written are marked [TO WRITE] — search for it to find them all */

/* ---------- Projects ---------- */

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
      media: { type: "image", src: igemHeader },
      summaryColors: ["#B7BBF4", "#F1D5A4", "#F9C0C0"],

      summary: [
        {
          title: "Project Goal",
          paragraphs: [
            "In an effort to propose a better solution to tackling dry eye disease, our team developed gleyeco, a potential alternative to current eye drop and contact lens therapeutics. As their UI/UX Designer & Front-End Developer, my role was to translate an incredibly complex scientific concept into an accessible and intuitive website that can be accessed and understood by any individual irrespective of their education background. We needed to communicate the science behind the product, explain the research and development process, and build confidence in the project's potential among a diverse audience. This meant finding the balance between scientific accuracy and accessible communication. Through both the project's brand identity and website, I was responsible for making the science approachable and cohesive without oversimplifying it.",
          ],
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
              media: { type: "image" },
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
              media: { type: "image" },
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
        {
          title: "Techniques",
          blocks: [
            {
              title: "Stakeholder Communication",
              paragraphs: ["[TO WRITE]"],
            },
            {
              title: "Storytelling & Visual Hierarchy",
              paragraphs: ["Through these design techniques, it becomes easier for people to digest rather complicated information."],
            },
          ],
        },
        {
          title: "Reflection",
          blocks: [
            {
              title: "Design for understanding, not just interaction.",
              paragraphs: ["Scientific accuracy and accessibility don't always come naturally together. I learned how to break down complex research into digestible information without stripping away the science that makes it credible."],
            },
            {
              title: "Transparency is part of the user experience.",
              paragraphs: ["Communicating a product's potential also means communicating its limitations. I learned that building trust requires showing the research, rationale, and uncertainties behind every design decision. More importantly, I learnt to communicate with external stakeholders spanning multiple disciplines, ensuring the project's goals were comprehensible to move the project forward."],
            },
            {
              title: "You don't need to know everything, you just need to be willing to learn.",
              paragraphs: ["Working alongside a team who specialized in biology and chemistry pushed me into unfamiliar territory. I learned to ask better questions, challenge assumptions, and translate specialized knowledge into experiences people can actually understand."],
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
      media: { type: "image", src: natHeader, alt: "NAT website redesign" },
      summaryColors: ["#FFC3DC", "#E1E1E1", "#FFF8DC"],

      summary: [
        {
          title: "Role Overview",
          paragraphs: [
            "NAT's website redesign was, in principle, proposed to strengthen their presence in the biotech ecosystem, fostering collaboration between various stakeholders of different backgrounds. As a Product Designer, my role involved understanding the different needs of these stakeholders and ensuring the website could communicate what we offer, and how they can contribute too. Since NAT serves a diverse network of people with very different motivations, the challenge was trying to communicate NAT's interdisciplinary vision while simultaneously maintaining stakeholder interest.",
          ],
        },
        {
          title: "Usability Testing Methods",
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
          title: "Reflection",
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
      },
      summaryColors: ["#B5AEEB", "#CECECE", "#EDEBFC"],

      summary: [
        {
          title: "Role Overview",
          paragraphs: [
            "Developed during FigBuild 2026, the project challenged us to rethink how people recognize and respond to their emotional states. Sentimenti is our solution to that question. Taking on the Product Designer role consisted of understanding a problem that did not exist in reality, but still needed to be treated with the same realism and care as real products.",
            "Knowing these caveats and pain points, I helped propose and design a mobile tracking app (that can also be connected to your watch) that measures one's emotional fluctuations throughout the day, week, and month. In addition, we also measure one's heart rate, blood pressure, and sweat. By intertwining the fictional concept of Clairempathy with reality, we strengthen the product's feasibility by synthesizing data from multiple points. Although Sentimenti is tracking something fictional, the business outcome for designing a product that tracks emotional data brought privacy, consent, and accessibility into the conversation. Overall, this role challenged the way I question what makes a design truly impactful and truly actionable.",
          ],
        },
        {
          title: "Usability Testing Methods",
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
          title: "Reflection",
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