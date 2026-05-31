import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import AppChrome from "@/components/layout/AppChrome";
import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patitasup.vercel.app";
const siteName = "PatitasUp";
const siteDescription =
  "Conectamos mascotas rescatadas con familias listas para brindar amor. Encontrá a tu próximo mejor amigo y dale un nuevo hogar.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · Adoptá tu próximo mejor amigo`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: ["adopción de mascotas", "perros", "gatos", "refugios", "adoptar", "rescate animal"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName,
    title: `${siteName} · Adoptá tu próximo mejor amigo`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · Adoptá tu próximo mejor amigo`,
    description: siteDescription,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionProfile();
  const navUser = session
    ? { email: session.user.email ?? "", profileName: session.profileName }
    : null;

  return (
    <html lang="es">
      <body className={poppins.className}>
        <AppChrome navUser={navUser}>{children}</AppChrome>
      </body>
    </html>
  );
}
