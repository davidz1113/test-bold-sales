import { Component, Input } from '@angular/core';
import { IconValues } from './icon.constans';

@Component({
  selector: 'bold-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name: string = 'dafault';
  @Input() height: number = 16;
  @Input() width: number = 16;

  get getIconUrlByName(): string {
    const assetUrl = `assets/images/${
      IconValues[this.name as keyof typeof IconValues]
    }-icon.svg`;
    return assetUrl;
  }
}
