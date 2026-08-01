import { useTranslations } from "next-intl";
import { memo } from "react";
import { features } from "@/constants/workWithMe";
import WorkWithMeCard from "@/components/modules/card/WorkWithMeCard";

function WhyWorkWithMe() {
    const t = useTranslations("HomePage");

    return (
        <section className="why-work-with-me w-full bg-slate-900/40 border-slate-800/40 lg:px-8 py-10 mx-auto mt-10 flex flex-col justify-between h-full space-y-6">
            <div className="why-work-with-me__container max-w-10/12 mx-auto">
                <div className="why-work-with-me__header flex flex-col items-center gap-y-4 text-right">
                    <span className="font-bold tracking-widest text-accent-purple uppercase">
                        {t("WhyWorkWithMe.Badge")}
                    </span>
                    <h2 className="text-xl lg:text-3xl font-extrabold text-foreground">
                        {t("WhyWorkWithMe.Title")}
                    </h2>
                    <p className="text-slate-400 text-xs lg:text-sm leading-relaxed max-w-xl">
                        {t("WhyWorkWithMe.Subtitle")}
                    </p>
                </div>

                <div className="mt-7 why-work-with-me__cards-container grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((item) => (
                        <WorkWithMeCard {...item} key={item.featureKey} featureKey={item.featureKey} />
                    ))}
                </div>
            </div>

        </section>
    );
}

export default memo(WhyWorkWithMe);