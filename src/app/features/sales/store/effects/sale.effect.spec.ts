import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { SalesService } from '../../../../core/services/sales.service';
import { SaleEffect } from './sale.effect';
import { DummySaleDataList } from '../../../../testing/mock';

describe('SaleEffect', () => {
  let actions$: Observable<any>;
  let effects: SaleEffect;
  let salesService: SalesService;

  beforeEach(() => {
    const salesServiceSpy = { getSales: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        SaleEffect,
        provideMockActions(() => actions$),
        { provide: SalesService, useValue: salesServiceSpy },
      ],
    });

    effects = TestBed.inject(SaleEffect);
    salesService = TestBed.inject(SalesService);
  });

  it('loadSales$ should return loadSalesSuccess and loadFilters', () => {
    const sales = DummySaleDataList;
    const action = { type: '[Sale] Load Sales' };
    const expectedActions = [
      { type: '[Sale] Load Sales Success', sales },
      { type: '[Sale] Load Filters' },
    ];

    jest.spyOn(salesService, 'getSales').mockReturnValue(of(sales));
    actions$ = of(action);

    effects.loadSales$.subscribe((result) => {
      expect(result).toEqual(expectedActions);
    });
  });
});
