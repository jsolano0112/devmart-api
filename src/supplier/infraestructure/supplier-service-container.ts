import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateSupplier } from '../application/use-cases/create-supplier.use-case';
import { DeleteSupplier } from '../application/use-cases/delete-supplier.use-case';
import { GetSupplier } from '../application/use-cases/get-supplier.use-case';
import { GetSupplierById } from '../application/use-cases/get-supplierById.use-case';
import { UpdateSupplier } from '../application/use-cases/update-supplier.use-case';

const repositories = new RepositoryContainer();

export const SupplierServiceContainer = {
  CreateSupplier: new CreateSupplier(repositories),
  GetSupplier: new GetSupplier(repositories),
  UpdateSupplier: new UpdateSupplier(repositories),
  DeleteSupplier: new DeleteSupplier(repositories),
  GetSupplierById: new GetSupplierById(repositories),
};
