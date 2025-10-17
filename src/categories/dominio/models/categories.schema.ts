import { Schema, model, connection } from 'mongoose';
import { ICategories } from '../../../shared/interfaces/categories';

const AutoIncrement = require('mongoose-sequence')(connection);

const CategorySchema = new Schema<ICategories>({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
});

CategorySchema.plugin(AutoIncrement, { inc_field: 'id' });

export const Category = model<ICategories>('Category', CategorySchema);
