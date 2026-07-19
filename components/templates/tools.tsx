import { useTranslations } from 'next-intl'
import { toolsCard } from '@/constants/toolsCard'
import ToolCard from '../modules/card/toolCard'

function Tools() {
    const t = useTranslations("HomePage")
    return (
        <section aria-labelledby="tools-conatiner" className='tools__container bg-slate-900/40 py-10 flex flex-col border-slate-800/40 px-8 mt-25 md:mt-50 mb-100'>
            <div className="services__header text-center max-w-3xl mx-auto flex flex-col gap-y-5">
                <span className="font-bold tracking-widest text-accent-purple uppercase" data-key="toolsTitle">{t("Tools.ToolsText")}</span>
                <h2 className="text-lg lg:text-3xl font-extrabold" data-key="toolsHeading">{t("Tools.Solutions")}</h2>
            </div>
            <div className="tools__cards-container mt-15 flex gap-x-5 pr-5 justify-center animate-[infinite-scroll-x_10s_linear_infinite] md:animate-none">
                {toolsCard.map(toolCard => (
                    <ToolCard key={toolCard.name} icon={toolCard.icon} name={toolCard.name} />
                ))}
            </div>
        </section>
    )
}

export default Tools