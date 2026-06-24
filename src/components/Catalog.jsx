import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchProducts } from "../services/api";
import {
  getProductSearchText,
  getProductSizes,
  normalizeCategory,
  normalizeProduct,
} from "../utils/products";
import ProductCard from "./ProductCard";

export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [category, setCategory] = useState("todos");
  const [size, setSize] = useState("todas");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        setProducts((productsResponse || []).map(normalizeProduct).filter(Boolean));
        setApiCategories((categoriesResponse || []).map(normalizeCategory).filter(Boolean));
        setStatus("success");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error.message || "No pudimos cargar el catalogo. Intenta actualizar la pagina.",
        );
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    const productCategories = products
      .map((product) => ({
        id: product.category?.id || product.categorySlug,
        label: product.categoryName,
        slug: product.categorySlug,
      }))
      .filter((item) => item.slug);
    const categoriesBySlug = new Map();

    [...apiCategories, ...productCategories].forEach((item) => {
      if (!categoriesBySlug.has(item.slug)) {
        categoriesBySlug.set(item.slug, item);
      }
    });

    return [{ id: "todos", label: "Todos", slug: "todos" }, ...categoriesBySlug.values()];
  }, [apiCategories, products]);

  const sizeOptions = useMemo(
    () => [...new Set(products.flatMap((product) => getProductSizes(product)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "todos" || product.categorySlug === category;
      const matchesSize = size === "todas" || getProductSizes(product).includes(size);
      const matchesQuery = !normalizedQuery || getProductSearchText(product).includes(normalizedQuery);

      return matchesCategory && matchesSize && matchesQuery;
    });
  }, [category, query, size]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="catalogo">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-clay">Catalogo al detal</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            Prendas listas para combinar
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/66">
            Sudaderas, enterizos y conjuntos casuales para bebes y ninos pequenos.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,260px)_150px]">
          <label className="relative block">
            <span className="sr-only">Buscar producto</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42"
              size={18}
              aria-hidden="true"
            />
            <input
              className="focus-ring h-11 w-full rounded-full border border-ink/12 bg-white py-2 pl-10 pr-4 text-sm text-ink placeholder:text-ink/44"
              type="search"
              placeholder="Buscar prenda"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Filtrar por talla</span>
            <SlidersHorizontal
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42"
              size={18}
              aria-hidden="true"
            />
            <select
              className="focus-ring h-11 w-full appearance-none rounded-full border border-ink/12 bg-white py-2 pl-10 pr-9 text-sm text-ink"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              disabled={status !== "success" || sizeOptions.length === 0}
            >
              <option value="todas">Todas</option>
              {sizeOptions.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {categoryOptions.map((item) => {
          const isActive = item.slug === category;

          return (
            <button
              className={[
                "focus-ring h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition",
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-ink/12 bg-white text-ink/72 hover:border-olive hover:bg-sage",
              ].join(" ")}
              type="button"
              key={item.slug}
              onClick={() => setCategory(item.slug)}
              disabled={status !== "success" && item.slug !== "todos"}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {status === "loading" ? <CatalogSkeleton /> : null}

      {status === "error" ? (
        <div className="mt-8 rounded-lg border border-clay/20 bg-white p-8 text-center">
          <p className="font-semibold text-ink">No pudimos cargar el catalogo.</p>
          <p className="mt-2 text-sm leading-6 text-ink/62">{errorMessage}</p>
          <button
            className="focus-ring mt-4 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {status === "success" && products.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard product={product} onAddToCart={onAddToCart} key={product.id} />
          ))}
        </div>
      ) : null}

      {status === "success" && products.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-ink/20 bg-white p-8 text-center">
          <p className="font-semibold text-ink">El catalogo esta vacio por ahora.</p>
          <p className="mt-2 text-sm leading-6 text-ink/62">
            Cuando agregues productos desde el admin apareceran aqui automaticamente.
          </p>
        </div>
      ) : null}

      {status === "success" && products.length > 0 && filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-ink/20 bg-white p-8 text-center">
          <p className="font-semibold text-ink">No hay prendas con esos filtros.</p>
          <button
            className="focus-ring mt-4 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
            type="button"
            onClick={() => {
              setCategory("todos");
              setSize("todas");
              setQuery("");
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : null}
    </section>
  );
}

function CatalogSkeleton() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Cargando catalogo">
      {[1, 2, 3].map((item) => (
        <div className="overflow-hidden rounded-lg border border-ink/10 bg-white" key={item}>
          <div className="aspect-[4/5] animate-pulse bg-sage/70" />
          <div className="grid gap-3 p-4">
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-linen" />
            <div className="h-4 w-full animate-pulse rounded-full bg-linen" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-linen" />
            <div className="h-11 w-full animate-pulse rounded-full bg-linen" />
          </div>
        </div>
      ))}
    </div>
  );
}
