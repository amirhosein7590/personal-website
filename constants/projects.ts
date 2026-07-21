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
    },
    {
        type: "Projects.RestaurantPro.ProjectType",
        title: "Projects.RestaurantPro.Title",
        description: "Projects.RestaurantPro.Description",
        imageSrc: "/images/projects/resturant-pro/admin-panel.png",
        imageAlt: "Projects.RestaurantPro.ImageAlt",
        technologies: [
            "Next.js",
            "Electron",
            "Nextron",
            "TypeScript",
            "Tailwind CSS",
            "Zustand"
        ],
        viewProjectBtnText: "Projects.ViewProject"
    },
    {
        type: "Projects.Tashim.ProjectType",
        title: "Projects.Tashim.Title",
        description: "Projects.Tashim.Description",
        imageSrc: "/images/projects/tashim/admin-panel.png",
        imageAlt: "Projects.Tashim.ImageAlt",
        technologies: [
            "Next.js",
            "Electron",
            "Nextron",
            "TypeScript",
            "Tailwind CSS",
            "Redux Toolkit"
        ],
        viewProjectBtnText: "Projects.ViewProject"
    }
]