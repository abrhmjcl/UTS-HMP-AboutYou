import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  isLightMode: boolean = true;

  constructor() { }

  ngOnInit() {
    this.isLightMode = !document.body.classList.contains('dark');
    if (this.isLightMode) {
      document.body.classList.add('light');
    }
  }

  toggleLightMode(event: any) {
    const isChecked = event.detail.checked;
    document.body.classList.toggle('dark', !isChecked);
    document.body.classList.toggle('light', isChecked);
  }

  logout() {
    window.location.reload();
  }
}
