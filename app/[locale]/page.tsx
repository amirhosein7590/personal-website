import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import HeroHeader from "@/components/templates/sections/heroHeader";
import Services from "@/components/templates/sections/services";
import Projects from "@/components/templates/sections/projects";
import Tools from "@/components/templates/sections/tools";
import ColabrationProcess from "@/components/templates/sections/colaborationProcess";
import Testimonials from "@/components/templates/sections/Testimonials";
import Reservation from "@/components/templates/sections/Reservation";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}



export default function Home({ params }: Props) {
  const { locale } = use(params)
  setRequestLocale(locale);
  return (
    <div className="wrapper flex flex-col">
      <HeroHeader locale={locale} />
      <Services />
      <Projects locale={locale} />
      <Tools />
      <ColabrationProcess />

      <div id="reservation" className="w-full px-4 py-16 flex flex-col md:flex-row md:jusify-between md:py-24 border bg-slate-900/40 border-slate-800/40 mt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Start Testimonials Section */}
          <Testimonials />
          {/* End Testimonials Section */}
          <div className="h-full rounded-2xl">
            {/* Start Reservation Section */}
            <Reservation locale={locale} />
            {/* End Reservation Section */}
          </div>
        </div>
      </div>
    </div>
  );
}
