# Actualización de agosto de 2026

## Integraciones

- Fotografía de la MVZ. Paulina E. Ortiz Rivera en la página de equipo.
- Galería de ultrasonografía, laboratorio clínico y estudios radiográficos.
- Galería de estética y spa con cuatro trabajos reales.
- Página de microchip, carnet/pasaporte veterinario y documentación para viajes.
- Especialidad cardiológica con disponibilidad mediante cita previa por WhatsApp.
- Farmacia veterinaria con solicitud de pedido, receta y cotización por WhatsApp.
- Dirección oficial, indicaciones y mapa de Google Maps.

## Tratamiento de imágenes

Las radiografías publicadas usan versiones recortadas y optimizadas para evitar mostrar nombres o datos identificables de pacientes. Las imágenes se sirven en WebP y con tamaños responsivos.

## Corrección 1.1.2 — menú móvil

- El panel móvil se movió fuera del encabezado con `backdrop-filter` para evitar un fallo de renderizado observado en Safari para iPhone.
- El panel ahora se fija directamente al viewport y calcula su posición debajo del encabezado.
- Se retiró el bloqueo de desplazamiento del `body`, que hacía que la página pareciera congelada cuando el panel no se dibujaba.
- El menú conserva desplazamiento interno, cierre con el botón, enlaces y tecla Escape, además de reajuste al cambiar orientación o tamaño del viewport.
