import { Supplier } from '../../domain/models/supplier.schema';

export const seedSuppliers = async () => {
  console.log('🌱 Init seeders of suppliers...');

  const suppliers = [
    {
      id: 2,
      isActive: true,
      nit: '900123456-1',
      name: 'Tech Import S.A.S',
      email: 'contacto@techimport.com',
      phone: '3004567890',
      address: 'Calle 10 #20-30',
      city: 'Medellín',
      country: 'Colombia',
    },
    {
      id: 3,
      isActive: true,
      nit: '901987654-2',
      name: 'Distribuciones Andinas',
      email: 'ventas@andinas.com',
      phone: '3145678901',
      address: 'Carrera 45 #50-10',
      city: 'Bogotá',
      country: 'Colombia',
    },
    {
      id: 1,
      isActive: true,
      nit: '902345678-9',
      name: 'Global Supplies Ltda',
      email: 'info@globalsupplies.com',
      phone: '3124567890',
      address: 'Av. El Poblado 45-67',
      city: 'Cali',
      country: 'Colombia',
    },
  ];

  await Supplier.deleteMany({});
  console.log('Previous suppliers deleted.');

  await Supplier.insertMany(suppliers);
  console.log(`${suppliers.length} suppliers inserted.`);
};
