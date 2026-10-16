import { ArrowRight, Instagram, Sparkles } from "lucide-react";
import { brand, proofPoints } from "../data/catalog";
import BrandLockup from "./BrandLockup";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cotton" id="inicio">
      <div className="absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full bg-brand/12 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-b from-sage/65 to-linen/30" />

      <div className="mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:py-16 xl:px-16">
        <div className="max-w-[640px]">
          <BrandLockup size="hero" className="mb-6" />
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-clay shadow-sm ring-1 ring-clay/15">
            <Sparkles size={14} aria-hidden="true" />
            Colección infantil
          </p>
          <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.03] text-ink sm:text-5xl lg:text-[4rem]">
            Pequeños looks para grandes momentos
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-ink/78">{brand.tagline}</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-ink/66">{brand.shortDescription}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand"
              href="#catalogo"
            >
              Explorar la colección
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/12 bg-white px-6 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand hover:bg-sage"
              href="https://www.instagram.com/julisymaju/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} aria-hidden="true" />
              Ver en Instagram
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 text-sm text-ink/68 sm:flex sm:flex-wrap">
            {proofPoints.map((item) => (
              <span className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-ink/8" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] pb-10 lg:pb-0" aria-label="Prendas destacadas de la colección">
          <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full border border-brand/25 sm:-right-6 sm:-top-6" />
          <div className="absolute -bottom-2 left-6 h-36 w-36 rounded-full bg-clay/14 blur-2xl" />

          <div className="relative ml-auto w-[82%] overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft ring-1 ring-ink/8 sm:w-[78%] sm:p-4">
            <img
              className="aspect-square w-full rounded-[2rem] bg-linen object-contain"
              src="/images/catalog/jardinera-floral-rosa-1.png"
              alt="Jardinera floral rosa de la colección Juli's & Ma&Ju"
              fetchPriority="high"
            />
            <div className="absolute bottom-7 left-7 rounded-full bg-white/92 px-4 py-2 text-sm font-bold text-ink shadow-card backdrop-blur sm:bottom-9 sm:left-9">
              Detalles que enamoran
            </div>
          </div>

          <div className="absolute -bottom-1 left-0 w-[38%] rotate-[-4deg] overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-soft ring-1 ring-ink/8 sm:w-[34%] sm:p-3">
            <img
              className="aspect-square w-full rounded-[1.35rem] bg-linen object-contain"
              src="/images/catalog/conjunto-perrito-azul.png"
              alt="Conjunto infantil azul con bordado de perrito"
            />
          </div>

          <span className="absolute right-1 top-1/2 hidden -translate-y-1/2 translate-x-1/2 rotate-90 text-xs font-bold uppercase tracking-[0.28em] text-ink/35 sm:block">
            Juli&apos;s &amp; Ma&amp;Ju
          </span>
        </div>
      </div>
    </section>
  );
}
