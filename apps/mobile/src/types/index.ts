export type Product = {
  id: string;
  store_id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  ativo: boolean;
};

export type Store = {
  id: string;
  nome: string;
  slug: string;
  bio?: string;
};
