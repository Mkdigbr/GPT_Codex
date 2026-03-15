CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE searches (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  search_name TEXT,
  keyword TEXT NOT NULL,
  platform TEXT NOT NULL,
  category TEXT,
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  region TEXT,
  sort_order TEXT,
  max_results INTEGER,
  filters_json TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE listings (
  id INTEGER PRIMARY KEY,
  platform TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  currency TEXT,
  store_name TEXT,
  store_external_id TEXT,
  listing_url TEXT,
  image_url TEXT,
  shipping_flag BOOLEAN,
  sold_info TEXT,
  reputation_data TEXT,
  raw_data_json TEXT,
  collected_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE stores (
  id INTEGER PRIMARY KEY,
  platform TEXT NOT NULL,
  external_id TEXT,
  name TEXT NOT NULL,
  store_url TEXT,
  city TEXT,
  state TEXT,
  category TEXT,
  reputation TEXT,
  estimated_listing_count INTEGER,
  notes TEXT,
  status TEXT,
  last_contact_at TIMESTAMP,
  next_action TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE store_tags (
  id INTEGER PRIMARY KEY,
  store_id INTEGER NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE listing_favorites (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  listing_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE opportunities (
  id INTEGER PRIMARY KEY,
  listing_id INTEGER,
  store_id INTEGER,
  score INTEGER NOT NULL,
  reason TEXT,
  notes TEXT,
  status TEXT,
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE price_history (
  id INTEGER PRIMARY KEY,
  listing_id INTEGER NOT NULL,
  price DECIMAL(10,2),
  collected_at TIMESTAMP NOT NULL
);

CREATE TABLE activity_logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  details_json TEXT,
  created_at TIMESTAMP NOT NULL
);
