import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'bold-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  showTooltip(elementRef: HTMLElement): void {
    elementRef.classList.remove('tooltip-container__wrapper--hide');
    elementRef.classList.add('tooltip-container__wrapper--show');
  }
  
  closeTooltip(elementRef: HTMLElement): void {
    elementRef.classList.remove('tooltip-container__wrapper--show');
    elementRef.classList.add('tooltip-container__wrapper--hide');
  }
}
