import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  isLightMode: boolean = false;  // ← Default dark, toggle ke light

  constructor() { }

  ngOnInit() {
    // Cek apakah LIGHT mode aktif (dark = default)
    this.isLightMode = !document.body.classList.contains('dark');
  }

  toggleLightMode(event: any) {
    const isChecked = event.detail.checked;
    // Jika toggle ON → remove dark class (jadi light)
    // Jika toggle OFF → add dark class (kembali dark)
    document.body.classList.toggle('dark', !isChecked);
  }
}
