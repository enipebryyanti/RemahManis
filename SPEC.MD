# SPEC.md — RemahManis

**Web jualan cookies berbasis web: katalog produk dan pemesanan lewat WhatsApp (latihan 1 hari)**

| Item | Isi |
|---|---|
| Versi dokumen | 1.0 (draft siap implementasi) |
| Estimasi pengerjaan | ±8 jam (1 hari kerja) |
| Tech stack | Vite + JavaScript vanilla, tanpa framework UI, tanpa backend |
| Penyimpanan | `localStorage` browser |
| Status kode | **Belum ada.** Dokumen ini hanya spesifikasi. |

---

## 1. Tujuan

### 1.1 Tujuan produk
Menyediakan web jualan cookies sederhana agar toko cookies rumahan (UMKM) dapat memajang produk, dan calon pembeli dapat mencari, menyaring, mengurutkan, lalu memesan lewat WhatsApp. Pembayaran dan pengiriman dibicarakan di percakapan WhatsApp, bukan di aplikasi. Pengelola toko dapat mengubah data produk lewat dashboard demo pada perangkat yang sama.

### 1.2 Tujuan latihan
- Berlatih alur kerja System Analyst → Software Engineer: spesifikasi dulu, baru implementasi bertahap.
- Berlatih JavaScript vanilla: manipulasi DOM, state sederhana, modul ES, validasi form, `localStorage`.
- Menghasilkan MVP yang **seluruh kriteria penerimaannya bisa diperiksa manual** (Bagian 8).

### 1.3 Indikator keberhasilan
1. Semua acceptance criteria berprioritas *Must* berstatus lulus.
2. `npm run build` berhasil tanpa error.
3. Tidak ada rahasia (API key/token) di repositori dan tidak ada request jaringan keluar saat halaman dimuat.

---

## 2. Pengguna

| Pengguna | Deskripsi | Kebutuhan utama |
|---|---|---|
| **Calon pembeli** | Pengunjung yang melihat katalog cookies. | Menemukan cookies yang dicari dengan cepat, melihat harga dan stok, memesan lewat WhatsApp. |
| **Pengelola toko** | Pemilik/staf toko cookies. Memakai perangkat dan browser yang sama dengan pembeli. | Menambah, mengubah, menghapus produk; melihat total produk dan total stok. |

**Catatan penting**
- Tidak ada login, akun, atau peran. Dashboard dapat dibuka siapa pun yang memegang perangkat. Ini sengaja (demo) dan harus dinyatakan jelas di antarmuka dan README, bukan disamarkan sebagai keamanan.
- Data hanya ada di browser tersebut. Perangkat atau browser lain tidak berbagi data.

---

## 3. Daftar Fitur

Prioritas: **M** = Must (wajib untuk MVP), **S** = Should (dikerjakan jika waktu cukup).

| ID | Fitur | Prio | Aturan ringkas |
|---|---|---|---|
| F-01 | Katalog produk (grid kartu) | M | Kartu menampilkan gambar/placeholder, nama, kategori, harga Rupiah, stok. Badge "Unggulan" jika `unggulan = true`. Badge "Habis" jika stok 0. |
| F-02 | Data contoh 8 produk | M | Dimuat saat `localStorage` belum berisi data (lihat 3.1). |
| F-03 | Pencarian | M | Lihat 3.2. |
| F-04 | Filter | M | Kategori (Semua/Klasik/Cokelat/Kue & Hampers) dan sakelar "Hanya yang tersedia". |
| F-05 | Sorting | M | Lihat 3.3. |
| F-06 | Tombol pesan WhatsApp | M | Lihat 3.4. |
| F-07 | Dashboard demo: daftar produk | M | Tabel semua produk dengan tombol Ubah dan Hapus. Banner "Mode demo, tanpa login, data tersimpan hanya di browser ini". |
| F-08 | Tambah produk | M | Form dengan validasi (Bagian 4.2). |
| F-09 | Ubah produk | M | Form yang sama terisi data produk, simpan memperbarui produk (bukan membuat baru). |
| F-10 | Hapus produk | M | Dengan konfirmasi sebelum menghapus. |
| F-11 | Ringkasan | M | Total produk dan total stok, dihitung dari **seluruh data**, bukan dari hasil filter. |
| F-12 | Penyimpanan `localStorage` | M | Lihat 3.5. Termasuk tombol "Reset data demo". |
| F-13 | Navigasi Katalog ↔ Dashboard | S | Dua tab; tab aktif ikut `#hash` URL agar refresh tidak kembali ke katalog. |
| F-14 | Tombol "Hapus pencarian" dan "Reset filter" | S | Mengembalikan tampilan ke semua produk. |

