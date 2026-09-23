import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon: string = 'cart-outline';
  @Input() title: string = 'Tidak ada data';
  @Input() message: string = 'Belum ada data untuk ditampilkan';

  constructor() {}
}
