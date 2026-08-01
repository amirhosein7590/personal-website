import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import HeroHeader from "@/components/templates/sections/heroHeader";
import Services from "@/components/templates/sections/services";
import Projects from "@/components/templates/sections/projects";
import Tools from "@/components/templates/sections/tools";
import ColabrationProcess from "@/components/templates/sections/colaborationProcess";
import WhyWorkWithMe from "@/components/templates/sections/WhyWorkWithMe";
import Consultation from "@/components/templates/sections/consultation/consultation";

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
      <WhyWorkWithMe />
      <Consultation locale={locale} />
    </div>
  );
}
