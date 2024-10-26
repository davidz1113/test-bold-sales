import { Component, Input } from '@angular/core';

@Component({
  selector: 'bold-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible: boolean | null = true;
}
