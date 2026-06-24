import { MessageCircle, Sparkles, Store } from "lucide-react";
import { brand } from "../data/catalog";
import { whatsappHref } from "../utils/whatsapp";

const contactMessage = "Hola, quiero informacion sobre prendas de Juli's & Maju Store.";
const wholesaleMessage = "Hola, tengo una tienda y quiero informacion del catalogo mayorista.";

export default function StorySections() {
  return (
    <>
      <section className="bg-sage/70 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold text-clay">ADN de marca</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">
              Apariencia premium, comodidad de todos los dias
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <BrandPoint
              icon={<Sparkles size={20} aria-hidden="true" />}
              title="Colores combinables"
              text="Neutros, verdes suaves, terracotas y azules apagados para armar looks completos."
            />
            <BrandPoint
              icon={<Store size={20} aria-hidden="true" />}
              title="Fabricacion local"
              text="Prendas pensadas para bebes y ninos pequenos, con siluetas comodas y textiles suaves."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="mayoristas">
        <div className="grid gap-6 rounded-lg border border-ink/10 bg-ink p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-mustard">Tiendas y emprendedores</p>
            <h2 className="mt-2 text-2xl font-semibold">Catalogo mayorista separado</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
              Por ahora la web prioriza ventas al detal. Las tiendas pueden escribir para recibir
              condiciones y disponibilidad mayorista.
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

      <section className="bg-linen py-14" id="contacto">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-clay">@{brand.handle}</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Pedido directo por WhatsApp</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink/66">
              Elige las prendas del catalogo, arma tu bolsa y envia el pedido con tallas y total
              estimado.
            </p>
          </div>
          <a
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-olive px-5 text-sm font-semibold text-white transition hover:bg-olive/90"
            href={whatsappHref(contactMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Escribir ahora
          </a>
        </div>
      </section>
    </>
  );
}

function BrandPoint({ icon, title, text }) {
  return (
    <article className="rounded-lg border border-ink/8 bg-white p-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-linen text-clay">{icon}</span>
      <h3 className="mt-4 font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/64">{text}</p>
    </article>
  );
}
