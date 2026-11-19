# RemahManis

Web katalog cookies: cari, saring, urutkan, lalu pesan lewat WhatsApp.
HTML, CSS, dan JavaScript biasa. Tidak perlu install apa pun.

## Cara membuka di VS Code

1. Ekstrak zip, lalu di VS Code pilih **File > Open Folder** dan buka folder `remahmanis`.
2. Pasang ekstensi **Live Server** (Ritwick Dey).
3. Klik kanan `index.html`, pilih **Open with Live Server**.

Bisa juga langsung klik dua kali `index.html` di File Explorer. Hasilnya sama.

## Struktur folder

```
remahmanis/
├── index.html          halaman utama
├── css/style.css       semua tampilan; warna merek ada di :root paling atas
├── js/
│   ├── products.js     nomor WhatsApp dan data produk (edit di sini)
│   └── app.js          logika cari, filter, urut, tombol pesan
└── assets/
    ├── logo.svg        logo
    ├── favicon.svg     ikon tab browser
    ├── hero.svg        gambar besar di bagian atas
    └── products/       gambar tiap produk
```

## Mengganti nomor WhatsApp

Buka `js/products.js`, ubah `NOMOR_WA`. Format internasional, tanpa `+`, spasi, atau tanda hubung:

```js
NOMOR_WA: '6281234567890'
```

## Memakai foto asli

1. Simpan foto di `assets/products/` (rasio 4:3, misalnya 1200 x 900 px).
2. Di `js/products.js`, ganti nama file pada baris `foto` produk yang bersangkutan:

```js
foto: 'assets/products/butter-cookies.jpg',
```

Kalau file foto tidak ditemukan, halaman otomatis menampilkan ilustrasi cookie sebagai cadangan.

Foto bebas pakai bisa dicari di Unsplash atau Pexels. Foto buatan sendiri paling bagus untuk produk nyata.

## Menambah produk

Salin satu blok `{ id: ..., nama: ..., ... }` di `js/products.js`, beri `id` baru (misalnya `p-009`), lalu isi datanya. Kalau kategorinya baru, tambahkan juga `<option>` di `index.html` pada `<select id="kat">`.

## Catatan

- Font (Young Serif dan Hanken Grotesk) dimuat dari Google Fonts, jadi butuh internet. Tanpa internet, halaman memakai font bawaan sistem dan tetap terbaca.
- Kalau nanti dipindah ke proyek Vite, isi folder `assets/` bisa ditaruh di `public/`, dan `css/`, `js/` disesuaikan dengan struktur `src` kamu.
