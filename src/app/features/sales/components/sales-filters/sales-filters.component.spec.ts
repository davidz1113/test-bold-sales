import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SalesFiltersComponent } from './sales-filters.component';
import { AppState } from '../../store/app.state';
import { initialState } from '../../store/reducers/sale.reducer';
import { setFilterDate } from '../../store/actions/sale.action';
import {
  FrecuencyDate,
  LabelFrecuencyDate,
} from '../../../../core/models/sale.state';

describe('SalesFiltersComponent', () => {
  let component: SalesFiltersComponent;
  let fixture: ComponentFixture<SalesFiltersComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesFiltersComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(SalesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change filter date and dispatch action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.changeFilterDate(1);
    expect(component.buttonActiveIndex).toBe(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setFilterDate({
        filterDate: {
          date: FrecuencyDate.WEEKLY,
          textLabel: LabelFrecuencyDate.WEEKLY,
        },
      })
    );
  });

  it('should return the current month in Spanish', () => {
    const currentMonth = component.getCurrentMonth;
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const expectedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    expect(currentMonth).toBe(expectedMonth);
  });
});
