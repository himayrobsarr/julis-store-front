import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { brand } from "../data/catalog";

const navItems = [
  { label: "Catalogo", href: "#catalogo" },
  { label: "Bebes", href: "#catalogo" },
  { label: "Mayoristas", href: "#mayoristas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cotton/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="focus-ring rounded-sm" href="#inicio" aria-label="Ir al inicio">
          <span className="block text-lg font-semibold leading-5 text-ink">{brand.name}</span>
          <span className="block text-xs text-ink/60">@{brand.handle}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition hover:bg-sage hover:text-ink"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="focus-ring hidden h-10 items-center gap-2 rounded-full bg-olive px-4 text-sm font-semibold text-white transition hover:bg-olive/90 sm:inline-flex"
            href="#contacto"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>
          <button
            className="focus-ring relative grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-white text-ink transition hover:border-olive"
            type="button"
            aria-label="Abrir bolsa de pedido"
            onClick={onOpenCart}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-white text-ink md:hidden"
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-ink/10 bg-cotton px-4 py-3 md:hidden" aria-label="Movil">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                className="focus-ring rounded-md px-3 py-3 text-sm font-medium text-ink/75 hover:bg-sage"
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
