import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SalesListComponent } from './sales-list.component';
import { AppState } from '../../store/app.state';
import { initialState } from '../../store/reducers/sale.reducer';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  setOrderByAmount,
  setSearchValue,
} from '../../store/actions/sale.action';
import { ISale } from '../../../../core/models/sale.interface';
import { DummySaleDataList } from '../../../../testing/mock';
import { openModal } from '../../store/actions/modal.action';

describe('SalesListComponent', () => {
  let component: SalesListComponent;
  let fixture: ComponentFixture<SalesListComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(SalesListComponent);
    component = fixture.componentInstance;

    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sales$ and labelFrecuency$', () => {
    component.sales$.subscribe((sales) => {
      expect(sales).toEqual(initialState.sales);
    });

    component.labelFrecuency$.subscribe((label) => {
      expect(label).toEqual(initialState.filterDate.textLabel);
    });
  });

  it('should update searchInputValue and dispatch setSearchValue action on input change', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input')
    );
    inputElement.nativeElement.value = 'test';
    inputElement.triggerEventHandler('input', {
      target: inputElement.nativeElement,
    });

    expect(component.searchInputValue()).toBe('test');
    expect(dispatchSpy).toHaveBeenCalledWith(
      setSearchValue({ searchValue: 'test' })
    );
  });

  it('should dispatch openModal action on view detail', () => {
    const sale: ISale = DummySaleDataList[0];
    component.onViewDetail(sale);

    expect(dispatchSpy).toHaveBeenCalledWith(openModal({ data: sale }));
  });

  it('should toggle isOrderAsc and dispatch setOrderByAmount action on sort by amount', () => {
    component.isOrderAsc = true;
    component.onSortByMount();

    expect(component.isOrderAsc).toBe(false);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setOrderByAmount({ isOrderByAmountAsc: false })
    );

    component.onSortByMount();

    expect(component.isOrderAsc).toBe(true);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setOrderByAmount({ isOrderByAmountAsc: true })
    );
  });
});
