import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { SalesFiltersComponent } from "../../features/sales/components/sales-filters/sales-filters.component";

@Component({
  selector: 'app-home-sales',
  standalone: true,
  imports: [CardComponent, SalesFiltersComponent],
  templateUrl: './home-sales.component.html',
  styleUrl: './home-sales.component.scss'
})
export default class HomeSalesComponent {

}
