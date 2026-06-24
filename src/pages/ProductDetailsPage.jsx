import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductBySlug } from "../services/api";
import { formatCurrency } from "../utils/format";
import { getInitialVariant, normalizeProduct, PRODUCT_PLACEHOLDER_IMAGE } from "../utils/products";

export default function ProductDetailsPage({ onAddToCart }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetchProductBySlug(slug);
        const normalizedProduct = normalizeProduct(response);

        if (!isMounted) {
          return;
        }

        if (!normalizedProduct) {
          setStatus("not-found");
          return;
        }

        setProduct(normalizedProduct);
        setStatus("success");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus(error.status === 404 ? "not-found" : "error");
        setErrorMessage(
          error.message || "No pudimos cargar este producto. Intenta de nuevo en unos minutos.",
        );
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (status === "loading") {
    return <ProductDetailsSkeleton />;
  }

  if (status === "not-found") {
    return (
      <ProductDetailsMessage
        title="Producto no encontrado"
        text="La prenda que buscas no esta disponible o cambio de direccion."
      />
    );
  }

  if (status === "error") {
    return <ProductDetailsMessage title="No pudimos cargar el producto" text={errorMessage} />;
  }

  return <ProductDetails product={product} onAddToCart={onAddToCart} />;
}

function ProductDetails({ product, onAddToCart }) {
  const initialVariant = useMemo(() => getInitialVariant(product), [product]);
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id || "");
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) || initialVariant;
  const canAddToCart = selectedVariant?.isActive && selectedVariant.stock > 0;

  useEffect(() => {
    setSelectedVariantId(initialVariant?.id || "");
  }, [initialVariant?.id]);

  return (
    <main className="bg-cotton">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 hover:bg-sage hover:text-ink"
          to="/#catalogo"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver al catalogo
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-linen">
            <img
              className="aspect-[4/5] h-full w-full object-cover"
              src={product.image}
              alt={product.imageAlt}
              onError={(event) => {
                event.currentTarget.src = PRODUCT_PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-sm font-semibold text-clay">{product.categoryName}</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-ink">
              {formatCurrency(selectedVariant?.price || product.basePrice)}
            </p>
            <p className="mt-4 text-base leading-8 text-ink/68">
              {product.description || "Prenda infantil disponible para pedido por WhatsApp."}
            </p>

            <div className="mt-6 grid gap-3">
              <label className="text-sm font-semibold text-ink" htmlFor="product-detail-variant">
                Variante
              </label>
              <select
                className="focus-ring h-12 rounded-full border border-ink/14 bg-cotton px-4 text-sm text-ink"
                id="product-detail-variant"
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
              <p className="text-sm text-ink/58">
                {selectedVariant
                  ? `${selectedVariant.stock} disponibles${
                      selectedVariant.sku ? ` - SKU ${selectedVariant.sku}` : ""
                    }`
                  : "Sin variantes disponibles"}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                className={[
                  "focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
                  canAddToCart
                    ? "bg-olive text-white hover:bg-olive/90"
                    : "cursor-not-allowed bg-ink/12 text-ink/42",
                ].join(" ")}
                type="button"
                disabled={!canAddToCart}
                onClick={() => onAddToCart(product, selectedVariant)}
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {canAddToCart ? "Agregar a la bolsa" : "Agotado"}
              </button>
              <button
                className={[
                  "focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/12 bg-cotton px-5 text-sm font-semibold text-ink transition hover:border-clay hover:text-clay",
                  canAddToCart ? "" : "cursor-not-allowed opacity-45",
                ].join(" ")}
                type="button"
                disabled={!canAddToCart}
                onClick={() => onAddToCart(product, selectedVariant)}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-10 w-44 animate-pulse rounded-full bg-sage" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="aspect-[4/5] animate-pulse rounded-lg bg-sage" />
        <div className="rounded-lg border border-ink/10 bg-white p-7">
          <div className="h-5 w-32 animate-pulse rounded-full bg-linen" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded-full bg-linen" />
          <div className="mt-5 h-7 w-36 animate-pulse rounded-full bg-linen" />
          <div className="mt-6 h-24 w-full animate-pulse rounded-lg bg-linen" />
          <div className="mt-7 h-12 w-full animate-pulse rounded-full bg-linen" />
        </div>
      </div>
    </main>
  );
}

function ProductDetailsMessage({ title, text }) {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-16 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-ink">{title}</h1>
        <p className="mt-3 text-base leading-7 text-ink/62">{text}</p>
        <Link
          className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
          to="/#catalogo"
        >
          Ir al catalogo
        </Link>
      </div>
    </main>
  );
}
