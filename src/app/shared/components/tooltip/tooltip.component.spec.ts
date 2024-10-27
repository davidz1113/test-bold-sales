import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TooltipComponent } from './tooltip.component';
import { AppState } from '../../../features/sales/store/app.state';
import { initialState } from '../../../features/sales/store/reducers/sale.reducer';
import { setFilterSalesType } from '../../../features/sales/store/actions/sale.action';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update paymentLink and paymentTerminal when viewAll changes', () => {
    component.checkBoxForm.get('viewAll')?.setValue(false);
    expect(component.checkBoxForm.value).toEqual({
      paymentLink: false,
      paymentTerminal: false,
      viewAll: false,
    });

    component.checkBoxForm.get('viewAll')?.setValue(true);
    expect(component.checkBoxForm.value).toEqual({
      paymentLink: true,
      paymentTerminal: true,
      viewAll: true,
    });
  });

  it('should update viewAll when paymentLink or paymentTerminal changes', () => {
    component.checkBoxForm.get('paymentLink')?.setValue(false);
    expect(component.checkBoxForm.value.viewAll).toBe(false);

    component.checkBoxForm.get('paymentLink')?.setValue(true);
    component.checkBoxForm.get('paymentTerminal')?.setValue(false);
    expect(component.checkBoxForm.value.viewAll).toBe(false);

    component.checkBoxForm.get('paymentTerminal')?.setValue(true);
    expect(component.checkBoxForm.value.viewAll).toBe(true);
  });

  it('should dispatch setFilterSalesType action on onAppliedFilters', () => {
    const elementRef = document.createElement('div');
    component.onAppliedFilters(elementRef);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setFilterSalesType({ filterSalesType: component.checkBoxForm.value })
    );
  });

  it('should show tooltip', () => {
    const elementRef = document.createElement('div');
    component.showTooltip(elementRef);
    expect(
      elementRef.classList.contains('tooltip-container__wrapper--show')
    ).toBe(true);
    expect(
      elementRef.classList.contains('tooltip-container__wrapper--hide')
    ).toBe(false);
  });

  it('should close tooltip', () => {
    const elementRef = document.createElement('div');
    component.closeTooltip(elementRef);
    expect(
      elementRef.classList.contains('tooltip-container__wrapper--show')
    ).toBe(false);
    expect(
      elementRef.classList.contains('tooltip-container__wrapper--hide')
    ).toBe(true);
  });
});
