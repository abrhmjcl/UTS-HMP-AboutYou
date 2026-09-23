import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  
  owner = {
    name: 'Budi Santoso',
    role: 'Pemilik Toko',
    phone: '0812-3456-7890',
    email: 'budi.santoso@tokomakmur.com',
    address: 'Jl. Merdeka No.45, Jakarta',
    joinDate: 'Januari 2023',
    photoUrl: 'assets/images/profile-pic.png'
  };

  constructor() {}

  ngOnInit() {
  }
}
