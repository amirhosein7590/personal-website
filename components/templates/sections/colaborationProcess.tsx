import { collabrationCards } from '@/constants/collaborations'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import ColbrationCard from '../../modules/card/colaborationCard'

function ColabrationProcess() {
    const t = useTranslations("HomePage")

    return (
        <section className="bg-slate-900/40 py-16 md:py-20 border-slate-800/40 px-4 md:px-8 mt-20 md:mt-40">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-y-4">
                <span className="font-bold tracking-widest text-accent-purple uppercase text-sm">
                    {t("ColaborationProcess.ColaborationText")}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold">
                    {t("ColaborationProcess.ColaborationDescription")}
                </h2>
            </div>

            <div className="mt-16 w-full max-w-6xl mx-auto relative">
                <div className="hidden md:block absolute top-10 left-0 w-full -translate-y-1/2 border-t-2 border-dashed border-white/30 z-0"></div>

                <div className="md:hidden absolute left-1/2 top-0 h-full -translate-x-1/2 border-l-2 border-dashed border-white/30 z-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-6">
                    {collabrationCards.map((card) => (
                        <ColbrationCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default memo(ColabrationProcess)