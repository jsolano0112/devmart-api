import { model, Schema, connection } from 'mongoose';
import { ICategories } from './interfaces/categories';

// mongoose-sequence exports a CommonJS factory. Use require(...) to obtain a callable function
const AutoIncrement = require('mongoose-sequence')(connection);

const categorySchema = new Schema<ICategories>({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
});

// Provide a unique `id` for the counter so different schemas don't collide
categorySchema.plugin(AutoIncrement, { inc_field: 'id', id: 'Category_id' });

export const Category = model<ICategories>('Category', categorySchema);