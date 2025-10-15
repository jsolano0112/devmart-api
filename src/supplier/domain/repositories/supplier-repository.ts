import { Exception } from "../../../shared/helpers/exception-message";
import { ISupplier, ISupplierResponse, IUpdateSupplier } from "../../../shared/interfaces/suppliers";
import { Supplier } from "../models/supplier.schema";

export class SupplierRepository {
    public async getSupplierById(id: number): Promise<ISupplierResponse> {
        try {
            const supplier = await Supplier.findById(id);
            if (!supplier) throw new Exception('Supplier not found.', 404);
            const { name, contactEmail, phoneNumber, address, city, country } = supplier;
            return {
                id,
                name,
                contactEmail,
                phoneNumber,
                address,
                city,
                country
            };
        } catch (error) {
            throw new Exception('Error fetching supplier.', 500);
        }
    }

    public async getAllSuppliers(): Promise<ISupplierResponse[]> {
        try {
            const suppliers = await Supplier.find();
            if (suppliers.length === 0) throw new Exception('No suppliers found.', 404);
            return suppliers.map((s) => ({
                id: s.id,
                name: s.name,
                contactEmail: s.contactEmail,
                phoneNumber: s.phoneNumber,
                address: s.address,
                city: s.city,
                country: s.country
            }));
        } catch (error) {
            throw new Exception('Error fetching suppliers.', 500);
        }
    }

    public async createSupplier(supplierData: ISupplier): Promise<void> {
        try {
            const newSupplier = new Supplier(supplierData);
            await newSupplier.save();
        } catch (error) {
            throw new Exception('Error creating supplier.', 500);
        }
    }

   public async updateSupplier(id: number, supplierData: IUpdateSupplier): Promise<void> {
       try {
         await Supplier.findByIdAndUpdate(id, { $set: supplierData }, { new: true });
       } catch (error) {
         console.error(error);
         throw error;
       }
     }

    public async deleteSupplier(id: number): Promise<void> {
        try {
            const deletedSupplier = await Supplier.findByIdAndDelete(id);
            if (!deletedSupplier) throw new Exception('Supplier not found for deletion.', 404);
        } catch (error) {
            throw new Exception('Error deleting supplier.', 500);
        }
    }
}