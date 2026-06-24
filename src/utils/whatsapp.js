import { formatCurrency } from "./format";

export function makeProductMessage(product, size) {
  return [
    "Hola, quiero comprar esta prenda de Juli's & Maju Store:",
    "",
    `Producto: ${product.name}`,
    `Talla: ${size}`,
    `Precio: ${formatCurrency(product.price)}`,
  ].join("\n");
}

export function makeCartMessage(items) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.name} - Talla ${item.size} - Cantidad ${item.quantity} - ${formatCurrency(
        item.price * item.quantity,
      )}`,
  );

  return [
    "Hola, quiero hacer este pedido en Juli's & Maju Store:",
    "",
    ...lines,
    "",
    `Total estimado: ${formatCurrency(total)}`,
  ].join("\n");
}

export function whatsappHref(message) {
  const configuredNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "";
  const phone = configuredNumber.replace(/\D/g, "");
  const baseUrl = phone ? `https://wa.me/${phone}` : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
