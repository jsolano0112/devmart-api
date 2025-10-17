import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateSupplier } from '../domain/use-cases/create-supplier.use.case';
import { DeleteSupplier } from '../domain/use-cases/delete-supplier.use.case';
import { GetSupplierByNIT } from '../domain/use-cases/get-supplier.use.case';
import { GetAllSuppliers } from '../domain/use-cases/get-suppliers.use.case';
import { UpdateSupplier } from '../domain/use-cases/update-supplier.use.case';

const repositories = new RepositoryContainer();

export const SupplierServiceContainer = {
  createSupplier: new CreateSupplier(repositories),
  deleteSupplier: new DeleteSupplier(repositories),
  getSupplierByNIT: new GetSupplierByNIT(repositories),
  getAllSuppliers: new GetAllSuppliers(repositories),
  UpdateSupplier: new UpdateSupplier(repositories),
};
