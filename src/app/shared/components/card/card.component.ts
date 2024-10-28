import { Component, Input } from '@angular/core';

@Component({
  selector: 'bold-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = 'Default Title';
  @Input() icon: string = 'info-icon';
  @Input() tooltipText?: string = 'Default Description';
}