### 3.1 Data contoh (seed)

Fiktif dan nonpribadi. Nama file gambar berada di `public/images/`; berkas `placeholder.svg` dipakai sebagai cadangan. Produk p-005 sengaja tidak memiliki `imageUrl` agar placeholder teruji.

| id | nama | kategori | harga (Rp) | stok | unggulan | imageUrl |
|---|---|---|---|---|---|---|
| p-001 | Butter Cookies Original | Klasik | 38000 | 25 | ya | /images/butter-cookies.svg |
| p-002 | Nastar Nanas Premium | Kue & Hampers | 85000 | 12 | ya | /images/nastar.svg |
| p-003 | Hampers Cookies 4 Toples | Kue & Hampers | 150000 | 30 | tidak | /images/hampers-4-toples.svg |
| p-004 | Choco Chip Cookies 250 g | Cokelat | 45000 | 8 | ya | /images/choco-chip.svg |
| p-005 | Double Chocolate Cookies | Cokelat | 48000 | **0** | tidak | *(kosong)* |
| p-006 | Oatmeal Raisin Cookies | Klasik | 40000 | 15 | tidak | /images/oatmeal-raisin.svg |
| p-007 | Red Velvet Cookies | Cokelat | 52000 | 20 | tidak | /images/red-velvet.svg |
| p-008 | Peanut Butter Cookies | Klasik | 35000 | 40 | tidak | /images/peanut-butter.svg |

**Total produk = 8, total stok = 150.** Kategori Klasik berisi 3 produk, Cokelat 3 produk, Kue & Hampers 2 produk. Ada 1 produk stok 0 dan 3 produk unggulan (angka ini dipakai pada kriteria penerimaan).

Deskripsi contoh (ditulis agar kata uji tidak muncul di produk yang salah):

| id | deskripsi |
|---|---|
| p-001 | Cookies mentega klasik yang gurih, renyah, dan lumer di mulut. |
| p-002 | Kue kering isi selai nanas buatan sendiri, cocok untuk hampers dan suguhan tamu. |
| p-003 | Paket empat toples cookies pilihan dalam kemasan rapi, siap dikirim sebagai kado. |
| p-004 | Cookies renyah di tepi dan lembut di tengah dengan potongan choco chip melimpah. |
| p-005 | Adonan cocoa pekat dengan potongan chocolate di dalamnya untuk pencinta rasa pahit manis. |
| p-006 | Cookies oat kenyal dengan kismis manis dan taburan kayu manis. |
| p-007 | Cookies merah lembut beraroma cocoa ringan dengan isian krim keju. |
| p-008 | Cookies kacang gurih dengan selai kacang asli dan sedikit garam laut. |

### 3.2 Aturan pencarian
- Mencocokkan **nama dan deskripsi** (bukan kategori; kategori ditangani filter).
- Tidak peka huruf besar/kecil; spasi di awal/akhir diabaikan; cocok sebagian (substring).
- Berjalan langsung saat mengetik (tanpa tombol cari). Panjang maksimal 100 karakter.
- Kolom kosong berarti semua produk lolos pencarian.
- Urutan pemrosesan: **pencarian → filter → sorting**. Ketiganya bekerja bersamaan.
- Status pencarian/filter/sorting tidak disimpan; kembali ke bawaan saat halaman dimuat ulang.
- Jika tidak ada hasil: tampil pesan "Produk tidak ditemukan" dan tombol "Reset filter".
- Penghitung: "Menampilkan X dari Y produk".

### 3.3 Aturan sorting

| Opsi | Aturan |
|---|---|
| Unggulan dulu (bawaan) | `unggulan = true` di atas; sisanya urut nama A–Z. |
| Nama A–Z | Urut abjad nama, tidak peka huruf besar/kecil. |
| Harga termurah | Harga naik. |
| Harga termahal | Harga turun. |
| Stok terbanyak | Stok turun. |

