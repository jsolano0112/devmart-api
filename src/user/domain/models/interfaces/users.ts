export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobilePhone: string;
  city: string;
  zipCode: number;
}

export interface IUser {
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

export interface IUpdateUser {
  id: string;
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

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserCredentialsResponse {
  email: string;
  id: string;
  token: string;
}
