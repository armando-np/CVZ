# Centro Veterinario Zaragoza — sitio web

Continuidad del sitio estático del repositorio `armando-np/CVZ`, actualizada con fotografías reales y nuevos apartados para cardiología, diagnóstico por imagen, laboratorio clínico, microchip y documentación de viaje, farmacia veterinaria y estética animal.

## Datos oficiales integrados

- **Dirección:** C. 33 161, Ignacio Zaragoza, Venustiano Carranza, C.P. 15000, Ciudad de México, CDMX.
- **Teléfono y WhatsApp:** 55 6815 7821.
- **Google Analytics 4:** `G-T5QGNG2G1R`, sujeto a consentimiento.
- **Mapa:** botón de indicaciones y mapa incrustado generado con la dirección oficial.

## Comandos

```bash
npm run build
npm run check
npm run serve
```

Abre `http://127.0.0.1:4173/` después de ejecutar `npm run serve`.

## Publicación

El flujo `.github/workflows/pages.yml` compila y publica automáticamente al enviar cambios a `main`. En **Settings → Pages**, selecciona **GitHub Actions** como fuente.

El generador detecta una publicación en la raíz o bajo una ruta de proyecto como `/CVZ/`.

## Estructura

- `src/data/business.mjs`: datos oficiales, servicios, horarios y medios.
- `src/pages/`: contenido de las páginas.
- `src/templates/`: componentes y metadatos compartidos.
- `public/assets/`: CSS, JavaScript e imágenes.
- `scripts/`: construcción, comprobación y servidor local.

## Privacidad y viajes

El formulario no envía información a un servidor; prepara un mensaje y abre WhatsApp. Google Analytics solo se carga tras la aceptación de analítica.

La referencia a ISO 11784/11785 corresponde al microchip de identificación y su lectura. El carnet o pasaporte veterinario, las cartas clínicas y el microchip no sustituyen certificados zoosanitarios ni requisitos de autoridades, aerolíneas o destinos. Es necesario confirmar los requisitos vigentes antes de viajar.
