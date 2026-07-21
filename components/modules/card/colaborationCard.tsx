import { CollabrationCard } from '@/constants/collaborationsCard'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function ColbrationCard({ stepNumber, title, description }: CollabrationCard) {
    const t = useTranslations("HomePage")

    return (
        <div className="flex flex-col items-center justify-start text-center w-full max-w-[200px]">
            <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-accent-purple text-accent-purple bg-slate-900 text-xl font-bold shadow-lg shadow-accent-purple/20">
                    {t(stepNumber)}
                </div>
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="text-sm md:text-base font-semibold text-white">
                    {t(title)}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 max-w-[180px] mx-auto leading-relaxed">
                    {t(description)}
                </p>
            </div>
        </div>
    )
}

export default memo(ColbrationCard)