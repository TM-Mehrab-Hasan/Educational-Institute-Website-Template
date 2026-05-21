import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LanguageProvider } from "@/lib/LanguageContext";
import { NoticesProvider } from "@/lib/NoticesContext";
import { GuardianAuthProvider } from "@/lib/GuardianAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Model School & College | Excellence in Education",
  description: "Official website of Demo Model School & College, Dhaka, Bangladesh. Providing quality education since 1995.",
  icons: {
    icon: [
      { url: '/images/logo.png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png' },
    ],
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-gray-50 text-gray-900"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>
            <NoticesProvider>
              <GuardianAuthProvider>
                <Topbar />
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
              </GuardianAuthProvider>
            </NoticesProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
