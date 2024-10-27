import { createAction, props } from '@ngrx/store';
import { ISale } from '../../../../core/models/sale.interface';
import {
  FilterDate,
  FilterSalesType,
} from '../../../../core/models/sale.state';

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

export const setFilterSalesType = createAction(
  '[Sale] Set Filter Sales Type',
  props<{ filterSalesType: FilterSalesType }>()
);

export const loadFilters = createAction('[Sales List] Load Filters');

export const setOrderByAmount = createAction(
  '[Sales List] Set Order By Amount',
  props<{ isOrderByAmountAsc: boolean }>()
);
