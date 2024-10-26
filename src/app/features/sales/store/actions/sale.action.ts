import { createAction, props } from '@ngrx/store';
import { ISale } from '../../../../core/models/sale.interface';
import { FilterDate } from '../../../../core/models/sale.state';

export const loadSales = createAction('[Sale] Load Sales');

export const loadSalesSuccess = createAction(
  '[Sale] Load Sales Success',
  props<{ sales: ISale[] }>()
);

export const setFilterDate = createAction(
  '[Sale] Set Filter Date',
  props<{ filterDate: FilterDate }>()
);

export const setSearchValue = createAction(
  '[Sale] Set Search Value',
  props<{ searchValue: string }>()
);
