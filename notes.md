# Decision Log — Contact Form Backend

Date: 2025-09-09

Decision
- Deleted Azure API Management (APIM) to cut costs.
- Will not expose the Logic App publicly via the site for now.
- Accept that the contact form will remain broken temporarily until a proper, attack-resistant solution is in place.

Context
- Previous architecture: Frontend → APIM → Logic App (HTTP trigger) → Excel Online (add row).
- APIM cost was too high for current needs.
- Calling the Logic App directly from the browser exposes its signed URL and invites abuse (cost per run).
- Time is limited to implement a secure proxy immediately.

Impact
- Contact form submissions will fail (user sees an error); no data is stored.
- No APIM charges. Logic App/connector costs avoided as long as the public callback URL isn’t used.

Risks
- If the Logic App callback URL is left public (in frontend or anywhere visible), it can be abused and incur per-request charges.

Near-Term Options (to re-enable safely)
- PHP proxy on cPanel (recommended): Server-side reCAPTCHA, rate limit, hide Logic App URL; point frontend to `/api/contact.php`.
- Cloudflare Worker proxy: Similar protections at the edge if Cloudflare is in use.
- Azure Functions (Consumption): Minimal-cost shim with validation, then forward to Logic App (or replace Logic App).
- APIM Consumption tier: Keep APIM features with pay-per-call billing (more setup than a proxy).

Immediate Checklist
- If the Logic App URL was exposed: Rotate its access key (Logic App → Workflow settings → Access keys → Regenerate) and disable the workflow until a proxy is ready.
- Frontend: Keep/restore the contact form pointing to a non-functional or local endpoint (to avoid accidental charges) until a proxy is deployed.
- Monitoring: Add an alert on Logic App runs before re-enabling.

References
- Frontend submit code: `src/assets/js/contact.js`
- IaC templates (Logic App/Excel/APIM): `iac/ContactMe.json`, `iac/excelonline.json`, `iac/edtorrAPIM.json`

Notes
- Revisit this decision once a proxy is implemented; update the frontend endpoint and re-enable the workflow.
