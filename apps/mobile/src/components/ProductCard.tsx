import { StyleSheet, Text, View } from 'react-native';
import type { Product } from '../types';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.nome}</Text>
      <Text style={styles.description}>{product.descricao}</Text>
      <Text style={styles.price}>R$ {product.preco.toFixed(2)}</Text>
      <Text style={styles.stock}>Estoque: {product.estoque}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginTop: 4,
    color: '#555'
  },
  price: {
    marginTop: 8,
    fontWeight: '700',
    color: '#0a7f3f'
  },
  stock: {
    marginTop: 4,
    color: '#444'
  }
});