Jika nilai sama, pembeda berikutnya selalu nama A–Z agar urutan stabil dan bisa diuji.

### 3.4 Aturan pesan WhatsApp
- Tautan berbentuk `https://wa.me/<NOMOR_DEMO>?text=<pesan ter-encode>`.
- `NOMOR_DEMO` disimpan di satu berkas konfigurasi (`src/config.js`), berupa nomor placeholder nonpribadi. Ini bukan rahasia dan **bukan** API key. Tidak ada WhatsApp Business API.
- Format pesan: `Halo RemahManis, saya ingin memesan: {nama} ({harga}). Jumlah: 1. Mohon info ketersediaan dan cara pembayaran.`
- Pesan wajib di-encode agar karakter seperti `&`, `?`, `#`, spasi, dan huruf non-ASCII tidak merusak tautan.
- Dibuka di tab baru dengan `rel="noopener noreferrer"`.
- Stok 0: tombol nonaktif dengan teks "Stok Habis".
- **Stok tidak berkurang otomatis saat tombol diklik.** Pesanan baru sah setelah dikonfirmasi pengelola lewat WhatsApp; pengurangan stok dilakukan manual lewat dashboard.

### 3.5 Aturan penyimpanan
- Kunci: `remahmanis:v1:products`. Nilai: array JSON berisi objek produk. Angka `v1` dipakai untuk migrasi di masa depan.
- **Muat pertama (kunci belum ada):** tulis 8 data contoh, lalu tampilkan.
- **Setiap tambah/ubah/hapus:** langsung tulis ke `localStorage`.
- **Array kosong adalah data sah** (pengelola menghapus semua produk). Tampilkan keadaan kosong; **jangan** mengisi ulang data contoh otomatis.
- **JSON rusak / bukan array:** tampilkan banner peringatan, pulihkan 8 data contoh, aplikasi tidak boleh crash.
- **Item tidak valid** di dalam array (misalnya harga negatif): lewati item tersebut dan tampilkan jumlah yang dilewati di banner.
- **`localStorage` tidak tersedia atau penuh** (mode privat, kuota): aplikasi tetap jalan di memori, dengan banner "Perubahan tidak akan tersimpan setelah halaman ditutup".
- **Reset data demo:** konfirmasi dulu, lalu kembalikan 8 data contoh.

---

## 4. Data Model

### 4.1 Entitas `Produk`

| Field | Tipe | Wajib | Aturan |
|---|---|---|---|
| `id` | string | ya | Unik. Dibuat otomatis saat tambah (format `p-<angka>` atau UUID). **Tidak dapat diubah** saat edit. |
| `nama` | string | ya | Setelah di-trim: 2–60 karakter. Tidak boleh sama dengan nama produk lain (tidak peka huruf besar/kecil). |
| `kategori` | string (enum) | ya | Salah satu: `Klasik`, `Cokelat`, `Kue & Hampers`. |
| `harga` | number | ya | Angka ≥ 0, bukan `NaN`/`Infinity`, bilangan bulat rupiah (tanpa sen), maksimal 100.000.000. |
| `stok` | number (integer) | ya | Bilangan bulat ≥ 0, maksimal 100.000. |
| `deskripsi` | string | tidak | Maksimal 200 karakter; boleh kosong. |
| `imageUrl` | string | tidak | Kosong, atau path lokal diawali `/images/` dan berakhiran `.svg/.png/.jpg/.jpeg/.webp`. Skema `http:`, `https:`, `data:`, `javascript:` **ditolak**. Jika kosong atau gambar gagal dimuat, tampilkan `/images/placeholder.svg`. |
| `unggulan` | boolean | ya | Bawaan `false`. |

Contoh satu objek (data, bukan kode aplikasi):

```json
{
  "id": "p-002",
  "nama": "Nastar Nanas Premium",
  "kategori": "Kue & Hampers",
  "harga": 85000,
  "stok": 12,
  "deskripsi": "Kue kering isi selai nanas buatan sendiri, cocok untuk hampers dan suguhan tamu.",
  "imageUrl": "/images/nastar.svg",
  "unggulan": true
}
```

### 4.2 Pesan validasi form
Setiap pelanggaran menampilkan pesan di bawah field terkait (bahasa Indonesia, spesifik), form tidak tersimpan, dan fokus pindah ke field pertama yang salah.

