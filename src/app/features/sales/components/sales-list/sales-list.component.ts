import { Component } from '@angular/core';
import { ISale } from '../../../../core/models/sale.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionEnum } from '../../../../core/models/transaction.enum';
import { CustomCurrencyPipe } from '../../../../shared/pipes/custom-currency.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'bold-sales-list',
  standalone: true,
  imports: [DatePipe, CustomCurrencyPipe, IconComponent],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss',
})
export class SalesListComponent {
  transactionEnum = TransactionEnum;

  sales: ISale[] = [
    {
      id: 'GZEN2KAGAPJND',
      status: 'REJECTED',
      paymentMethod: 'BANCOLOMBIA',
      salesType: 'TERMINAL',
      createdAt: 1729555200000,
      transactionReference: 4878,
      amount: 6373316,
      deduction: 549926,
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

  constructor() {}

  getTransactionStatus(status: string): string {
    return this.transactionEnum[status as keyof typeof TransactionEnum];
  }
}
