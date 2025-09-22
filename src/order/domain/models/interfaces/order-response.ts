import { IResponse } from "../../../../shared/interfaces/response";

export const orderCreatedStatus: IResponse = {
  statusCode: 200,
  message: 'Order created succesfully.',
};

export const orderUpdatedStatus: IResponse = {
  statusCode: 200,
  message: 'Order updated succesfully.',
};

export const orderDeletedStatus: IResponse = {
  statusCode: 200,
  message: 'Order deleted succesfully.',
};

export const statusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message:
    'Missing one of the following parameters: userId, products, paymentMethod or address.',
};

export const statusCode400ErrorParametersUpdated: IResponse = {
  statusCode: 400,
  message: 'Nothing has been updated because no data has been provided.',
};

export const statusCode400ErrorProduct: IResponse = {
  statusCode: 400,
  message: 'The count for the product is zero.',
};

export const statusCode400OutStock: IResponse = {
  statusCode: 400,
  message: 'The product is out of stock.',
};
