import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SalesService } from '../../../../core/services/sales.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
import { loadFilters, loadSalesSuccess } from '../actions/sale.action';

@Injectable()
export class SaleEffect {
  private action$: Actions = inject(Actions);
  private salesService: SalesService = inject(SalesService);

  constructor() {}

  loadSales$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Sale] Load Sales'),
      switchMap(() =>
        this.salesService.getSales().pipe(
          switchMap((sales) => [loadSalesSuccess({ sales }), loadFilters()]),
          catchError(() => [])
        )
      )
    )
  );
}