| Field | Contoh pesan |
|---|---|
| nama | "Nama wajib diisi (2–60 karakter)." / "Nama produk sudah dipakai." |
| kategori | "Pilih salah satu kategori." |
| harga | "Harga harus berupa angka bulat 0 atau lebih." |
| stok | "Stok harus berupa bilangan bulat 0 atau lebih." |
| deskripsi | "Deskripsi maksimal 200 karakter." |
| imageUrl | "Gunakan path lokal yang diawali /images/ atau kosongkan." |

### 4.3 Tampilan Rupiah
Harga ditampilkan dengan pemisah ribuan titik: `Rp 85.000`. Nilai yang disimpan tetap angka murni (85000), bukan teks berformat.

---

## 5. Nonfunctional Requirements

| ID | Kategori | Persyaratan |
|---|---|---|
| NFR-01 | Kinerja | Halaman siap dipakai < 2 detik di mesin lokal; setiap interaksi (ketik cari, filter, sorting) memperbarui tampilan tanpa jeda terasa pada hingga 200 produk. |
| NFR-02 | Keamanan | Semua teks dari pengguna/`localStorage` dirender sebagai **teks** (bukan HTML mentah). Tidak ada `eval`/`innerHTML` dengan data pengguna. Tidak ada API key, token, atau `.env` berisi rahasia. |
| NFR-03 | Privasi | Data contoh tidak memuat nama orang, nomor telepon asli, email, atau alamat. Tidak ada analytics/pelacak. Nomor WhatsApp hanya placeholder. |
| NFR-04 | Jaringan | Tidak ada request ke domain luar saat memuat halaman (tanpa CDN, tanpa font eksternal). Satu-satunya tautan keluar adalah `wa.me`, dan hanya saat tombol diklik. |
| NFR-05 | Keandalan | Data rusak, kunci hilang, atau `localStorage` tidak tersedia tidak boleh membuat layar kosong atau crash (Bagian 3.5). |
| NFR-06 | Responsif | Dapat dipakai pada lebar 360 px sampai 1280 px; halaman katalog tanpa scroll horizontal. |
| NFR-07 | Aksesibilitas | Semua gambar punya `alt`; semua input punya label; kontrol dapat dijangkau keyboard dengan fokus terlihat; kontras teks memadai. |
| NFR-08 | Kompatibilitas | Chrome, Edge, dan Firefox versi terbaru. |
| NFR-09 | Maintainability | Kode dipisah per tanggung jawab (data, penyimpanan, state, util, UI). Tanpa dependensi runtime; Vite hanya sebagai dev dependency. Tidak ada variabel global liar. |
| NFR-10 | Kualitas build | `npm run build` sukses; `npm run preview` menampilkan perilaku sama dengan mode dev. |
| NFR-11 | Bahasa antarmuka | Seluruh teks UI dalam bahasa Indonesia. |
| NFR-12 | Keamanan operasional | Hanya perintah aman yang dijalankan (lihat Bagian 9.1). |

---

## 6. Risiko

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R-01 | Cakupan melebar (keranjang, login, upload foto, pembayaran online) | Tidak selesai dalam 1 hari | Patuhi Bagian 7; urutan pemotongan di 9.4. |
| R-02 | XSS lewat nama/deskripsi yang tersimpan di `localStorage` | Skrip tak dikenal berjalan | Render sebagai teks; uji AC-31. |
| R-03 | `localStorage` rusak, dihapus, atau penuh | Data hilang / aplikasi crash | Aturan 3.5; uji AC-37 dan AC-38. |
| R-04 | Input `NaN`, negatif, atau desimal pada harga/stok | Ringkasan dan urutan salah | Validasi ketat 4.1–4.2; uji AC-29. |
| R-05 | Karakter khusus merusak tautan WhatsApp (`&`, `?`, `#`) | Pesan terpotong | Encode pesan; uji AC-24. |
| R-06 | Pengguna mengira dashboard aman padahal tanpa login | Salah paham keamanan | Banner demo di dashboard dan README. |
| R-07 | Stok tidak sinkron dengan pesanan WhatsApp | Stok tampil lebih banyak dari kenyataan | Dinyatakan di 3.4: stok diperbarui manual. |
| R-08 | Gambar rusak/hilang | Tampilan berantakan | Fallback ke placeholder (AC-06). |
| R-09 | Nomor WhatsApp placeholder tidak aktif | Tombol tampak "tidak berfungsi" | Kriteria uji memeriksa **bentuk URL**, bukan keberhasilan chat (AC-23). Nomor diganti lewat `src/config.js`. |
| R-10 | Data tidak ikut ke perangkat/browser lain | Harapan salah | Dicantumkan di README sebagai batasan. |
| R-11 | Waktu habis di dashboard dan validasi | MVP tidak lengkap | Iterasi dibuat kecil, dengan pemeriksaan di tiap akhir iterasi. |
| R-12 | Menjalankan perintah/skrip tak dikenal dari internet | Risiko keamanan mesin | Daftar perintah yang diizinkan (9.1). |
| R-13 | Versi Node tidak cocok dengan Vite | Setup gagal | Catat versi Node di README; gunakan LTS. |

