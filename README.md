# Catálogo Mobile MVP

Este repositório agora contém um **esqueleto inicial funcional** para o app solicitado:

- `apps/mobile`: app React Native (Expo + TypeScript)
- `supabase/schema.sql`: schema inicial de banco para lojas, produtos, links curtos e pedidos

## Como rodar o app mobile

```bash
cd apps/mobile
cp .env.example .env
# preencha as variáveis EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run start
```

## O que já está implementado

- Tela inicial com busca de loja por `slug`
- Construção de link público e link curto
- Leitura de loja e produtos ativos via Supabase
- Card de produto com nome, descrição, preço e estoque

## Próximos incrementos recomendados

1. Autenticação completa (signup/login/recuperação)
2. CRUD de produtos com upload de imagens
3. Checkout com Stripe Checkout
4. Painel de pedidos por loja
5. Deep links e compartilhamento para redes sociais


## Testes rápidos

Sem depender de `npm install`, você pode validar a estrutura do MVP com:

```bash
python scripts/test_mvp_smoke.py
```

Para teste completo da interface (local):

```bash
cd apps/mobile
cp .env.example .env
npm install
npm run start
```

## Passo a passo (iniciante) para testar visualmente

### 1) Pré-requisitos (instalar uma vez)
1. Instale o **Node.js LTS**: https://nodejs.org
2. No celular, instale o **Expo Go**:
   - Android: Play Store
   - iPhone: App Store
3. Crie conta no **Supabase**: https://supabase.com

### 2) Criar projeto no Supabase
1. No painel do Supabase, clique em **New project**.
2. Aguarde criar o banco.
3. Vá em **SQL Editor** e execute o arquivo `supabase/schema.sql` deste repositório.

### 3) (Opcional, mas recomendado) inserir dados de teste
No SQL Editor, rode algo como:

```sql
insert into public.stores (id, user_id, nome, slug, bio)
values (
  gen_random_uuid(),
  gen_random_uuid(),
  'Loja Demo',
  'minha-loja',
  'Catálogo de demonstração'
)
returning id;
```

Depois use o `id` retornado para inserir produtos:

```sql
insert into public.products (store_id, nome, descricao, preco, estoque, ativo)
values
  ('<STORE_ID>', 'Camiseta Básica', 'Algodão, unissex', 59.90, 15, true),
  ('<STORE_ID>', 'Boné Preto', 'Tamanho único', 39.90, 8, true);
```

### 4) Pegar credenciais do Supabase
1. No Supabase: **Project Settings > API**.
2. Copie:
   - `Project URL`
   - `anon public key`

### 5) Configurar o app local
No terminal, na raiz do projeto:

```bash
cd apps/mobile
cp .env.example .env
```

Abra `apps/mobile/.env` e preencha:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

### 6) Iniciar o app
Ainda em `apps/mobile`:

```bash
npm install
npm run start
```

Você verá um QR Code no terminal.

### 7) Ver o app no celular (visual)
1. Deixe celular e computador na **mesma rede Wi-Fi**.
2. Abra Expo Go no celular.
3. Escaneie o QR Code exibido pelo `npm run start`.
4. O app vai abrir com a tela **Catálogo Mobile**.

### 8) Ver o app no navegador (visual)
Se quiser testar no browser:

```bash
npm run web
```

### 9) O que validar na interface
- Campo **Slug da loja** aparece e permite edição.
- Botão **Buscar loja** funciona.
- Textos de **Link público** e **Link curto** aparecem.
- Lista de produtos mostra cards quando existem dados no Supabase.

### 10) Solução de problemas comum
- **Tela sem produtos**: confirme se inseriu `stores` e `products` com `ativo = true`.
- **Erro de conexão**: confira URL/chave no `.env`.
- **Expo não abre no celular**: use a mesma rede Wi-Fi ou mude para modo `tunnel` no Expo.
