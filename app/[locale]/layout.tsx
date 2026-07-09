import "../globals.css";
import Estedad from "next/font/local"
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from "next-intl/server";
import { TrpcProvider } from "@/providers/TrpcProvider";
import { isRtl } from "@/utils/i18n/isRtl";
import Navbar from "@/components/navbar/Navbar";

const estedad = Estedad({
  src: [
    {
      path: "../../public/fonts/Estedad-Regular.woff2",  // ✅ دو تا ../ برو بالا
      style: "normal",
      weight: "400"
    },
    {
      path: "../../public/fonts/Estedad-ExtraBold.woff2",  // ✅ دو تا ../
      style: "normal",
      weight: "700"
    }
  ],
  display: "swap",
  variable: "--font-estedad"
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


export default async function RootLayout({ children, params }: Props) {

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const isRTL = isRtl(locale)

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${isRTL ? estedad.className : inter.className}`}
    >
      <body className="bg-bg-dark">
        <TrpcProvider>
          <NextIntlClientProvider>
            <Navbar locale={locale} />
            {children}
          </NextIntlClientProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
