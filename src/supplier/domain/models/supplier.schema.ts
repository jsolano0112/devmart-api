import { model, Schema } from "mongoose";
import { ISupplier } from "../../../shared/interfaces/suppliers";

const supplierSchema = new Schema<ISupplier>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
export const Supplier = model<ISupplier>('Supplier', supplierSchema)