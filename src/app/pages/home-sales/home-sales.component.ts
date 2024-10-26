import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SalesFiltersComponent } from '../../features/sales/components/sales-filters/sales-filters.component';
import { SalesListComponent } from '../../features/sales/components/sales-list/sales-list.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home-sales',
  standalone: true,
  imports: [CardComponent, SalesFiltersComponent, SalesListComponent],
  providers: [CurrencyPipe],
  templateUrl: './home-sales.component.html',
  styleUrl: './home-sales.component.scss',
})
export default class HomeSalesComponent {}
