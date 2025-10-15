export interface IShipmentsResponse {
    id: number;
    orderId: number;
    status: string;
    carrier: string;
    trackingId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShipment {
    id: number;
    orderId: number;
    status: string;
    carrier: string;
    trackingId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShipmentUpdate {
    trackingId: string;
    status: string;
    updatedAt: Date;
}

export interface IShipmentUpdate {
    trackingId: string;
    status: string;
    updatedAt: Date;
}

export interface IShipmentParams {
  trackingId: string;
}
