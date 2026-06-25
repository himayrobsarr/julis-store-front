import { CreditCard, Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../utils/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "../utils/products";

const initialCustomer = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  shippingAddress: "",
  notes: "",
};

export default function CartDrawer({
  items,
  isOpen,
  onClose,
  onDecrease,
  onIncrease,
  onRemove,
  onCheckout,
  onPayOnline,
  checkoutState,
}) {
  const [customer, setCustomer] = useState(initialCustomer);
  const [formError, setFormError] = useState("");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isSubmitting = checkoutState.status === "loading";
  const isWhatsappLoading = isSubmitting && checkoutState.method === "whatsapp";
  const isWompiLoading = isSubmitting && checkoutState.method === "wompi";

  function updateCustomer(field, value) {
    setFormError("");
    setCustomer((currentCustomer) => ({ ...currentCustomer, [field]: value }));
  }

  function handleAction(action) {
    if (!items.length || isSubmitting) {
      return;
    }

    const cleanedCustomer = cleanCustomer(customer);
    const validationError = validateCustomer(cleanedCustomer, action);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");

    if (action === "wompi") {
      onPayOnline(cleanedCustomer);
      return;
    }

    onCheckout(cleanedCustomer);
  }

  return (
    <div className={isOpen ? "fixed inset-0 z-50" : "pointer-events-none fixed inset-0 z-50"}>
      <button
        className={[
          "absolute inset-0 bg-ink/35 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        type="button"
        aria-label="Cerrar bolsa"
        onClick={onClose}
      />
      <aside
        className={[
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cotton shadow-soft transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label="Bolsa de pedido"
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/10 px-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-ink">
              <ShoppingBag size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-ink">Bolsa de pedido</h2>
              <p className="text-sm text-ink/56">{items.length} referencias</p>
            </div>
          </div>
          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-white text-ink"
            type="button"
            aria-label="Cerrar bolsa"
            onClick={onClose}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="grid h-full min-h-72 place-items-center text-center">
                <div>
                  <p className="text-lg font-semibold text-ink">Tu bolsa esta vacia.</p>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    Agrega prendas del catalogo para armar el pedido.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map((item) => {
                  const reachedStock = item.stock > 0 && item.quantity >= item.stock;

                  return (
                    <article
                      className="grid grid-cols-[86px_1fr] gap-3 rounded-lg border border-ink/10 bg-white p-3"
                      key={item.variantId}
                    >
                      <img
                        className="h-24 w-full rounded-md object-cover"
                        src={item.image || PRODUCT_PLACEHOLDER_IMAGE}
                        alt={item.imageAlt || item.name}
                        onError={(event) => {
                          event.currentTarget.src = PRODUCT_PLACEHOLDER_IMAGE;
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold leading-5 text-ink">{item.name}</h3>
                            <p className="mt-1 text-xs text-ink/58">
                              {[item.size, item.color].filter(Boolean).join(" / ")}
                            </p>
                            {item.sku ? (
                              <p className="mt-1 text-xs text-ink/45">SKU {item.sku}</p>
                            ) : null}
                          </div>
                          <button
                            className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/54 hover:bg-linen hover:text-clay"
                            type="button"
                            aria-label={`Eliminar ${item.name}`}
                            onClick={() => onRemove(item)}
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex h-9 items-center rounded-full border border-ink/12 bg-cotton">
                            <button
                              className="focus-ring grid h-9 w-9 place-items-center rounded-full"
                              type="button"
                              aria-label={`Disminuir cantidad de ${item.name}`}
                              onClick={() => onDecrease(item)}
                            >
                              <Minus size={16} aria-hidden="true" />
                            </button>
                            <span className="grid h-9 min-w-8 place-items-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              className={[
                                "focus-ring grid h-9 w-9 place-items-center rounded-full",
                                reachedStock ? "cursor-not-allowed text-ink/30" : "",
                              ].join(" ")}
                              type="button"
                              aria-label={`Aumentar cantidad de ${item.name}`}
                              disabled={reachedStock}
                              onClick={() => onIncrease(item)}
                            >
                              <Plus size={16} aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-ink">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                        {reachedStock ? (
                          <p className="mt-2 text-xs text-clay">Stock maximo disponible.</p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {items.length > 0 ? (
              <div className="mt-5 grid gap-3 rounded-lg border border-ink/10 bg-white p-4">
                <h3 className="font-semibold text-ink">Datos para el pedido</h3>
                <CheckoutInput
                  label="Nombre"
                  value={customer.customerName}
                  onChange={(value) => updateCustomer("customerName", value)}
                  required
                />
                <CheckoutInput
                  label="Telefono"
                  value={customer.customerPhone}
                  onChange={(value) => updateCustomer("customerPhone", value)}
                  required
                />
                <CheckoutInput
                  label="Correo"
                  type="email"
                  value={customer.customerEmail}
                  onChange={(value) => updateCustomer("customerEmail", value)}
                  helpText="Obligatorio para pagar con Wompi."
                />
                <CheckoutInput
                  label="Direccion"
                  value={customer.shippingAddress}
                  onChange={(value) => updateCustomer("shippingAddress", value)}
                />
                <label className="grid gap-1 text-sm font-medium text-ink/72">
                  Notas
                  <textarea
                    className="focus-ring min-h-20 rounded-lg border border-ink/12 bg-cotton px-3 py-2 text-sm text-ink"
                    value={customer.notes}
                    onChange={(event) => updateCustomer("notes", event.target.value)}
                    placeholder="Color alternativo, horario de entrega, etc."
                  />
                </label>
                {formError || checkoutState.message ? (
                  <p
                    className={[
                      "rounded-md px-3 py-2 text-sm",
                      formError || checkoutState.status === "error"
                        ? "bg-clay/10 text-clay"
                        : "bg-sage text-ink",
                    ].join(" ")}
                  >
                    {formError || checkoutState.message}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="border-t border-ink/10 bg-white p-5">
            <div className="flex items-center justify-between text-base font-semibold text-ink">
              <span>Total estimado</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-ink/52">
              El valor final del envio se confirma por WhatsApp o al generar la guia.
            </p>
            <div className="mt-4 grid gap-2">
              <button
                className={[
                  "focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
                  items.length && !isSubmitting
                    ? "bg-olive text-white hover:bg-olive/90"
                    : "cursor-not-allowed bg-ink/12 text-ink/42",
                ].join(" ")}
                type="button"
                disabled={!items.length || isSubmitting}
                onClick={() => handleAction("wompi")}
              >
                <CreditCard size={18} aria-hidden="true" />
                {isWompiLoading ? "Abriendo Wompi..." : "Pagar online"}
              </button>
              <button
                className={[
                  "focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition",
                  items.length && !isSubmitting
                    ? "border-ink/12 bg-cotton text-ink hover:border-olive"
                    : "cursor-not-allowed border-transparent bg-ink/8 text-ink/42",
                ].join(" ")}
                type="button"
                disabled={!items.length || isSubmitting}
                onClick={() => handleAction("whatsapp")}
              >
                <Send size={18} aria-hidden="true" />
                {isWhatsappLoading ? "Creando pedido..." : "Comprar por WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CheckoutInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  helpText = "",
}) {
  return (
    <label className="grid gap-1 text-sm font-medium text-ink/72">
      {label}
      <input
        className="focus-ring h-10 rounded-full border border-ink/12 bg-cotton px-3 text-sm text-ink"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
      {helpText ? <span className="text-xs font-normal text-ink/48">{helpText}</span> : null}
    </label>
  );
}

function validateCustomer(customer, action) {
  if (!customer.customerName) {
    return "Escribe el nombre del cliente.";
  }

  if (!customer.customerPhone) {
    return "Escribe un telefono de contacto.";
  }

  if (!isValidPhone(customer.customerPhone)) {
    return "Revisa el telefono. Debe tener al menos 7 digitos.";
  }

  if (!customer.shippingAddress) {
    return "Escribe la direccion de entrega.";
  }

  if (customer.customerEmail && !isValidEmail(customer.customerEmail)) {
    return "Revisa el correo electronico.";
  }

  if (action === "wompi" && !customer.customerEmail) {
    return "Para pagar con Wompi necesitas un correo valido.";
  }

  return "";
}

function cleanCustomer(customer) {
  return Object.fromEntries(
    Object.entries(customer).map(([key, value]) => [key, String(value || "").trim()]),
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  return value.replace(/\D/g, "").length >= 7;
}
