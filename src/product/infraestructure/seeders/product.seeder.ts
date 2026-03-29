import type { SeededCategoryIds } from '../../../categories/infraestructure/seeders/category.seeder';
import { Product } from '../../domain/models/product.schema';

export const seedProducts = async (categories: SeededCategoryIds) => {
  console.log('🌱 Initializing product seeders...');

  const products = [
    {
      name: 'Wireless Mouse Logitech M185',
      description:
        'Compact and reliable wireless mouse with 2.4GHz connection.',
      price: 80000,
      stock: 150,
      images: 'https://example.com/images/mouse-logitech.jpg',
      sku: 'MOUSE-LOGI-M185',
      categoryId: categories.perifericos,
      supplierId: 1,
    },
    {
      name: 'Mechanical Keyboard Redragon Kumara',
      description:
        'RGB mechanical keyboard with red switches, durable and compact design.',
      price: 220000,
      stock: 90,
      images: 'https://example.com/images/keyboard-redragon.jpg',
      sku: 'KEYB-REDR-KUMARA',
      categoryId: categories.perifericos,
      supplierId: 2,
    },
    {
      name: '27" Samsung Curved Monitor',
      description:
        'Full HD 27-inch curved monitor with vivid colors and wide viewing angles.',
      price: 900000,
      stock: 40,
      images: 'https://example.com/images/monitor-samsung.jpg',
      sku: 'MONI-SAMS-27C',
      categoryId: categories.monitores,
      supplierId: 1,
    },
    {
      name: 'HP Pavilion Laptop 15"',
      description:
        'Powerful laptop with Intel i5, 16GB RAM, 512GB SSD, and Windows 11.',
      price: 3200000,
      stock: 25,
      images: 'https://example.com/images/laptop-hp.jpg',
      sku: 'LAPT-HP-PAV15',
      categoryId: categories.computadores,
      supplierId: 3,
    },
  ];

  await Product.deleteMany({});
  console.log('🧽 Previous products deleted.');

  await Product.insertMany(products);

  console.log(`✅ ${products.length} products inserted successfully.`);
};
