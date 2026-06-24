import { resolveApiAssetUrl } from "../services/api";

export const PRODUCT_PLACEHOLDER_IMAGE = "/images/hero-babywear.jpg";

export function normalizeProduct(product) {
  if (!product || product.status === "INACTIVE") {
    return null;
  }

  const images = [...(product.images || [])].sort(
    (firstImage, secondImage) => (firstImage.sortOrder || 0) - (secondImage.sortOrder || 0),
  );
  const firstImage = images[0];
  const variants = (product.variants || []).map((variant) => normalizeVariant(variant, product));

  return {
    id: product.id,
    slug: product.slug,
    name: product.name || "Producto sin nombre",
    description: product.description || "",
    status: product.status,
    category: product.category || null,
    categorySlug: product.category?.slug || "sin-categoria",
    categoryName: product.category?.name || "Catalogo",
    image: resolveApiAssetUrl(firstImage?.url) || PRODUCT_PLACEHOLDER_IMAGE,
    imageAlt: firstImage?.altText || product.name || "Producto Juli's & Maju",
    basePrice: Number(product.basePrice) || 0,
    currency: product.currency || "COP",
    variants,
  };
}

export function normalizeCategory(category) {
  if (!category) {
    return null;
  }

  return {
    id: category.id || category.slug,
    label: category.name || "Categoria",
    slug: category.slug || category.id,
  };
}

export function getProductSearchText(product) {
  return [
    product.name,
    product.description,
    product.categoryName,
    ...product.variants.flatMap((variant) => [variant.size, variant.color, variant.sku]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getProductSizes(product) {
  return [...new Set(product.variants.map((variant) => variant.size).filter(Boolean))];
}

export function getInitialVariant(product) {
  return (
    product.variants.find((variant) => variant.isActive && variant.stock > 0) ||
    product.variants.find((variant) => variant.isActive) ||
    product.variants[0] ||
    null
  );
}

function normalizeVariant(variant, product) {
  const price = Number(variant.price ?? product.basePrice) || 0;
  const size = variant.size || "Unica";
  const color = variant.color || "";
  const stock = Math.max(Number(variant.stock) || 0, 0);

  return {
    id: variant.id,
    sku: variant.sku || "",
    size,
    color,
    price,
    stock,
    isActive: variant.isActive !== false,
    label: [size, color].filter(Boolean).join(" / "),
  };
}
