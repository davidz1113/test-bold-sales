import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ISale } from '../../../../core/models/sale.interface';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { CustomCurrencyPipe } from '../../../../shared/pipes/custom-currency.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectLabelFrecuency,
  selectSales,
} from '../../store/selectors/sale.selector';
import { setSearchValue } from '../../store/actions/sale.action';
import { openModal } from '../../store/actions/modal.action';

@Component({
  selector: 'bold-sales-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, CustomCurrencyPipe, IconComponent],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss',
})
export class SalesListComponent implements OnInit {
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

  searchInputValue = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    this.sales$ = this.store.select(selectSales);
    this.labelFrecuency$ = this.store.select(selectLabelFrecuency);

    this.store
      .select((state: AppState) => state.sales)
      .subscribe((state) => {
        this.searchInputValue.set(state.filter);
      });
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchInputValue.set(target.value);
    const searchValue = this.searchInputValue();
    this.store.dispatch(setSearchValue({ searchValue }));
  }

  onViewDetail(sale: ISale): void {
    this.store.dispatch(openModal({ data: sale }));
  }
}
