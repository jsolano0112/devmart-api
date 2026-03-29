import { Category } from '../../dominio/models/categories.schema';

/** IDs resueltos tras insertar (mongoose-sequence asigna `id`). */
export type SeededCategoryIds = {
  perifericos: number;
  monitores: number;
  computadores: number;
};

export const seedCategories = async (): Promise<SeededCategoryIds> => {
  console.log('🌱 Initializing category seeders...');

  await Category.deleteMany({});
  console.log('🧽 Previous categories deleted.');

  const definitions = [
    { name: 'Periféricos' },
    { name: 'Monitores' },
    { name: 'Computadores' },
  ];

  for (const { name } of definitions) {
    await Category.create({ name });
  }

  const docs = await Category.find({
    name: { $in: definitions.map((d) => d.name) },
  })
    .lean()
    .exec();

  const byName = Object.fromEntries(docs.map((c) => [c.name, c.id])) as Record<
    string,
    number | undefined
  >;

  const pick = (label: string): number => {
    const id = byName[label];
    if (id == null) throw new Error(`Category "${label}" missing after seed.`);
    return id;
  };

  const ids: SeededCategoryIds = {
    perifericos: pick('Periféricos'),
    monitores: pick('Monitores'),
    computadores: pick('Computadores'),
  };

  console.log(
    `✅ ${definitions.length} categories inserted (ids: ${ids.perifericos}, ${ids.monitores}, ${ids.computadores}).`,
  );

  return ids;
};
