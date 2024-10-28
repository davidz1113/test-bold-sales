import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSalesFeature = (state: AppState) => state.sales;

export const selectSales = createSelector(
  selectSalesFeature,
  (state) => state.salesPaginated
);

export const selectSalesFiltered = createSelector(
  selectSalesFeature,
  (state) => state.salesFiltered
);

export const selectLabelFrecuency = createSelector(
  selectSalesFeature,
  (state) => state.filterDate.textLabel
);

export const selectLabelFrecuencyDate = createSelector(
  selectSalesFeature,
  (state) => state.filterDate.frecuencyLabel
);

export const selectTotalAmout = createSelector(selectSalesFeature, (state) =>
  state.salesFiltered.reduce((acc, sale) => acc + sale.amount, 0)
);

export const selectTotalPages = createSelector(
  selectSalesFeature,
  // (state)=> state.pageOptions.totalPages
  (state) => ({totalPages: state.pageOptions.totalPages, currentPage: state.pageOptions.page})
);

export const selectPageOptions = createSelector(
  selectSalesFeature,
  (state) => state.pageOptions
);
