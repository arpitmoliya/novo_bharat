/* eslint-disable no-console */
/**
 * One-off data migration: MySQL -> PostgreSQL.
 *
 * The schema is created by TypeORM (synchronize) from the same entities the
 * app uses, so the Postgres schema is identical to what the running backend
 * expects. Rows are then copied 1:1, preserving primary keys and foreign-key
 * relationships, after which the id sequences are reset.
 *
 * Source (MySQL) connection:   SRC_HOST SRC_PORT SRC_USER SRC_PASS SRC_DB
 * Target (Postgres) connection: DB_HOST DB_PORT DB_USERNAME DB_PASSWORD
 *                               DB_DATABASE DB_SSL  (same vars the app uses)
 *
 * Run from the backend/ directory after `npm run build`:
 *   SRC_PORT=3306 DB_PORT=5433 node scripts/migrate-mysql-to-postgres.js
 */
require('reflect-metadata');
const mysql = require('mysql2/promise');
const { Client } = require('pg');
const { DataSource } = require('typeorm');

const { User } = require('../dist/users/user.entity');
const { Category } = require('../dist/categories/category.entity');
const { Product } = require('../dist/products/product.entity');
const { Brochure } = require('../dist/brochures/brochure.entity');
const { SeoGlobal } = require('../dist/seo/seo-global.entity');
const { SeoPage } = require('../dist/seo/seo-page.entity');
const { Inquiry } = require('../dist/inquiries/inquiry.entity');

const SRC = {
  host: process.env.SRC_HOST || '127.0.0.1',
  port: Number(process.env.SRC_PORT || 3306),
  user: process.env.SRC_USER || 'novobharat',
  password: process.env.SRC_PASS || 'novobharat',
  database: process.env.SRC_DB || 'novobharat_admin',
};

const TGT = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USERNAME || 'novobharat',
  password: process.env.DB_PASSWORD || 'novobharat',
  database: process.env.DB_DATABASE || 'novobharat_admin',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

// Copy order respects foreign keys (parents before children).
const TABLES = [
  'users',
  'categories',
  'products',
  'brochures',
  'seo_global',
  'seo_pages',
  'inquiries',
];

async function syncSchema() {
  const ds = new DataSource({
    type: 'postgres',
    host: TGT.host,
    port: TGT.port,
    username: TGT.user,
    password: TGT.password,
    database: TGT.database,
    ssl: TGT.ssl,
    entities: [User, Category, Product, Brochure, SeoGlobal, SeoPage, Inquiry],
    synchronize: true,
  });
  await ds.initialize();
  console.log('Target schema synchronized from entities.');
  await ds.destroy();
}

async function main() {
  await syncSchema();

  const src = await mysql.createConnection(SRC);
  const tgt = new Client(TGT);
  await tgt.connect();

  for (const table of TABLES) {
    const [rows] = await src.query(`SELECT * FROM \`${table}\``);
    if (!rows.length) {
      console.log(`${table}: 0 rows (skipped)`);
      continue;
    }
    let copied = 0;
    for (const row of rows) {
      const cols = Object.keys(row);
      const vals = cols.map((c) => row[c]);
      const colList = cols.map((c) => `"${c}"`).join(', ');
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
      await tgt.query(
        `INSERT INTO "${table}" (${colList}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`,
        vals,
      );
      copied += 1;
    }
    console.log(`${table}: copied ${copied} rows`);
  }

  // Reset id sequences so new inserts don't collide with copied ids.
  for (const table of TABLES) {
    try {
      await tgt.query(
        `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'),
                       COALESCE((SELECT MAX(id) FROM "${table}"), 1), true)`,
      );
    } catch {
      /* table may not have an id sequence; ignore */
    }
  }

  await src.end();
  await tgt.end();
  console.log('Migration complete.');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
