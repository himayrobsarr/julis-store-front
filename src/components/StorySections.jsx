import { Heart, MessageCircle, Sparkles, Store } from "lucide-react";
import { brand, CATALOG_ONLY_MODE } from "../data/catalog";
import { whatsappHref } from "../utils/whatsapp";
import BrandLockup from "./BrandLockup";

const contactMessage = "Hola, quiero información sobre las prendas de Juli's & Ma&Ju.";
const wholesaleMessage = "Hola, tengo una tienda y quiero información del catálogo mayorista.";

export default function StorySections() {
  return (
    <>
      <section className="relative overflow-hidden bg-sage/70 py-20" id="nosotros">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Nuestra esencia</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-5xl">
              Dos marcas, una misma forma de celebrar la infancia
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink/68">
              Somos una empresa colombiana de confección infantil con dos marcas: JULI&apos;S
              Clothes Baby, para los más pequeños, y MA&amp;JU Ropa Infantil, de 0 a 8 años.
              Diseñamos y fabricamos prendas cómodas, duraderas y con estilo, pensadas para
              acompañar cada etapa de la infancia.
            </p>
            <BrandLockup size="story" className="mt-7" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BrandPoint
              icon={<Sparkles size={20} aria-hidden="true" />}
              title="Detalles con personalidad"
              text="Una selección visual suave y moderna para acompañar los días más especiales y los de todos los días."
            />
            <BrandPoint
              icon={<Heart size={20} aria-hidden="true" />}
              title="Pensado con cariño"
              text="Siluetas cómodas, colores amables y prendas que dejan a los pequeños moverse con libertad."
            />
            <BrandPoint
              icon={<Store size={20} aria-hidden="true" />}
              title="Catálogo en crecimiento"
              text="Estamos preparando nuevas referencias, fotografías y colecciones para mostrarlas muy pronto."
              wide
            />
          </div>
        </div>
      </section>

      {!CATALOG_ONLY_MODE ? (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="mayoristas">
          <div className="grid gap-6 rounded-[2rem] border border-ink/10 bg-ink p-7 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-mustard">Tiendas y emprendedores</p>
              <h2 className="mt-2 text-2xl font-semibold">Catálogo mayorista separado</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                Las tiendas pueden escribir para recibir condiciones y disponibilidad mayorista.
              </p>
            </div>
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition hover:bg-mustard/90"
              href={whatsappHref(wholesaleMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Soy mayorista
            </a>
          </div>
        </section>
      ) : null}

      <section className="bg-linen py-16" id="contacto">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">@{brand.handle}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              ¿Quieres conocer una prenda?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink/66">
              Escríbenos para recibir información sobre referencias, tallas y próximas colecciones.
            </p>
          </div>
          <a
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-ink"
            href={whatsappHref(contactMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Conversar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function BrandPoint({ icon, title, text, wide = false }) {
  return (
    <article className={`rounded-[1.5rem] border border-ink/8 bg-white p-6 shadow-card ${wide ? "sm:col-span-2" : ""}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-linen text-brand">{icon}</span>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/64">{text}</p>
    </article>
  );
}
