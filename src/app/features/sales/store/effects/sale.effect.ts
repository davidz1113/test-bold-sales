import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SalesService } from '../../../../core/services/sales.service';
import { catchError, map, mergeMap } from 'rxjs';

@Injectable()
export class SaleEffect {
  private action$: Actions = inject(Actions);
  private salesService: SalesService = inject(SalesService);

  constructor() {}

  loadSales$ = createEffect(() =>
    this.action$.pipe(
      ofType('[Sale] Load Sales'),
      mergeMap(() =>
        this.salesService.getSales().pipe(
          map((sales) => ({
            type: '[Sale] Load Sales Success',
            sales,
          })),
          catchError(() => [])
        )
      )
    )
  );
}
