import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SalesService } from '../../../../core/services/sales.service';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import {
  loadFilters,
  loadSalesSuccess,
  setFilterDate,
  setFilterSalesType,
  setOrderByAmount,
  setPageOptions,
  setSearchValue,
  updateSalesPaginated,
} from '../actions/sale.action';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  selectLabelFrecuency,
  selectPageOptions,
  selectSales,
  selectSalesFiltered,
} from '../selectors/sale.selector';
import { calculateTotalPages } from '../../../../shared/utils/utils.utils';

@Injectable()
export class SaleEffect {
  private action$: Actions = inject(Actions);
  private salesService: SalesService = inject(SalesService);
  private store: Store<AppState> = inject(Store);

  constructor() {}

  loadSales$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Sale] Load Sales'),
      switchMap(() =>
        this.salesService.getSales().pipe(
          switchMap((sales) => {
            return [loadFilters(), loadSalesSuccess({ sales })];
          }),
          catchError(() => [])
        )
      )
    )
  );

  loadTotalPages$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        loadSalesSuccess,
        setFilterDate,
        setSearchValue,
        setFilterSalesType,
        setOrderByAmount
      ),
      withLatestFrom(
        this.store.select(selectPageOptions),
        this.store.select(selectSalesFiltered)
      ),
      switchMap(([_action, pageOptions, sales]) => {
        return [
          setPageOptions({
            pageOptions: {
              ...pageOptions,
              page: 1,
              totalPages: calculateTotalPages(sales, pageOptions.size),
            },
          }),
          updateSalesPaginated(),
        ];
      })
    )
  );

  // updateSalesPaginated$ = createEffect(() =>
  //   this.action$.pipe((ofType(loadSalesSuccess))),
}
