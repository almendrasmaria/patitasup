"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};

const LayoutShell = ({ children }: Props) => {
  const pathname = usePathname();

  const hideLayout = pathname === "/register" || pathname === "/login" || pathname === "/perfil";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default LayoutShell;