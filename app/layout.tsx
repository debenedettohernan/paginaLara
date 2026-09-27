import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Acompañar | Psicopedagogía en Bahía Blanca y online",
  description: "Un espacio de acompañamiento psicopedagógico para aprender, organizarse y encontrar próximos pasos. Atención online y presencial en Bahía Blanca.",
  keywords: ["psicopedagoga en Bahía Blanca", "atención psicopedagógica online", "acompañamiento psicopedagógico"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body><SiteShell>{children}</SiteShell></body></html>;
}
