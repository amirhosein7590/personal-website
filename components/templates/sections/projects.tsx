import { memo } from 'react'
import { useTranslations } from 'next-intl'
import ProjectsSlider from '../slider/projectsSlider';

function Projects({ locale }: { locale: string }) {
    const t = useTranslations("HomePage");
    return (
        <section id='projects' className='projects__container bg-slate-900/40 py-10 flex flex-col border-slate-800/40 px-8 mt-10'>
            <p className="project__title text-center mb-10 font-bold tracking-widest text-accent-purple uppercase" data-key="servicesTitle">{t("Projects.MyProjectsText")}</p>
            <ProjectsSlider locale={locale} />
        </section>
    )
}

export default memo(Projects)