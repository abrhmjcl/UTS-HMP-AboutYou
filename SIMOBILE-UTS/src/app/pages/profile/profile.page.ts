import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  owner = {
    name: 'Ibu Marni',
    role: 'Pemilik Toko Makmur Jaya',
    phone: '0812-9988-7766',
    email: 'marni@tokomakmurjaya.com',
    address: 'Jl. Rungkut Madya No. 1, Surabaya',
    joinDate: 'Maret 2023',
    photoUrl: 'assets/images/profile-pic.png'
  };

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

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
            window.location.reload();   // Reset seluruh app
          }
        }
      ]
    });
    await alert.present();
  }
}
