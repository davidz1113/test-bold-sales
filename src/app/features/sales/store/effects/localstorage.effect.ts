import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadFilters,
  loadSales,
  setFilterDate,
  setFilterSalesType,
  setOrderByAmount,
  setPageOptions,
  setSearchValue,
} from '../actions/sale.action';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  FilterDate,
  FilterSalesType,
  PageOptions,
} from '../../../../core/models/sale.state';
import { initialState } from '../reducers/sale.reducer';

@Injectable()
export class LocalStorageEffect {
  private action$: Actions = inject(Actions);
  private store: Store<AppState> = inject(Store);

  saveFilters$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          setFilterDate,
          setFilterSalesType,
          setSearchValue,
          setOrderByAmount,
          setPageOptions
        ),
        tap((action: any) => {
          const actionToLocalStorageKeyMap: { [key: string]: string } = {
            [setFilterDate.type]: 'filterDate',
            [setFilterSalesType.type]: 'filterSalesType',
            [setSearchValue.type]: 'searchValue',
            [setOrderByAmount.type]: 'isOrderByAmountAsc',
            [setPageOptions.type]: 'pageOptions',
          };

          const key = actionToLocalStorageKeyMap[action.type];

          if (key) {
            localStorage.setItem(key, JSON.stringify(action[key]));
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
          let isOrderByAmountAsc: boolean = true;

          try {
            searchValue = JSON.parse(localStorage.getItem('searchValue') || '');
            isOrderByAmountAsc = JSON.parse(
              localStorage.getItem('isOrderByAmountAsc') || 'true'
            );
          } catch (error) {
            searchValue = '';
          }

          const pageOptions: PageOptions = JSON.parse(
            localStorage.getItem('pageOptions') || '{}'
          ) as PageOptions;

          return [
            setPageOptions({ pageOptions }),
            setFilterDate({ filterDate }),
            setFilterSalesType({ filterSalesType }),
            setSearchValue({ searchValue }),
            setOrderByAmount({ isOrderByAmountAsc }),
          ];
        })
      ),
    { dispatch: true }
  );
}
