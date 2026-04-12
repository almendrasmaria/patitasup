import "./globals.css";
import { Poppins } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
