import { useTranslations } from "next-intl"
import React from "react"
import { FeatureItem } from "@/constants/workWithMe"

function WorkWithMeCard({ icon, iconBg, featureKey }: FeatureItem) {
    const t = useTranslations("HomePage")
    return (
        <div
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col gap-3 group"
        >
            <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center border ${iconBg}`}
            >
                {icon}
            </div>
            <div className="flex flex-col gap-y-1">
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-accent-blue transition-colors duration-300">
                    {t(`WhyWorkWithMe.Cards.${featureKey}.Title`)}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                    {t(`WhyWorkWithMe.Cards.${featureKey}.Description`)}
                </p>
            </div>
        </div>
    )
}

export default React.memo(WorkWithMeCard)