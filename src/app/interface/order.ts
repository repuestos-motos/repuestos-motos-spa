import { OrderItem } from './order-item';
export interface Order {
    clientId: number;
    sellerId?: number;
    orderItems: OrderItem[];
}
