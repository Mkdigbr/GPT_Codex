import { supabase } from './supabase';
import type { Product, Store } from '../types';

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from('stores')
    .select('id, nome, slug, bio')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erro ao buscar loja:', error.message);
    return null;
  }

  return data as Store;
}

export async function listProductsByStore(storeId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, store_id, nome, descricao, preco, estoque, ativo')
    .eq('store_id', storeId)
    .eq('ativo', true)
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    return [];
  }

  return (data ?? []) as Product[];
}

export function buildPublicStoreUrl(slug: string): string {
  return `https://seuapp.com/loja/${slug}`;
}

export function buildShortStoreUrl(code: string): string {
  return `https://seuapp.com/s/${code}`;
}
