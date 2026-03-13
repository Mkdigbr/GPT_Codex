# Proposta de aplicativo: catálogo digital mobile para vendas on-line

## Visão do produto
Aplicativo mobile-first para pequenos vendedores criarem uma loja digital simples:
- cadastram produtos com foto, descrição, preço e estoque;
- compartilham um link público da sua loja nas redes sociais;
- recebem pagamentos on-line.

## MVP (primeira versão)

### 1) Cadastro e autenticação do vendedor
- Login por e-mail/senha.
- Recuperação de senha.
- Perfil da loja (nome, logo, descrição, WhatsApp, Instagram).

### 2) Gestão de produtos
- CRUD completo de produtos (criar, editar, listar, inativar).
- Upload de imagens.
- Categoria e tags simples.
- Controle básico de estoque (quantidade disponível).

### 3) Loja pública por link
- Cada vendedor recebe uma URL pública:
  - Exemplo: `https://seuapp.com/loja/nomedaloja`
- Slug editável (com validação de disponibilidade).
- Função de link curto:
  - Exemplo: `https://seuapp.com/s/abc123`
- Botão “compartilhar” otimizado para redes sociais.

### 4) Carrinho e checkout
- Carrinho com múltiplos itens.
- Cálculo de subtotal e total.
- Checkout simples em poucas etapas.

### 5) Pagamento (opção mais fácil de integrar)
**Sugestão principal: Stripe Checkout**
- Integração rápida e documentação robusta.
- Permite cartão e outros meios conforme país.
- Fluxo seguro redirecionando para checkout hospedado.

**Alternativas por mercado:**
- Mercado Pago (forte na América Latina).
- Asaas / Pagar.me (boas opções no Brasil).

## Arquitetura recomendada (rápida para lançar)

### Front-end mobile
- **React Native com Expo** (Android/iOS a partir de uma base).
- Navegação com Expo Router.
- UI com NativeWind ou React Native Paper.

### Back-end
- **Supabase** (mais simples para MVP):
  - Auth pronto;
  - PostgreSQL;
  - Storage para imagens;
  - políticas de segurança (RLS).
- API via Edge Functions ou backend Node.js leve.

### Banco de dados (modelo inicial)
- `users` (id, nome, email, created_at)
- `stores` (id, user_id, nome, slug, bio, logo_url, created_at)
- `products` (id, store_id, nome, descricao, preco, estoque, ativo, created_at)
- `product_images` (id, product_id, image_url, ordem)
- `orders` (id, store_id, customer_name, total, status, payment_provider, payment_ref, created_at)
- `order_items` (id, order_id, product_id, quantidade, preco_unitario)
- `short_links` (id, store_id, code, target_url, created_at)

## Fluxo principal do usuário vendedor
1. Cria conta.
2. Define nome da loja e slug.
3. Cadastra produtos com foto e preço.
4. Publica loja e copia link curto.
5. Compartilha em Instagram, TikTok, WhatsApp etc.
6. Recebe pedidos e pagamentos.

## Funcionalidades importantes para fase 2
- Cupons de desconto.
- Frete e cálculo por CEP.
- Integração com WhatsApp para atendimento.
- Pix (quando provider suportar).
- Painel com métricas (visualizações, conversão, ticket médio).
- Catálogo com variações (tamanho/cor).

## Segurança e conformidade
- HTTPS obrigatório.
- JWT + refresh token.
- RLS no banco para isolamento de dados por loja.
- Webhooks de pagamento com validação de assinatura.
- Logs de auditoria para ações críticas.

## Roadmap sugerido (8 semanas)
- **Semana 1-2:** setup do app, autenticação, modelo de dados.
- **Semana 3-4:** CRUD de produtos e upload de imagens.
- **Semana 5:** loja pública e slug editável.
- **Semana 6:** checkout + Stripe.
- **Semana 7:** links curtos + compartilhamento social.
- **Semana 8:** testes, ajustes e publicação beta.

## Stack concreta para começar hoje
- App: Expo (React Native + TypeScript)
- Backend/Banco: Supabase
- Pagamento: Stripe Checkout
- Hospedagem de páginas web auxiliares: Vercel
- Analytics: PostHog (ou Firebase Analytics)


## Critérios de sucesso do MVP (primeiros 90 dias)
- **Ativação:** pelo menos 60% dos usuários que se cadastram publicam a loja no mesmo dia.
- **Adoção de catálogo:** média de 8+ produtos ativos por loja publicada.
- **Conversão mínima:** 2% de conversão visita -> pedido nas lojas públicas.
- **Tempo para publicar:** vendedor consegue criar loja e compartilhar link em até 30 minutos.

## Custos iniciais estimados (faixa para validação)
- **Expo + app mobile:** baixo custo inicial de infraestrutura.
- **Supabase:** plano gratuito no início, com upgrade conforme volume de storage e banco.
- **Stripe:** sem mensalidade obrigatória, custo por transação (varia por país).
- **Domínio e hospedagem web auxiliar:** custo mensal baixo para páginas públicas/encurtador.

## Principais riscos e mitigação
- **Risco:** abandono no onboarding.  
  **Mitigação:** fluxo de criação de loja em 3 passos, com checklist visual.
- **Risco:** baixa confiança na loja pública.  
  **Mitigação:** padronizar layout, selo de pagamento seguro e política de troca.
- **Risco:** falhas de webhook de pagamento.  
  **Mitigação:** retentativa idempotente, logs e painel de reconciliação de pedidos.

## Próximos passos imediatos
1. Validar nome do produto e público-alvo.
2. Escolher provider de pagamento de acordo com país principal dos vendedores.
3. Criar wireframes das telas: login, dashboard, produto, loja pública, checkout.
4. Iniciar implementação do MVP com foco em “publicar loja em menos de 30 minutos”.

---

Se você quiser, na próxima etapa eu posso transformar isso em:
- backlog técnico (histórias + critérios de aceite),
- estrutura de banco SQL inicial,
- e esqueleto de projeto Expo + Supabase já pronto para codar.
