import { IResponse } from '../../../../shared/interfaces/response';

export const cateogoriesStatusCode200: IResponse = {
  statusCode: 200,
  message: 'Category created succesfully.',
};

export const cateogoriesStatusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message: 'Missing required parameters',
};

export const cateogoriesStatusCode400ErrorPass: IResponse = {
  statusCode: 400,
  message:
    'The Category must be at least 3 characters long,',
};


export const cateogoriesStatusCode409ExistingProduct: IResponse = {
  statusCode: 409,
  message: 'The product already exists.',
};
