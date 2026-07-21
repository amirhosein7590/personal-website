import { useTranslations } from 'next-intl'
import { toolsCard } from '@/constants/tools'
import ToolCard from '../../modules/card/toolCard'
import Marquee from '../../modules/marquee'

function Tools() {
    const t = useTranslations("HomePage")
    return (
        <section aria-labelledby="tools-conatiner" className='tools__container bg-slate-900/40 py-10 flex flex-col border-slate-800/40 px-8 mt-25 md:mt-50'>
            <div className="services__header text-center max-w-3xl mx-auto flex flex-col gap-y-5">
                <span className="font-bold tracking-widest text-accent-purple uppercase" data-key="toolsTitle">{t("Tools.ToolsText")}</span>
                <h2 className="text-lg lg:text-3xl font-extrabold" data-key="toolsHeading">{t("Tools.Solutions")}</h2>
            </div>
            <div className="tools__cards-container mt-15 relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s]">
                    {toolsCard.map((toolCard) => (
                        <ToolCard key={toolCard.name} {...toolCard} />
                    ))}
                </Marquee>

                <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 blur-xl"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-transparent blur-xl"></div>
            </div>
        </section>
    )
}

export default Tools