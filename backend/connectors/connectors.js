export class BaseConnector {
  normalize(raw) {
    return {
      platform: raw.platform,
      external_id: raw.external_id,
      title: raw.title,
      price: raw.price,
      original_price: raw.original_price,
      store_name: raw.store_name,
      store_external_id: raw.store_external_id,
      listing_url: raw.listing_url,
      image_url: raw.image_url,
      shipping_flag: raw.shipping_flag,
      sold_info: raw.sold_info,
      reputation_data: raw.reputation_data,
      collected_at: raw.collected_at,
      raw_data_json: JSON.stringify(raw)
    };
  }
}

export class MercadoLivreConnector extends BaseConnector {
  async search(keyword) {
    return [{ platform: 'Mercado Livre', external_id: 'MLB123', title: `${keyword} premium`, price: 129.9, original_price: 159.9, store_name: 'Lux Semijoias', store_external_id: 'S1', listing_url: '#', image_url: '#', shipping_flag: true, sold_info: '120 vendas', reputation_data: 'alta', collected_at: new Date().toISOString() }].map((r) => this.normalize(r));
  }
}

export class ShopeeConnector extends BaseConnector {
  async search(keyword) {
    return [{ platform: 'Shopee', external_id: 'SHP987', title: `${keyword} oferta`, price: 89.9, original_price: 99.9, store_name: 'Nicho Glam', store_external_id: 'S2', listing_url: '#', image_url: '#', shipping_flag: false, sold_info: '63 vendas', reputation_data: 'média', collected_at: new Date().toISOString() }].map((r) => this.normalize(r));
  }
}
