import { Schema, model, connection } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import { ICategories } from '../../../shared/interfaces/categories';

const AutoIncrement = AutoIncrementFactory(connection);

const CategorySchema = new Schema<ICategories>({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
});

CategorySchema.plugin(AutoIncrement, { inc_field: 'id', id: 'category_id_counter' });

export const Category =
  connection.models.Category ||
  model<ICategories>('Category', CategorySchema);
