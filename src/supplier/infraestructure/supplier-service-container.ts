import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateSupplier } from '../application/use-cases/create-supplier.use.case';
import { DeleteSupplier } from '../application/use-cases/delete-supplier.use.case';
import { GetSupplierByNIT } from '../application/use-cases/get-supplier.use.case';
import { GetAllSuppliers } from '../application/use-cases/get-suppliers.use.case';
import { UpdateSupplier } from '../application/use-cases/update-supplier.use.case';

const repositories = new RepositoryContainer();

export const SupplierServiceContainer = {
  createSupplier: new CreateSupplier(repositories),
  deleteSupplier: new DeleteSupplier(repositories),
  getSupplierByNIT: new GetSupplierByNIT(repositories),
  getAllSuppliers: new GetAllSuppliers(repositories),
  UpdateSupplier: new UpdateSupplier(repositories),
};
