import { Component } from '@angular/core';
import { TooltipComponent } from "../../../../shared/components/tooltip/tooltip.component";

@Component({
  selector: 'bold-sales-filters',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './sales-filters.component.html',
  styleUrl: './sales-filters.component.scss'
})
export class SalesFiltersComponent {
  buttonActiveIndex: number = 0; 

}
