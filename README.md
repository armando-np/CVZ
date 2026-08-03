# Centro Veterinario Zaragoza — sitio web

Sitio estático, responsivo y escalable para **Centro Veterinario Zaragoza**. Está preparado para publicarse en GitHub Pages sin frameworks ni dependencias de producción.

## Incluye

- Página de inicio orientada a conversión.
- Páginas de servicios veterinarios, estética canina, equipo, contacto y privacidad.
- Formulario de solicitud de cita que prepara un mensaje y abre WhatsApp; no almacena datos en un servidor.
- Botones de llamada, WhatsApp, Instagram y cómo llegar.
- Mapa, horarios, precios de referencia y preguntas frecuentes.
- SEO técnico: títulos y descripciones por página, URL canónica, Open Graph, Twitter Cards, datos estructurados `VeterinaryCare`, migas de pan, FAQ, `sitemap.xml` y `robots.txt`.
- Google Analytics 4 opcional, cargado únicamente después del consentimiento.
- Eventos de medición para clics de contacto y solicitudes de cita, sin enviar nombres de personas ni mascotas.
- Diseño accesible, adaptable a móvil y escritorio, con soporte para reducción de movimiento.
- Publicación automática mediante GitHub Actions.

## Inicio rápido local

Requiere Node.js 20 o superior; el flujo de GitHub utiliza Node.js 22.

```bash
npm run build
npm run check
npm run serve
```

Después abre:

```text
http://127.0.0.1:4173/
```

No es necesario instalar paquetes: el generador usa únicamente módulos incluidos en Node.js.

## Publicación en GitHub Pages

Consulta [CONFIGURACION.md](CONFIGURACION.md) para el procedimiento completo.

Resumen:

1. Crea un repositorio nuevo en GitHub.
2. Sube **todo el contenido de esta carpeta**, incluida la carpeta oculta `.github`.
3. Usa `main` como rama principal.
4. En GitHub abre **Settings → Pages** y selecciona **GitHub Actions** como fuente.
5. El flujo `.github/workflows/pages.yml` construirá, verificará y publicará el sitio.

El generador detecta automáticamente si GitHub Pages publicará en la raíz o dentro de una ruta como `/nombre-del-repositorio/`.

## Dónde editar

| Necesidad | Archivo o carpeta |
|---|---|
| Datos, servicios, horarios, precios y FAQ | `src/data/business.mjs` |
| Contenido de cada página | `src/pages/` |
| Componentes compartidos | `src/templates/` |
| Colores y diseño | `public/assets/css/styles.css` |
| Logo e ilustraciones | `public/assets/images/` |
| Analítica y eventos | `public/assets/js/analytics.js` y `public/assets/js/main.js` |
| Configuración local | `site.config.json` |
| Publicación | `.github/workflows/pages.yml` |

## Variables de configuración

Estas variables pueden configurarse en **Settings → Secrets and variables → Actions → Variables**:

| Variable | Uso | Ejemplo |
|---|---|---|
| `SITE_URL` | Dominio final, especialmente si se usa dominio propio | `https://www.ejemplo.com/` |
| `GA4_MEASUREMENT_ID` | Identificador de Google Analytics 4 | `G-XXXXXXXXXX` |
| `GOOGLE_SITE_VERIFICATION` | Valor de verificación de Search Console | Solo el código de verificación |
| `BING_SITE_VERIFICATION` | Valor de verificación de Bing Webmaster Tools | Solo el código de verificación |

Si `GA4_MEASUREMENT_ID` queda vacío, Google Analytics no se carga y el aviso de preferencias se oculta.

## Decisiones de contenido

El sitio no inventa reseñas, testimonios, fotografías, correo electrónico, redes sociales ni disponibilidad 24 horas. Como esos datos no fueron entregados, se utilizaron ilustraciones originales de estilo clínico y únicamente la información confirmada en el formulario del negocio.

Revisa [CONTENIDO-PENDIENTE.md](CONTENIDO-PENDIENTE.md) antes de publicar la versión definitiva.

## Aviso importante sobre privacidad

La página de privacidad incluida es un borrador funcional que describe el comportamiento técnico actual del formulario, WhatsApp, Google Maps y Analytics. No constituye una certificación de cumplimiento ni sustituye una revisión jurídica. Antes de la publicación definitiva conviene validar el texto, el responsable, los medios de contacto y cualquier tratamiento adicional de datos.
