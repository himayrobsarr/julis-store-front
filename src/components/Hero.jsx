import { ArrowRight, MessageCircle } from "lucide-react";
import { brand, proofPoints } from "../data/catalog";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden" id="inicio">
      <img
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src="/images/hero-babywear.jpg"
        alt="Ropa infantil en tonos neutros sobre perchero de madera"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cotton via-cotton/78 to-cotton/10" />
      <div className="mx-auto flex min-h-[470px] max-w-7xl items-center px-4 py-16 sm:px-6 md:min-h-[530px] lg:px-8">
        <div className="max-w-xl hero-copy-shadow">
          <p className="mb-3 inline-flex rounded-full bg-white/75 px-3 py-1 text-sm font-semibold text-clay ring-1 ring-clay/18">
            Ropa infantil con produccion propia
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-8 text-ink/78">{brand.tagline}</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-ink/70">{brand.shortDescription}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-clay"
              href="#catalogo"
            >
              Ver catalogo
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/18 bg-white/82 px-5 text-sm font-semibold text-ink transition hover:border-olive hover:bg-sage"
              href="#contacto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Comprar por WhatsApp
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 text-sm text-ink/70 sm:flex sm:flex-wrap">
            {proofPoints.map((item) => (
              <span className="rounded-full bg-white/70 px-3 py-2 ring-1 ring-ink/8" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
