import ProjectCard from "../../components/projectCard/projectCard";
import SideProject from "../../components/sideProjects/sideProjects";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projectData";
import "./home.css";

export default function Home() {
    const revealRef = useScrollReveal<HTMLElement>();

    return (
        <main className="home" ref={revealRef}>
            
            <section id="intro" className="home_intro" aria-label="Introduction">
                <h1 className="home_intro_name">It's the story that gives design life.</h1>
                <p className="home_intro_tagline">- Kenneth Jake Agonoy</p>
            </section>
            
            <section id="projects" className="home_projects" aria-label="Projects">
                {projects.map((project, index) => ( 
                    <ProjectCard key={project.id} project={project} reversed={index % 2 == 1}/>
                ))}
            </section>

            <SideProject />

        </main>
    )
}