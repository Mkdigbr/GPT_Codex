#!/usr/bin/env python3
"""Smoke tests for the mobile MVP skeleton without external dependencies."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


def check(condition: bool, message: str) -> None:
    if condition:
        print(f"[PASS] {message}")
    else:
        print(f"[FAIL] {message}")
        raise AssertionError(message)


def read(rel: str) -> str:
    path = ROOT / rel
    check(path.exists(), f"Arquivo existe: {rel}")
    return path.read_text(encoding="utf-8")


def test_mobile_structure() -> None:
    read("apps/mobile/App.tsx")
    read("apps/mobile/src/services/catalogService.ts")
    read("apps/mobile/src/services/supabase.ts")
    read("apps/mobile/src/components/ProductCard.tsx")
    read("apps/mobile/src/types/index.ts")
    read("apps/mobile/.env.example")


def test_app_imports_and_mvp_strings() -> None:
    app = read("apps/mobile/App.tsx")
    check("./src/components/ProductCard" in app, "App importa ProductCard pelo caminho correto")
    check("./src/services/catalogService" in app, "App importa catalogService pelo caminho correto")
    check("./src/types" in app, "App importa tipos pelo caminho correto")
    check("Slug da loja" in app, "Tela contém campo de slug")
    check("Link público" in app and "Link curto" in app, "Tela exibe links público e curto")


def test_catalog_service_contract() -> None:
    service = read("apps/mobile/src/services/catalogService.ts")
    for fn in ["getStoreBySlug", "listProductsByStore", "buildPublicStoreUrl", "buildShortStoreUrl"]:
        check(f"function {fn}" in service, f"Serviço expõe função {fn}")


def test_supabase_schema() -> None:
    sql = read("supabase/schema.sql").lower()
    for table in ["stores", "products", "short_links", "orders", "order_items"]:
        check(f"create table if not exists public.{table}" in sql, f"Schema define tabela {table}")
    for idx in ["idx_products_store_id", "idx_orders_store_id", "idx_short_links_store_id"]:
        check(idx in sql, f"Schema define índice {idx}")


def test_env_and_docs() -> None:
    env = read("apps/mobile/.env.example")
    check("EXPO_PUBLIC_SUPABASE_URL" in env, "Env example contém URL do Supabase")
    check("EXPO_PUBLIC_SUPABASE_ANON_KEY" in env, "Env example contém chave anon do Supabase")

    readme = read("README.md")
    check("npm run start" in readme, "README descreve execução do app")
    check("supabase/schema.sql" in readme, "README referencia schema do Supabase")


def main() -> int:
    tests = [
        test_mobile_structure,
        test_app_imports_and_mvp_strings,
        test_catalog_service_contract,
        test_supabase_schema,
        test_env_and_docs,
    ]
    failures = 0
    for test in tests:
        try:
            test()
        except AssertionError:
            failures += 1
    if failures:
        print(f"\nResultado: {failures} suíte(s) com falha")
        return 1
    print("\nResultado: todos os smoke tests passaram")
    return 0


if __name__ == "__main__":
    sys.exit(main())
