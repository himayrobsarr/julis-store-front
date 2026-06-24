# Juli's & Maju Store

Frontend inicial para la tienda al detal de Juli's & Maju Store.

## Arrancar

```bash
npm.cmd install
npm.cmd run dev
```

## API

Copia `.env.example` a `.env` y configura la URL del backend.

```env
VITE_API_BASE_URL=http://2.24.30.176:4000
```

Para produccion, la opcion recomendada es servir la API por el mismo dominio con
Nginx. En ese caso deja la variable vacia para usar rutas relativas como
`/api/products`:

```env
VITE_API_BASE_URL=
```

## WhatsApp

Copia `.env.example` a `.env` y agrega el numero en formato internacional, sin `+` ni espacios.

```env
VITE_WHATSAPP_NUMBER=573001112233
```

Si no se configura numero, el boton de WhatsApp abre el selector de contacto con el mensaje del pedido.
