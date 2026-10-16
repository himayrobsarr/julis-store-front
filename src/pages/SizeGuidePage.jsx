import { ArrowLeft, Baby, MessageCircle, PersonStanding, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappHref } from "../utils/whatsapp";

const babySizes = [
  { size: "T1", age: "3–6 meses", height: "63–68 cm" },
  { size: "T2", age: "6–12 meses", height: "69–80 cm" },
  { size: "T3", age: "12–18 meses", height: "81–86 cm" },
  { size: "T4", age: "18–24 meses", height: "87–92 cm" },
];

const kidsSizes = [
  { age: "2–3 años", height: "93–98 cm" },
  { age: "3–4 años", height: "99–104 cm" },
  { age: "4–5 años", height: "105–110 cm" },
  { age: "5–6 años", height: "111–116 cm" },
  { age: "6–7 años", height: "117–122 cm" },
  { age: "7–8 años", height: "123–128 cm" },
];

export default function SizeGuidePage() {
  return (
    <main className="bg-cotton">
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-sage hover:text-ink"
          to="/#catalogo"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver al catálogo
        </Link>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-card">
          <div className="grid gap-8 bg-sage/65 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Encuentra su talla</p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Guía de tallas infantil
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-ink/68">
                La edad sirve como orientación, pero la estatura del niño ofrece una referencia más precisa.
                Las medidas exactas pueden variar según el diseño y el tipo de tela.
              </p>
            </div>
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-brand shadow-card">
              <Ruler size={34} aria-hidden="true" />
            </span>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2">
            <SizeTable
              icon={<Baby size={21} aria-hidden="true" />}
              title="Bebés · T1 a T4"
              description="Equivalencias entregadas por la marca y estatura corporal orientativa."
              columns={["Talla", "Edad", "Estatura"]}
              rows={babySizes.map((item) => [item.size, item.age, item.height])}
            />
            <SizeTable
              icon={<PersonStanding size={21} aria-hidden="true" />}
              title="Niños · hasta 8 años"
              description="Continuidad orientativa por edad y estatura corporal."
              columns={["Edad", "Estatura"]}
              rows={kidsSizes.map((item) => [item.age, item.height])}
            />
          </div>

          <div className="border-t border-ink/10 p-6 sm:p-10">
            <h2 className="font-display text-3xl font-semibold text-ink">Cómo elegir mejor</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <GuideStep number="1" title="Mide su estatura" text="Con el niño de pie y sin zapatos, mide desde la cabeza hasta el piso." />
              <GuideStep number="2" title="Busca el rango" text="Compara la estatura con la tabla; úsala antes que la edad cuando no coincidan." />
              <GuideStep number="3" title="Entre dos tallas" text="Elige la talla mayor para dar espacio al movimiento y al crecimiento." />
            </div>

            <div className="mt-8 flex flex-col gap-5 rounded-[1.5rem] bg-linen p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-ink">¿Necesitas la medida exacta de una prenda?</p>
                <p className="mt-1 text-sm leading-6 text-ink/62">
                  Envíanos el nombre o la fotografía de la referencia y te ayudamos a confirmarla.
                </p>
              </div>
              <a
                className="focus-ring inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-ink"
                href={whatsappHref("Hola, necesito ayuda para elegir la talla de una prenda.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Consultar mi talla
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SizeTable({ icon, title, description, columns, rows }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-sage text-brand">{icon}</span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-ink/58">{description}</p>
        </div>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10">
        <table className="w-full border-collapse text-left">
          <thead className="bg-ink text-xs font-bold uppercase tracking-[0.12em] text-white">
            <tr>
              {columns.map((column) => <th className="px-4 py-3" scope="col" key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody className="text-sm text-ink/72">
            {rows.map((row, index) => (
              <tr className={index % 2 === 0 ? "bg-white" : "bg-linen/65"} key={row.join("-")}>
                {row.map((cell, cellIndex) => (
                  cellIndex === 0 ? (
                    <th className="px-4 py-3 font-semibold text-ink" scope="row" key={cell}>{cell}</th>
                  ) : (
                    <td className="px-4 py-3" key={cell}>{cell}</td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GuideStep({ number, title, text }) {
  return (
    <article className="rounded-[1.5rem] border border-ink/8 bg-white p-5 shadow-card">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white">{number}</span>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/62">{text}</p>
    </article>
  );
}
