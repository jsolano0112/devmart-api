import { IResponse } from '../../../../shared/interfaces/response';

export const shipmentStatusCode200: IResponse = {
  statusCode: 200,
  message: 'Shipment created succesfully.',
};

export const shipmentUpdatedStatusCode200: IResponse = {
  statusCode: 200,
  message: 'Shipment updated succesfully.',
};

export const shipmentStatusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message: 'Missing required parameters',
};


export const trackingNumberStatusCode409ExistingTrackingNumber: IResponse = {
  statusCode: 409,
  message: 'The trackingNumber already exists.',
};