"use client"

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '../../modules/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function HeroHeader({ locale }: { locale: string }) {
    const t = useTranslations("HomePage");
    const scrollToProjectSection = () => {
        if (window) {
            window.location.hash = ""
            window.location.hash = "#projects"
        }
    }

    const scrollToReservationSection = () => {
        if (window) {
            window.location.hash = ""
            window.location.hash = "#reservation"
        }
    }


    return (
        <section aria-labelledby="hero-title" className='hero-header__container max-w-7xl mx-auto mt-15 lg:mt-20 flex flex-col lg:flex-row lg:justify-between flex-wrap lg:flex-nowrap'>
            <div className="hero-header__main flex flex-col gap-y-5 w-full lg:w-1/2">
                <p className='lg:text-lg font-bold text-center lg:text-start'>{t("HeroHeader.DeveloperIntroduction")}</p>
                <h1 className=' text-xl lg:text-5xl leading-10 lg:leading-20 text-center lg:text-start font-bold'>
                    {t("HeroHeader.WhoIam.main")}
                    <span className='text-accent-purple text-xl lg:text-5xl text-center lg:text-start'>{t("HeroHeader.WhoIam.markedText")}</span>
                </h1>
                <p className='text-sm lg:text-[16px] text-center lg:text-start mt-4 text-gray-400'>{t("HeroHeader.WhatIDo")}</p>

                <div className="buttons-container flex flex-wrap flex-col md:flex-nowrap md:flex-row mt-5 md:mt-10 justify-center gap-x-8 items-center">
                    <Button onClick={scrollToProjectSection} className={cn(
                        "text-sm lg:text-[16px] py-3! px-8! bg-transparent border w-full mt-5 lg:mt-0 lg:w-1/2 border-white",
                        "rounded-md flex justify-center items-center cursor-pointer"
                    )}>{t("HeroHeader.Buttons.ViewProjects")}</Button>

                    <Button onClick={scrollToReservationSection} className={cn(
                        "text-sm lg:text-[16px] py-3! px-8! rounded-md flex w-full mt-5 lg:mt-0 lg:w-1/2 justify-center items-center",
                        "bg-accent-purple cursor-pointer"
                    )}>{t("HeroHeader.Buttons.StartProject")}
                        {locale == "fa" ? <ArrowLeft aria-hidden="true" className='mr-3 w-4 h-4 mt-0.5' /> : <ArrowRight aria-hidden="true" className='ml-3 w-4 h-4 mt-0.5' />}
                    </Button>
                </div>
            </div>
            <div className="hero-header__image w-full mt-7 lg:mt-0 lg:w-1/2 max-h-125">
                <Image priority fetchPriority="high" className={`w-full h-full select-none ${locale == "fa" ? "scale-x-[-1] lg:mr-20 xl:mr-25" : "lg:ml-20 xl:ml-25"}`} src="/images/hero-header-image.png" alt={locale == "fa" ? "تصویر پرتره امیرحسین غلامی توسعه‌دهنده فول استک" : "Portrait of Amirhosein Gholami, Full Stack Developer"} width={941} height={1672} />
            </div>
        </section>
    )
}

export default HeroHeader