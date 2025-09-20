import { CreateUser } from '../domain/use-cases/create-user.use-case';
import { GetUserOrders } from '../domain/use-cases/get-user-orders.use.case';
import { GetUserById } from '../domain/use-cases/get-user.use.case';
import { UpdateUser } from '../domain/use-cases/update-user.use-case';

//TODO: for database
// const userRepository

export const UserServiceContainer = {
  getUserById: new GetUserById(),
  createUser: new CreateUser(),
  updateUser: new UpdateUser(),
  getUserOrders: new GetUserOrders(),
};
