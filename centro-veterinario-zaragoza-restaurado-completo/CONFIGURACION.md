# Configuración y publicación

## 1. Crear el repositorio

1. En GitHub selecciona **New repository**.
2. Asigna un nombre, por ejemplo `centro-veterinario-zaragoza`.
3. No agregues archivos iniciales si vas a subir esta carpeta completa.
4. Crea el repositorio.

## 2. Subir el proyecto

### Opción A — GitHub Desktop

1. Descomprime el ZIP.
2. En GitHub Desktop selecciona **File → Add local repository**.
3. Elige la carpeta del proyecto.
4. Publica el repositorio y confirma que la rama principal sea `main`.

### Opción B — terminal

Desde la carpeta descomprimida:

```bash
git init
git add .
git commit -m "Sitio inicial de Centro Veterinario Zaragoza"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Sustituye la URL por la de tu repositorio.

### Opción C — interfaz web de GitHub

Puedes usar **Add file → Upload files**, pero verifica que también se haya cargado la carpeta oculta:

```text
.github/workflows/pages.yml
```

Sin ese archivo no se ejecutará la publicación automática.

## 3. Activar GitHub Pages

1. Abre el repositorio en GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions**.
4. Abre la pestaña **Actions** y revisa el flujo **Publicar sitio en GitHub Pages**.
5. Cuando finalice correctamente, GitHub mostrará la URL pública.

Cada cambio enviado a `main` volverá a construir y publicar el sitio.

## 4. Configurar Analytics y verificación SEO

En el repositorio abre:

**Settings → Secrets and variables → Actions → Variables → New repository variable**

Google Analytics ya está configurado en `site.config.json` con este identificador:

```text
G-T5QGNG2G1R
```

No es obligatorio crear una variable para Analytics. Las variables siguientes son opcionales y pueden usarse para reemplazar la configuración local o añadir verificaciones SEO:

```text
GA4_MEASUREMENT_ID=G-T5QGNG2G1R
GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxx
BING_SITE_VERIFICATION=xxxxxxxxxxxxxxxx
```

No escribas etiquetas HTML completas; agrega solo el valor solicitado. El sitio carga la etiqueta de Google después del consentimiento, por lo que no debes pegar además el fragmento estándar de `gtag.js` en las plantillas.

El sitio mide estos eventos cuando Analytics está configurado y la persona visitante acepta:

- `whatsapp_click`
- `phone_click`
- `map_click`
- `social_click`
- `cta_click`
- `generate_lead`

El evento de solicitud no envía el nombre de la persona, el nombre de la mascota ni las notas del formulario.

## 5. Usar un dominio propio

1. Configura el dominio en **Settings → Pages → Custom domain**.
2. Crea una variable de repositorio:

```text
SITE_URL=https://www.tudominio.com/
```

3. Opcionalmente copia `CNAME.example` como `public/CNAME` y sustituye el contenido por el dominio, sin `https://`.
4. Configura los registros DNS siguiendo las indicaciones mostradas por GitHub.
5. Ejecuta nuevamente el flujo de publicación.

Es importante que `SITE_URL` coincida con la URL pública final para que las URL canónicas, Open Graph, datos estructurados y sitemap sean correctos.

## 6. Editar datos del hospital

La información central está en:

```text
src/data/business.mjs
```

Ahí puedes cambiar:

- nombre y eslogan;
- teléfonos y WhatsApp;
- dirección y mapa;
- horarios;
- nombres del equipo;
- servicios;
- precios;
- preguntas frecuentes.

Después ejecuta:

```bash
npm run build
npm run check
```

## 7. Administrar ilustraciones y fotografías

Las imágenes están en:

```text
public/assets/images/
```

El proyecto ya incluye fotografías optimizadas para el banner principal, cirugía y el perfil de Jimena. Puedes sustituir cualquier imagen conservando el mismo nombre de archivo. Para un mejor rendimiento:

- usa fotografías nítidas y con autorización de uso;
- elimina metadatos sensibles;
- procura que cada imagen pese menos de 300 KB;
- usa WebP, AVIF o JPEG optimizado para fotografías;
- conserva texto alternativo descriptivo en el archivo de la página correspondiente.

No publiques fotografías de clientes, mascotas o personal sin la autorización correspondiente.

## 8. Revisiones antes de publicar

- Confirmar precios y vigencia.
- Confirmar horarios de clínica y estética.
- Confirmar la lista y disponibilidad de especialidades.
- Agregar correo electrónico únicamente si será atendido.
- Verificar los enlaces de Instagram, Google Maps y WhatsApp.
- Revisar el aviso de privacidad con asesoría adecuada.
- Probar el formulario en Android, iPhone y escritorio.
- Validar que el mapa muestre la ubicación correcta.
- Configurar Search Console y enviar `sitemap.xml`.

## 9. Comandos disponibles

```bash
npm run build    # genera dist/
npm run check    # verifica páginas, enlaces y JavaScript
npm run serve    # sirve la compilación local
npm run preview  # construye y sirve
```

La carpeta `dist/` se genera automáticamente y no debe editarse a mano.
