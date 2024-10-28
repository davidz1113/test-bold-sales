import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SalesFiltersComponent } from '../../features/sales/components/sales-filters/sales-filters.component';
import { SalesListComponent } from '../../features/sales/components/sales-list/sales-list.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadSales } from '../../features/sales/store/actions/sale.action';
import { Observable } from 'rxjs';
import { selectLabelFrecuency, selectLabelFrecuencyDate, selectLoadingSales, selectTotalAmout } from '../../features/sales/store/selectors/sale.selector';
import { CustomCurrencyPipe } from "../../shared/pipes/custom-currency.pipe";
import { SkeletonSquareComponent } from "../../shared/components/skeletons/skeleton-square/skeleton-square.component";

@Component({
  selector: 'app-home-sales',
  standalone: true,
  imports: [CardComponent, SalesFiltersComponent, SalesListComponent, AsyncPipe, CustomCurrencyPipe, SkeletonSquareComponent],
  providers: [CurrencyPipe],
  templateUrl: './home-sales.component.html',
  styleUrl: './home-sales.component.scss',
})
export default class HomeSalesComponent implements OnInit {
  private store: Store<any> = inject(Store);
  labelFrecuency$: Observable<string | undefined> = new Observable<
    string | undefined
  >();
  labelFrecuencyDate$: Observable<string | undefined> = new Observable<
    string | undefined
  >();
  totalAmount$ : Observable<number> = new Observable<number>();
  loadSales$: Observable<boolean> = new Observable<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(loadSales());
    this.labelFrecuency$ = this.store.select(selectLabelFrecuency);
    this.labelFrecuencyDate$ = this.store.select(selectLabelFrecuencyDate);
    this.totalAmount$ = this.store.select(selectTotalAmout);
    this.loadSales$ = this.store.select(selectLoadingSales);
  }
}
