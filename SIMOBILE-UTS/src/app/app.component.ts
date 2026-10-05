import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private alertController: AlertController) {
    // Set dark mode as default on app start
    document.body.classList.add('dark');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar dari aplikasi?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Keluar',
          role: 'destructive',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
}
