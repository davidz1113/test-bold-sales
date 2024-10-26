import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../features/sales/store/app.state';
import { closeModal } from '../../../features/sales/store/actions/modal.action';

@Component({
  selector: 'bold-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible: boolean | null = false;
  private store: Store<AppState> = inject(Store);

  onCloseModal() {
    this.store.dispatch(closeModal());
  }
}
