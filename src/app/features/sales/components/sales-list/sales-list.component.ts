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
import {
  setOrderByAmount,
  setSearchValue,
} from '../../store/actions/sale.action';
import { openModal } from '../../store/actions/modal.action';
import { SalesListPaginationComponent } from "../sales-list-pagination/sales-list-pagination.component";

@Component({
  selector: 'bold-sales-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, CustomCurrencyPipe, IconComponent, SalesListPaginationComponent],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss',
})
export class SalesListComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  sales$: Observable<readonly ISale[]> = new Observable<readonly ISale[]>();
  labelFrecuency$: Observable<string | undefined> = new Observable<
    string | undefined
  >();

  searchInputValue = signal<string>('');
  isOrderAsc: boolean = true;
  isOrderAsc$: Observable<boolean> = new Observable<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.sales$ = this.store.select(selectSales);
    this.labelFrecuency$ = this.store.select(selectLabelFrecuency);
    this.isOrderAsc$ = this.store.select(
      (state: AppState) => state.sales.isOrderByAmountAsc
    );

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

  onSortByMount(): void {
    this.isOrderAsc = !this.isOrderAsc;
    this.store.dispatch(
      setOrderByAmount({ isOrderByAmountAsc: this.isOrderAsc })
    );
  }
}
