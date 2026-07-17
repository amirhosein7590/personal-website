"use client"


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { projectsCards } from '@/constants/projectsCard';
import ProjectCard from '../modules/card/projectCard'
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
                nextEl: '.swiper-navigation__next-btn',
                prevEl: ".swiper-navigation__prev-btn",
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
            <div className="swiper-navigation__next-btn hidden md:block cursor-pointer absolute top-1/2 right-5 z-100">
                <ChevronRight className='text-blue-600' />
            </div>
            <div className="swiper-navigation__prev-btn hidden md:block cursor-pointer text-white absolute top-1/2 z-100 left-5">
                <ChevronLeft className='text-blue-600' />
            </div>

        </Swiper>
    )
}

export default memo(ProjectsSlider)