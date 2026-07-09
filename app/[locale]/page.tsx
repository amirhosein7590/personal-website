import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

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
    <>
    </>
  );
}
