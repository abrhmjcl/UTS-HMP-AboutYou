# 🛒 SIMOBILE - Sistem Kasir Makmur Jaya

Aplikasi SIMOBILE yang dibangun agar dapat membantu Bu Marni dalam penjualan dan aplikasi ini dibangun menggunakan **Ionic Angular** (NgModule)

---

## 👥 Tim Pengembang (Kelompok AboutYou)

| Nama Lengkap | NRP |
| :--- | :--- |
| **Abraham Jeconiah Loasari** | 160424126 |
| **Dylan Xisco Hidayat** | 160424106 |
| **Elgift Antonio Mananti** | 160424111 |
| **Juan Morello Gulo** | 160424103 |

---

## 🚀 Fitur Utama & Fungsionalitas

Proyek SIMOBILE ini dibangun dengan pendekatan *Component-based* dan memisahkan seluruh *business logic* ke dalam *Service*. Berikut adalah fungsionalitas yang telah diimplementasikan:

1. **Sistem Navigasi Ganda**
   - Menggunakan kombinasi **Tab Navigation** di bagian bawah (Dashboard, Produk, Transaksi, Profil) dan **Drawer/Side Menu** yang tersembunyi untuk akses menu esensial (Pengaturan, Tentang, Logout).

2. **Manajemen Produk (CRUD & Validasi)**
   - Menampilkan *list* produk dengan gambar, dilengkapi kotak **Pencarian Real-Time** (Two-Way Data Binding) dan Filter Kategori.
   - Penambahan dan Pengubahan data produk menggunakan sistem **Reactive Forms** milik Angular yang ketat (Stok & Harga tidak boleh negatif).

3. **Sistem Keranjang & Checkout Transaksi**
   - Integrasi *Cart Service* yang memungkinkan simulasi penambahan item ke keranjang.
   - Jumlah tagihan dihitung otomatis dan memotong stok produk secara langsung (*real-time sync*) ketika transaksi dikonfirmasi.

4. **Rekapitulasi Data (Dashboard & Riwayat)**
   - Halaman Dashboard menampilkan total pendapatan, jumlah penjualan harian, serta produk paling laku.
   - Halaman Riwayat Transaksi menyimpan seluruh jejak nota digital yang telah berhasil di-*checkout*.
   - Menerapkan *pull-to-refresh* manual untuk mencegah *bug UI freeze* pada *router* Ionic.

5. **Kustomisasi Tema & UX**
   - Dilengkapi saklar **Dark Mode / Light Mode** yang ada di menu Pengaturan.
   - *Toast Notifications* kustom untuk memberi *feedback* kepada pengguna (contoh: "Stok Habis" atau "Berhasil dimasukkan ke keranjang").
   - Animasi *Fade-in* saat daftar katalog dimuat pertama kali.
   - *Event Binding Error Handling* pada gambar (Otomatis mengganti gambar yang mati/rusak menjadi *placeholder default*).

---


## ⚙️ Petunjuk Menjalankan Aplikasi

### Prasyarat
- **Node.js** (versi 18 atau lebih baru)
- **Ionic CLI** — install dengan perintah:
  ```bash
  npm install -g @ionic/cli
  ```

Pastikan Anda sudah menginstal Node.js dan Ionic CLI di komputer Anda.

1. **Download Repository:**
   ```bash
   git clone https://github.com/abrhmjcl/UTS-HMP-AboutYou.git
   ```

2. **Pindah ke Direktori di Cmd:**
   ```bash
   cd UTS-HMP-AboutYou/SIMOBILE-UTS
   ```

3. **Compile dan Jalankan Aplikasi:**
   ```bash
   ionic serve
   ```
   *(Browser akan otomatis terbuka di `http://localhost:8100` untuk menampilkan *preview* aplikasi).*

---

## 📂 Stuktur Folder

```text
SIMOBILE-UTS/
├── src/app/
│   ├── animations/        # Menyimpan logika animasi Ionic
│   ├── models/            # Deklarasi tipe data (TS Interfaces)
│   ├── services/          # Manajemen State & Data (Cart, Product, Transaction)
│   └── pages/             # Kumpulan Halaman UI
│       ├── about/         # Identitas kelompok
│       ├── cart/          # Halaman kasir/keranjang
│       ├── dashboard/     # Ringkasan analitik
│       ├── product-list/  # Etalase produk
│       ├── product-detail/# Rincian lengkap 1 produk
│       ├── product-form/  # Formulir Angular (Reactive)
│       ├── profile/       # Identitas toko
│       ├── settings/      # Opsi tema aplikasi
│       └── transaction-history/
└── src/theme/
    └── variables.scss     # Kode warna Hex dan kustomisasi Dark Mode
```
