import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StorySections from "./components/StorySections";
import PaymentResultPage from "./pages/PaymentResultPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { createWhatsappOrder, createWompiOrder } from "./services/api";
import { openWompiCheckout } from "./services/wompi";

const CART_STORAGE_KEY = "julisymaju-cart";

function readStoredCart() {
  try {
    const storedItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    return storedItems
      .map((storedItem) => {
        if (!storedItem.variantId) {
          return null;
        }

        const quantity = Math.max(Number(storedItem.quantity) || 1, 1);

        return {
          ...storedItem,
          quantity,
          price: Number(storedItem.price) || 0,
          stock: Math.max(Number(storedItem.stock) || quantity, 0),
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState({ status: "idle", method: "", message: "" });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  function addToCart(product, variant) {
    if (!variant || variant.stock <= 0 || !variant.isActive) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.variantId === variant.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: Math.min(item.quantity + 1, variant.stock), stock: variant.stock }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          imageAlt: product.imageAlt,
          variantId: variant.id,
          variantLabel: variant.label,
          size: variant.size,
          color: variant.color,
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          currency: product.currency,
          quantity: 1,
        },
      ];
    });
    setCheckoutState({ status: "idle", method: "", message: "" });
    setIsCartOpen(true);
  }

  function increaseItem(targetItem) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.variantId === targetItem.variantId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock || item.quantity + 1) }
          : item,
      ),
    );
  }

  function decreaseItem(targetItem) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.variantId === targetItem.variantId
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(targetItem) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.variantId !== targetItem.variantId),
    );
  }

  async function sendWhatsappOrder(customer) {
    setCheckoutState({ status: "loading", method: "whatsapp", message: "" });

    try {
      const response = await createWhatsappOrder(buildOrderPayload(customer, cartItems));

      if (!response?.whatsappUrl) {
        throw new Error("La API no devolvio un enlace de WhatsApp.");
      }

      setCheckoutState({
        status: "success",
        method: "whatsapp",
        message: "Pedido creado. Abriendo WhatsApp...",
      });
      window.location.assign(response.whatsappUrl);
    } catch (error) {
      setCheckoutState({
        status: "error",
        method: "whatsapp",
        message:
          error.message ||
          "No pudimos crear el pedido. Revisa tus datos e intenta nuevamente.",
      });
    }
  }

  async function sendWompiOrder(customer) {
    setCheckoutState({ status: "loading", method: "wompi", message: "" });

    try {
      const response = await createWompiOrder(buildOrderPayload(customer, cartItems));

      if (!response?.checkout) {
        throw new Error("La API no devolvio los datos de checkout de Wompi.");
      }

      setCheckoutState({
        status: "success",
        method: "wompi",
        message: "Orden creada. Abriendo Wompi...",
      });
      await openWompiCheckout(response.checkout);
    } catch (error) {
      setCheckoutState({
        status: "error",
        method: "wompi",
        message:
          error.message ||
          "No pudimos iniciar el pago con Wompi. Revisa tus datos e intenta nuevamente.",
      });
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen text-ink">
        <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Catalog onAddToCart={addToCart} />
                <StorySections />
              </main>
            }
          />
          <Route
            path="/productos/:slug"
            element={<ProductDetailsPage onAddToCart={addToCart} />}
          />
          <Route path="/payments/result" element={<PaymentResultPage />} />
        </Routes>
        <Footer />
        <CartDrawer
          items={cartItems}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onDecrease={decreaseItem}
          onIncrease={increaseItem}
        onRemove={removeItem}
        onCheckout={sendWhatsappOrder}
        onPayOnline={sendWompiOrder}
        checkoutState={checkoutState}
      />
      </div>
    </BrowserRouter>
  );
}

function buildOrderPayload(customer, items) {
  return {
    customerName: customer.customerName.trim(),
    customerEmail: customer.customerEmail.trim() || undefined,
    customerPhone: customer.customerPhone.trim(),
    shippingAddress: customer.shippingAddress.trim() || undefined,
    notes: customer.notes.trim() || undefined,
    items: items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };
}
