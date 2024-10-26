import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ISale } from '../../../../core/models/sale.interface';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionEnum } from '../../../../core/models/transaction.enum';
import { CustomCurrencyPipe } from '../../../../shared/pipes/custom-currency.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectLabelFrecuency,
  selectSales,
} from '../../store/selectors/sale.selector';

@Component({
  selector: 'bold-sales-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, CustomCurrencyPipe, IconComponent],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss',
})
export class SalesListComponent implements OnInit {
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

  private store: Store<AppState> = inject(Store);
  sales$: Observable<readonly ISale[]> = new Observable<readonly ISale[]>();
  labelFrecuency$: Observable<string | undefined> = new Observable<
    string | undefined
  >();

  constructor() {}

  ngOnInit(): void {
    this.sales$ = this.store.select(selectSales);
    this.labelFrecuency$ = this.store.select(selectLabelFrecuency);
  }

  getTransactionStatus(status: string): string {
    return this.transactionEnum[status as keyof typeof TransactionEnum];
  }
}
