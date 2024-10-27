import { saleReducer, initialState } from './sale.reducer';
import {
  loadSales,
  loadSalesSuccess,
  setFilterDate,
  setFilterSalesType,
  setOrderByAmount,
  setSearchValue,
} from '../actions/sale.action';
import { FrecuencyDate } from '../../../../core/models/sale.state';
import { ISale } from '../../../../core/models/sale.interface';
import { DummySaleDataList } from '../../../../testing/mock';
import { calculateFrecuencyLabel } from '../../../../shared/utils/dates.utils';

describe('Sale Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'Unknown' } as any;
    const state = saleReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on loadSales', () => {
    const action = loadSales();
    const state = saleReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.filter).toBe('');
  });

  it('should set sales and salesFiltered on loadSalesSuccess', () => {
    const sales: ISale[] = DummySaleDataList;
    const action = loadSalesSuccess({ sales });
    const state = saleReducer(initialState, action);

    expect(state.sales).toEqual(sales);
    expect(state.salesFiltered).toEqual([]); // Assuming no filters applied
    expect(state.loading).toBe(false);
  });

  it('should set filterDate and update salesFiltered on setFilterDate Weekly', () => {
    const filterDate = {
      date: FrecuencyDate.WEEKLY,
      textLabel: 'Esta semana',
      frecuencyLabel: 'Semana',
    };
    const action = setFilterDate({ filterDate });
    const state = saleReducer(initialState, action);

    expect(state.filterDate).toEqual({
      ...filterDate,
      frecuencyLabel: calculateFrecuencyLabel(filterDate.date),
    });
    expect(state.salesFiltered).toEqual([]); // Assuming no sales in initial state
  });

  it('should set filterDate and update salesFiltered on setFilterDate Monthly', () => {
    const filterDate = {
      date: FrecuencyDate.MONTHLY,
      textLabel: 'Este mes',
      frecuencyLabel: 'Semana',
    };
    const action = setFilterDate({ filterDate });
    const state = saleReducer(initialState, action);

    expect(state.filterDate).toEqual({
      ...filterDate,
      frecuencyLabel: calculateFrecuencyLabel(filterDate.date),
    });
    expect(state.salesFiltered).toEqual([]); // Assuming no sales in initial state
  });

  it('should set searchValue and update salesFiltered on setSearchValue', () => {
    const searchValue = 'test';
    const action = setSearchValue({ searchValue });
    const state = saleReducer(initialState, action);

    expect(state.filter).toBe(searchValue);
    expect(state.salesFiltered).toEqual([]); // Assuming no sales in initial state
  });

  it('should set filterSalesType and update salesFiltered on setFilterSalesType', () => {
    const filterSalesType = {
      paymentLink: true,
      paymentTerminal: false,
      viewAll: false,
    };
    const action = setFilterSalesType({ filterSalesType });
    const state = saleReducer(initialState, action);

    expect(state.filterSalesType).toEqual(filterSalesType);
    expect(state.salesFiltered).toEqual([]); // Assuming no sales in initial state
  });

  it('should set isOrderByAmountAsc and update salesFiltered on setOrderByAmount', () => {
    const isOrderByAmountAsc = false;
    const action = setOrderByAmount({ isOrderByAmountAsc });
    const state = saleReducer(initialState, action);

    expect(state.isOrderByAmountAsc).toBe(isOrderByAmountAsc);
    expect(state.salesFiltered).toEqual([]); // Assuming no sales in initial state
  });
});

