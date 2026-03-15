# Nexxus Scout - Arquitetura

Camadas desacopladas:
1. Interface (SPA em `index.html` + `app.js`)
2. Serviços (`backend/services`)
3. Normalização (`backend/connectors/connectors.js`)
4. Persistência (`backend/schema.sql`)
5. Análise (score e insights no frontend)
6. Integrações futuras (conectores extras)

Regra: a interface consome apenas entidades padronizadas, nunca payload bruto de marketplace.
