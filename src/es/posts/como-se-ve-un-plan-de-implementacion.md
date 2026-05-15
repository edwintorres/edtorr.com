---
title: "Cómo se ve un plan de implementación"
description: "Una plantilla breve, un ejemplo funcional y la única regla que mantiene honesto al sistema. El compañero práctico de El plan de implementación."
date: 2026-05-12
layout: layouts/post-header-overlay.njk
permalink: /es/blog/como-se-ve-un-plan-de-implementacion/index.html
author: Edwin Torres
headerImage: /assets/images/blog/ip-series/what-an-implementation-plan-looks-like-hero.jpg
headerImageAlt: Un helicóptero Eurocopter EC130 rojo (N131GC) estacionado en el suelo desértico del Gran Cañón, con altísimos acantilados de roca roja elevándose al fondo al atardecer.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: es
tags:
  - ingeniería
  - ip-system
  - desarrollo-asistido-por-ia
translation: /en/blog/what-an-implementation-plan-looks-like/
---

Escribí [anteriormente](/es/blog/planes-de-implementacion-como-mantener-el-contexto/) sobre *por qué* un `IP` (plan de implementación) le gana a dejar que el contexto colapse sesión tras sesión. Dos personas me preguntaron cómo se ve uno en la práctica.

Buena pregunta. "La memoria le gana a la generación" es un principio. La plantilla (*template*) es el artefacto que hace el trabajo.

Subí una versión breve a **github.com/edwintorres/ip-templates**. Dos archivos: `TEMPLATE.md` para un IP nuevo, y `README.md` para el proceso a su alrededor. Cada uno tiene alrededor de cien líneas. Colócalos en `docs/ip/` de cualquier repositorio y puedes empezar a escribir hoy.

---

## La forma mínima viable

Todo IP necesita las mismas piezas sin importar de qué trate.

Una **tabla de metadatos** con un ID estable, estado, fechas y un objetivo. Esto es a lo que apuntan los comentarios del código más adelante: `// IP-042: signal scope rules, per-item outputs go to stream not registry`.

Una **descripción general** en tres puntos: problema, solución, beneficios clave. Si no puedes plantear el problema con claridad en una oración, no estás listo para entregárselo a un agente de IA. Detente y piensa más.

Un **diagrama de arquitectura**: antes/después para refactorizaciones, estado objetivo y flujo de datos para funcionalidades nuevas. ASCII está bien. Una imagen es suficiente.

Un **seguimiento de tareas** con IDs en la forma `XXX-PPTT`: número de IP, fase, tarea. Los IDs se convierten en cómo las fases se referencian entre sí, en cómo los mensajes de commit citan el trabajo, y en cómo una sesión reanudada apunta a un *checkpoint* a medio terminar.

**Fases.** Cada fase tiene una meta en una oración, tareas, una prueba que escribes *antes* del código, y un *checkpoint* que demuestra que la fase está terminada.

**ADRs**, pero solo cuando hubo dos opciones viables y la elección no era obvia. Las decisiones con una sola opción reciben una nota de una línea. Obligarte a elegir entre "ADR o no ADR" afina lo que cuenta como una decisión arquitectónica real.

**Archivos a implementar**: un árbol de directorios con un conteo total. Aquí es donde los IPs revelan el aumento de alcance antes de que ocurra.

```
src/
└── feature/
    ├── feature.types.ts
    ├── feature.service.ts
    └── feature.adapter.ts

tests/
└── unit/feature/
    └── feature.service.test.ts

Total: 3 archivos de implementación + 1 archivo de prueba
```

Una **retrospectiva** completada después de que el IP se entregue. Lo que se entregó. Lo que se desvió. Lo que sobrevive de este IP al siguiente.

Esa es toda la estructura. La plantilla breve la representa en aproximadamente cien líneas de markdown.

---

## La regla con la que soy religioso

Cada tarea de implementación recibe una prueba unitaria que pasa antes de que se haga *commit* del código. No después de la fase. No antes del *merge*. Antes del *commit*.

El orden importa:

1. Escribe la prueba. Confirma que falla.
2. Aplica el código. Confirma que la prueba pasa.
3. Haz *commit* de ambos juntos.

Una build verde por sí sola no es suficiente. La build puede pasar mientras el código nuevo es código muerto, está conectado al tipo equivocado, o ha sido silenciosamente *mockeado* para estar de acuerdo consigo mismo. La prueba que falla es lo que demuestra que el código hace lo que el IP dijo que debía hacer.

---

## Un ejemplo concreto

He estado usando el sistema de IP en un mod de Minecraft que estoy construyendo, en parte porque es un dominio donde los asistentes de código con IA son notoriamente confiados y notoriamente equivocados. La Fabric API renombra clases entre versiones. El patrón de registro cambió entre Minecraft 1.19 y 1.20. `Item.Properties.setId` en 1.21 no existía antes. Sin un IP que nombre la versión y restrinja al agente, el modelo adivina desde los datos de entrenamiento y produce código que compila contra nada.

`IP-002` agrega un bloque de mineral y su ítem de drop. El seguimiento de tareas lista catorce tareas: registrar el bloque, registrar el ítem, crear las texturas, crear los JSON de modelo, escribir la tabla de loot, agregar los tags del bloque. Cada tarea cierra una brecha. La sección de archivos a implementar hace la superficie explícita:

```
src/main/java/com/arcaniummod/arcanium/
└── ArcaniumMod.java                              # registro de bloque + ítem

src/test/java/com/arcaniummod/arcanium/
├── ArcaniumOreRegistrationTest.java
└── ImpureArcaniumRegistrationTest.java

src/main/resources/
├── assets/arcanium/textures/
│   ├── block/arcanium_ore.png
│   └── item/impure_arcanium.png
├── assets/arcanium/models/
│   ├── block/arcanium_ore.json
│   ├── item/arcanium_ore.json
│   └── item/impure_arcanium.json
├── assets/arcanium/blockstates/arcanium_ore.json
├── assets/arcanium/lang/en_us.json
└── data/arcanium/loot_table/blocks/arcanium_ore.json

Total: 1 archivo fuente + 2 archivos de prueba + 10 archivos de recursos
```

El agente las trabaja en orden. Después de la tarea `002-02` (registrar el ítem), dos pruebas unitarias nuevas verifican que el ítem está en el registro, que el `BlockItem` apunta al bloque correcto, y que el campo estático expone la misma instancia que el registro devuelve. Las pruebas fallan primero. Esa es la barrera. El código entra. Las pruebas pasan. El *commit* aterriza.

La siguiente sesión que retoma `002-03` no necesita reexplicar lo que se hizo. Lee el IP, ve las tareas marcadas como Hechas, y continúa.

---

## Lo que necesitas para empezar

Elige una pieza de trabajo que de otro modo le entregarías a un agente de IA a lo largo de un par de sesiones. Abre un archivo de IP nuevo. Completa los metadatos. Escribe la descripción general en tres puntos. Lista las tareas que habrías explicado verbalmente. Referencia el IP desde el primer *commit*.

Después de algunos de estos, el formato deja de ser una plantilla y se vuelve un hábito. Después de suficientes, el código lleva su propio razonamiento, y cada sesión nueva hereda ese razonamiento automáticamente.

El repositorio: **github.com/edwintorres/ip-templates**. Dos archivos. Adáptalos a tu dominio.
