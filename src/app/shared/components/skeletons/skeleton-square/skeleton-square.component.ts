import { Component, Input } from '@angular/core';

@Component({
  selector: 'bold-skeleton-square',
  standalone: true,
  imports: [],
  templateUrl: './skeleton-square.component.html',
  styleUrl: './skeleton-square.component.scss',
})
export class SkeletonSquareComponent {
  @Input() height: string = '30';
  @Input() width: string = '60';
  @Input() classT: string = '0';
}
