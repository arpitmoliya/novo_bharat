import 'reflect-metadata';
import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { Brochure } from './brochures/brochure.entity';
import { Category } from './categories/category.entity';
import { slugify } from './common/slugify';
import { buildDataSourceOptions } from './database/data-source';
import { Product } from './products/product.entity';
import { SeoGlobal } from './seo/seo-global.entity';
import { SeoPage } from './seo/seo-page.entity';
import { User } from './users/user.entity';

/**
 * Idempotent seed: admin user + the therapeutic categories and API products
 * taken from the NovoBharat product portfolio brochure.
 */

const CATEGORIES = [
  { name: 'Cardiovascular APIs', slug: 'cardiovascular-apis' },
  { name: 'Anti-Diabetic APIs', slug: 'anti-diabetic-apis' },
  { name: 'CNS / Psychiatry APIs', slug: 'cns-psychiatry-apis' },
  { name: 'Gastroenterology APIs', slug: 'gastroenterology-apis' },
  { name: 'Pain Management APIs', slug: 'pain-management-apis' },
  { name: 'Antibiotic APIs', slug: 'antibiotic-apis' },
  { name: 'Oncology', slug: 'oncology' },
  { name: 'Nutraceutical', slug: 'nutraceutical' },
  { name: 'Respiratory', slug: 'respiratory' },
  { name: 'Dermatology', slug: 'dermatology' },
];

