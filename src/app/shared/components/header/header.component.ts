import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'bold-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
