import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { contact } from "../data/catalog";
import { whatsappHref } from "../utils/whatsapp";

const policies = {
  changes: {
    eyebrow: "Información de compra",
    title: "Política de cambios y devoluciones",
    intro: "Queremos que cada prenda llegue en perfectas condiciones y sea la indicada para tu pequeño.",
    sections: [
      {
        title: "Cambio por talla o referencia",
        paragraphs: [
          "Puedes solicitar el cambio dentro de los 15 días calendario siguientes a la entrega de tu pedido.",
          "La prenda no debe haber sido usada ni lavada, debe conservar sus etiquetas originales y encontrarse en buen estado y en su empaque.",
          "El costo del envío del cambio lo asume el cliente. Si la talla o referencia que necesitas no está disponible, te ofrecemos otra prenda o un bono por el mismo valor.",
        ],
      },
      {
        title: "Productos con defecto de fabricación",
        paragraphs: [
          "Si tu prenda llega con un defecto de fabricación, la cambiamos o te devolvemos el dinero. El envío corre por nuestra cuenta.",
          "Escríbenos dentro de los 30 días siguientes a la entrega y adjunta una fotografía del defecto.",
        ],
      },
      {
        title: "Prendas que no tienen cambio",
        paragraphs: [
          "Por higiene, no se aceptan cambios en ropa interior ni en accesorios de contacto directo con la piel, salvo defecto de fabricación.",
          "Tampoco se aceptan cambios en productos de promociones finales marcados como venta final.",
        ],
      },
      {
        title: "Cómo solicitar un cambio",
        list: [
          `Escríbenos por WhatsApp al ${contact.whatsappDisplay} o al correo ${contact.email}.`,
          "Indícanos tu número de pedido, la prenda y el motivo del cambio.",
          "Te confirmaremos el proceso y la dirección de envío en un máximo de 2 días hábiles.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Información legal",
    title: "Política de tratamiento de datos personales",
    intro: "Esta política explica cómo Confecciones JULI'S trata y protege la información personal de sus clientes.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        paragraphs: [
          `${contact.legalName}, titular de las marcas MA&JU Ropa Infantil y JULI'S Clothes Baby.`,
          `NIT: ${contact.taxId}. Ciudad: ${contact.city}, Colombia. Correo: ${contact.email}. WhatsApp: ${contact.whatsappDisplay}.`,
        ],
      },
      {
        title: "2. Datos que recolectamos",
        paragraphs: [
          "Nombre, documento de identidad, correo electrónico, teléfono, dirección de envío y datos de facturación. Los pagos los procesa una pasarela de pago autorizada; la empresa no almacena números de tarjeta.",
        ],
      },
      {
        title: "3. Para qué usamos tus datos",
        list: [
          "Procesar, facturar y despachar tus pedidos.",
          "Gestionar cambios, garantías y servicio al cliente.",
          "Contactarte sobre el estado de tu compra.",
          "Enviarte información de nuestras colecciones y promociones, solo si lo autorizas.",
          "Cumplir obligaciones legales, contables y tributarias.",
        ],
      },
      {
        title: "4. Autorización",
        paragraphs: [
          "Al registrarte, comprar o enviarnos tus datos, autorizas de manera previa, expresa e informada su tratamiento conforme a esta política. Puedes revocar tu autorización cuando quieras, salvo que exista un deber legal o contractual de conservar la información.",
        ],
      },
      {
        title: "5. Con quién compartimos tus datos",
        paragraphs: [
          "Compartimos tus datos solamente con transportadoras, pasarelas de pago, proveedores de la plataforma web y autoridades cuando la ley lo exija. No vendemos tus datos.",
        ],
      },
      {
        title: "6. Datos de niños y adolescentes",
        paragraphs: [
          "No recolectamos datos personales de menores de edad. Nuestras compras se dirigen a padres, madres y adultos responsables.",
        ],
      },
      {
        title: "7. Tus derechos",
        list: [
          "Conocer, actualizar y rectificar tus datos.",
          "Pedir prueba de la autorización otorgada.",
          "Ser informado sobre el uso que se les ha dado.",
          "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
          "Revocar la autorización y solicitar la supresión de tus datos.",
          "Acceder gratuitamente a tus datos.",
        ],
      },
      {
        title: "8. Cómo ejercer tus derechos",
        paragraphs: [
          `Escríbenos a ${contact.email} indicando tu nombre completo, documento y la solicitud que deseas realizar.`,
          "Las consultas se responden en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles.",
        ],
      },
      {
        title: "9. Seguridad",
        paragraphs: [
          "Aplicamos medidas técnicas y administrativas razonables para proteger tu información contra pérdida, acceso o uso no autorizado.",
        ],
      },
      {
        title: "10. Vigencia",
        paragraphs: [
          "Tus datos se conservan mientras exista una relación comercial con nosotros y durante el tiempo que exija la ley. Esta política puede actualizarse; la versión vigente estará siempre disponible en esta página.",
          "Fecha de entrada en vigencia: 15 de octubre de 2026.",
        ],
      },
    ],
  },
};

export default function LegalPage({ policy }) {
  const content = policies[policy];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [policy]);

  return (
    <main className="bg-cotton">
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-sage hover:text-ink"
          to="/"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="mt-8 rounded-[2rem] border border-ink/8 bg-white p-6 shadow-card sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">{content.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink/68">{content.intro}</p>

          <div className="mt-10 grid gap-9">
            {content.sections.map((section) => (
              <section className="border-t border-ink/10 pt-7" key={section.title}>
                <h2 className="font-display text-2xl font-semibold text-ink">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p className="mt-3 text-sm leading-7 text-ink/68 sm:text-base" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm leading-7 text-ink/68 sm:text-base">
                    {section.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 rounded-[1.5rem] bg-sage/70 p-5 sm:flex-row">
            <a
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-ink"
              href={whatsappHref("Hola, tengo una consulta sobre las políticas de Juli's & Ma&Ju.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
            <a
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-brand"
              href={`mailto:${contact.email}`}
            >
              <Mail size={17} aria-hidden="true" />
              Enviar un correo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
