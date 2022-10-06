import { OrderItem } from './order-item';
export interface Order {
    clientId: number;
    sellerId?: number;
    date?: string;
    orderId?: string;
    totalAmount?: number;
    stateId?: number;
    state?: string;
    orderItems: OrderItem[];
}

export interface OrderState {
    stateId: number;
    description: string
}