---

## 7. Out-of-Scope

Tidak dikerjakan pada MVP ini:
- Backend, database server, API, dan deployment/hosting.
- Login, registrasi, peran pengguna, dan "login palsu" dalam bentuk apa pun.
- Keranjang, checkout, pembayaran online, ongkos kirim, riwayat pesanan, dan pengurangan stok otomatis.
- WhatsApp Business API atau integrasi apa pun yang memerlukan token/API key.
- Upload foto dari perangkat, penyimpanan gambar di `localStorage`, dan gambar dari URL eksternal.
- Sinkronisasi antar perangkat atau antar pengguna; ekspor/impor data (CSV/JSON).
- Ulasan, rating, wishlist, diskon/promo, varian rasa atau ukuran per produk, dan multi-bahasa.
- SEO/SSR, analytics, dan PWA/offline mode.
- Pengujian otomatis (unit/e2e); pengujian dilakukan manual berdasarkan Bagian 8.

---

## 8. Acceptance Criteria (diperiksa manual)

**Cara pakai:** jalankan dari data awal. Sebelum tiap kelompok uji, buka Dashboard lalu klik **Reset data demo**. Angka di bawah mengacu pada data seed di 3.1. Tandai kolom "Lulus" dengan `[x]`.

### 8.1 Setup dan build

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-01 | M | `npm install`, lalu `npm run dev`, buka URL lokal. | Halaman tampil; Console browser tanpa error merah. | [ ] |
| AC-02 | M | `npm run build`, lalu `npm run preview`. | Build tanpa error; aplikasi preview berperilaku sama. | [ ] |

### 8.2 Katalog

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-03 | M | Hapus kunci `remahmanis:v1:products` di DevTools, muat ulang. | Tampil **8 kartu**, masing-masing dengan gambar/placeholder, nama, kategori, harga format `Rp 85.000`, dan stok. | [ ] |
| AC-04 | M | Lihat "Double Chocolate Cookies". | Berlabel "Habis"; tombol WhatsApp nonaktif. | [ ] |
| AC-05 | M | Lihat badge. | Hanya Butter Cookies Original, Choco Chip Cookies 250 g, dan Nastar Nanas Premium yang berbadge "Unggulan". | [ ] |
| AC-06 | M | Di Dashboard, ubah imageUrl satu produk menjadi `/images/tidak-ada.svg`, simpan, lihat katalog. | Tampil placeholder, bukan ikon gambar rusak. | [ ] |

### 8.3 Pencarian

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-07 | M | Ketik `nastar`, lalu `NASTAR`. | Keduanya menampilkan 1 produk: Nastar Nanas Premium. | [ ] |
| AC-08 | M | Ketik `hampers`. | 2 produk: Hampers Cookies 4 Toples (cocok nama) dan Nastar Nanas Premium (cocok deskripsi). | [ ] |
| AC-09 | M | Ketik `  velvet  ` (dengan spasi di awal dan akhir). | Hasil sama dengan `velvet`: 1 produk (Red Velvet Cookies). | [ ] |
| AC-10 | M | Ketik `zzzz`. | Muncul "Produk tidak ditemukan" dan tombol "Reset filter"; klik tombol itu mengembalikan 8 produk. | [ ] |
| AC-11 | M | Kosongkan kolom pencarian. | Kembali 8 produk; penghitung "Menampilkan 8 dari 8 produk". | [ ] |
| AC-12 | M | Ketik `Cokelat`. | Tidak ada hasil (pencarian tidak mencocokkan kategori). | [ ] |

