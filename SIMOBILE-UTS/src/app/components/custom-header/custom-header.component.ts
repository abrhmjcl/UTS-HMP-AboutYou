import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  standalone: false,
})
export class CustomHeaderComponent {
  @Input() title: string = 'SIMOBILE';
  @Input() showMenuButton: boolean = true;
  @Input() showBackButton: boolean = false;
  @Input() backHref: string = '/tabs/dashboard';

  constructor() {}
}
