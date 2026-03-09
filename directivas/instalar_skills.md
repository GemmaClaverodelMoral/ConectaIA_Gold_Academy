# DIRECTIVA: INSTALACION_SKILLS

## 1. Objetivo y Criterio de Éxito
- **Objetivo:** Instalar skills faltantes desde el repositorio superpowers.git en el workspace actual.
- **Éxito:** Las carpetas de skills del repositorio fuente que no existan en `.agent/skills` deben ser copiadas íntegramente.

## 2. I/O y Dependencias
- **Entradas:** 
    - Carpeta origen: `.tmp/superpowers/skills`
    - Carpeta destino: `.agent/skills`
- **Salidas:** Reporte de skills instaladas.
- **Stack:** Python (shutil, os).

## 3. Lógica (Sin código)
1. Identificar carpetas en el directorio de skills del repo clonado.
2. Comparar con las carpetas existentes en `.agent/skills`.
3. Para cada skill faltante, copiar la carpeta completa al destino.
4. Generar log de acciones realizadas.

## 4. Restricciones y Casos Borde
- No sobreescribir skills existentes para evitar conflictos con versiones locales personalizadas.
- Asegurar que la carpeta `.agent/skills` exista antes de copiar.

## 5. Memoria de Errores (CRÍTICO)
- **09/03/2026:** Instaladas 14 skills nuevas desde superpowers.git exitosamente.