### 8.4 Filter

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-13 | M | Pilih kategori satu per satu. | Klasik = 3, Cokelat = 3, Kue & Hampers = 2, Semua = 8. | [ ] |
| AC-14 | M | Aktifkan "Hanya yang tersedia". | 7 produk; Double Chocolate Cookies tidak tampil. | [ ] |
| AC-15 | M | Kategori Cokelat + "Hanya yang tersedia". | 2 produk: Choco Chip Cookies 250 g dan Red Velvet Cookies. | [ ] |
| AC-16 | M | Kategori Cokelat + cari `double`. | 1 produk: Double Chocolate Cookies (stok 0, tetap tampil karena "Hanya yang tersedia" tidak aktif). | [ ] |

### 8.5 Sorting

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-17 | M | Opsi bawaan "Unggulan dulu". | 3 kartu pertama berurutan: Butter Cookies Original, Choco Chip Cookies 250 g, Nastar Nanas Premium; sisanya urut nama A–Z (Double Chocolate, Hampers Cookies, Oatmeal Raisin, Peanut Butter, Red Velvet). | [ ] |
| AC-18 | M | "Harga termurah". | Pertama Peanut Butter Cookies (Rp 35.000), terakhir Hampers Cookies 4 Toples (Rp 150.000). | [ ] |
| AC-19 | M | "Harga termahal". | Pertama Hampers Cookies 4 Toples, terakhir Peanut Butter Cookies. | [ ] |
| AC-20 | M | "Nama A–Z". | Urutan: Butter Cookies Original, Choco Chip Cookies, Double Chocolate Cookies, Hampers Cookies, Nastar Nanas Premium, Oatmeal Raisin Cookies, Peanut Butter Cookies, Red Velvet Cookies. | [ ] |
| AC-21 | M | "Stok terbanyak". | Pertama Peanut Butter Cookies (40), terakhir Double Chocolate Cookies (0). | [ ] |
| AC-22 | M | Kategori Cokelat + "Harga termahal". | Red Velvet Cookies, Double Chocolate Cookies, lalu Choco Chip Cookies. | [ ] |

### 8.6 Pesan WhatsApp

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-23 | M | Klik "Pesan via WhatsApp" pada Nastar Nanas Premium. | Tab baru terbuka ke alamat berawalan `https://wa.me/<nomor demo>?text=`; teks ter-decode memuat "Nastar Nanas Premium" dan "Rp 85.000". | [ ] |
| AC-24 | M | Tambah produk bernama `Cookies Mocha & Hazelnut?` (dari Dashboard), lalu klik tombol pesannya. | Teks pesan memuat nama utuh, tidak terpotong di `&` atau `?`. | [ ] |
| AC-25 | S | Inspect elemen tombol/tautan pesan. | Atribut `target="_blank"` dan `rel` berisi `noopener`. | [ ] |

### 8.7 Dashboard dan CRUD

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-26 | M | Buka Dashboard. | Tabel 8 baris; ada banner "Mode demo, tanpa login, data hanya di browser ini"; tidak ada form login. | [ ] |
| AC-27 | M | Lihat ringkasan. | Total Produk = **8**, Total Stok = **150**. | [ ] |
| AC-28 | M | Tambah produk valid: `Cookies Mocha & Hazelnut?`, Cokelat, 42000, stok 10. | Muncul di tabel dan katalog tanpa reload; Total Produk = 9, Total Stok = 160. | [ ] |
| AC-29 | M | Uji validasi satu per satu: nama kosong; kategori belum dipilih; harga `-1`; harga `1.5`; harga kosong; stok `-1`; stok `2.5`; stok kosong; nama duplikat (`nastar nanas premium`); imageUrl `https://contoh.com/a.png`. | Setiap kasus menampilkan pesan error di field terkait dan **tidak** menyimpan apa pun. | [ ] |
| AC-30 | M | Ubah Butter Cookies Original: harga 40000, stok 5. | Tabel, katalog, dan ringkasan ikut berubah tanpa reload; Total Stok = 130. | [ ] |
| AC-31 | M | Ketik `<b>halo</b>` pada nama dan deskripsi produk baru, simpan. | Tampil sebagai teks apa adanya (tidak menjadi huruf tebal); tidak ada skrip berjalan. | [ ] |
| AC-32 | M | Ubah stok satu produk menjadi 0, lalu 3. | Pada 0: label "Habis" dan tombol WhatsApp nonaktif; pada 3: tombol aktif kembali. | [ ] |
| AC-33 | M | Klik Hapus pada satu produk → Batal; ulangi → OK. | Batal: produk tetap. OK: hilang dari tabel dan katalog; total berkurang sesuai. | [ ] |
| AC-34 | M | Klik Ubah, lalu batalkan. | Data tidak berubah; form kembali ke mode tambah. | [ ] |