const PRODUCTS: Array<{
  category: string;
  name: string;
  cas: string;
  gmpStatus: string;
  regulatoryStatus: string | null;
  packing: string;
}> = [
  // Cardiovascular APIs
  { category: 'Cardiovascular APIs', name: 'Atorvastatin Calcium', cas: '134523-00-5', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Cardiovascular APIs', name: 'Amlodipine Besylate', cas: '111470-99-6', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg Fibre Drum' },
  { category: 'Cardiovascular APIs', name: 'Rosuvastatin Calcium', cas: '147098-20-2', gmpStatus: 'WHO-GMP', regulatoryStatus: 'On Request', packing: '10 kg HDPE Drum' },
  { category: 'Cardiovascular APIs', name: 'Metoprolol Succinate', cas: '98418-47-4', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Cardiovascular APIs', name: 'Telmisartan', cas: '144701-48-4', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  // Anti-Diabetic APIs
  { category: 'Anti-Diabetic APIs', name: 'Metformin HCl', cas: '1115-70-4', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Anti-Diabetic APIs', name: 'Glimepiride', cas: '93479-97-1', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Anti-Diabetic APIs', name: 'Sitagliptin Phosphate', cas: '654671-78-0', gmpStatus: 'WHO-GMP', regulatoryStatus: 'On Request', packing: '5 kg HDPE Drum' },
  { category: 'Anti-Diabetic APIs', name: 'Dapagliflozin', cas: '461432-26-8', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '5 kg HDPE Drum' },
  { category: 'Anti-Diabetic APIs', name: 'Vildagliptin', cas: '274901-16-5', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '10 kg HDPE Drum' },
  // CNS / Psychiatry APIs
  { category: 'CNS / Psychiatry APIs', name: 'Sertraline HCl', cas: '79617-96-2', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'CNS / Psychiatry APIs', name: 'Escitalopram Oxalate', cas: '219861-08-2', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '10 kg HDPE Drum' },
  { category: 'CNS / Psychiatry APIs', name: 'Quetiapine Fumarate', cas: '111974-72-2', gmpStatus: 'WHO-GMP', regulatoryStatus: 'On Request', packing: '25 kg HDPE Drum' },
  { category: 'CNS / Psychiatry APIs', name: 'Clonazepam', cas: '1622-61-3', gmpStatus: 'WHO-GMP', regulatoryStatus: 'On Request', packing: '25 kg HDPE Drum' },
  // Gastroenterology APIs
  { category: 'Gastroenterology APIs', name: 'Omeprazole', cas: '73590-58-6', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Gastroenterology APIs', name: 'Pantoprazole Sodium', cas: '138786-67-1', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Gastroenterology APIs', name: 'Ondansetron HCl', cas: '99614-02-5', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '10 kg HDPE Drum' },
  // Pain Management APIs
  { category: 'Pain Management APIs', name: 'Diclofenac Sodium', cas: '15307-79-6', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Pain Management APIs', name: 'Tramadol HCl', cas: '36282-47-0', gmpStatus: 'WHO-GMP', regulatoryStatus: 'On Request', packing: '25 kg HDPE Drum' },
  { category: 'Pain Management APIs', name: 'Pregabalin', cas: '148553-50-8', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  // Antibiotic APIs
  { category: 'Antibiotic APIs', name: 'Amoxicillin Trihydrate', cas: '61336-70-7', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg Fibre Drum' },
  { category: 'Antibiotic APIs', name: 'Azithromycin', cas: '83905-01-5', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  { category: 'Antibiotic APIs', name: 'Cefixime', cas: '79350-37-1', gmpStatus: 'WHO-GMP', regulatoryStatus: 'Available', packing: '25 kg HDPE Drum' },
  // Oncology · Vitamins · Respiratory · Dermatology (regulatory not listed in brochure)
  { category: 'Oncology', name: 'Imatinib Mesylate', cas: '220127-57-1', gmpStatus: 'WHO-GMP', regulatoryStatus: null, packing: '5 kg HDPE Drum' },
  { category: 'Nutraceutical', name: 'Vitamin B12 (Cyanocobalamin)', cas: '68-19-9', gmpStatus: 'WHO-GMP', regulatoryStatus: null, packing: '1 kg Amber Glass' },
  { category: 'Respiratory', name: 'Salbutamol Sulphate', cas: '51022-70-9', gmpStatus: 'WHO-GMP', regulatoryStatus: null, packing: '25 kg HDPE Drum' },
  { category: 'Dermatology', name: 'Tretinoin (All-Trans)', cas: '302-79-4', gmpStatus: 'WHO-GMP', regulatoryStatus: null, packing: '1 kg Amber Glass' },
];

const BROCHURES: Array<{ title: string; fileUrl: string; description: string }> = [
  {
    title: 'Company Catalogue',
    fileUrl: '/catalogue/NovoBharat.pdf',
    description: "Novo Bharat's full product catalogue.",
  },
];

// Known static routes on the public website — seeded so the admin has a row to edit.
const SEO_PAGES: Array<{
  path: string;
  label: string;
  title: string;
  description: string;
  sitemapPriority: number;
}> = [
  {
    path: '/',
    label: 'Home',
    title: 'Home',
    description:
      'Novo Bharat — manufacturer and global exporter of industrial chemicals and pharmaceutical APIs.',
    sitemapPriority: 1.0,
  },
  {
    path: '/about',
    label: 'About Us',
    title: 'Company Profile',
    description:
      'Learn about Novo Bharat — our manufacturing capabilities, quality standards, and global reach.',
    sitemapPriority: 0.8,
  },
  {
    path: '/products',
    label: 'Products',
    title: 'Products',
    description:
      'Browse Novo Bharat’s portfolio of pharmaceutical APIs and industrial chemicals.',
    sitemapPriority: 0.9,
  },
];

async function connectWithRetry(retries = 15, delayMs = 3000): Promise<DataSource> {
  const dataSource = new DataSource(buildDataSourceOptions());
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await dataSource.initialize();
      return dataSource;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // eslint-disable-next-line no-console
      console.log(`DB not ready (attempt ${attempt}/${retries}): ${message}`);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  // Unreachable, but satisfies the type checker.
  throw new Error('Could not connect to the database');
}

async function run() {
  const dataSource = await connectWithRetry();
  // eslint-disable-next-line no-console
  console.log('DB connected. Seeding...');

  // --- Admin user ---
  const userRepo = dataSource.getRepository(User);
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@novobharat.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeme123';
  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    admin = userRepo.create({
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      name: 'Administrator',
      role: 'admin',
    });
    await userRepo.save(admin);
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // --- Categories ---
  const categoryRepo = dataSource.getRepository(Category);
  const categoryByName = new Map<string, Category>();
  for (const c of CATEGORIES) {
    let category = await categoryRepo.findOne({ where: { slug: c.slug } });
    if (!category) {
      category = await categoryRepo.save(
        categoryRepo.create({ name: c.name, slug: c.slug, description: null }),
      );
      console.log(`Created category: ${c.name}`);
    }
    categoryByName.set(c.name, category);
  }

  // --- Products ---
  const productRepo = dataSource.getRepository(Product);
  let created = 0;
  for (const p of PRODUCTS) {
    const slug = slugify(p.name);
    const existing = await productRepo.findOne({ where: { slug } });
    if (existing) continue;
    const category = categoryByName.get(p.category) ?? null;
    await productRepo.save(
      productRepo.create({
        name: p.name,
        slug,
        casNumber: p.cas,
        gmpStatus: p.gmpStatus,
        regulatoryStatus: p.regulatoryStatus,
        packing: p.packing,
        description: null,
        imageUrl: null,
        isActive: true,
        categoryId: category ? category.id : null,
      }),
    );
    created += 1;
  }
  console.log(`Seeded ${created} new product(s) (${PRODUCTS.length} total in source).`);

  // --- Brochures ---
  const brochureRepo = dataSource.getRepository(Brochure);
  let brochuresCreated = 0;
  for (const b of BROCHURES) {
    const existing = await brochureRepo.findOne({ where: { fileUrl: b.fileUrl } });
    if (existing) continue;
    await brochureRepo.save(
      brochureRepo.create({
        title: b.title,
        fileUrl: b.fileUrl,
        description: b.description,
        isActive: true,
      }),
    );
    brochuresCreated += 1;
  }
  console.log(`Seeded ${brochuresCreated} new brochure(s) (${BROCHURES.length} total in source).`);

  // --- SEO global defaults (singleton row id=1) ---
  const seoGlobalRepo = dataSource.getRepository(SeoGlobal);
  const existingGlobal = await seoGlobalRepo.findOne({ where: { id: 1 } });
  if (!existingGlobal) {
    await seoGlobalRepo.save(
      seoGlobalRepo.create({
        id: 1,
        siteName: 'Novo Bharat',
        titleTemplate: '%s | Novo Bharat',
        defaultTitle: 'Novo Bharat',
        defaultDescription:
          'Novo Bharat — manufacturer and global exporter of industrial chemicals and pharmaceutical APIs.',
      }),
    );
    console.log('Created SEO global defaults.');
  } else {
    console.log('SEO global defaults already exist.');
  }

  // --- SEO per-page defaults ---
  const seoPageRepo = dataSource.getRepository(SeoPage);
  let seoPagesCreated = 0;
  for (const sp of SEO_PAGES) {
    const existing = await seoPageRepo.findOne({ where: { path: sp.path } });
    if (existing) continue;
    await seoPageRepo.save(
      seoPageRepo.create({
        path: sp.path,
        label: sp.label,
        title: sp.title,
        description: sp.description,
        sitemapPriority: sp.sitemapPriority,
      }),
    );
    seoPagesCreated += 1;
  }
  console.log(`Seeded ${seoPagesCreated} new SEO page(s) (${SEO_PAGES.length} total in source).`);

  await dataSource.destroy();
  console.log('Seeding complete.');
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Seeding failed:', err);
  process.exit(1);
});
