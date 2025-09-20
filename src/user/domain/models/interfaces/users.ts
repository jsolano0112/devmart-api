export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
  isActive: boolean;
  isAdmin: boolean;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
  isActive: boolean;
  password: string;
  isAdmin: boolean;
}
