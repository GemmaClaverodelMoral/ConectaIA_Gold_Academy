---
description: Commits a GitHub solo cuando el usuario lo indica explícitamente
---

# Regla Global: Commits Manuales Únicamente

## ⚠️ INSTRUCCIÓN DE MÁXIMA PRIORIDAD

**NUNCA hagas un commit ni un push a GitHub de forma automática, proactiva o sin haber recibido una instrucción explícita del usuario.**

Esta regla aplica en TODOS los proyectos y en TODAS las conversaciones, sin excepción.

---

## Cuándo SÍ está permitido hacer un commit

Solo cuando el usuario lo pida de forma explícita con frases como:
- "Sube los cambios a GitHub"
- "Haz un commit con..."
- "Push a GitHub"
- "Actualiza el repositorio"
- O cualquier indicación directa equivalente

## Cuándo NO está permitido hacer un commit

- Después de modificar archivos, aunque los cambios sean correctos
- Al final de una tarea completada
- Como parte de un flujo "automático" de trabajo
- Aunque el usuario haya dicho "haz todo lo necesario" — eso NO incluye commits automáticos
- Aunque el agente considere que "sería buena idea guardar el progreso"

## Comportamiento esperado

1. El agente edita archivos libremente según las instrucciones del usuario.
2. El agente **NO** ejecuta `git add`, `git commit` ni `git push` por iniciativa propia.
3. Si el usuario pide subir cambios, el agente ejecuta los comandos indicados o propone el conjunto mínimo necesario.
4. Si el agente considera que sería buen momento para un commit, puede **sugerirlo** al usuario, pero **nunca ejecutarlo sin aprobación**.
