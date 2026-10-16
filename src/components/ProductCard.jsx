import { ArrowUpRight, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATALOG_ONLY_MODE } from "../data/catalog";
import { formatCurrency } from "../utils/format";
import { getInitialVariant, PRODUCT_PLACEHOLDER_IMAGE } from "../utils/products";
import { whatsappHref } from "../utils/whatsapp";

export default function ProductCard({ product, onAddToCart }) {
  const initialVariant = useMemo(() => getInitialVariant(product), [product]);
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id || "");
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) || initialVariant;
  const canAddToCart = selectedVariant?.isActive && selectedVariant.stock > 0;
  const secondaryImage = product.images?.[1];
  const displayPrice = selectedVariant?.price || product.basePrice;
  const availableSizes = product.availableSizes || [];
  const consultationDetails = [
    product.name,
    product.reference ? `ref. ${product.reference}` : "",
    product.color ? `color ${product.color}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    setSelectedVariantId(initialVariant?.id || "");
  }, [initialVariant?.id]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-soft">
      <div className="relative aspect-square overflow-hidden bg-linen">
        <Link className="relative block h-full w-full p-2" to={`/productos/${product.slug}`}>
          <img
            className="h-full w-full rounded-[1.35rem] object-contain transition duration-500 group-hover:scale-[1.025]"
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = PRODUCT_PLACEHOLDER_IMAGE;
            }}
          />
          {secondaryImage ? (
            <img
              className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-[1.35rem] object-contain opacity-0 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
              src={secondaryImage}
              alt={`Segunda vista de ${product.name}`}
              loading="lazy"
            />
          ) : null}
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-clay shadow-sm ring-1 ring-clay/12 backdrop-blur">
          {product.categoryName}
        </span>
      </div>

      <div className="grid flex-1 gap-4 p-5">
        <div>
          {product.reference ? (
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Ref. {product.reference}
            </p>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <Link
              className="focus-ring min-h-12 rounded-sm font-display text-xl font-semibold leading-6 text-ink hover:text-clay"
              to={`/productos/${product.slug}`}
            >
              {product.name}
            </Link>
            <p className="shrink-0 text-sm font-bold text-ink">
              {displayPrice ? formatCurrency(displayPrice) : "Consultar"}
            </p>
          </div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/66">
            {product.description || "Prenda infantil disponible para pedido por WhatsApp."}
          </p>
          {product.color ? (
            <p className="mt-2 text-xs font-semibold text-ink/58">Color: {product.color}</p>
          ) : null}
        </div>

        {availableSizes.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/52">
              Tallas de la referencia
            </p>
            <div className="flex flex-wrap gap-1.5">
              {availableSizes.map((size) => (
                <span
                  className="rounded-full border border-brand/18 bg-sage/55 px-2.5 py-1 text-[0.7rem] font-semibold text-ink/70"
                  key={size}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {product.variants.length > 0 ? <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-ink/72" htmlFor={`${product.id}-variant`}>
              Variante
            </label>
            <select
              className="focus-ring h-10 min-w-0 rounded-full border border-ink/14 bg-cotton px-3 text-sm text-ink"
              id={`${product.id}-variant`}
              value={selectedVariantId}
              onChange={(event) => setSelectedVariantId(event.target.value)}
              disabled={product.variants.length === 0}
            >
              {product.variants.map((variant) => (
                <option
                  value={variant.id}
                  key={variant.id}
                  disabled={!CATALOG_ONLY_MODE && (!variant.isActive || variant.stock <= 0)}
                >
                  {variant.label || "Variante"}{" "}
                  {!CATALOG_ONLY_MODE && variant.stock <= 0 ? "- Agotado" : ""}
                </option>
              ))}
            </select>
          </div>
          {!CATALOG_ONLY_MODE ? (
            <p className="text-xs leading-5 text-ink/54">
              {selectedVariant
                ? `${selectedVariant.stock} disponibles${
                    selectedVariant.sku ? ` - SKU ${selectedVariant.sku}` : ""
                  }`
                : "Sin variantes disponibles"}
            </p>
          ) : null}
        </div> : null}

        {CATALOG_ONLY_MODE ? (
          <div className="mt-auto grid grid-cols-[1fr_auto] gap-2">
            <a
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white transition hover:bg-ink"
              href={whatsappHref(`Hola, quiero información sobre ${consultationDetails}.`)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Consultar ${product.name} por WhatsApp`}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Consultar
            </a>
            <Link
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-cotton text-ink transition hover:border-brand hover:bg-sage hover:text-brand"
              to={`/productos/${product.slug}`}
              aria-label={`Ver detalles de ${product.name}`}
              title="Ver detalles"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button
            className={[
              "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition",
              canAddToCart
                ? "bg-olive text-white hover:bg-olive/90"
                : "cursor-not-allowed bg-ink/12 text-ink/42",
            ].join(" ")}
            type="button"
            disabled={!canAddToCart}
            onClick={() => onAddToCart(product, selectedVariant)}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {canAddToCart ? "Agregar" : "Agotado"}
          </button>
          <button
            className={[
              "focus-ring grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-cotton text-ink transition hover:border-clay hover:text-clay",
              canAddToCart ? "" : "cursor-not-allowed opacity-45",
            ].join(" ")}
            type="button"
            disabled={!canAddToCart}
            onClick={() => onAddToCart(product, selectedVariant)}
            aria-label={`Agregar ${product.name} a la bolsa para pedir por WhatsApp`}
          >
            <MessageCircle size={19} aria-hidden="true" />
          </button>
        </div>
        )}
      </div>
    </article>
  );
}
