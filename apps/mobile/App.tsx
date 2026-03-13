import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProductCard } from './src/components/ProductCard';
import { buildPublicStoreUrl, buildShortStoreUrl, getStoreBySlug, listProductsByStore } from './src/services/catalogService';
import type { Product } from './src/types';

export default function App() {
  const [slug, setSlug] = useState('minha-loja');
  const [storeName, setStoreName] = useState('Minha Loja');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const publicUrl = useMemo(() => buildPublicStoreUrl(slug), [slug]);
  const shortUrl = useMemo(() => buildShortStoreUrl('abc123'), []);

  async function loadStore() {
    setLoading(true);
    const store = await getStoreBySlug(slug);

    if (store) {
      setStoreName(store.nome);
      const productList = await listProductsByStore(store.id);
      setProducts(productList);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadStore();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Catálogo Mobile</Text>
        <Text style={styles.subtitle}>MVP inicial do app de vendas</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Slug da loja</Text>
          <TextInput value={slug} onChangeText={setSlug} style={styles.input} autoCapitalize="none" />
          <TouchableOpacity style={styles.button} onPress={loadStore}>
            <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Buscar loja'}</Text>
          </TouchableOpacity>
          <Text style={styles.meta}>Loja: {storeName}</Text>
          <Text style={styles.meta}>Link público: {publicUrl}</Text>
          <Text style={styles.meta}>Link curto: {shortUrl}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos ativos</Text>
          {products.length === 0 ? (
            <Text style={styles.empty}>Nenhum produto encontrado (configure Supabase para dados reais).</Text>
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#111' },
  subtitle: { marginTop: 4, color: '#555' },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ececec'
  },
  sectionTitle: { fontWeight: '700', marginBottom: 10 },
  label: { fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  button: {
    marginTop: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  meta: { marginTop: 6, color: '#444' },
  empty: { color: '#666' }
});
