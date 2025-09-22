import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUpdateOrder } from '../models/interfaces/orders';

export class UpdateOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUpdateOrder): Promise<void> {
    //TODO: save en database
  }
}
