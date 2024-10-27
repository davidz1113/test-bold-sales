import { ISale } from '../core/models/sale.interface';

export const DummySaleDataList: ISale[] = [
  {
    id: 'GZEN2KAGAPJND',
    status: 'REJECTED',
    paymentMethod: 'BANCOLOMBIA',
    salesType: 'TERMINAL',
    createdAt: 1729555200000,
    transactionReference: 4878,
    amount: 6373316,
    deduction: 549926,
    statusLabel: 'REJECTED',
  },
  {
    id: 'GZEN38WQHWSVU',
    status: 'SUCCESSFUL',
    paymentMethod: 'NEQUI',
    salesType: 'PAYMENT_LINK',
    createdAt: 1729875374143,
    transactionReference: 3136,
    amount: 5291209,
    franchise: 'MASTERCARD',
  },
  {
    id: 'GZEN2WYNBJF9V',
    status: 'SUCCESSFUL',
    paymentMethod: 'BANCOLOMBIA',
    salesType: 'PAYMENT_LINK',
    createdAt: 1728604800000,
    transactionReference: 5035,
    amount: 538918,
  },
];
