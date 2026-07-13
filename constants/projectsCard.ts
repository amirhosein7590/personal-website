import { ProjectCardProps } from "@/components/modules/card/projectCard";

export const projectsCards: Omit<ProjectCardProps, "locale">[] = [
    {
        type: "Projects.Medad.ProjectType",
        title: "Projects.Medad.Title",
        description: "Projects.Medad.Description",
        imageSrc: "/images/projects/medad/classess-management.png",
        imageAlt: "Projects.Medad.ImageAlt",
        technologies: ["Next.js", "zustand", "tailwind", "shadcn", "axios", "redis", "mongodb"],
        link: "https://medad-dev.ir",
        viewProjectBtnText: "Projects.ViewProject"
    },
    {
        type: "Projects.SingoLearn.ProjectType",
        title: "Projects.SingoLearn.Title",
        description: "Projects.SingoLearn.Description",
        imageSrc: "/images/projects/singo-learn/home-page.png",
        imageAlt: "Projects.SingoLearn.ImageAlt",
        technologies: ["React.js", "tailwind", "axios", "framer-motion"],
        link: "https://singo-learn-server.ir",
        viewProjectBtnText: "Projects.ViewProject"
    }
]