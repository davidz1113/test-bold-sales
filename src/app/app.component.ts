import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SalesDetailComponent } from './features/sales/components/sales-detail/sales-detail.component';
import { Store } from '@ngrx/store';
import { AppState } from './features/sales/store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ModalComponent,
    SalesDetailComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-bold-test';

  private store: Store<AppState> = inject(Store);
  isModalVisible$: Observable<boolean> = new Observable<boolean>();

  ngOnInit() {
    this.isModalVisible$ = this.store.select(({ modal }) => modal.isVisible);
  }
}
