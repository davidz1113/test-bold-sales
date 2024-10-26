export interface ISale {
    id: string;
    status: string;
    paymentMethod: string;
    salesType: string;
    createdAt: number;
    transactionReference: number;
    amount: number;
    deduction?: number;
    franchise?: string;
}