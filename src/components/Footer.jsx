import { Instagram, MessageCircle } from "lucide-react";
import { brand } from "../data/catalog";
import { whatsappHref } from "../utils/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cotton py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 text-sm text-ink/62 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-ink">{brand.name}</p>
          <p>{brand.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-ink/12 bg-white px-4 font-semibold text-ink transition hover:border-clay hover:text-clay"
            href="https://www.instagram.com/julisymaju/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} aria-hidden="true" />
            Instagram
          </a>
          <a
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-ink/12 bg-white px-4 font-semibold text-ink transition hover:border-olive hover:text-olive"
            href={whatsappHref("Hola, quiero informacion sobre Juli's & Maju Store.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
