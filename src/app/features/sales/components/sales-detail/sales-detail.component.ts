import { Component, inject, OnInit } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ISale } from '../../../../core/models/sale.interface';
import { CustomCurrencyPipe } from '../../../../shared/pipes/custom-currency.pipe';
import { DatePipe } from '@angular/common';
import {
  getSalesByType,
  getTransactionByStatus,
} from '../../../../shared/utils/utils.utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'bold-sales-detail',
  standalone: true,
  imports: [IconComponent, CustomCurrencyPipe, DatePipe],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.scss',
})
export class SalesDetailComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  saleSelected$: Observable<ISale> = new Observable<ISale>();
  sale: ISale = {
    id: '',
    status: '',
    paymentMethod: '',
    salesType: '',
    createdAt: 0,
    transactionReference: 0,
    amount: 0,
  };

  ngOnInit(): void {
    this.saleSelected$ = this.store.select(
      (state) => state.modal.data as ISale
    );

    this.saleSelected$.subscribe((sale) => {
      this.sale = sale;
    });
  }

  getSaleType(saleType: string): string {
    return getSalesByType(saleType);
  }
}
