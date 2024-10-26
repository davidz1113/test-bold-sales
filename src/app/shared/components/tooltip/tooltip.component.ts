import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../features/sales/store/app.state';
import { setFilterSalesType } from '../../../features/sales/store/actions/sale.action';

@Component({
  selector: 'bold-tooltip',
  standalone: true,
  imports: [CommonModule, IconComponent, ReactiveFormsModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store<AppState> = inject(Store);

  checkBoxForm: FormGroup = this.fb.group({});

  constructor() {
    this.checkBoxForm = this.fb.group({
      paymentLink: [],
      paymentTerminal: [],
      viewAll: [],
    });
  }

  showTooltip(elementRef: HTMLElement): void {
    elementRef.classList.remove('tooltip-container__wrapper--hide');
    elementRef.classList.add('tooltip-container__wrapper--show');
  }

  onAppliedFilters(elementRef: HTMLElement): void {
    this.store.dispatch(
      setFilterSalesType({ filterSalesType: this.checkBoxForm.value })
    );
    this.closeTooltip(elementRef);
  }

  closeTooltip(elementRef: HTMLElement): void {
    elementRef.classList.remove('tooltip-container__wrapper--show');
    elementRef.classList.add('tooltip-container__wrapper--hide');
  }
}
