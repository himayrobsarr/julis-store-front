const WOMPI_SCRIPT_ID = "wompi-checkout-widget";

export async function openWompiCheckout(checkout) {
  if (!checkout?.scriptUrl) {
    throw new Error("La API no devolvio la URL del widget de Wompi.");
  }

  try {
    await loadWompiScript(checkout.scriptUrl);

    if (!window.WidgetCheckout) {
      throw new Error("No pudimos cargar el widget de Wompi.");
    }

    const widget = new window.WidgetCheckout({
      publicKey: checkout.publicKey,
      currency: checkout.currency,
      amountInCents: checkout.amountInCents,
      reference: checkout.reference,
      signature: {
        integrity: checkout.integritySignature,
      },
      redirectUrl: checkout.redirectUrl,
      customerData: {
        email: checkout.customerData?.email,
        fullName: checkout.customerData?.fullName,
        phoneNumber: checkout.customerData?.phoneNumber,
        phoneNumberPrefix: "+57",
      },
    });

    widget.open(() => {
      // Wompi will redirect or report the final state through its own flow.
    });
  } catch (error) {
    window.location.assign(buildWompiCheckoutUrl(checkout));
  }
}

function buildWompiCheckoutUrl(checkout) {
  const params = new URLSearchParams({
    "public-key": checkout.publicKey,
    currency: checkout.currency,
    "amount-in-cents": String(checkout.amountInCents),
    reference: checkout.reference,
    "signature:integrity": checkout.integritySignature,
  });

  if (checkout.redirectUrl) {
    params.set("redirect-url", checkout.redirectUrl);
  }

  if (checkout.customerData?.email) {
    params.set("customer-data:email", checkout.customerData.email);
  }

  if (checkout.customerData?.fullName) {
    params.set("customer-data:full-name", checkout.customerData.fullName);
  }

  if (checkout.customerData?.phoneNumber) {
    params.set("customer-data:phone-number", checkout.customerData.phoneNumber);
    params.set("customer-data:phone-number-prefix", "+57");
  }

  return `https://checkout.wompi.co/p/?${params.toString()}`;
}

function loadWompiScript(scriptUrl) {
  const existingScript = document.getElementById(WOMPI_SCRIPT_ID);

  if (existingScript) {
    return existingScript.dataset.loaded === "true"
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existingScript.addEventListener("load", resolve, { once: true });
          existingScript.addEventListener("error", reject, { once: true });
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.id = WOMPI_SCRIPT_ID;
    script.src = scriptUrl;
    script.async = true;
    script.dataset.loaded = "false";
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => reject(new Error("No pudimos cargar el script de Wompi.")),
      { once: true },
    );
    document.body.appendChild(script);
  });
}
