import { ArrowLeft, MessageCircle, Ruler, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATALOG_ONLY_MODE, visualCatalogProducts } from "../data/catalog";
import { fetchProductBySlug } from "../services/api";
import { formatCurrency } from "../utils/format";
import { getInitialVariant, normalizeProduct, PRODUCT_PLACEHOLDER_IMAGE } from "../utils/products";
import { whatsappHref } from "../utils/whatsapp";

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

      if (CATALOG_ONLY_MODE) {
        const visualProduct = visualCatalogProducts.find((item) => item.slug === slug);

        if (!isMounted) {
          return;
        }

        if (!visualProduct) {
          setStatus("not-found");
          return;
        }

        setProduct(visualProduct);
        setStatus("success");
        return;
      }

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
  const productImages = useMemo(
    () => (product.images?.length ? product.images : [product.image]),
    [product.image, product.images],
  );
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id || "");
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) || initialVariant;
  const canAddToCart = selectedVariant?.isActive && selectedVariant.stock > 0;
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

  useEffect(() => {
    setSelectedImage(productImages[0]);
  }, [product.id, productImages]);

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

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-linen p-3 shadow-card sm:p-4">
              <img
                className="aspect-square h-full w-full rounded-[1.5rem] object-contain"
                src={selectedImage}
                alt={product.imageAlt}
                onError={(event) => {
                  event.currentTarget.src = PRODUCT_PLACEHOLDER_IMAGE;
                }}
              />
            </div>

            {productImages.length > 1 ? (
              <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Otras vistas de la prenda">
                {productImages.map((image, index) => {
                  const isSelected = image === selectedImage;

                  return (
                    <button
                      className={[
                        "focus-ring h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 bg-linen p-1 transition",
                        isSelected ? "border-brand shadow-card" : "border-transparent hover:border-brand/45",
                      ].join(" ")}
                      type="button"
                      key={image}
                      onClick={() => setSelectedImage(image)}
                      aria-label={`Mostrar vista ${index + 1} de ${product.name}`}
                      aria-pressed={isSelected}
                    >
                      <img className="h-full w-full rounded-xl object-contain" src={image} alt="" />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card sm:p-9">
            <p className="text-sm font-semibold text-clay">{product.categoryName}</p>
            {product.reference ? (
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Ref. {product.reference}
              </p>
            ) : null}
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-ink">
              {displayPrice ? formatCurrency(displayPrice) : "Precio por consultar"}
            </p>
            <p className="mt-4 text-base leading-8 text-ink/68">
              {product.description || "Prenda infantil disponible para pedido por WhatsApp."}
            </p>
            {product.color ? (
              <p className="mt-3 text-sm font-semibold text-ink/68">Color: {product.color}</p>
            ) : null}

            {availableSizes.length > 0 ? (
              <div className="mt-6">
                <p className="text-sm font-semibold text-ink">Tallas de esta referencia</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      className="rounded-full border border-brand/20 bg-sage/60 px-3 py-2 text-sm font-semibold text-ink/72"
                      key={size}
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs leading-5 text-ink/52">
                  La disponibilidad del color y la talla elegida se confirma por WhatsApp.
                </p>
              </div>
            ) : null}

            {CATALOG_ONLY_MODE ? (
              <div className="mt-6 flex flex-col gap-3 rounded-[1.25rem] bg-sage/65 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Ruler className="mt-0.5 shrink-0 text-brand" size={20} aria-hidden="true" />
                  <p className="text-sm leading-6 text-ink/68">
                    La disponibilidad y las medidas exactas se confirman según la referencia.
                  </p>
                </div>
                <Link
                  className="focus-ring shrink-0 rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-ink transition hover:text-brand"
                  to="/guia-de-tallas"
                >
                  Ver guía de tallas
                </Link>
              </div>
            ) : null}

            {product.variants.length > 0 ? <div className="mt-6 grid gap-3">
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
                    disabled={!CATALOG_ONLY_MODE && (!variant.isActive || variant.stock <= 0)}
                  >
                    {variant.label || "Variante"}{" "}
                    {!CATALOG_ONLY_MODE && variant.stock <= 0 ? "- Agotado" : ""}
                  </option>
                ))}
              </select>
              {!CATALOG_ONLY_MODE ? (
                <p className="text-sm text-ink/58">
                  {selectedVariant
                    ? `${selectedVariant.stock} disponibles${
                        selectedVariant.sku ? ` - SKU ${selectedVariant.sku}` : ""
                      }`
                    : "Sin variantes disponibles"}
                </p>
              ) : null}
            </div> : null}

            {CATALOG_ONLY_MODE ? (
              <a
                className="focus-ring mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-ink"
                href={whatsappHref(`Hola, quiero conocer más sobre ${consultationDetails}.`)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Consultar esta prenda
              </a>
            ) : (
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
            )}
          </div>
        </div>

        {CATALOG_ONLY_MODE ? <RelatedProducts currentProduct={product} /> : null}
      </section>
    </main>
  );
}

function RelatedProducts({ currentProduct }) {
  const relatedProducts = visualCatalogProducts
    .filter(
      (item) => item.id !== currentProduct.id && item.categorySlug === currentProduct.categorySlug,
    )
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-ink/10 pt-12" aria-labelledby="related-products-title">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Sigue explorando</p>
      <h2 id="related-products-title" className="mt-2 font-display text-3xl font-semibold text-ink">
        También te puede gustar
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((item) => (
          <Link
            className="focus-ring group overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white p-3 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            to={`/productos/${item.slug}`}
            key={item.id}
          >
            <img
              className="aspect-square w-full rounded-[1.15rem] bg-linen object-contain"
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
            />
            <div className="px-2 pb-2 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-clay">{item.categoryName}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-brand">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
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
