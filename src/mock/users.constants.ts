import {
  IUserRequest,
  IUserResponse,
} from '../user/domain/models/interfaces/users';

export const users: IUserResponse[] = [
  {
    id: 1,
    firstName: 'Juana',
    lastName: 'Solano',
    email: 'juana.solano@correo.com',
    address: 'Calle 39C #XX - XX',
    city: 'Medellín',
    zipCode: 123444,
    mobilePhone: '31231184XX',
    isActive: true,
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'Juana',
    lastName: 'Solano',
    email: 'juana.solano@correo.com',
    address: 'Calle 39C #XX - XX',
    city: 'Medellín',
    zipCode: 123444,
    mobilePhone: '31231184XX',
    isActive: true,
    isAdmin: false,
  },
];

export const usersFromDatabase: IUserRequest[] = [
  {
    id: 1,
    firstName: 'Juana',
    lastName: 'Solano',
    email: 'juana.solano@correo.com',
    address: 'Calle 39C #XX - XX',
    city: 'Medellín',
    zipCode: 123444,
    mobilePhone: '31231184XX',
    isActive: true,
    isAdmin: true,
    password: '12223',
  },
  {
    id: 2,
    firstName: 'Juana',
    lastName: 'Solano',
    email: 'juana.solano@correo.com',
    address: 'Calle 39C #XX - XX',
    city: 'Medellín',
    zipCode: 123444,
    mobilePhone: '31231184XX',
    isActive: true,
    isAdmin: false,
    password: '12223',
  },
];
