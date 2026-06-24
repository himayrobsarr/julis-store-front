const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "No se pudo completar la solicitud.";

    try {
      const payload = await response.json();
      message = payload.message || payload.error || message;
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function resolveApiAssetUrl(url) {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;

  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
}

export function fetchProducts() {
  return request("/api/products");
}

export function fetchProductBySlug(slug) {
  return request(`/api/products/${encodeURIComponent(slug)}`);
}

export function fetchCategories() {
  return request("/api/categories");
}

export function createWhatsappOrder(orderPayload) {
  return request("/api/orders/whatsapp", {
    method: "POST",
    body: JSON.stringify(orderPayload),
  });
}

export function createWompiOrder(orderPayload) {
  return request("/api/orders/wompi", {
    method: "POST",
    body: JSON.stringify(orderPayload),
  });
}
