---
title: "Los agentes de IA cambian dónde ocurre la planificación"
description: "La IA no hace que los flujos de datos sean simplemente más inteligentes. Cambia dónde vive la incertidumbre, y eso cambia cómo debemos diseñar la frontera entre pasos determinísticos y probabilísticos."
date: 2026-05-26
layout: layouts/post-header-overlay.njk
permalink: /es/blog/los-agentes-de-ia-cambian-donde-ocurre-la-planificacion/index.html
author: Edwin Torres
headerImage: /assets/images/blog/when-ai-moves-non-determinism-inside-the-workflow-hero.jpg
headerImageAlt: Arcos anaranjados y cálidos dentro de un auditorio, vistos desde el área de asientos hacia el escenario.
locale: es
tags:
  - ingeniería
  - ingeniería-de-datos
  - agéntico
translation: /en/blog/agentic-workflows-change-where-planning-happens/
---

Dado el mismo input, bajo las mismas condiciones, el sistema normalmente debería producir el mismo output.

Esa expectativa moldeó cómo pensamos sobre los sistemas de software. Escribimos código. Corremos pruebas. Desplegamos pipelines. Depuramos fallas rastreando lo que ocurrió paso a paso.

Esto no significa que el software haya sido perfectamente determinístico.

Los sistemas distribuidos tienen condiciones de carrera. Los algoritmos aleatorizados usan probabilidad. Los modelos de machine learning producen resultados estadísticos. Los pipelines de datos pueden fallar porque un archivo llegó tarde, un esquema cambió o una dependencia tuvo timeout.

Así que el no determinismo no es nuevo.

Lo que está cambiando es dónde vive ahora ese no determinismo.

En los flujos de datos tradicionales, la mayor parte de la incertidumbre ocurre alrededor del sistema: datos tardíos, registros malos, fallas de red, archivos faltantes, formatos inesperados, problemas de concurrencia. El flujo en sí normalmente sigue siendo una secuencia fija de pasos.

1. Extraer estos datos.
2. Validar este esquema.
3. Transformar estos campos.
4. Cargar esta tabla.

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart LR
  A([Extraer datos]) --> B([Validar esquema])
  B --> C([Transformar campos])
  C --> D([Cargar tabla])
  E([Datos tardíos]) -.-> A
  F([Registros malos]) -.-> B
  G([Timeout de dependencia]) -.-> D
</pre>

Aunque los inputs sean desordenados, las instrucciones son explícitas.

La IA cambia ese patrón.

Con los LLMs, la incertidumbre se mueve dentro del paso de decisión. El modelo puede resumir, clasificar, enrutar, generar código, escoger una herramienta o decidir la próxima acción. El flujo ya no solo ejecuta lógica predefinida. Parte de la lógica se genera durante la ejecución.

Ese es un cambio importante.

Un flujo de datos normal dice:

Corre este paso. Luego corre aquel paso.

Un flujo con IA puede decir:

Mira la situación y decide qué paso debe ocurrir después.

Un flujo agéntico va más lejos:

Decide, actúa, observa el resultado y luego vuelve a decidir.

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart TD
  A([Recibir solicitud]) --> B([Validar inputs])
  B --> C([Cargar herramientas y políticas permitidas])
  C --> D([Construir contexto])
  D --> E{El LLM decide el próximo paso}
  E --> F([Llamar herramienta o tomar acción])
  F --> G([Observar resultado])
  G --> H([Actualizar contexto])
  H --> E
  E --> I([Devolver output propuesto])
  I --> J([Validar esquema y permisos])
  J --> K{¿Puede escribir?}
  K -->|sí| L([Confirmar resultado])
  K -->|no| M([Escalar para revisión])
</pre>

Ese loop es poderoso, pero también cambia el comportamiento del sistema. El output ya no es solo producto del código y los datos. También es producto del contexto, los prompts, el comportamiento del modelo, las respuestas de las herramientas y las decisiones intermedias anteriores.

Por eso los agentes no deben entenderse como automatización normal.

Un script sigue instrucciones.
Un pipeline ejecuta un plan.
Un agente participa en crear el plan mientras corre.

Esa distinción importa.

En ingeniería de datos, estamos acostumbrados a construir pipelines que se pueden repetir. Si una transformación falla, queremos volver a correrla. Si una tabla se ve mal, queremos rastrear el linaje. Si la carga de ayer funcionó y la de hoy falló, comparamos inputs, código, esquema y ambiente.

Los flujos agénticos hacen eso más difícil porque el camino en sí puede cambiar de una corrida a otra.

La misma solicitud de usuario puede producir un plan distinto.
El mismo plan puede llamar herramientas distintas.
El mismo resultado de una herramienta puede llevar a un próximo paso distinto.
El mismo flujo puede detenerse temprano, dar más vueltas o crear una forma de output diferente.

Eso no hace que los flujos agénticos sean inútiles.

Significa que pertenecen a una categoría distinta de sistema.

No son simplemente pipelines determinísticos con pasos más inteligentes. Son sistemas híbridos donde la ejecución determinística y la toma de decisiones probabilística se mezclan.

Esa mezcla es donde empieza el verdadero reto de ingeniería.

Hay una versión formal útil de este argumento en el paper [*The Stochastic Gap: A Markovian Framework for Pre-Deployment Reliability and Oversight-Cost Auditing in Agentic Artificial Intelligence*](https://arxiv.org/html/2603.24582v1). Los autores describen los flujos agénticos empresariales como sistemas de control estocástico, donde la pregunta no es si un próximo paso parece plausible, sino si toda la trayectoria del flujo está respaldada, es gobernable y justifica el costo de supervisión.

La pregunta importante no es simplemente:

¿Puede la IA hacer esta tarea?

La mejor pregunta es:

¿Qué partes de este flujo deben ser determinísticas, y qué partes pueden ser probabilísticas?

Para los flujos de datos, esa pregunta importa mucho.

Algunas partes deben mantenerse estrictas: esquemas, validaciones, permisos, linaje, escrituras, eliminaciones, cálculos financieros, cargas de producción.

Otras partes pueden tolerar incertidumbre: resúmenes, sugerencias de mapeo, explicaciones de anomalías, borradores de documentación, análisis exploratorio.

El peligro está en tratar ambas categorías igual.

Cuando agregamos IA a los flujos de datos, no estamos agregando simplemente una función más inteligente. Estamos cambiando el perfil de determinismo del sistema.

Eso puede ser aceptable en algunos lugares. Puede ser peligroso en otros.

El trabajo ahora es aprender dónde pertenece esa frontera.

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  await mermaid.run();
</script>
