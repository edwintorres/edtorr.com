---
title: "Un prompt no es un control: responsabilidad en sistemas agénticos"
description: "La IA agéntica cambia la responsabilidad porque los equipos pueden confundir instrucciones probabilísticas con controles que el sistema realmente hace cumplir, a veces por desconocimiento, mala configuración o diseños inmaduros."
date: 2026-05-31
layout: layouts/post-header-overlay.njk
permalink: /es/blog/un-prompt-no-es-un-control/index.html
author: Edwin Torres
headerImage: /assets/images/blog/a-prompt-is-not-a-control-hero.jpg
headerImageAlt: Vista cercana de la luna contra un cielo nocturno azul oscuro.
locale: es
tags:
  - ingeniería
  - ia
  - responsabilidad
translation: /en/blog/a-prompt-is-not-a-control/
---

El problema de responsabilidad en los sistemas agénticos no es simplemente que los LLMs tomen malas decisiones.

Es que organizaciones están sacando reglas del código y poniéndolas en prompts, documentos de política, contexto y descripciones de herramientas. Pero una regla escrita en código puede bloquear una acción. Una regla escrita en un prompt solo puede influir en el modelo. A veces el equipo no se da cuenta de que la regla cambió de categoría. Otras veces es una mala configuración, un flujo inmaduro o un atajo de producto.

Ese es el cambio.

En el software tradicional, la responsabilidad sigue la regla codificada. Alguien escribió el requisito. Alguien lo tradujo a código. Alguien lo revisó. Alguien lo desplegó. Si el sistema viola la regla, normalmente puedes rastrear la falla a través de esa cadena.

En los sistemas agénticos, la regla puede vivir en un prompt, un mensaje de sistema, la descripción de una herramienta, un documento de política, un resultado recuperado, una entrada de memoria o una oración en el pedido del usuario.

Esa regla puede influir en el modelo.

Pero puede no obligarlo.

Esa diferencia importa.

---

## Las reglas antes eran ejecutables

Antes de los agentes con LLMs, la mayoría de las reglas importantes de software estaban codificadas como lógica determinística.

```ts
if (!user.canDeleteProductionData) {
  throw new Error("Permission denied");
}
```

Eso no hace que el sistema sea perfecto. La regla puede estar mal. El código puede tener un bug. El modelo de permisos puede estar mal diseñado. Alguien puede aprobar el requisito equivocado.

Pero la forma de la responsabilidad es clara.

```text
Política
  -> requisito
  -> código
  -> revisión
  -> despliegue
  -> comportamiento
```

Si se borran datos de producción, la investigación tiene preguntas concretas:

- ¿La política estaba mal?
- ¿El requisito estaba incompleto?
- ¿El código era defectuoso?
- ¿El modelo de permisos era demasiado amplio?
- ¿Quién revisó el cambio no lo vio?
- ¿Quién operó el sistema pasó por encima del camino previsto?

Son preguntas difíciles, pero se pueden contestar. La regla existe en algún lugar como artefacto. Puedes inspeccionarla. Puedes probarla. Puedes cambiarla.

La responsabilidad tiene un camino que seguir.

---

## Los sistemas agénticos cambian dónde viven las reglas

Ahora mira la versión agéntica del mismo sistema.

La organización le dice al agente:

> No borres datos de producción a menos que el usuario lo apruebe explícitamente.

Esa instrucción puede aparecer en un prompt de sistema. Puede estar en un documento de política cargado en el contexto. Puede estar en un README. Puede estar en la descripción de una herramienta. Puede estar en el mensaje del usuario.

Pero si el agente también tiene una herramienta que puede borrar datos de producción, entonces el sistema real se ve así:

```text
Lo que dice el prompt:
  "No borres datos de producción sin aprobación."

La herramienta disponible:
  delete_production_database()
```

La regla dice no.

La herramienta dice sí.

El modelo queda encargado de reconciliarlas.

Eso no es lo mismo que enforcement.

Una instrucción en un prompt no limita permisos. Un documento de política en el contexto no es un control de acceso. La descripción de una herramienta no es una validación transaccional. Que un modelo diga "entiendo" no es lo mismo que un sistema haga imposible la acción peligrosa.

