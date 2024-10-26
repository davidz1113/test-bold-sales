import { Component, inject } from '@angular/core';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { setFilterDate } from '../../store/actions/sale.action';
import {
  FrecuencyDate,
  LabelFrecuencyDate,
} from '../../../../core/models/sale.state';

@Component({
  selector: 'bold-sales-filters',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './sales-filters.component.html',
  styleUrl: './sales-filters.component.scss',
})
export class SalesFiltersComponent {
  filterDatesFrecuency: FrecuencyDate[] = [
    FrecuencyDate.TODAY,
    FrecuencyDate.WEEKLY,
    FrecuencyDate.MONTHLY,
  ];

  labelDatesFrecuency: any[] = [
    LabelFrecuencyDate.TODAY,
    LabelFrecuencyDate.WEEKLY,
    this.getCurrentMonth,
  ];

  buttonActiveIndex: number = 0;
  private store: Store<AppState> = inject(Store);

  changeFilterDate(index: number): void {
    this.buttonActiveIndex = index;
    this.store.dispatch(
      setFilterDate({
        filterDate: {
          date: this.filterDatesFrecuency[index],
          textLabel: this.labelDatesFrecuency[index],
        },
      })
    );
  }

  get getCurrentMonth(): string {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return month.charAt(0).toUpperCase() + month.slice(1);
  }
}
