import { ArrowUpRight, Clock3, Instagram, Mail, MapPin, MessageCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, contact } from "../data/catalog";
import { whatsappHref } from "../utils/whatsapp";
import BrandLockup from "./BrandLockup";

const footerLinks = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Guía de tallas", href: "/guia-de-tallas" },
  { label: "Nuestra esencia", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLockup size="footer" />
          <p className="mt-5 max-w-sm font-display text-2xl font-semibold leading-tight text-white">
            {brand.tagline}
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/58">
            JULI&apos;S Clothes Baby para los más pequeños y MA&amp;JU Ropa Infantil para niños de 0 a 8 años.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Explora</p>
          <nav className="mt-4 grid gap-2" aria-label="Pie de página">
            {footerLinks.map((item) => (
              <a
                className="focus-ring w-fit rounded-sm py-1 text-sm text-white/68 transition hover:text-white"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Contacto</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <FooterDetail icon={<MapPin size={17} aria-hidden="true" />} text={contact.city} />
            <FooterDetail icon={<Truck size={17} aria-hidden="true" />} text={contact.shipping} />
            <a
              className="focus-ring flex w-fit items-center gap-2 rounded-sm transition hover:text-white"
              href={`mailto:${contact.email}`}
            >
              <Mail size={17} aria-hidden="true" />
              {contact.email}
            </a>
            <a
              className="focus-ring flex w-fit items-center gap-2 rounded-sm transition hover:text-white"
              href={whatsappHref("Hola, quiero información sobre las prendas de Juli's & Ma&Ju.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" />
              {contact.whatsappDisplay}
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Atención</p>
          <div className="mt-4 flex gap-2 text-sm leading-6 text-white/68">
            <Clock3 className="mt-1 shrink-0" size={17} aria-hidden="true" />
            <span>{contact.schedule}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/68">Pagos: {contact.paymentMethods}.</p>
          <a
            className="focus-ring mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-white/16 bg-white/8 px-4 text-sm font-semibold text-white transition hover:border-brand hover:bg-white/12"
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} aria-hidden="true" />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 text-xs text-white/45 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p>© 2026 MA&amp;JU Ropa Infantil · JULI&apos;S Clothes Baby. Todos los derechos reservados.</p>
            <p className="mt-1">{contact.legalName} · NIT {contact.taxId} · Bucaramanga, Colombia.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link className="focus-ring w-fit rounded-sm hover:text-white" to="/politica-de-cambios">
              Cambios y devoluciones
            </Link>
            <Link className="focus-ring w-fit rounded-sm hover:text-white" to="/tratamiento-de-datos">
              Tratamiento de datos
            </Link>
            <a
              className="focus-ring inline-flex w-fit items-center gap-1 rounded-sm font-semibold text-brand transition hover:text-white"
              href="https://www.instagram.com/redmoon.dev/"
              target="_blank"
              rel="noreferrer"
            >
              Desarrollado por redmoon.dev
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterDetail({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}
