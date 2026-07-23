"use client"


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { projectsCards } from '@/constants/projects';
import ProjectCard from '../../modules/card/projectCard'
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectsSlider({ locale }: { locale: string }) {
    const t = useTranslations("HomePage")
    return (
        <Swiper
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1.25,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                },
                1440: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={{
                nextEl: '.projects-next',
                prevEl: ".projects-prev",
                enabled: true
            }}
            modules={[Navigation]}
            className="w-full mx-auto relative"
        >
            {projectsCards.map(projectCard => (
                <SwiperSlide key={projectCard.title} className="h-auto flex">
                    <ProjectCard className="h-full w-full" viewProjectBtnText={t(projectCard.viewProjectBtnText)} locale={locale} title={t(projectCard.title)} description={t(projectCard.description)} imageAlt={t(projectCard.imageAlt || "")} link={projectCard.link} technologies={projectCard.technologies} type={t(projectCard.type)} imageSrc={projectCard.imageSrc} />
                </SwiperSlide>
            ))}
            <div className="projects-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 cursor-pointer bg-slate-800 p-2 rounded-full border border-slate-700 hidden md:flex items-center justify-center transition">
                <ChevronLeft className="text-accent-purple" size={24} />
            </div>
            <div className="projects-next absolute top-1/2 right-0 -translate-y-1/2 z-10 cursor-pointer bg-slate-800 p-2 rounded-full border border-slate-700 hidden md:flex items-center justify-center transition">
                <ChevronRight className="text-accent-purple" size={24} />
            </div>

        </Swiper>
    )
}

export default memo(ProjectsSlider)