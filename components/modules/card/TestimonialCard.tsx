import { Testimonial } from "@/constants/testimonials";
import { useTranslations } from "next-intl";
import { memo } from "react";

function TestimonialCard({ name, content }: Testimonial) {
    const t = useTranslations("HomePage");

    return (
        <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-lg h-full flex flex-col transition-all hover:border-accent-purple/50">
            <div className="flex flex-col items-start">
                <h4 className="font-semibold text-white text-base">
                    {t(name)}
                </h4>
            </div>

            <p className="mt-4 text-gray-300 text-sm leading-relaxed flex-1 italic">
                “{t(content)}”
            </p>
        </div>
    );
}

export default memo(TestimonialCard);