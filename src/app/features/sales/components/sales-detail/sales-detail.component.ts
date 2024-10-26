import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ISale } from '../../../../core/models/sale.interface';
import { CustomCurrencyPipe } from '../../../../shared/pipes/custom-currency.pipe';
import { DatePipe } from '@angular/common';
import {
  getSalesByType,
  getTransactionByStatus,
} from '../../../../shared/utils/utils.utils';

@Component({
  selector: 'bold-sales-detail',
  standalone: true,
  imports: [IconComponent, CustomCurrencyPipe, DatePipe],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.scss',
})
export class SalesDetailComponent {
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

  getSaleType(saleType: string): string {
    return getSalesByType(saleType);
  }
}
