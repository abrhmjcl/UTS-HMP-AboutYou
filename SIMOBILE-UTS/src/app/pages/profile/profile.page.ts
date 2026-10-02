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
    role: 'Pemilik Toko Makmur Jaya',
    phone: '0812-9988-7766',
    email: 'marni@tokomakmurjaya.com',
    address: 'Jl. Rungkut Madya No. 1, Surabaya',
    joinDate: 'Maret 2023',
    photoUrl: 'assets/images/profile-pic.png'
  };

  constructor() { }

  ngOnInit() {
  }

  logout() {
    window.location.reload();
  }
}