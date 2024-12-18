import { SaleTypeEnum } from '../../core/models/saleType.enum';
import { TransactionEnum } from '../../core/models/transaction.enum';

export const getTransactionByStatus = (transactionStatus: string): string => {
  return TransactionEnum[transactionStatus as keyof typeof TransactionEnum];
};

export const getSalesByType = (saleType: string): string => {
  return SaleTypeEnum[saleType as keyof typeof SaleTypeEnum];
};

export const isEmptyValueFromLocalStorage = (key: string): boolean | null => {
  if (JSON.parse(localStorage.getItem(key) || '{}') instanceof Boolean) {
    return null;
  }

  return (
    Object.keys(JSON.parse(localStorage.getItem(key) || '{}')).length === 0
  );
};

export const calculateTotalPages = (sales: any[], pageSize: string): number => {
  // console.log(sales);
  
  if (pageSize === 'Todos') {
    return 1;
  }
  // console.log(Math.ceil(sales.length / parseInt(pageSize)));
  return Math.ceil(sales.length / parseInt(pageSize));
};
