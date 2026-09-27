import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <header className="topbar"><div className="shell nav">
      <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">a</span><span>Acompañar<span aria-hidden="true">.</span></span></Link>
      <nav className="nav-links" aria-label="Navegación principal">
        <Link href="/#acompanamiento">Acompañamiento</Link><Link href="/#sobre-mi">Sobre mí</Link><Link href="/recursos">Recursos</Link><Link href="/contacto">Contacto</Link>
      </nav>
      <Link href="/reservar" className="nav-cta">Reservar turno</Link>
    </div></header>
    <main>{children}</main>
    <footer className="footer"><div className="shell footer-grid"><span>© 2026 Acompañar · Contenido de ejemplo pendiente de validación</span><div className="footer-links"><Link href="/privacidad">Privacidad</Link><Link href="/terminos">Términos de compra</Link><Link href="/cancelaciones">Cancelaciones</Link><Link href="/admin">Panel</Link></div></div></footer>
  </>;
}
