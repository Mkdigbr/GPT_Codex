-- Extensões úteis
create extension if not exists pgcrypto;

-- Tabela de lojas
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  nome text not null,
  slug text not null unique,
  bio text,
  logo_url text,
  created_at timestamptz not null default now()
);

-- Produtos
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  nome text not null,
  descricao text not null default '',
  preco numeric(10,2) not null check (preco >= 0),
  estoque integer not null default 0 check (estoque >= 0),
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- Links curtos
create table if not exists public.short_links (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  code text not null unique,
  target_url text not null,
  created_at timestamptz not null default now()
);

-- Pedidos
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_name text,
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'pending',
  payment_provider text,
  payment_ref text,
  created_at timestamptz not null default now()
);

-- Itens do pedido
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantidade integer not null check (quantidade > 0),
  preco_unitario numeric(10,2) not null check (preco_unitario >= 0)
);

-- Índices básicos
create index if not exists idx_products_store_id on public.products(store_id);
create index if not exists idx_orders_store_id on public.orders(store_id);
create index if not exists idx_short_links_store_id on public.short_links(store_id);
