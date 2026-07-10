import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import HeroHeader from "@/components/templates/heroHeader";

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
    </div>
  );
}
