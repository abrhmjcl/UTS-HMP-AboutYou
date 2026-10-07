import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  owner = {
    name: 'Ibu Marni',
    role: 'Owner Toko Makmur Jaya',
    phone: ' (031) 2981005',
    email: 'makmurjaya@gmail.com',
    address: 'Jl. Raya Kalirungkut, Kali Rungkut, Kec. Rungkut, Surabaya, Jawa Timur 60293',
    joinDate: '-',
    photoUrl: 'assets/images/profile-pic.png'
  };

  constructor() { }

  ngOnInit() {
  }
}
