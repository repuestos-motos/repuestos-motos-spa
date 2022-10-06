export interface OrderItem {
    productId: number;
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount?: number;
}
