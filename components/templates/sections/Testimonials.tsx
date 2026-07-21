import { useTranslations } from "next-intl";
import TestimonialsSlider from "../slider/TestimonialsSlider";
import { memo } from "react";

function Testimonials() {
    const t = useTranslations("HomePage");

    return (
        <div className="w-full">
            <div className="text-center mb-10">

                <p className="text-2xl md:text-4xl font-extrabold mt-2">
                    {t("Testimonials.subtitle")}
                </p>
            </div>
            <TestimonialsSlider />
        </div>
    );
}

export default memo(Testimonials);