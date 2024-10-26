import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ISale } from '../../../../core/models/sale.interface';
import { TransactionEnum } from '../../../../core/models/transaction.enum';
import { CustomCurrencyPipe } from "../../../../shared/pipes/custom-currency.pipe";
import { DatePipe } from '@angular/common';
import { SaleTypeEnum } from '../../../../core/models/saleType.enum';

@Component({
  selector: 'bold-sales-detail',
  standalone: true,
  imports: [IconComponent, CustomCurrencyPipe, DatePipe],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.scss',
})
export class SalesDetailComponent {
  transactionEnum = TransactionEnum;
  saleTypeEnum = SaleTypeEnum;

  sale: ISale = {
    id: 'GZEN99SSVBJVS',
    status: 'REJECTED',
    paymentMethod: 'card',
    salesType: 'TERMINAL',
    createdAt: 1729728000000,
    transactionReference: 4759,
    amount: 9721342,
    deduction: 15968,
  };

  getTransactionStatus(status: string): string {
    return this.transactionEnum[status as keyof typeof TransactionEnum];
  }

  getSaleType(saleType: string): string {
    return this.saleTypeEnum[saleType as keyof typeof SaleTypeEnum];
  }

}
