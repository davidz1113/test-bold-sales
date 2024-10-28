import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../features/sales/store/app.state';
import { setFilterSalesType } from '../../../features/sales/store/actions/sale.action';
import { SkeletonSquareComponent } from '../skeletons/skeleton-square/skeleton-square.component';
import { Observable } from 'rxjs';
import { selectLoadingSales } from '../../../features/sales/store/selectors/sale.selector';

@Component({
  selector: 'bold-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    ReactiveFormsModule,
    SkeletonSquareComponent,
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store<AppState> = inject(Store);
  loadSales$: Observable<boolean> = new Observable<boolean>();

  checkBoxForm: FormGroup = this.fb.group({});

  constructor() {
    this.checkBoxForm = this.fb.group({
      paymentLink: [true],
      paymentTerminal: [true],
      viewAll: [true],
    });
  }

  ngOnInit(): void {
    this.checkBoxForm.get('viewAll')?.valueChanges.subscribe({
      next: (value) => {
        this.checkBoxForm.patchValue(
          { paymentLink: value, paymentTerminal: value },
          { emitEvent: false }
        );
      },
    });

    this.checkBoxForm.valueChanges.subscribe((values) => {
      const { paymentLink, paymentTerminal } = values;
      const viewAll = paymentLink && paymentTerminal;
      this.checkBoxForm.patchValue({ viewAll }, { emitEvent: false });
    });

    this.store
      .select((state: AppState) => state.sales.filterSalesType)
      .subscribe((filterSalesType) =>
        this.checkBoxForm.patchValue(filterSalesType, { emitEvent: false })
      );

    this.loadSales$ = this.store.select(selectLoadingSales);
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
