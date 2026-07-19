import { ChartLine, MonitorSmartphone, Server, Tangent } from 'lucide-react';
import { useTranslations } from 'next-intl'
import { servicesCard, TServiceCard, Icon } from '@/constants/servicesCard';
import ServiceCard from '../modules/card/serviceCard';

type Icons = Record<Icon, React.ReactNode>

function Services() {
    const t = useTranslations("HomePage");
    const icons: Icons = {
        "MonitorSmartphone": <MonitorSmartphone className='bg-blue-500/10' />,
        "Tangent": <Tangent className='bg-purple-500/10' />,
        "Server": <Server className='bg-emerald-500/10' />,
        "ChartLine": <ChartLine className='bg-amber-500/10' />

    }
    return (
        <section aria-labelledby="services-conatiner" className='services__container bg-slate-900/40 py-10 flex flex-col border-slate-800/40 px-8 mt-25 md:mt-50'>
            <div className="services__header text-center max-w-3xl mx-auto flex flex-col gap-y-5">
                <span className="font-bold tracking-widest text-accent-purple uppercase" data-key="servicesTitle">{t("Services.MyServicesText")}</span>
                <h2 className="text-lg lg:text-3xl font-extrabold" data-key="servicesHeading">{t("Services.Solutions")}</h2>
                <p className="text-slate-400 text-sm lg:text-[16px]" data-key="servicesDesc">{t("Services.HowCanIHelpYou")}</p>
            </div>
            <article role='list' className="services__main max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesCard.map((serviceCard: TServiceCard) => {
                    const icon = icons[serviceCard.icon]
                    const color = serviceCard.color;
                    const title = t(`Services.Cards.${serviceCard.key}.Title`)
                    const description = t(`Services.Cards.${serviceCard.key}.Description`)
                    return <ServiceCard key={serviceCard.key} color={color} title={title} description={description}>{icon}</ServiceCard>
                })}
            </article>
        </section>
    )
}

export default Services