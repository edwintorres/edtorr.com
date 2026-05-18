---
title: "Agentes de IA en términos simples"
description: "La palabra agente perdió casi todo su significado. La forma más rápida de recuperarlo es verlo en código. Tres piezas, un archivo corto."
date: 2026-05-16
layout: layouts/post-header-overlay.njk
permalink: /es/blog/que-es-un-agente-en-30-lineas-de-typescript/index.html
author: Edwin Torres
headerImage: /assets/images/blog/what-an-agent-is-in-30-lines-of-typescript-hero.jpg
headerImageAlt: Una tabla de paddle BOGA turquesa descansando en diagonal sobre la arena tibia al atardecer.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: es
tags:
  - ingeniería
  - agentes-de-ia
translation: /en/blog/what-an-agent-is-in-30-lines-of-typescript/
---

Las palabras *agente* y *agentic* se usan tanto últimamente que realmente cuesta ver qué hay detrás de la jerga. Ya suena como algo que solo las empresas grandes pueden construir. No lo es. La estructura cabe en menos de cien líneas de TypeScript, y una vez que la ves, la palabra pierde todo su misterio.

La forma más rápida de entenderlo es ver qué es realmente un agente, desarmado en sus piezas.

Boris Cherny, creador de Claude Code, ofreció en Lenny's Podcast la explicación más clara que he leído:

> Pero nadie ha usado realmente un agente antes, y esta palabra *agente* se anda tirando todo el tiempo, y está tan mal usada que perdió todo significado. Pero *agente* tiene un significado técnico muy específico: es una IA, es un LLM que puede usar herramientas. Así que no solo habla. Puede actuar de verdad, puede interactuar con tu sistema. Eso significa que puede usar tu Google Docs, puede mandar correos, puede correr comandos en tu computadora, todas esas cosas.

Un LLM con herramientas, en un loop. Eso es todo. Acá está en dibujo:

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart TD
  A([Le pides algo a la IA]) --> B([Llamar al LLM])
  B --> C{¿Necesita una herramienta?}
  C -->|sí| D([Corre la herramienta])
  D -->|resultado| B
  C -->|no| E([La IA responde])
</pre>

El loop es la flecha que va desde *Corre la herramienta* de vuelta a *Llamar al LLM*. Eso es lo que convierte una llamada al modelo en un agente. Acá está la misma idea en TypeScript:

```ts
import Anthropic from "@anthropic-ai/sdk";

// EL LLM. Cliente estándar del SDK.
const client = new Anthropic();

// LAS HERRAMIENTAS. Cada una tiene un nombre, una descripción que el modelo
// lee, y un esquema JSON para sus argumentos. Esto es el catálogo de lo
// que el agente tiene permitido hacer.
const tools = [{
  name: "send_email",
  description: "Send an email to a recipient.",
  input_schema: {
    type: "object",
    properties: {
      to:      { type: "string" },
      subject: { type: "string" },
      body:    { type: "string" },
    },
    required: ["to", "subject", "body"],
  },
}];

// Lo que la herramienta efectivamente hace. El modelo nunca corre este
// código. Tu proceso sí, y después le devuelve el resultado al modelo.
function runTool(name, input) {
  if (name === "send_email") return `Sent to ${input.to}`;
  throw new Error(`Unknown tool: ${name}`);
}

// La conversación hasta ahora. Empieza con un mensaje del usuario.
const messages = [
  { role: "user", content: "Email alice@example.com to say hello." },
];

// EL LOOP. Cada iteración es un turno.
while (true) {
  // Le preguntamos al modelo qué hacer ahora, con todo lo que pasó hasta acá.
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,
    messages,
  });

  // Guardamos lo que el modelo dijo para que el próximo turno lo vea.
  messages.push({ role: "assistant", content: res.content });

  // Si el modelo no pidió una herramienta, la tarea terminó.
  if (res.stop_reason !== "tool_use") break;

  // Corremos cada herramienta que el modelo pidió y juntamos los resultados.
  const results = res.content
    .filter((b) => b.type === "tool_use")
    .map((b) => ({
      type: "tool_result",
      tool_use_id: b.id,
      content: runTool(b.name, b.input),
    }));

  // Devolvemos los resultados como mensaje del usuario. El loop sigue.
  messages.push({ role: "user", content: results });
}
```

Eso es. Eso es un agente. Tres piezas, todas visibles en el código:

**Un modelo.** La llamada `client.messages.create` es el LLM. Le pasas la conversación hasta ahora y le preguntas qué hacer después.

**Herramientas (*tools*).** El arreglo `tools` es el catálogo de cosas que el modelo tiene permitido hacer. Cada herramienta es un nombre, una descripción y la forma de su entrada. En este caso hay una sola, `send_email`, pero podrías sumar `run_query`, `edit_file`, `open_browser`, cualquier cosa que quieras que el agente pueda alcanzar. El modelo elige; tu código ejecuta.

**Un loop.** El `while (true)` es lo que vuelve esto un agente y no solo una llamada al modelo. En cada vuelta, el modelo o llama una herramienta (la corres y le devuelves el resultado) o se detiene (sales del loop). El modelo está manejando su propio siguiente paso cada turno, y el loop es lo que permite que una sola instrucción (*mándale un correo a alice*) se convierta en la secuencia de llamadas que efectivamente cierra la tarea.

LLM. Herramientas. Loop. Esa es toda la arquitectura.

Una vez que ves esas tres piezas, *agente* deja de ser marketing y se vuelve una lista de chequeo:

- Si un producto se llama agente y el modelo no puede llamar herramientas, es un *chatbot*.
- Si llama herramientas pero una sola vez y se detiene, es un modelo que usa herramientas, no un agente.
- Si llama herramientas en un loop, y elige su propio siguiente paso cada turno, es un agente.

Hay más en un agente de producción que esto. Manejo de memoria, para que una tarea larga no pierda su lugar. Reintentos cuando una herramienta falla. Permisos sobre lo que el modelo tiene permitido hacer. *Prompts* estructurados. Observabilidad. Los sistemas reales conllevan más complejidad. Pero todos descansan sobre las mismas tres piezas.

---

*La cita de Boris Cherny es de su aparición en el podcast de Lenny, [Head of Claude Code: What happens after coding is solved](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens).*

---

## Pruébalo

Abajo hay un agente real corriendo en tu navegador. Pega tu [API key de Anthropic](https://docs.anthropic.com/en/api/getting-started), edita el código del agente o las herramientas, dale a Correr. Las tres piezas de este post están ahí, visibles y vivas.

<tiny-agent lang="es"></tiny-agent>
<script type="module" src="/assets/js/tiny-agent.js"></script>

*El widget es [de código abierto](https://github.com/edwintorres/tiny-agent) (MIT). Tu API key se queda en esta pestaña del navegador.*

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  await mermaid.run();
</script>
