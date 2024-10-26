import { SaleTypeEnum } from '../../core/models/saleType.enum';
import { TransactionEnum } from '../../core/models/transaction.enum';

export const getTransactionByStatus = (transactionStatus: string): string => {
  return TransactionEnum[transactionStatus as keyof typeof TransactionEnum];
};

export const getSalesByType = (saleType: string): string => {
  return SaleTypeEnum[saleType as keyof typeof SaleTypeEnum];
};
