import { model, Schema, connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { ICategories } from '../../../shared/interfaces/categories';

const AutoIncrement = AutoIncrementFactory(connection);

const categorySchema = new Schema<ICategories>({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
});

categorySchema.plugin(AutoIncrement, { inc_field: 'id' });

export const Category = model<ICategories>('Category', categorySchema);
