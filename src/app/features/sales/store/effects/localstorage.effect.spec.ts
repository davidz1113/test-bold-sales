import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import {
  setFilterDate,
  setFilterSalesType,
  loadFilters,
  setSearchValue,
  setOrderByAmount,
} from '../actions/sale.action';
import { LocalStorageEffect } from './localstorage.effect';
import { FrecuencyDate } from '../../../../core/models/sale.state';

describe('LocalStorageEffect', () => {
  let actions$: Observable<any>;
  let effects: LocalStorageEffect;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LocalStorageEffect);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save filters to localStorage on setFilterDate action', (done) => {
    const action = setFilterDate({
      filterDate: { date: FrecuencyDate.MONTHLY },
    });
    actions$ = of(action);

    effects.saveFilters$.subscribe(() => {
      expect(localStorage.getItem('filterDate')).toEqual(
        JSON.stringify(action.filterDate)
      );
      done();
    });
  });

  it('should save filters to localStorage on setFilterSalesType action', (done) => {
    const action = setFilterSalesType({
      filterSalesType: {
        paymentLink: true,
        paymentTerminal: true,
        viewAll: true,
      },
    });
    actions$ = of(action);

    effects.saveFilters$.subscribe(() => {
      expect(localStorage.getItem('filterSalesType')).toEqual(
        JSON.stringify(action.filterSalesType)
      );
      done();
    });
  });

  it('should load filters from localStorage and dispatch actions', (done) => {
    const filterDate = { date: FrecuencyDate.MONTHLY };
    const filterSalesType = {
      paymentLink: true,
      paymentTerminal: true,
      viewAll: true,
    };
    const searchValue = 'test';
    const isOrderByAmountAsc = true;

    localStorage.setItem('filterDate', JSON.stringify(filterDate));

    const action = loadFilters();
    actions$ = of(action);

    effects.loadFilters$.subscribe((result) => {
      expect([result]).toEqual([setFilterDate({ filterDate })]);
      done();
    });
  });
});
