import { cn } from '@/lib/utils'
import { ConsultationStepper } from './consultationStepper'
import ConsultationForm from './consultationForm'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function Consultation({ locale }: { locale: string }) {
    const t = useTranslations("HomePage")
    return (
        <section id="reservation" className={
            cn(
                "mt-10 reservation flex flex-col border-slate-800/40 lg:px-8",
                "bg-slate-900/40 py-10 border-slate-800/40"
            )}>
            <div className="reservation__header text-center max-w-3xl mx-auto flex flex-col gap-y-5 mb-10">
                <span className="font-bold tracking-widest text-accent-purple uppercase" data-key="servicesTitle">{t("Reservation.ConsultationReserve")}</span>
            </div>

            <div className="reservation__container flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <ConsultationStepper />
                <ConsultationForm locale={locale} />
            </div>
        </section>
    )
}

export default memo(Consultation)