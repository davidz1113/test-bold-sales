import { createReducer, on } from '@ngrx/store';
import {
  FilterDate,
  FrecuencyDate,
  SaleState,
} from '../../../../core/models/sale.state';
import {
  loadSales,
  loadSalesSuccess,
  setFilterDate,
} from '../actions/sale.action';
import { ISale } from '../../../../core/models/sale.interface';
import {
  calculateFrecuencyLabel,
  getWeekDates,
} from '../../../../shared/utils/dates.utils';

export const initialState: SaleState = {
  sales: [],
  salesFiltered: [],
  loading: false,
  filter: '',
  filterDate: {
    date: FrecuencyDate.TODAY,
    textLabel: 'hoy',
    frecuencyLabel: calculateFrecuencyLabel(FrecuencyDate.TODAY),
  },
};

export const saleReducer = createReducer(
  initialState,
  on(loadSales, (state) => ({
    ...state,
    loading: true,
    filter: '',
  })),
  on(loadSalesSuccess, (state, { sales }) => ({
    ...state,
    sales,
    salesFiltered: filterSales(sales, state.filterDate),
    loading: false,
  })),
  on(setFilterDate, (state, { filterDate }) => ({
    ...state,
    filterDate: {
      ...filterDate,
      frecuencyLabel: calculateFrecuencyLabel(filterDate.date),
    },
    salesFiltered: filterSales(state.sales, filterDate),
  }))
);

const filterSales = (
  originalSales: ReadonlyArray<ISale>,
  filterDate: FilterDate
): ISale[] => {
  let newSales = originalSales.slice();

  if (filterDate.date === FrecuencyDate.TODAY) {
    const dateToFilter = new Date().getDate();
    newSales = newSales.filter((sale) => {
      const day = new Date(sale.createdAt).getDate();
      return day === dateToFilter;
    });
  }

  if (filterDate.date === FrecuencyDate.WEEKLY) {
    const { startDate, endDate } = getWeekDates(new Date());
    newSales = newSales.filter((sale) => {
      const saleDate = new Date(sale.createdAt).getTime();
      return saleDate >= startDate && saleDate <= endDate;
    });
  }

  if (filterDate.date === FrecuencyDate.MONTHLY) {
    const dateToFilter = new Date().getMonth();
    newSales = newSales.filter((sale) => {
      const month = new Date(sale.createdAt).getMonth();
      return month === dateToFilter;
    });
  }

  return newSales;
};