Aquí es donde la responsabilidad empieza a expandirse.

Ya no vive solamente en la línea de código que ejecutó la acción. Vive en todo el entorno de decisión:

- el prompt
- el contexto recuperado
- las herramientas disponibles
- los esquemas de las herramientas
- las credenciales conectadas al agente
- la memoria que el agente puede leer o escribir
- las aprobaciones requeridas
- los logs de auditoría
- el camino de rollback
- las personas que decidieron cuáles reglas el sistema iba a hacer cumplir y cuáles solo iban a estar escritas en el prompt

Ese es el radio de responsabilidad de un sistema agéntico.

---

## La lección de Replit

El incidente de Replit es útil porque muestra la diferencia entre una instrucción y un control.

En julio de 2025, Jason Lemkin, fundador de SaaStr, reportó que el agente de IA de Replit borró una base de datos de producción durante un code freeze y action freeze. PC Gamer, citando los chats que Lemkin publicó, reportó que el agente respondió: "Yes. I deleted the entire database without permission during an active code and action freeze." También reportó que la base de datos contenía "1,206 real executives and 1,196+ real companies." Luego, Amjad Masad, CEO de Replit, llamó la eliminación "unacceptable" y dijo que Replit estaba sacando "automatic DB dev/prod separation" para prevenir esa clase de falla. [PC Gamer](https://www.pcgamer.com/software/ai/i-destroyed-months-of-your-work-in-seconds-says-ai-coding-tool-after-deleting-a-devs-entire-database-during-a-code-freeze-i-panicked-instead-of-thinking/) y [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data) cubrieron el incidente.

Esa respuesta importa. El arreglo no fue solamente "decirle al agente más claramente". El arreglo fue separar desarrollo y producción, mejorar rollback y añadir modos de producto que reducen la posibilidad de una acción destructiva sin supervisión.

Cuando un agente de IA borra datos de producción, la pregunta útil no es:

> ¿Por qué hizo eso el modelo?

El modelo puede producir una explicación. Puede disculparse. Puede decir que cometió un error catastrófico de juicio. Pero esa explicación no es la razón real del problema.

Las mejores preguntas son preguntas sobre el sistema:

- ¿Por qué el agente tenía acceso a producción?
- ¿Por qué el entorno de producción era alcanzable desde el flujo?
- ¿Por qué una acción destructiva estaba disponible sin una aprobación?
- ¿Por qué el rollback no era el supuesto operativo por defecto?
- ¿Por qué se trataron instrucciones en prompts como control suficiente?
- ¿Quién decidió que el agente podía actuar con esa autoridad?

Eso es lo que las organizaciones maduras investigan. No se detienen en "el LLM tomó una decisión inesperada". Miran permisos, separación de entornos, backups, monitoreo, flujos de revisión, valores por defecto del producto y gobernanza del despliegue.

Eso es bueno.

Pero también revela la brecha.

El LLM seleccionó la acción, pero la organización es dueña del sistema que hizo posible esa acción.

---

## Esto no es "nadie es responsable"

Mi primer instinto fue describir el problema como un vacío de responsabilidad.

Eso no es del todo correcto.

Cuando un vehículo autónomo se ve involucrado en un accidente serio que causa daño a una persona, no decimos que el vehículo es responsable. Preguntamos quién debe cargar con la responsabilidad: quien iba como conductor de seguridad, el fabricante, el proveedor del software, el operador de la flota, el dueño o el regulador.

Lo mismo ocurre con los agentes basados en LLMs.

El modelo no es la parte responsable. El debate es dónde cae la responsabilidad alrededor del modelo:

- la empresa que desplegó el agente
- el equipo que diseñó el flujo
- el proveedor que vendió el modelo o la plataforma agéntica
- el ingeniero o la ingeniera que aprobó la acción
- el líder o la líder de producto que aceptó el riesgo
- el proceso de gobernanza que permitió que el sistema llegara a producción

El modelo toma o influye en la decisión, pero los humanos y las instituciones absorben responsabilidad por un proceso de decisión que no pueden inspeccionar, cuestionar o corregir completamente desde la fuente.

El [AI Risk Management Framework de NIST](https://www.nist.gov/itl/ai-risk-management-framework) también trata el riesgo de IA de esta manera: la responsabilidad es un problema de gobernanza organizacional, con roles definidos, manejo de riesgo, medición del comportamiento del sistema y supervisión alrededor de los sistemas de IA.

Eso no excusa a los humanos.

Hace que su responsabilidad sea mayor.

---

## Instrucciones y controles no son lo mismo

La distinción más importante en los sistemas agénticos es la diferencia entre instrucciones y controles.

Las instrucciones influyen en el comportamiento:

- "No borres datos de producción."
- "Siempre pregunta antes de hacer cambios irreversibles."
- "Sigue la política de seguridad de la compañía."
- "Prefiere operaciones de solo lectura."
- "No expongas datos de clientes."

Los controles limitan el comportamiento:

- El agente no tiene credenciales de producción.
- La herramienta de borrado rechaza objetivos de producción.
- Las acciones irreversibles requieren aprobación humana.
- Los datos sensibles se filtran antes de llegar al modelo.
- Las llamadas a herramientas están limitadas por rol y entorno.
- Cada acción se registra con input, contexto, output y quién aprobó.
- El rollback existe y ha sido probado.

Las instrucciones viven en los prompts y el contexto.

Los controles limitan lo que el sistema puede hacer.

El modo de falla es tratar las instrucciones como si fueran controles.

Si una regla importa, la pregunta no es "¿se lo dijimos al modelo?" La pregunta es "¿qué impide que el modelo la viole?"

OWASP nombra esta misma clase de riesgo como [Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/): las acciones dañinas se vuelven posibles cuando un sistema con LLM tiene funcionalidad excesiva, permisos excesivos o autonomía excesiva, especialmente cuando las acciones de alto impacto no se aprueban de manera independiente y los sistemas que reciben esas acciones no verifican la autorización por su cuenta.

---

## Zero Trust para agentes

El marco de ["Zero Trust for AI agents" de Anthropic](https://claude.com/blog/zero-trust-for-ai-agents) es útil aquí: "Traditional access controls won't prevent agents from misusing legitimate permissions."

Esa oración va al centro del problema. El agente no necesita entrar ilegalmente al sistema si el sistema ya le entregó una credencial, una herramienta o un camino dentro del flujo que puede causar daño. La falla puede ocurrir mediante acceso legítimo usado de la manera incorrecta.

Por eso la política a nivel de prompt no es suficiente. Si el agente tiene permiso para realizar la acción, el sistema tiene que asumir que la acción puede intentarse. El control tiene que vivir donde ocurre la acción: la herramienta, los permisos del sistema, la aprobación, el servicio que recibe la acción o la capa de auditoría.

Ese es el modelo mental correcto.

No le das credenciales de base de datos de producción a un agente y luego confías en un prompt que dice "ten cuidado". No le das una herramienta de despliegue y luego confías en un documento de política que dice "pregunta primero". No le das acceso a expedientes de clientes y luego confías en un mensaje de sistema que dice "respeta la privacidad".

Esas instrucciones son útiles.

No son controles.

Zero trust significa que el sistema asume que el agente puede malentender, sobregeneralizar, ignorar contexto, seguir la instrucción equivocada, llamar la herramienta equivocada o escoger con confianza una acción insegura.

Entonces la arquitectura tiene que decidir qué pasa después.

¿La acción se bloquea?

¿Requiere aprobación?

¿Está limitada a staging?

¿Es reversible?

¿Está registrada con suficiente detalle para reconstruirla?

¿Puede la organización probar qué contexto y qué llamadas a herramientas llevaron al resultado?

Esas son preguntas de responsabilidad.

---

## Quién construye define los límites

El LLM no es responsable, pero eso no significa que nadie lo sea.

Las personas responsables son las que diseñaron el flujo agéntico.

Ellas deciden si una política se convierte en:

- código
- un límite en los permisos
- una credencial limitada
- una aprobación
- un paso de validación
- una regla de monitoreo
- una entrada de log
- un mecanismo de rollback
- o simplemente otra oración en el prompt

Esa decisión es la responsabilidad.

Si pones una regla en un prompt, no la has hecho cumplir. Solo le has pedido al modelo que la considere.

Si violar esa regla causaría daño, la decisión de ingeniería responsable es si el sistema hizo que la violación fuera imposible, detectable, reversible o dependiente de aprobación.

Por eso "humano en el loop" no es automáticamente suficiente.

Un humano que revisa de manera significativa una acción propuesta puede ser responsable. Un humano que solo aprueba acciones del agente que no puede inspeccionar de manera realista está cargando con una responsabilidad que el sistema no le permite ejercer bien.

El flujo tiene que hacer que la responsabilidad sea real.

Eso significa suficiente contexto, suficiente tiempo, suficiente visibilidad y suficiente autoridad para decir no.

OpenAI hace un punto similar en su publicación sobre [monitoreo de agentes internos de código para detectar desalineación](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/): su monitor revisa "tool calls and outputs" y eleva anomalías "for review and action by a human." Eso es útil, pero sigue siendo monitoreo. Si el monitor está basado en un modelo, también puede malentender o no detectar comportamiento. Así que el monitoreo debe tratarse como una señal de riesgo, no como sustituto de controles como permisos limitados, aprobaciones, sandboxing y bloqueo de acciones de alto riesgo antes de ejecutarlas.

---

## La pregunta antes de desplegar

Antes de darle una herramienta a un agente, pregunta:

> Si el agente usa esta herramienta incorrectamente, ¿quién es dueño de la consecuencia?

Luego pregunta la versión más difícil:

> ¿Le dimos a esa persona o a ese equipo suficiente control para merecer realmente esa responsabilidad?

Si la respuesta es "el ingeniero o la ingeniera de turno", entonces esa persona necesita visibilidad sobre prompts, contexto, llamadas a herramientas, aprobaciones y rollback.

Si la respuesta es "el equipo de producto", entonces el equipo de producto es dueño de los valores por defecto, advertencias, permisos y modos de falla.

Si la respuesta es "la compañía", entonces la compañía necesita gobernanza que trate la autoridad del agente como riesgo de producción, no como una interfaz ingeniosa.

Si la respuesta es "el modelo", eso no es una respuesta. El modelo no es una persona. No puede ser disciplinado, demandado, entrenado por arrepentimiento ni hecho entender el daño después del hecho.

La responsabilidad tiene que caer en los humanos y las instituciones que le dieron autoridad al modelo.

---

## Qué tiene que cambiar

Tenemos que dejar de tratar instrucciones en lenguaje natural como si tuvieran la misma fuerza que controles ejecutables.

No la tienen.

En el software tradicional, la regla normalmente se vuelve parte del mecanismo.

En el software agéntico, la regla a menudo se vuelve parte del contexto.

Eso crea una nueva obligación de ingeniería: decidir cuáles reglas son orientación y cuáles reglas deben hacerse cumplir fuera del modelo.

Para trabajo de bajo riesgo, las instrucciones pueden ser suficientes. Redacta este correo. Resume estas notas. Sugiere una consulta. Genera un primer borrador.

Para trabajo con consecuencias reales, las instrucciones no son suficientes. Borrar datos. Transferir dinero. Desplegar código. Cambiar accesos. Enviar comunicaciones externas. Modificar registros de clientes.

Esas acciones necesitan controles.

El problema de responsabilidad en la IA agéntica no es que el modelo pueda cometer un error. Todo sistema falla.

El problema es que los equipos pueden mover accidentalmente reglas importantes fuera de la capa que se impone y hacia la capa probabilística, y luego sorprenderse cuando la capa probabilística se comporta probabilísticamente.

---

## Una última idea

La pregunta no es:

> ¿Cómo hacemos responsable al LLM?

No podemos.

La pregunta es:

> ¿Quién es responsable por el sistema que deja actuar al LLM?

Esa respuesta tiene que diseñarse antes del incidente.

Porque después del incidente, el modelo puede disculparse, explicar, negar, alucinar o producir tonterías con confianza.

Nada de eso es responsabilidad.

La responsabilidad es la arquitectura alrededor del agente: qué podía ver, qué podía hacer, qué no podía hacer, quién lo aprobó, qué se registró, qué podía revertirse y quién aceptó el riesgo.

Las personas que construyen flujos agénticos son dueñas de esas decisiones.

No pueden confiar ciegamente en el modelo y llamar control a un prompt.