### 8.8 Penyimpanan

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-35 | M | Lakukan tambah/ubah/hapus, tekan F5, lalu tutup tab dan buka lagi. | Semua perubahan tetap ada. | [ ] |
| AC-36 | M | DevTools → Application → Local Storage. | Ada kunci `remahmanis:v1:products` berisi array JSON yang sesuai tampilan. | [ ] |
| AC-37 | M | Ubah nilai kunci menjadi `{rusak`, muat ulang. | Banner peringatan muncul; 8 data contoh dipulihkan; tidak ada layar kosong. | [ ] |
| AC-38 | M | Hapus semua produk, lalu F5. | Keadaan kosong ("Belum ada produk") di katalog dan dashboard; **tidak** terisi ulang otomatis; ringkasan 0 / 0. | [ ] |
| AC-39 | M | Klik "Reset data demo" → OK. | Kembali 8 produk; Total Stok = 150. | [ ] |

### 8.9 Responsif, aksesibilitas, kepatuhan

| ID | Prio | Langkah | Hasil yang diharapkan | Lulus |
|---|---|---|---|---|
| AC-40 | S | Atur lebar viewport 360 px. | Katalog tanpa scroll horizontal; tabel dashboard dapat digulir di dalam wadahnya atau berubah menjadi kartu; tombol mudah ditekan. | [ ] |
| AC-41 | S | Navigasi hanya dengan keyboard (Tab/Enter). | Pencarian, filter, sorting, dan semua tombol terjangkau; fokus terlihat; form dapat dikirim dengan Enter. | [ ] |
| AC-42 | S | Inspeksi gambar dan input. | Setiap gambar punya `alt`; setiap input form punya label. | [ ] |
| AC-43 | M | Cari teks `API_KEY`, `token`, `secret`, `password` di seluruh repo; buka tab Network saat memuat halaman. | Tidak ada rahasia; request hanya ke host lokal. | [ ] |
| AC-44 | M | Tinjau berkas data contoh. | Tidak ada nama orang, nomor telepon asli, email, atau alamat. | [ ] |
| AC-45 | M | Baca README. | Memuat cara menjalankan, struktur folder, serta batasan (tanpa login, data per browser, stok tidak otomatis berkurang). | [ ] |
| AC-46 | S | Buka `#dashboard`, lalu F5. | Tetap di Dashboard; tab "Katalog" membuka katalog. (F-13) | [ ] |

**Definisi selesai (DoD):** semua AC berprioritas M lulus. AC berprioritas S dicoba sebisa mungkin dan yang belum selesai dicatat di README.

---

## 9. Implementation Plan per Iterasi

Total ±8 jam. Setiap iterasi diakhiri dengan pemeriksaan singkat dan satu `git commit`.

### 9.1 Aturan kerja dan keamanan
- **Perintah yang diizinkan:** `npm create vite@latest` (templat *vanilla*), `npm install`, `npm run dev`, `npm run build`, `npm run preview`, serta `git init/status/add/commit`.
- **Dilarang:** `sudo`, `rm -rf` di luar folder proyek, `curl ... | sh`/`bash`, `chmod 777`, instal paket global, menjalankan skrip dari sumber tak dikenal, menonaktifkan antivirus/firewall.
- Tidak menambah dependensi selain Vite. Tidak membuat berkas `.env` berisi rahasia. Tidak ada kunci atau token di mana pun.
- Data contoh hanya fiktif nonpribadi.

### 9.2 Struktur folder yang direncanakan

