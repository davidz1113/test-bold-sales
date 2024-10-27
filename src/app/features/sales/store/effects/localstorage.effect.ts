import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadFilters,
  loadSales,
  setFilterDate,
  setFilterSalesType,
  setSearchValue,
} from '../actions/sale.action';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  FilterDate,
  FilterSalesType,
} from '../../../../core/models/sale.state';
import { initialState } from '../reducers/sale.reducer';

@Injectable()
export class LocalStorageEffect {
  private action$: Actions = inject(Actions);
  private store: Store<AppState> = inject(Store);

  saveFilters$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loadSales, setFilterDate, setFilterSalesType, setSearchValue),
        tap((action) => {
          if (action.type === setFilterDate.type) {
            localStorage.setItem(
              'filterDate',
              JSON.stringify(action.filterDate)
            );
          } else if (action.type === setFilterSalesType.type) {
            localStorage.setItem(
              'filterSalesType',
              JSON.stringify(action.filterSalesType)
            );
          } else if (action.type === setSearchValue.type) {
            localStorage.setItem(
              'searchValue',
              JSON.stringify(action.searchValue)
            );
          }
        })
      ),
    { dispatch: false }
  );

  //dispach after loadSales$ effect
  loadFilters$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loadFilters),
        switchMap((sales) => {
          const filterDate: FilterDate = JSON.parse(
            localStorage.getItem('filterDate') || '{}'
          ) as FilterDate;

          const filterSalesType: FilterSalesType = JSON.parse(
            localStorage.getItem('filterSalesType') || '{}'
          ) as FilterSalesType;

          let searchValue: string = '';

          try {
            searchValue = JSON.parse(localStorage.getItem('searchValue') || '');
          } catch (error) {
            searchValue = '';
          }

          console.log('filterDate', filterDate);

          return [
            setFilterDate({ filterDate }),
            setFilterSalesType({ filterSalesType }),
            setSearchValue({ searchValue }),
          ];
        })
      ),
    { dispatch: true }
  );
}
