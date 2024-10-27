import { createReducer, on } from '@ngrx/store';
import {
  FilterDate,
  FilterSalesType,
  FrecuencyDate,
  SaleState,
} from '../../../../core/models/sale.state';
import {
  loadSales,
  loadSalesSuccess,
  setFilterDate,
  setFilterSalesType,
  setOrderByAmount,
  setSearchValue,
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
  filterSalesType: {
    paymentLink: true,
    paymentTerminal: true,
    viewAll: true,
  },
  isOrderByAmountAsc: true,
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
    salesFiltered: filterSales(
      sales,
      state.filterDate,
      state.filter,
      state.filterSalesType,
      state.isOrderByAmountAsc
    ),
    loading: false,
  })),
  on(setFilterDate, (state, { filterDate }) => ({
    ...state,
    filterDate: {
      ...filterDate,
      frecuencyLabel: calculateFrecuencyLabel(filterDate.date),
    },
    salesFiltered: filterSales(
      state.sales,
      filterDate,
      state.filter,
      state.filterSalesType,
      state.isOrderByAmountAsc
    ),
  })),
  on(setSearchValue, (state, { searchValue }) => ({
    ...state,
    filter: searchValue,
    salesFiltered: filterSales(
      state.sales,
      state.filterDate,
      searchValue,
      state.filterSalesType,
      state.isOrderByAmountAsc
    ),
  })),
  on(setFilterSalesType, (state, { filterSalesType }) => ({
    ...state,
    filterSalesType,
    salesFiltered: filterSales(
      state.sales,
      state.filterDate,
      state.filter,
      filterSalesType,
      state.isOrderByAmountAsc
    ),
  })),
  on(setOrderByAmount, (state, { isOrderByAmountAsc }) => ({
    ...state,
    isOrderByAmountAsc,
    salesFiltered: filterSales(
      state.sales,
      state.filterDate,
      state.filter,
      state.filterSalesType,
      isOrderByAmountAsc
    ),
  }))
);

const filterSales = (
  originalSales: ReadonlyArray<ISale>,
  filterDate: FilterDate,
  filter: string,
  filterSalesType: FilterSalesType,
  isOrderByAmountAsc: boolean
): ISale[] => {
  let newSales = originalSales.slice();

  if (filterDate.date === FrecuencyDate.TODAY) {
    const dateToFilter = new Date().getDate();
    newSales = newSales.filter((sale) => {
      const day = new Date(sale.createdAt).getDate();
      return day === dateToFilter;
    });
  } else if (filterDate.date === FrecuencyDate.WEEKLY) {
    const { startDate, endDate } = getWeekDates(new Date());
    newSales = newSales.filter((sale) => {
      const saleDate = new Date(sale.createdAt).getTime();
      return saleDate >= startDate && saleDate <= endDate;
    });
  } else if (filterDate.date === FrecuencyDate.MONTHLY) {
    const dateToFilter = new Date().getMonth();
    newSales = newSales.filter((sale) => {
      const month = new Date(sale.createdAt).getMonth();
      return month === dateToFilter;
    });
  }

  if (filter) {
    newSales = newSales.filter((sale: any) => {
      //Filtrar por todos los campos
      return Object.keys(sale).some((key) => {
        if (typeof sale[key] === 'string') {
          return sale[key].toLowerCase().includes(filter.toLowerCase());
        }
        return false;
      });
    });
  }

  newSales = newSales.filter((sale) => {
    if (filterSalesType.viewAll) {
      return true;
    }
    if (filterSalesType.paymentLink && filterSalesType.paymentTerminal) {
      return sale.salesType === 'PAYMENT_LINK' || sale.salesType === 'TERMINAL';
    } else if (filterSalesType.paymentLink) {
      return sale.salesType === 'PAYMENT_LINK';
    } else if (filterSalesType.paymentTerminal) {
      return sale.salesType === 'TERMINAL';
    }
    return true;
  });

  if (isOrderByAmountAsc) {
    newSales = newSales.sort((a, b) => a.amount - b.amount);
  } else {
    newSales = newSales.sort((a, b) => b.amount - a.amount);
  }

  return newSales;
};