```
remahmanis/
├─ index.html
├─ package.json
├─ SPEC.md
├─ README.md
├─ public/
│  └─ images/            (7 gambar SVG lokal + placeholder.svg)
└─ src/
   ├─ main.js            (titik masuk, merangkai modul)
   ├─ config.js          (NOMOR_DEMO, nama toko)
   ├─ data/seedProducts.js
   ├─ services/storage.js   (baca/tulis localStorage, penanganan error)
   ├─ state/store.js        (state produk + query pencarian/filter/sort)
   ├─ utils/                (format Rupiah, validasi, query, pembuat URL WhatsApp)
   ├─ ui/                   (catalog, dashboard, summary, banner)
   └─ styles/main.css
```

### 9.3 Iterasi

| Iterasi | Durasi | Cakupan | Keluaran | Pemeriksaan akhir |
|---|---|---|---|---|
| **I0. Persiapan** | 45 mnt | Buat proyek Vite vanilla; rapikan templat; buat struktur folder; siapkan 7 SVG sederhana + `placeholder.svg`; kerangka README. | Proyek berjalan dengan halaman kosong ber-judul RemahManis. | AC-01 |
| **I1. Data, penyimpanan, katalog** | 90 mnt | `seedProducts`; modul `storage` (muat pertama, JSON rusak, storage tak tersedia); `store`; format Rupiah; render grid kartu, badge, fallback gambar. | Katalog menampilkan 8 produk dari `localStorage`. | AC-03 s.d. AC-06, AC-36, AC-37 |
| **I2. Cari, filter, sort** | 75 mnt | Kolom pencarian, filter kategori + sakelar tersedia, dropdown sorting, penghitung, pesan kosong, "Reset filter". | Pencarian-filter-sorting bekerja bersamaan. | AC-07 s.d. AC-22 |
| **I3. Pesan WhatsApp** | 30 mnt | Pembuat URL ter-encode, tombol per kartu, status "Stok Habis", `rel` aman. | Tombol pesan berfungsi dan aman. | AC-23 s.d. AC-25, AC-04 |
| **I4. Dashboard: daftar, ringkasan, tambah** | 75 mnt | Navigasi dua tampilan, banner demo, tabel produk, ringkasan total produk/stok, form tambah + validasi dasar. | Produk baru muncul di tabel dan katalog; ringkasan benar. | AC-26 s.d. AC-28, AC-31 |
| **I5. Ubah, hapus, validasi penuh, reset** | 75 mnt | Mode edit (id tetap), konfirmasi hapus, seluruh aturan validasi 4.1–4.2, keadaan kosong, "Reset data demo". | CRUD lengkap dan tahan input salah. | AC-29 s.d. AC-35, AC-38, AC-39 |
| **I6. Penguatan** | 45 mnt | Responsif 360 px, label/alt/fokus keyboard, banner error penyimpanan, `#hash` navigasi (S). | Tampilan dan perilaku rapi di ponsel. | AC-40 s.d. AC-42, AC-46 |
| **I7. QA dan README** | 45 mnt | Jalankan seluruh Bagian 8 dari awal; perbaiki temuan; selesaikan README; `npm run build` + `preview`. | Semua AC M lulus; `git commit` akhir. | AC-02, AC-43 s.d. AC-45 |

### 9.4 Jika waktu kurang (urutan pemotongan)
1. Navigasi `#hash` (F-13) dan AC-46.
2. Tombol "Hapus pencarian" (F-14) dan AC-25.
3. Penyempurnaan aksesibilitas lanjutan (AC-41 dan AC-42), tetapi label dan `alt` dasar tetap dikerjakan.
4. Penyempurnaan responsif tabel dashboard (cukup gulir horizontal di dalam wadahnya).

Fitur *Must* tidak dipotong; jika *Must* terancam, kurangi tampilan visual (gaya), bukan perilaku.

### 9.5 Asumsi yang dipakai
- Tiga kategori tetap: Klasik, Cokelat, Kue & Hampers (ubah di Bagian 4.1 bila perlu).
- Harga dalam rupiah bulat tanpa sen (model tetap "angka ≥ 0", form menolak desimal).
- Nama produk unik; pengelola memakai satu browser; Node.js versi LTS terpasang.
- Nomor WhatsApp demo adalah placeholder dan diganti pengguna di `src/config.js`.
- Satu produk satu harga: tidak ada varian rasa atau ukuran. Ukuran (misalnya 250 g) ditulis di dalam nama produk.