# Directiva: Creación de Landing Pages para Usuarios Mayores de 50 (ConectaIA)

## Objetivo
Desarrollar landing pages accesibles y de alta conversión enfocadas en usuarios mayores de 50 años (específicamente, con consideraciones de presbicia y prevención de errores cognitivos o motores).

## Restricciones y Casos Borde
- **UI/UX General:** No usar Dark Mode general o puro porque dificulta la lectura y fatiga la vista en largas sesiones, excepto en secciones clave (Hero y Footer) para generar contraste estructural. Fondo principal: Crema suave o gris muy claro (ej. `#FDFBF7`, `#F8F9FA`).
- **Contraste de Texto:** Textos principales siempre en gris oscuro o negro profundo (`#111111`, no negro puro `#000000`).
- **Tipografía:** Usar solo fuentes Sans-serif clásicas y limpias (Roboto, Arial, Inter). Tamaño base gigantesco (18px - 20px mínimo global). Interlineado mínimo de 1.5. Titulares H1/H2 deben ser masivos.
- **Interacción y Botones (Anti-errores):** Los llamados a la acción (CTA) deben ser botones con apariencia de "botón físico", usar colores estridentes/obvios (azul corporativo/neón) y tamaños enormes. DEBEN evitarse efectos complejos de *hover* o animaciones, solo rebotes sutiles o cambios de brillo puros.
- **Navegación Intuitiva:** 100% de la navegación controlada por Scroll vertical. Prohibido estrictamente usar carruseles, sliders, swipe motions, pop-ups inesperados o pestañas ocultas (tabs).
- **Móvil (Adaptabilidad):** Diseño estricto de bloque de 1 columna para móviles. Aplicar un padding o márgenes laterales mínimos de 20px en cada sección para evitar toques accidentales con la palma o múltiples dedos en pantallas de smartphone.
- **Stack Técnico:** Mantener simple. Uso estricto de HTML5, CSS3 y Vanilla JS. Nada de frameworks modernos como Tailwind o React, esto incrementa la simplicidad y robustez al exportar a GitHub pages sin build processes.

## Ejecución Formulario
- Cuidar especialmente el DOM del botón Submit para otorgar feedback visual estricto ("Procesando...") si hay peticiones en curso y prevenir doble envío natural.
