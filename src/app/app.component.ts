import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalComponent } from "./shared/components/modal/modal.component";
import { SalesDetailComponent } from "./features/sales/components/sales-detail/sales-detail.component";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [CommonModule, RouterOutlet, HeaderComponent, ModalComponent, SalesDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-bold-test';
}
