import { GetUserById } from "../domain/use-cases/get-user.user.case";

//TODO: for database
// const userRepository 

export const ServiceContainer = {
  user: {
    getUserById: new GetUserById(),
  },
};
