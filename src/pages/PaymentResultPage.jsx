import { CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("id");

  return (
    <main className="mx-auto grid min-h-[66vh] max-w-2xl place-items-center px-4 py-16 text-center sm:px-6">
      <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage text-olive">
          {transactionId ? (
            <Clock size={28} aria-hidden="true" />
          ) : (
            <HelpCircle size={28} aria-hidden="true" />
          )}
        </span>
        <h1 className="mt-5 text-3xl font-semibold text-ink">
          Estamos validando tu pago
        </h1>
        <p className="mt-3 text-base leading-7 text-ink/66">
          Recibimos la redireccion de Wompi. La confirmacion final depende del webhook del
          backend, asi que no marcamos la compra como pagada ni descontamos inventario desde esta
          pantalla.
        </p>

        {transactionId ? (
          <p className="mt-4 rounded-md bg-linen px-3 py-2 text-sm font-medium text-ink/72">
            Transaccion Wompi: {transactionId}
          </p>
        ) : (
          <p className="mt-4 rounded-md bg-clay/10 px-3 py-2 text-sm font-medium text-clay">
            No encontramos el identificador de transaccion en la URL.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white"
            to="/"
          >
            <CheckCircle2 size={17} aria-hidden="true" />
            Volver a la tienda
          </Link>
          <Link
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-ink/12 bg-cotton px-5 text-sm font-semibold text-ink"
            to="/#contacto"
          >
            Contactar por WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
