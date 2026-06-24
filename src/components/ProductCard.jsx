import { MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";
import { getInitialVariant, PRODUCT_PLACEHOLDER_IMAGE } from "../utils/products";

export default function ProductCard({ product, onAddToCart }) {
  const initialVariant = useMemo(() => getInitialVariant(product), [product]);
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id || "");
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) || initialVariant;
  const canAddToCart = selectedVariant?.isActive && selectedVariant.stock > 0;

  useEffect(() => {
    setSelectedVariantId(initialVariant?.id || "");
  }, [initialVariant?.id]);

  return (
    <article className="group overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <Link className="block h-full w-full" to={`/productos/${product.slug}`}>
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = PRODUCT_PLACEHOLDER_IMAGE;
            }}
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-clay ring-1 ring-clay/15">
          {product.categoryName}
        </span>
      </div>

      <div className="grid gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link
              className="focus-ring min-h-12 rounded-sm text-base font-semibold leading-6 text-ink hover:text-clay"
              to={`/productos/${product.slug}`}
            >
              {product.name}
            </Link>
            <p className="shrink-0 text-sm font-bold text-ink">
              {formatCurrency(selectedVariant?.price || product.basePrice)}
            </p>
          </div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/66">
            {product.description || "Prenda infantil disponible para pedido por WhatsApp."}
          </p>
        </div>

        <div className="grid gap-3">
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
                  disabled={!variant.isActive || variant.stock <= 0}
                >
                  {variant.label || "Variante"} {variant.stock <= 0 ? "- Agotado" : ""}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs leading-5 text-ink/54">
            {selectedVariant
              ? `${selectedVariant.stock} disponibles${
                  selectedVariant.sku ? ` - SKU ${selectedVariant.sku}` : ""
                }`
              : "Sin variantes disponibles"}
          </p>
        </div>

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
      </div>
    </article>
  );
}
