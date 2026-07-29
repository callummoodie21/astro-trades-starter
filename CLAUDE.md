Read README.md first - it documents the architecture and the deploy workflow.

Rules specific to this repo:
- Components contain no content and no hex colours. Everything client-specific
  lives in site.config.ts. Adding a string or a colour to a component breaks
  the whole premise.
- Don't remove the contact-form guard in src/lib/site.ts.
- demo.enabled must be false for real clients, true for fictional ones.
- The Web3Forms key comes from PUBLIC_WEB3FORMS_KEY. Never hardcode it.
- Zero JS ships by default. An island has to work without JavaScript first.