# TASKS.md: RemahManis

Daftar tugas implementasi RemahManis, disusun dari `SPEC.md` dan `UI-SPEC.md`. Dokumen ini hanya rencana kerja. Tidak ada kode di dalamnya dan tidak ada berkas aplikasi yang diubah olehnya.

- **Versi dokumen:** 2.0 (disusun ulang agar sinkron dengan `SPEC.md` terbaru)
- **Tanggal:** 19 November 2026
- **Acuan:** `SPEC.md` (F-01 sampai F-14, NFR-01 sampai NFR-12, R-01 sampai R-13, AC-01 sampai AC-46), `UI-SPEC.md` (UI-01 sampai UI-18, bagian 2 sampai 10), `CATATAN.md`

## Cara memakai

1. Kerjakan milestone berurutan (M0 sampai M9). Jangan mulai milestone berikutnya sebelum gerbang milestone saat ini lolos.
2. Setiap tugas punya acceptance criteria berupa kotak centang. Centang hanya setelah diperiksa manual di browser, lewat pencarian di proyek, atau lewat hasil perintah yang benar-benar dijalankan.
3. "Berkas yang mungkin berubah" adalah perkiraan. Berkas di luar daftar boleh disentuh jika ada alasan, tetapi catat alasannya di `CATATAN.md`.
4. Satu commit per milestone, dengan pesan berawalan kode milestone (misalnya `M2: pencarian, filter, sorting`). Tinjau `git diff` sebelum commit.
5. Setiap saran AI yang keliru, tidak ada, atau tidak aman dicatat di tabel temuan `CATATAN.md`.
6. Beri prompt kecil per tugas ke agent. Jangan meminta satu milestone sekaligus. Jangan biarkan agent mengubah berkas di luar daftar tanpa alasan.

**Prioritas:** `M` = wajib, `S` = dikerjakan bila waktu cukup. Jalur minimum hanya memuat tugas `M` (lihat bagian 15).

---

## 0. Penyelarasan dan Keputusan

Beberapa hal pada `SPEC.md`, `UI-SPEC.md`, dan modul lab saling bersinggungan. Keputusan di bawah dipakai di seluruh dokumen ini. **Ubah sebelum mulai** jika tidak sesuai.

| No | Hal | Keputusan |
|----|-----|-----------|
| D1 | Perilaku vs tampilan | `SPEC.md` menentukan perilaku, data, dan label opsi. `UI-SPEC.md` menentukan tampilan dan aksesibilitas. Bila nama opsi berbeda, pakai `SPEC.md`: sorting "Unggulan dulu / Nama A-Z / Harga termurah / Harga termahal / Stok terbanyak", tombol kosong "Reset filter", pesan galat form dari `SPEC.md` 4.2. Kotak centang "Hanya unggulan" di `UI-SPEC.md` tidak dibuat (di luar fitur SPEC) |
| D2 | Pencarian | Mencocokkan **nama dan deskripsi**, bukan kategori (SPEC 3.2, AC-12) |
| D3 | Struktur berkas | Mengikuti `SPEC.md` 9.2: `src/config.js`, `src/data/seedProducts.js`, `src/services/storage.js`, `src/state/store.js`, `src/utils/`, `src/ui/`, `src/styles/main.css` |
| D4 | Urutan CRUD lalu localStorage | M4 memakai store **di memori** dengan antarmuka tetap. M5 mengganti isinya menjadi localStorage tanpa mengubah kode pemanggil. Kunci: `remahmanis:v1:products` |
| D5 | Harga dan stok pada form | Hanya digit. Karakter lain (minus, titik, koma, huruf, `1e3`) ditolak dengan pesan galat |
| D6 | Id produk baru | Awalan `p-` diikuti penanda unik berbasis waktu dan acak, bukan angka berurutan, agar id tidak terpakai ulang setelah penghapusan. Id tidak berubah saat edit |
| D7 | Pemulihan data saat baca | Pemulihan **tidak menimpa** localStorage sampai pengguna melakukan perubahan pertama. Array kosong dianggap sah (AC-38) |
| D8 | Nomor WhatsApp | Satu konstanta di `src/config.js`. Selama pengembangan dan di repositori publik berisi placeholder nonpribadi. Nomor usaha asli hanya dipasang bila memang boleh dipublikasikan |
| D9 | Testing | `SPEC.md` bagian 7 menyatakan pengujian otomatis di luar cakupan. Modul lab meminta Vitest. Keputusan: **uji manual (AC-01 sampai AC-46) tetap acuan utama**, dan Vitest ditambahkan sebagai `devDependency` saja (T-6.5). Amandemen dicatat di `SPEC.md` (T-9.1) |
| D10 | Deployment | `SPEC.md` bagian 7 menyatakan deployment di luar cakupan. Modul lab meminta hosting. Keputusan: GitHub Pages sebagai target utama (T-9.3), dengan amandemen tertulis di `SPEC.md` lebih dulu (T-9.1). Dashboard tetap berlabel demo dan tidak diklaim sebagai admin production |
| D11 | Subpath hosting | GitHub Pages proyek memakai subpath `/<nama-repo>/`. Data `imageUrl` tetap berawalan `/images/` (aturan SPEC 4.1) dan awalan base ditambahkan **saat render** (T-8.4). Nama repo ditetapkan di T-9.2 dan harus sama dengan `base` |
| D12 | Ekspor/impor JSON | Di luar cakupan SPEC bagian 7, tetapi diminta modul lab. Dikerjakan sebagai `S` (T-5.6) dengan amandemen SPEC |
| D13 | Prototipe yang sudah ada | `index.html` satu berkas hasil prototipe awal boleh menjadi rujukan visual. Logikanya tetap dipecah ke modul sesuai D3, bukan disalin utuh |

---

## 1. Ringkasan Milestone

| Milestone | Fokus | Jumlah tugas | Estimasi (jam) | Iterasi SPEC 9.3 |
|-----------|-------|-------------:|---------------:|------------------|
| M0 | Scaffold | 4 | 0,5 | I0 |
| M1 | Katalog | 6 | 1,5 | I1 |
| M2 | Interaksi pencarian, filter, sorting | 5 | 1,25 | I2 |
| M3 | Tombol WhatsApp | 3 | 0,5 | I3 |
| M4 | CRUD dashboard | 9 | 1,75 | I4, I5 |
| M5 | localStorage | 6 | 1,0 | I1, I5 |
| M6 | Testing | 6 | 1,25 | I7 |
| M7 | Security | 7 | 1,0 | I7 |
| M8 | Build | 4 | 0,5 | I7 |
| M9 | Deployment | 6 | 1,0 | di luar SPEC |
| | **Total** | **56** | **sekitar 10 jam** | |

Estimasi kasar untuk pengerjaan dibantu AI. Angka ini melebihi perkiraan 8 jam di `SPEC.md` karena ada Vitest, audit keamanan, dan deployment. Jalur minimum ada di bagian 15.

Ketergantungan utama:

```
M0 -> M1 -> M2 -> M3 -> M4 -> M5 -> M6 -> M7 -> M8 -> M9
                          \__ store M4 dipakai ulang oleh M5
```

---

## 2. Definition of Done Umum

Berlaku untuk setiap milestone sebelum commit:

- [ ] Semua tugas `M` pada milestone tercentang.
- [ ] AC SPEC yang dipetakan ke milestone (bagian 13) lolos.
- [ ] Console browser bebas galat merah pada alur milestone tersebut (AC-01).
- [ ] Tidak ada paket npm baru tanpa dicatat di `CATATAN.md` beserta hasil pemeriksaan di npmjs.com.
- [ ] Tidak ada rahasia, nomor pribadi, atau berkas `.env` berisi rahasia di proyek.
- [ ] `git diff` ditinjau dan commit dibuat dengan pesan berawalan kode milestone.

---

## 3. M0: Scaffold

**Tujuan:** proyek Vite vanilla yang berjalan di lokal dengan struktur sesuai `SPEC.md` 9.2.
**Gerbang:** AC-01, struktur folder siap, commit scaffold dibuat.

### T-0.1 Verifikasi lingkungan kerja `M`

**Acceptance criteria:**
- [ ] `node --version`, `npm --version`, dan `git --version` menampilkan versi tanpa galat.
- [ ] Versi Node LTS dan sesuai persyaratan Vite yang akan dipasang (dicek di dokumentasi resmi Vite). Versi dicatat untuk README (R-13).
- [ ] Identitas Git (`user.name`, `user.email`) terkonfigurasi dan tampil di `git config --global --list`.
- [ ] Agent AI terpasang dan dapat dipanggil dari terminal di folder proyek. Tidak ada kunci API yang ditempel ke berkas proyek.
- [ ] Tidak ada perintah yang memerlukan hak administrator, `sudo`, atau instal paket global di luar agent (SPEC 9.1).

**Berkas yang mungkin berubah:** `CATATAN.md`
**Rujukan:** SPEC 9.1, R-12, R-13

### T-0.2 Inisialisasi proyek Vite vanilla `M`

**Acceptance criteria:**
- [ ] Proyek dibuat dari templat Vite JavaScript vanilla (bukan TypeScript, bukan framework), di folder saat ini tanpa subfolder tambahan.
- [ ] Paket `vite` dicek di npmjs.com (nama benar, dirawat, unduhan wajar) dan hasilnya dicatat di tabel temuan `CATATAN.md`.
- [ ] `npm install` selesai tanpa galat. `npm run dev` menampilkan alamat localhost dan halaman bawaan tampil.
- [ ] `package.json` memuat skrip `dev`, `build`, `preview`. `dependencies` kosong dan `devDependencies` hanya `vite` (NFR-09).
- [ ] Berkas contoh bawaan templat yang tidak dipakai (penghitung, logo contoh) dihapus.
- [ ] `package-lock.json` ada dan ikut disimpan.

**Berkas yang mungkin berubah:** `package.json`, `package-lock.json`, `index.html`, `src/main.js`, `src/style.css` (dihapus atau dipindah), `public/*`, `CATATAN.md`
**Rujukan:** SPEC 9.3 I0, AC-01, NFR-09, R-01

### T-0.3 Struktur folder, konfigurasi, dan `.gitignore` `M`

**Acceptance criteria:**
- [ ] Folder dan berkas sesuai D3: `src/main.js`, `src/config.js`, `src/data/seedProducts.js`, `src/services/storage.js`, `src/state/store.js`, `src/utils/`, `src/ui/`, `src/styles/main.css`, `public/images/`. Berkas boleh masih kerangka kosong.
- [ ] `src/config.js` menjadi satu-satunya tempat untuk: nomor WhatsApp placeholder (D8), nama toko, daftar tiga kategori (`Klasik`, `Cokelat`, `Kue & Hampers`), dan kunci storage `remahmanis:v1:products`.
- [ ] `index.html` memiliki `lang="id"`, meta viewport, dan judul memuat "RemahManis".
- [ ] `.gitignore` memuat `node_modules`, `dist`, `.env`, `.env.*`, dan berkas log.
- [ ] Tidak ada berkas `.env` di proyek dan tidak ada variabel global liar (NFR-09).

**Berkas yang mungkin berubah:** `index.html`, `.gitignore`, `src/config.js`, `src/main.js`, `src/styles/main.css`, berkas kerangka lain di `src/`
**Rujukan:** SPEC 9.2, NFR-02, NFR-09, NFR-11

### T-0.4 Git dan commit scaffold `M`

**Acceptance criteria:**
- [ ] Commit dokumen rencana (`SPEC.md`, `UI-SPEC.md`, `TASKS.md`, `CATATAN.md`) sudah ada atau dibuat lebih dulu.
- [ ] `git status` sebelum commit tidak menampilkan `node_modules`, `dist`, maupun `.env`.
- [ ] Commit scaffold dibuat dengan pesan `M0: scaffold Vite RemahManis`. `git status` bersih setelahnya.

**Berkas yang mungkin berubah:** `.gitignore`
**Rujukan:** SPEC 9 (satu `git commit` per iterasi)

---

## 4. M1: Katalog

**Tujuan:** 8 produk contoh tampil benar, responsif, dan aksesibel pada tampilan Katalog.
**Gerbang:** AC-03 sampai AC-06, AC-44, UI-01, UI-03, UI-04.

### T-1.1 Design tokens dan gaya dasar `M`

**Acceptance criteria:**
- [ ] 14 token warna `UI-SPEC.md` 2.1 terdefinisi di satu tempat dan dipakai lewat nama token. Tidak ada kode warna tersebar di luar definisi token.
- [ ] Font memakai tumpukan sans-serif sistem. Tidak ada tautan atau impor font eksternal (NFR-04).
- [ ] Skala tipografi mobile dan desktop sesuai 2.3, dalam `rem`. Tidak ada teks di bawah 0,875 rem.
- [ ] Cincin fokus global 3 px berwarna token `fokus` dengan jarak 2 px. Tidak ada garis fokus yang dihapus tanpa pengganti.
- [ ] Pengaturan "kurangi gerakan" mematikan transisi dan gulir halus (UI-17).
- [ ] Wadah: lebar maksimal 1200 px, padding 16 px (mobile) dan 24 px (>= 768 px). Breakpoint 480, 768, 1024 px.
- [ ] Pasangan warna pada tabel `UI-SPEC.md` 2.2 diukur dengan alat kontras di DevTools. Hasil dicatat dan pasangan yang meleset diperbaiki (UI-05).

**Berkas yang mungkin berubah:** `src/styles/main.css`, `index.html`, `CATATAN.md`
**Rujukan:** UI-SPEC 2, NFR-07, UI-05, UI-17

### T-1.2 Data contoh 8 produk `M`

**Acceptance criteria:**
- [ ] Delapan record sesuai tabel `SPEC.md` 3.1 (id `p-001` sampai `p-008`, nama, kategori, harga, stok, unggulan, `imageUrl`) beserta deskripsi contoh.
- [ ] Nilai turunan benar: total produk 8, total stok 150, stok 0 ada 1 produk, unggulan 3. Kategori: Klasik 3, Cokelat 3, Kue & Hampers 2.
- [ ] Setiap record memenuhi aturan `SPEC.md` 4.1. `p-005` (Double Chocolate Cookies) berstok 0 dan `imageUrl` kosong.
- [ ] Seluruh data fiktif dan nonpribadi: tanpa nama orang, nomor telepon, email, atau alamat (AC-44, NFR-03).

**Berkas yang mungkin berubah:** `src/data/seedProducts.js`
**Rujukan:** SPEC 3.1, 4.1, F-02, AC-44

### T-1.3 Aset gambar lokal `M`

**Acceptance criteria:**
- [ ] `public/images/placeholder.svg` dan tujuh gambar produk SVG sesuai `imageUrl` pada data contoh.
- [ ] Semua gambar berasio 4:3, memakai palet `UI-SPEC.md` 2.1, tanpa teks di dalam gambar, masing-masing di bawah 10 KB.
- [ ] Setiap path `imageUrl` pada data contoh menunjuk ke berkas yang benar-benar ada.
- [ ] Tidak ada gambar, ikon, atau font yang diambil dari CDN atau situs lain, dan tidak ada aset berhak cipta (NFR-04).

**Berkas yang mungkin berubah:** `public/images/*.svg`
**Rujukan:** UI-SPEC 8, SPEC 9.2, NFR-04

### T-1.4 Format Rupiah `M`

**Acceptance criteria:**
- [ ] Fungsi format menghasilkan `Rp 85.000` untuk 85000, `Rp 0` untuk 0, dan `Rp 1.250.000` untuk 1250000. Tanpa desimal, pemisah ribuan titik.
- [ ] Nilai yang disimpan tetap angka murni, bukan teks berformat (SPEC 4.3).
- [ ] Fungsi tidak menyentuh DOM sehingga dapat dipakai ulang oleh katalog, dashboard, dan pesan WhatsApp.

**Berkas yang mungkin berubah:** `src/utils/format.js`
**Rujukan:** SPEC 4.3

### T-1.5 Kerangka halaman: skip link, navbar, hero, footer `M`

**Acceptance criteria:**
- [ ] Urutan landmark: tautan "Lewati ke konten utama" (fokus pertama dan terlihat saat difokus), `header`, `main`, `footer` (UI-06).
- [ ] Tampilan Katalog memiliki tepat satu H1 dan urutan judul tidak melompat.
- [ ] Navbar menempel saat gulir, tinggi 56 px (mobile) dan 64 px (desktop). Tautan setinggi 44 px. Merek dan tautan muat satu baris pada 360 px. Menu aktif ditandai garis bawah dan huruf tebal, bukan hanya warna.
- [ ] Hero sesuai `UI-SPEC.md` 4.2: satu kolom di mobile, dua kolom (dengan kartu "Cara memesan") di >= 1024 px. Tombol "Lihat Produk" menggulir ke bagian produk dan memindahkan fokus ke judul "Produk Kami".
- [ ] Footer memuat keterangan bahwa data adalah contoh fiktif.
- [ ] Tab Dashboard belum aktif pada milestone ini (diaktifkan di T-4.3).

**Berkas yang mungkin berubah:** `index.html`, `src/main.js`, `src/ui/catalog.js`, `src/styles/main.css`
**Rujukan:** UI-SPEC 3, 4.1, 4.2, 4.12, NFR-06, NFR-07, UI-06

### T-1.6 Kartu produk dan grid katalog `M`

**Acceptance criteria:**
- [ ] Katalog menampilkan 8 kartu dengan gambar/placeholder, kategori, nama (H3), harga format Rupiah, dan "Stok: N" (AC-03).
- [ ] Badge "Unggulan" (dengan ikon bintang) hanya pada Butter Cookies Original, Choco Chip Cookies 250 g, dan Nastar Nanas Premium (AC-05).
- [ ] Produk stok 0 menampilkan badge "Habis", gambar diredupkan, teks "Stok habis", dan tombol nonaktif berlabel "Stok Habis" (AC-04, tampilan saja; perilaku tautan di M3).
- [ ] `imageUrl` kosong atau gagal dimuat menampilkan `placeholder.svg`, bukan ikon gambar rusak (AC-06). Alt gambar adalah nama produk (NFR-07).
- [ ] Grid 1 kolom (< 480 px), 2 (>= 480), 3 (>= 768), 4 (>= 1024). Tidak ada gulir horizontal dari 360 sampai 1280 px (UI-01, NFR-06).
- [ ] Nama panjang dipotong pada dua baris dan tombol antarkartu tetap sejajar (UI-03). Unggulan dan Habis dapat dikenali tanpa warna (UI-04).
- [ ] Semua teks dari data disisipkan sebagai teks biasa, bukan HTML mentah (NFR-02). Diperiksa dengan membaca kode render.
- [ ] Fungsi render menerima daftar produk sebagai parameter sehingga bisa dipanggil ulang saat data atau filter berubah.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/main.js`, `src/styles/main.css`, `src/utils/format.js`
**Rujukan:** F-01, F-02, AC-03 sampai AC-06, UI-01, UI-03, UI-04, NFR-02, NFR-06

---

## 5. M2: Interaksi Pencarian, Filter, Sorting

**Tujuan:** pembeli dapat mencari, menyaring, dan mengurutkan produk dengan hasil konsisten.
**Gerbang:** AC-07 sampai AC-22, UI-07, UI-08, UI-09.

### T-2.1 State query dan fungsi murni `M`

**Acceptance criteria:**
- [ ] State query: kata kunci, kategori, "hanya tersedia", dan urutan. Default: kosong, semua kategori, tidak dicentang, "Unggulan dulu".
- [ ] Satu fungsi murni `filterProducts()` menerima daftar produk dan state lalu mengembalikan daftar hasil. Tidak menyentuh DOM atau storage dan tidak mengubah array asal.
- [ ] Urutan proses: pencarian, lalu filter, lalu sorting (SPEC 3.2).
- [ ] Sorting sesuai SPEC 3.3, dengan pembeda nama A-Z (tidak peka huruf besar/kecil) bila nilai sama. "Unggulan dulu": unggulan di atas, sisanya A-Z.
- [ ] Status pencarian, filter, dan sorting tidak disimpan; kembali ke default saat halaman dimuat ulang.
- [ ] Setiap perubahan state memicu render ulang katalog tanpa muat ulang halaman.

**Berkas yang mungkin berubah:** `src/utils/query.js`, `src/state/store.js`, `src/ui/catalog.js`, `src/main.js`
**Rujukan:** SPEC 3.2, 3.3, F-03, F-05, NFR-01

### T-2.2 Perilaku pencarian `M`

**Acceptance criteria:**
- [ ] `nastar` dan `NASTAR` sama-sama menampilkan 1 produk: Nastar Nanas Premium (AC-07).
- [ ] `hampers` menampilkan 2 produk: Hampers Cookies 4 Toples (cocok nama) dan Nastar Nanas Premium (cocok deskripsi) (AC-08).
- [ ] `  velvet  ` (spasi tepi) sama dengan `velvet`: 1 produk (AC-09).
- [ ] Kotak kosong menampilkan 8 produk; penghitung "Menampilkan 8 dari 8 produk" (AC-11).
- [ ] `Cokelat` tidak menampilkan hasil karena kategori tidak ikut dicari (AC-12).
- [ ] Panjang kata kunci dibatasi 100 karakter. Karakter `(`, `[`, `\`, `*`, `.`, `?`, `<script>` tidak menimbulkan galat di Console. Kata kunci tidak pernah diperlakukan sebagai pola khusus atau HTML.
- [ ] Hasil berubah saat mengetik, tanpa tombol "Cari" terpisah.

**Berkas yang mungkin berubah:** `src/utils/query.js`, `src/ui/catalog.js`
**Rujukan:** F-03, AC-07 sampai AC-09, AC-11, AC-12, NFR-02

### T-2.3 Kontrol filter, sorting, dan reset `M`

**Acceptance criteria:**
- [ ] Kontrol sesuai `UI-SPEC.md` 4.3 dengan penyesuaian D1: pencarian, select kategori (Semua, Klasik, Cokelat, Kue & Hampers), select urutan (lima opsi SPEC 3.3), kotak centang "Hanya yang tersedia", dan tombol Reset.
- [ ] Daftar kategori diambil dari `config.js`, bukan ditulis ulang.
- [ ] Kategori satu per satu: Klasik 3, Cokelat 3, Kue & Hampers 2, Semua 8 (AC-13).
- [ ] "Hanya yang tersedia": 7 produk, Double Chocolate Cookies tidak tampil (AC-14). Dengan kategori Cokelat: 2 produk, Choco Chip Cookies 250 g dan Red Velvet Cookies (AC-15).
- [ ] Kategori Cokelat + kata kunci `double`: 1 produk, Double Chocolate Cookies tetap tampil karena "Hanya yang tersedia" tidak aktif (AC-16).
- [ ] Urutan: "Unggulan dulu" memberi 3 kartu pertama Butter Cookies Original, Choco Chip Cookies 250 g, Nastar Nanas Premium, lalu A-Z (AC-17). "Harga termurah" mulai Rp 35.000 dan berakhir Rp 150.000 (AC-18). "Harga termahal" kebalikannya (AC-19). "Nama A-Z" berurutan alfabet (AC-20). "Stok terbanyak" mulai 40 dan berakhir 0 (AC-21). Cokelat + "Harga termahal": Red Velvet, Double Chocolate, Choco Chip (AC-22).
- [ ] Setiap kontrol punya label tertaut, target sentuh >= 44 px, dan seluruh alur dapat dilakukan hanya dengan keyboard (UI-07).
- [ ] Pada >= 768 px semua kontrol tampil sebaris di bawah pencarian.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/config.js`, `src/styles/main.css`, `index.html`
**Rujukan:** F-04, F-05, AC-13 sampai AC-22, UI-07, NFR-07

### T-2.4 Panel lipat pada mobile `M`

**Acceptance criteria:**
- [ ] Pada < 768 px hanya pencarian yang selalu terlihat. Kategori, urutan, kotak centang, dan Reset berada di panel yang dibuka tombol "Filter & Urutkan (n)". Panel tertutup secara default.
- [ ] Tombol menyatakan status buka/tutup ke teknologi bantu dan `n` menunjukkan jumlah kontrol yang berbeda dari default (UI-08).
- [ ] Pada >= 768 px tombol lipat tidak tampil dan panel selalu terbuka.
- [ ] Mengubah lebar jendela tidak menghilangkan nilai kontrol yang sudah dipilih.
- [ ] Transisi buka/tutup maksimal 200 ms dan mati pada pengaturan kurangi gerakan.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/styles/main.css`, `index.html`
**Rujukan:** UI-SPEC 4.3, UI-08, UI-17

### T-2.5 Penghitung hasil dan keadaan kosong `M`

**Acceptance criteria:**
- [ ] Teks "Menampilkan X dari Y produk" selalu sesuai hasil. Pembaca layar mengumumkan perubahan tanpa memindahkan fokus (UI-09).
- [ ] Kata kunci `zzzz` menampilkan "Produk tidak ditemukan" dan tombol "Reset filter" yang mengembalikan 8 produk (AC-10, F-14).
- [ ] Jika daftar produk benar-benar kosong (setelah semua dihapus), katalog menampilkan "Belum ada produk" dan bukan pesan hasil pencarian (SPEC 3.5, AC-38).
- [ ] Panel kosong memakai teks, ikon dekoratif, dan token warna sesuai `UI-SPEC.md` 4.6.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/styles/main.css`, `index.html`
**Rujukan:** SPEC 3.2, F-14, AC-10, AC-11, UI-09, UI-SPEC 4.6

---

## 6. M3: Tombol WhatsApp

**Tujuan:** pembeli dapat memesan lewat WhatsApp dengan pesan terisi otomatis.
**Gerbang:** AC-23 sampai AC-25, AC-04, UI-10, UI-11.

### T-3.1 Pembuat tautan WhatsApp `M`

**Acceptance criteria:**
- [ ] Fungsi `buildWhatsAppUrl(nomor, produk)` menghasilkan tautan berawalan `https://wa.me/<nomor>?text=`.
- [ ] Format pesan sesuai SPEC 3.4: `Halo RemahManis, saya ingin memesan: {nama} ({harga}). Jumlah: 1. Mohon info ketersediaan dan cara pembayaran.` dengan harga berformat Rupiah.
- [ ] Pesan di-encode dengan `encodeURIComponent` sehingga `&`, `?`, `#`, spasi, dan huruf non-ASCII tidak memutus parameter (R-05).
- [ ] Nomor divalidasi: hanya digit dalam format internasional. Nomor tidak valid tidak menghasilkan tautan.
- [ ] Nomor hanya dibaca dari `config.js`, tidak dari input pengguna. Tidak ada payment gateway, API key, permintaan jaringan, atau pustaka tambahan.

**Berkas yang mungkin berubah:** `src/utils/whatsapp.js`, `src/config.js`
**Rujukan:** SPEC 3.4, F-06, R-05, NFR-04

### T-3.2 Menghubungkan tombol pada kartu `M`

**Acceptance criteria:**
- [ ] Klik "Pesan via WhatsApp" pada Nastar Nanas Premium membuka tab baru ke alamat berawalan `https://wa.me/<nomor>?text=`. Teks ter-decode memuat "Nastar Nanas Premium" dan "Rp 85.000" (AC-23).
- [ ] Tautan memakai `target="_blank"` dan `rel` berisi `noopener noreferrer` (AC-25).
- [ ] Nama aksesibel diawali label terlihat: "Pesan via WhatsApp: Nastar Nanas Premium (membuka tab baru)" (UI-10).
- [ ] Tombol dapat dioperasikan dengan Enter dari keyboard.
- [ ] Produk stok 0: tombol nonaktif berlabel "Stok Habis", tidak menghasilkan tautan, tidak terjadi apa pun saat diklik (AC-04, UI-11).
- [ ] Stok tidak berkurang otomatis saat tombol diklik (SPEC 3.4, R-07).
- [ ] Ikon pada tombol berupa gelembung percakapan generik dan disembunyikan dari pembaca layar.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/styles/main.css`
**Rujukan:** F-06, AC-04, AC-23, AC-25, UI-10, UI-11, UI-SPEC 4.5

### T-3.3 Pemeriksaan konfigurasi nomor `M`

**Acceptance criteria:**
- [ ] Pencarian di `src`, `index.html`, dan dokumen hanya menemukan nomor di satu konstanta `config.js` (D8).
- [ ] Nomor pada repositori publik adalah placeholder nonpribadi, bukan nomor pribadi (AC-44, NFR-03).
- [ ] Cara mengganti nomor dicatat untuk README (T-9.5).

**Berkas yang mungkin berubah:** `src/config.js`, `CATATAN.md`
**Rujukan:** SPEC 3.4, R-09, NFR-03

---

## 7. M4: CRUD Dashboard

**Tujuan:** pengelola dapat menambah, mengubah, menghapus produk, dan melihat ringkasan. Data sementara hanya di memori (persistensi di M5).
**Gerbang:** AC-26 sampai AC-34, UI-12 sampai UI-16.

### T-4.1 Store produk di memori `M`

**Acceptance criteria:**
- [ ] Satu modul menyediakan operasi: ambil semua, ambil per id, tambah, ubah, hapus, kembalikan ke data contoh, dan berlangganan perubahan.
- [ ] Katalog, ringkasan, dan daftar dashboard membaca dari store yang sama. Tidak ada salinan data terpisah.
- [ ] Saat pertama dimuat, store berisi 8 produk contoh.
- [ ] Id baru dibuat otomatis sesuai D6. Menambah tiga produk berturut-turut menghasilkan tiga id berbeda, menghapus lalu menambah tidak memakai ulang id, dan mengubah tidak mengubah id.
- [ ] Antarmuka store tidak menyebut localStorage sehingga M5 hanya mengganti bagian dalamnya (D4).
- [ ] Mengubah data lewat store tidak memodifikasi objek seed asli (reset tetap memulihkan 8 produk awal).

**Berkas yang mungkin berubah:** `src/state/store.js`, `src/data/seedProducts.js`, `src/main.js`
**Rujukan:** SPEC 4.1 (kolom `id`), D4, D6

### T-4.2 Validasi produk `M`

**Acceptance criteria:**
- [ ] Satu fungsi validasi menerima data produk dan mengembalikan lolos/tidak beserta pesan galat per kolom. Tidak menyentuh DOM agar dapat dipakai ulang di M5 dan M6.
- [ ] Aturan sesuai `SPEC.md` 4.1 dan pesan galat persis seperti `SPEC.md` 4.2 (D1).
- [ ] Nama dipangkas spasi tepi lalu 2 sampai 60 karakter, unik tanpa peka huruf besar/kecil. Tolak: kosong, spasi saja, 1 karakter, 61 karakter, duplikat (`nastar nanas premium`).
- [ ] Kategori harus salah satu dari tiga kategori di `config.js`. Tolak: kosong dan nilai di luar daftar.
- [ ] Harga hanya digit (D5), 0 sampai 100.000.000. Tolak: kosong, `-1`, `abc`, `1.5`, `18.000`, `1e3`. Terima: `0`, `18000`.
- [ ] Stok hanya digit, bilangan bulat 0 sampai 100.000. Tolak: kosong, `-1`, `2.5`.
- [ ] Deskripsi maksimal 200 karakter (201 ditolak), boleh kosong.
- [ ] `imageUrl` boleh kosong, atau path lokal berawalan `/images/` berakhiran `.svg/.png/.jpg/.jpeg/.webp` tanpa `..`. Tolak: `https://contoh.com/a.png`, `http:`, `javascript:alert(1)`, `data:...`, `images/a.svg`, `//host/images/a.svg`.
- [ ] `unggulan` bernilai benar/salah, default salah.

**Berkas yang mungkin berubah:** `src/utils/validate.js`, `src/config.js`
**Rujukan:** SPEC 4.1, 4.2, AC-29, R-04, NFR-02

### T-4.3 Navigasi dua tampilan dan banner mode demo `M`

**Acceptance criteria:**
- [ ] Tampilan Katalog (default) dan Dashboard berpindah lewat navbar tanpa muat ulang. Hanya satu tampilan terlihat pada satu waktu.
- [ ] Menu aktif ditandai bagi teknologi bantu dan secara visual (garis bawah dan huruf tebal). Badge DEMO muncul di navbar mulai 480 px.
- [ ] Setelah berpindah, fokus pindah ke H1 tampilan baru dan judul dokumen ikut berubah.
- [ ] Banner "MODE DEMO: tanpa login. Data hanya tersimpan di browser ini." terlihat di atas dashboard tanpa gulir (360 dan 1280 px) dan tidak dapat ditutup (AC-26, UI-12).
- [ ] Tidak ada form login, kata sandi, ikon gembok, atau teks yang menyiratkan keamanan (SPEC 2, R-06).
- [ ] `S`: tab aktif mengikuti `#hash`, sehingga `#dashboard` lalu F5 tetap di Dashboard (F-13, AC-46).
- [ ] Pencarian dan filter katalog tetap saat pengguna kembali dari dashboard tanpa muat ulang.

**Berkas yang mungkin berubah:** `src/main.js`, `src/ui/dashboard.js`, `src/ui/banner.js`, `index.html`, `src/styles/main.css`
**Rujukan:** F-07, F-13, AC-26, AC-46, UI-12, UI-SPEC 4.1, 4.7, R-06

### T-4.4 Ringkasan dashboard `M`

**Acceptance criteria:**
- [ ] Data contoh: Total produk 8, Total stok 150 (AC-27). Kartu tambahan "Stok habis" bernilai 1 (UI-SPEC 4.8).
- [ ] Ringkasan dihitung dari **seluruh data**, bukan hasil filter katalog (F-11).
- [ ] Setelah menambah produk bernama `Cookies Mocha & Hazelnut?` (Cokelat, 42000, stok 10): 9 produk dan stok 160 (AC-28). Setelah stok diubah ke 0, "Stok habis" bertambah. Setelah hapus, angka menyesuaikan.
- [ ] Angka diperbarui langsung tanpa muat ulang.
- [ ] Tata letak: tiga kolom sejajar pada >= 480 px, tiga baris ringkas pada < 480 px. Angka "Stok habis" berwarna `stroberi-700` hanya bila lebih dari 0 dan tetap berlabel teks.

**Berkas yang mungkin berubah:** `src/ui/summary.js`, `src/ui/dashboard.js`, `src/styles/main.css`
**Rujukan:** F-11, AC-27, AC-28, UI-SPEC 4.8

### T-4.5 Daftar produk dashboard `M`

**Acceptance criteria:**
- [ ] Pada >= 768 px tampil tabel dengan keterangan dan kolom Gambar, Nama, Kategori, Harga (rata kanan), Stok (rata kanan), Unggulan (Ya/Tidak), Aksi (Ubah, Hapus). Stok 0 ditandai "Habis". Tabel 8 baris pada data contoh (AC-26).
- [ ] Pada < 768 px tampil daftar kartu ringkas dengan tombol Ubah dan Hapus berdampingan, masing-masing >= 44 px (UI-13). Pada 360 px tabel tidak merusak halaman (AC-40).
- [ ] Setiap tombol aksi punya nama aksesibel yang menyebut produk ("Ubah Nastar Nanas Premium", "Hapus Nastar Nanas Premium").
- [ ] Daftar langsung mencerminkan isi store setelah tambah, ubah, hapus.
- [ ] Daftar kosong menampilkan "Belum ada produk" dengan saran menambah produk atau mereset data contoh.
- [ ] Teks dari data disisipkan sebagai teks biasa (NFR-02).

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/styles/main.css`
**Rujukan:** F-07, AC-26, AC-40, UI-13, UI-SPEC 4.9, NFR-02

### T-4.6 Form tambah dan ubah produk `M`

**Acceptance criteria:**
- [ ] Form berisi Nama, Kategori, Harga (awalan "Rp"), Stok, Deskripsi (penghitung n/200), Gambar (dengan teks bantuan), Unggulan, serta tombol Simpan dan Batal sesuai `UI-SPEC.md` 4.10. Judul panel "Tambah Produk" atau "Ubah Produk". Penanda wajib berupa teks "(wajib)".
- [ ] Penempatan: panel samping kanan pada >= 1024 px, di atas daftar pada lebar lebih kecil. Saat dibuka, fokus pindah ke kolom pertama.
- [ ] Tambah produk valid muncul di tabel dan katalog tanpa reload (AC-28).
- [ ] Sepuluh kasus uji validasi ditolak dengan pesan di dekat kolom terkait dan tidak mengubah data: nama kosong, kategori belum dipilih, harga `-1`, harga `1.5`, harga kosong, stok `-1`, stok `2.5`, stok kosong, nama duplikat, `imageUrl` `https://contoh.com/a.png` (AC-29).
- [ ] Saat simpan gagal: ringkasan galat ("Ada n kolom yang perlu diperbaiki") berisi tautan ke tiap kolom, mendapat fokus, dan kolom bermasalah ditandai tidak valid serta tertaut ke pesannya, tidak hanya berwarna merah (UI-14). Fokus pindah ke kolom pertama yang salah.
- [ ] Ubah produk: form terisi data lama dan menyimpan memperbarui produk yang sama (bukan membuat baru). Butter Cookies Original diubah ke harga 40000, stok 5: tabel, katalog, dan ringkasan ikut berubah, Total Stok 130 (AC-30).
- [ ] Nama dan deskripsi berisi `<b>halo</b>` tampil sebagai teks apa adanya (AC-31).
- [ ] Stok diubah ke 0 lalu 3: pada 0 muncul "Habis" dan tombol WhatsApp nonaktif, pada 3 tombol aktif lagi (AC-32).
- [ ] Batal pada mode ubah: data tidak berubah dan form kembali ke mode tambah (AC-34).
- [ ] Setelah simpan berhasil: form tertutup dan fokus kembali ke tombol "Tambah Produk" atau ke baris yang baru diubah. Setiap kolom punya label tertaut dan target sentuh >= 44 px.

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/utils/validate.js`, `src/state/store.js`, `src/styles/main.css`, `index.html`
**Rujukan:** F-08, F-09, AC-28 sampai AC-32, AC-34, UI-14, UI-SPEC 4.10, NFR-07

### T-4.7 Hapus produk dan dialog konfirmasi `M`

**Acceptance criteria:**
- [ ] Tombol Hapus membuka dialog modal bawaan browser berjudul "Hapus produk?" dengan isi menyebut nama produk (UI-SPEC 4.11).
- [ ] Fokus awal pada "Batal". Esc dan klik latar sama dengan Batal. Fokus terkurung di dalam dialog.
- [ ] Batal: produk tetap ada (UI-15). OK: produk hilang dari tabel dan katalog dan total berkurang sesuai (AC-33, UI-16).
- [ ] Setelah dialog tertutup, fokus kembali ke tombol pemicu. Jika barisnya sudah tidak ada, fokus pindah ke judul tampilan.
- [ ] Nama produk di dalam dialog tampil sebagai teks biasa.

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/styles/main.css`, `index.html`
**Rujukan:** F-10, AC-33, UI-15, UI-16, UI-SPEC 4.11

### T-4.8 Reset data demo `M`

**Acceptance criteria:**
- [ ] Tombol "Reset data demo" membuka dialog konfirmasi berjudul "Kembalikan data contoh?" dengan perilaku dialog sama seperti T-4.7.
- [ ] Setelah dikonfirmasi: kembali 8 produk contoh dan Total Stok 150 (AC-39). Setelah dibatalkan: data tidak berubah.
- [ ] Setelah reset, id produk contoh kembali `p-001` sampai `p-008`.

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/state/store.js`
**Rujukan:** F-12, AC-39

### T-4.9 Notifikasi hasil aksi dan sinkronisasi katalog `M`

**Acceptance criteria:**
- [ ] Setelah simpan, hapus, dan reset muncul notifikasi inline (misalnya "Produk 'X' disimpan.") berlatar `cokelat-100` dengan ikon centang. Tidak hilang otomatis; hilang saat aksi berikutnya atau ditutup (UI-SPEC 4.7).
- [ ] Notifikasi diumumkan sopan ke pembaca layar dan tidak merebut fokus.
- [ ] Katalog menghormati filter yang sedang aktif: produk baru berkategori Klasik tidak tampil saat filter Cokelat aktif, dan tampil setelah Reset.
- [ ] Produk berstok 0 langsung tampil "Habis" di katalog. Produk yang dihapus langsung hilang dari katalog.
- [ ] Produk uji `Cookies Mocha & Hazelnut?` menghasilkan tautan WhatsApp dengan nama utuh, tidak terpotong di `&` atau `?` (AC-24).

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/ui/catalog.js`, `src/ui/banner.js`, `src/main.js`, `src/styles/main.css`
**Rujukan:** UI-SPEC 4.7, AC-24, AC-28

---

## 8. M5: localStorage

**Tujuan:** data bertahan setelah muat ulang dan aplikasi tangguh terhadap data rusak.
**Gerbang:** AC-35 sampai AC-39 dan seluruh AC M4 tetap lolos.

### T-5.1 Adapter localStorage `M`

**Acceptance criteria:**
- [ ] Setelah setiap tambah, ubah, hapus, dan reset, isi store disimpan sebagai array JSON pada kunci `remahmanis:v1:products` (dari `config.js`).
- [ ] Semua baca dan tulis dibungkus penanganan galat. Galat kuota atau keamanan tidak menghentikan aplikasi (NFR-05).
- [ ] Ketersediaan localStorage diuji sekali saat mulai. Jika tidak tersedia atau penuh, aplikasi berjalan dengan data di memori dan memicu banner T-5.4.
- [ ] Tidak ada penyimpanan lain yang dipakai (cookie, sessionStorage, IndexedDB).
- [ ] Antarmuka store T-4.1 tidak berubah. Kode di `ui/` tidak perlu diedit.

**Berkas yang mungkin berubah:** `src/services/storage.js`, `src/state/store.js`, `src/config.js`
**Rujukan:** SPEC 3.5, F-12, NFR-05

### T-5.2 Muat pertama dan data contoh `M`

**Acceptance criteria:**
- [ ] Jika kunci belum ada, aplikasi menulis 8 data contoh dan menampilkannya.
- [ ] Menghapus kunci lewat DevTools lalu memuat ulang mengembalikan 8 produk (AC-03).
- [ ] Setelah penyimpanan awal, muat ulang tidak menggandakan data contoh.
- [ ] DevTools, Application, Local Storage menampilkan kunci `remahmanis:v1:products` berisi array JSON yang sesuai tampilan (AC-36).

**Berkas yang mungkin berubah:** `src/services/storage.js`, `src/data/seedProducts.js`
**Rujukan:** SPEC 3.5, AC-03, AC-36

### T-5.3 Validasi saat baca dan pemulihan `M`

**Acceptance criteria:**
- [ ] Setiap record hasil baca divalidasi dengan fungsi T-4.2. Kasus berikut tidak membuat aplikasi berhenti:

| Isi kunci | Perilaku |
|-----------|----------|
| Tidak ada | 8 data contoh dimuat, tanpa banner |
| Teks bukan JSON, misalnya `{rusak` | 8 data contoh dipulihkan, banner peringatan tampil (AC-37) |
| JSON valid tetapi bukan array (`{}`, `"x"`, `null`) | 8 data contoh dipulihkan, banner tampil |
| Array kosong `[]` | Dimuat apa adanya sebagai daftar kosong, tanpa banner, tidak diisi ulang otomatis (AC-38) |
| Array campuran valid dan tidak valid (misalnya `harga: -5`) | Record valid dipertahankan, yang tidak valid dilewati, banner menyebut jumlah yang dilewati |
| Seluruh record tidak valid | 8 data contoh dimuat, banner tampil |
| Id ganda | Record pertama dipertahankan, berikutnya dilewati |
| Angka tersimpan sebagai teks (`"harga":"18000"`) | Dianggap tidak valid |
| Field tambahan tak dikenal | Diabaikan dan tidak ikut disimpan ulang |

- [ ] Sesuai D7, pemulihan tidak menimpa isi localStorage sampai pengguna melakukan perubahan pertama.
- [ ] Parser murni (tidak menyentuh DOM) agar mudah diuji di T-6.5.

**Berkas yang mungkin berubah:** `src/services/storage.js`, `src/utils/validate.js`
**Rujukan:** SPEC 3.5, AC-37, AC-38, R-03, NFR-05

### T-5.4 Banner pemulihan dan penyimpanan tidak tersedia `M`

**Acceptance criteria:**
- [ ] Banner pemulihan memuat pesan data tidak terbaca atau sebagian dilewati beserta jumlah yang dilewati. Memiliki tombol tutup 44 px dan diumumkan sebagai status.
- [ ] Banner penyimpanan tidak tersedia: "Perubahan tidak akan tersimpan setelah halaman ditutup". Tampil selama kondisi itu berlangsung dan diumumkan segera.
- [ ] Gaya mengikuti `UI-SPEC.md` 4.7 (latar `karamel-100`, ikon tanda seru, teks `arang-900`). Tidak bergantung pada warna saja dan tidak menutupi konten penting.

**Berkas yang mungkin berubah:** `src/ui/banner.js`, `src/main.js`, `src/styles/main.css`, `index.html`
**Rujukan:** SPEC 3.5, UI-SPEC 4.7, NFR-05

### T-5.5 Verifikasi persistensi `M`

**Acceptance criteria:**
- [ ] Tambah, ubah, hapus, tekan F5, tutup tab dan buka lagi: semua perubahan tetap ada (AC-35).
- [ ] Nilai kunci diubah menjadi `{rusak` lalu dimuat ulang: banner muncul dan 8 data contoh dipulihkan, tidak ada layar kosong (AC-37).
- [ ] Semua produk dihapus lalu F5: keadaan kosong "Belum ada produk" di katalog dan dashboard, tidak terisi ulang, ringkasan 0 / 0 (AC-38).
- [ ] "Reset data demo" lalu OK: 8 produk, Total Stok 150 (AC-39).
- [ ] Mode penyimpanan tidak tersedia diuji dengan memblokir data situs di pengaturan browser: aplikasi tetap jalan, banner muncul, perubahan tidak bertahan.
- [ ] Hasil dicatat sementara di `CATATAN.md` atau di `TEST-REPORT.md` (T-6.1).

**Berkas yang mungkin berubah:** `CATATAN.md`, `TEST-REPORT.md`
**Rujukan:** AC-35 sampai AC-39, NFR-05

### T-5.6 Ekspor dan impor JSON `S` (butuh amandemen SPEC bagian 7, lihat D12)

**Acceptance criteria:**
- [ ] Tombol ekspor mengunduh array produk sebagai berkas JSON.
- [ ] Impor memvalidasi struktur dan tipe tiap field dengan fungsi T-4.2. Isi bukan array produk ditolak dengan pesan jelas **tanpa menghapus data lama**.
- [ ] Impor tidak memakai HTML mentah dan hanya menerima berkas JSON dengan batas ukuran yang wajar.
- [ ] Hasil impor yang sah menggantikan data setelah konfirmasi dan langsung tampil di katalog.

**Berkas yang mungkin berubah:** `src/ui/dashboard.js`, `src/services/storage.js`, `src/utils/validate.js`, `SPEC.md`
**Rujukan:** SPEC 7, D12

---

## 9. M6: Testing

**Tujuan:** membuktikan acceptance criteria lolos pada browser dan lebar layar yang ditargetkan. Hasil yang diharapkan bukan bukti bahwa test lulus; catat hasil aktual.
**Gerbang:** AC-01 sampai AC-46 dan UI-01 sampai UI-18 berstatus Lulus, atau Gagal dengan catatan yang disetujui.

### T-6.1 Lembar laporan uji `M`

**Acceptance criteria:**
- [ ] `TEST-REPORT.md` berisi 46 baris AC dan 18 baris UI dengan kolom: ID, status (Lulus/Gagal/Dilewati), browser, lebar layar, tanggal, catatan.
- [ ] Bagian atas memuat versi browser, sistem operasi, dan hash commit yang diuji.
- [ ] Bagian bawah memuat daftar bug (ID, langkah, hasil nyata, keparahan, status).

**Berkas yang mungkin berubah:** `TEST-REPORT.md` (baru)
**Rujukan:** SPEC 8, UI-SPEC 10

### T-6.2 Uji fungsional manual `M`

**Acceptance criteria:**
- [ ] AC-01 sampai AC-39 dijalankan per kelompok. Sebelum tiap kelompok, buka Dashboard lalu klik "Reset data demo" (SPEC 8, cara pakai).
- [ ] Tabel uji tujuh skenario dari modul lab dijalankan: tambah produk, input negatif, filter dan cari, persistensi, JSON rusak, mobile 390 px, WhatsApp.
- [ ] Console dibuka selama alur utama dan tidak ada galat merah.
- [ ] Setiap hasil tercatat di `TEST-REPORT.md` dan kolom "Lulus" di `SPEC.md` 8 dicentang untuk yang lolos.

**Berkas yang mungkin berubah:** `TEST-REPORT.md`, `SPEC.md`
**Rujukan:** AC-01 sampai AC-39

### T-6.3 Uji lintas browser dan lebar layar `M`

**Acceptance criteria:**
- [ ] Alur utama (lihat katalog, cari, filter, urutkan, pesan, tambah, ubah, hapus, muat ulang) lolos di Chrome, Edge, dan Firefox versi terbaru (NFR-08).
- [ ] Tata letak diperiksa pada 360, 480, 768, 1024, dan 1280 px tanpa gulir horizontal dan tanpa teks terpotong (UI-01, AC-40).
- [ ] Perbesaran 200 persen pada 1280 px tetap terbaca dan tidak kehilangan konten (UI-02).
- [ ] `S`: nama 60 karakter, deskripsi 200 karakter, dan harga sembilan digit tidak merusak kartu, tabel, atau ringkasan. Sekitar 100 produk disuntikkan ke localStorage lewat DevTools dan pencarian, filter, sorting tetap terasa instan (NFR-01).
- [ ] Perbedaan tampilan antarbrowser yang merusak dicatat dan diperbaiki.

**Berkas yang mungkin berubah:** `TEST-REPORT.md`, `src/styles/main.css`
**Rujukan:** NFR-01, NFR-06, NFR-08, AC-40, UI-01, UI-02

### T-6.4 Uji aksesibilitas manual `M`

**Acceptance criteria:**
- [ ] Seluruh fitur dijalankan hanya dengan keyboard (Tab, Shift+Tab, Enter, Spasi, Esc). Fokus selalu terlihat dan form dapat dikirim dengan Enter (AC-41, UI-06, UI-07).
- [ ] Setiap gambar punya `alt` dan setiap input punya label (AC-42).
- [ ] Satu alur diuji dengan pembaca layar (misalnya NVDA): jumlah hasil, notifikasi, galat form, dan dialog diumumkan benar (UI-09).
- [ ] Kontras seluruh pasangan di `UI-SPEC.md` 2.2 diukur ulang setelah gaya final dan tabelnya diperbarui bila berubah (UI-05, UI-18).
- [ ] Pengaturan "kurangi gerakan" dicoba (UI-17). Status Habis, Unggulan, menu aktif, dan galat tetap dapat dikenali tanpa warna.

**Berkas yang mungkin berubah:** `TEST-REPORT.md`, `src/styles/main.css`, `UI-SPEC.md`
**Rujukan:** AC-41, AC-42, NFR-07, UI-05 sampai UI-09, UI-17, UI-18

### T-6.5 Vitest dan unit test `M` (lihat D9)

**Acceptance criteria:**
- [ ] Vitest dipasang sebagai `devDependency` saja, dicek di npmjs.com dan dicatat di `CATATAN.md`. Skrip `npm test` ada. `dependencies` tetap kosong.
- [ ] Minimal 10 unit test untuk `filterProducts`, validasi produk, `buildWhatsAppUrl`, dan parser localStorage.
- [ ] Kasus yang tercakup: pencarian tidak peka huruf besar/kecil dan tidak mencocokkan kategori, batas harga (0, 100.000.000, `-1`, `1.5`), batas stok, kategori tak valid, nama duplikat, `imageUrl` berskema `https`/`javascript`, payload JSON rusak, bukan array, record campuran, nomor telepon tidak valid, dan nama berisi `&` `?` `#`.
- [ ] `npm test` benar-benar dijalankan. Jumlah test, PASS, dan FAIL dicatat dari output aktual. Tidak ada test yang ditulis tetapi tidak dijalankan.
- [ ] Berkas test tidak ikut ke hasil build.

**Berkas yang mungkin berubah:** `package.json`, `package-lock.json`, `src/utils/*.test.js`, `src/services/*.test.js`, `CATATAN.md`, `TEST-REPORT.md`
**Rujukan:** SPEC 7 dan 9.1 (diamandemen di T-9.1), R-03, R-04, R-05

### T-6.6 Triase bug dan regresi `M`

**Acceptance criteria:**
- [ ] Setiap bug punya keparahan. Bug tinggi dan sedang diperbaiki dengan patch minimal.
- [ ] Setelah tiap perbaikan, AC terkait dan uji asap (AC-01, AC-03, AC-23, AC-28, AC-35) dijalankan ulang dan lolos, serta `npm test` lolos.
- [ ] Bug yang sengaja tidak diperbaiki dicatat sebagai keterbatasan di README dan `TEST-REPORT.md`.
- [ ] Kesalahan yang berasal dari saran AI dicatat di `CATATAN.md`. Pesan bug ke agent memuat langkah, hasil aktual, hasil harapan, dan error Console.

**Berkas yang mungkin berubah:** berkas di `src/` sesuai bug, `TEST-REPORT.md`, `CATATAN.md`
**Rujukan:** R-11, SPEC 9

---

## 10. M7: Security

**Tujuan:** memastikan batasan keamanan SPEC benar-benar terpenuhi, bukan hanya diasumsikan. Uji hanya aplikasi milik sendiri.
**Gerbang:** AC-31, AC-43, AC-44, NFR-02 sampai NFR-04, NFR-12.

### T-7.1 Audit OWASP statis `M`

**Acceptance criteria:**
- [ ] Audit mencakup XSS, penggunaan `innerHTML`, penanganan URL, validasi impor/storage, dependency supply chain, kebocoran secret, dan konfigurasi publik (OWASP Top 10:2025 yang relevan untuk aplikasi statis).
- [ ] Laporan membedakan temuan **terbukti** dari **dugaan**, memuat berkas/baris, tingkat risiko, dan rekomendasi.
- [ ] Pencarian di `src` dan `index.html` untuk `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, dan `new Function` tidak menemukan penggunaan yang melibatkan data pengguna atau storage. Sisa temuan dibenarkan tertulis (isi statis saja).
- [ ] Laporan disimpan di `SECURITY-REPORT.md` atau bagian khusus `CATATAN.md`.

**Berkas yang mungkin berubah:** `SECURITY-REPORT.md` (baru), `CATATAN.md`
**Rujukan:** NFR-02, R-02, SPEC 9.1

### T-7.2 Uji XSS dengan input aman untuk lab `M`

**Acceptance criteria:**
- [ ] Payload `<img src=x onerror=alert(1)>` dimasukkan di nama produk pada instance lokal milik sendiri dan tampil sebagai teks, tidak dijalankan.
- [ ] Payload `<script>alert(1)</script>`, `"><svg onload=alert(1)>`, dan `<b>halo</b>` diuji di kotak pencarian, nama, deskripsi, `imageUrl`, serta injeksi langsung ke localStorage. Tidak ada pop-up atau eksekusi skrip (AC-31).
- [ ] Tampil aman pada kartu katalog, tabel dashboard, dialog hapus, notifikasi, dan atribut `alt` atau `aria-label`.
- [ ] Tidak menguji situs publik atau milik orang lain.

**Berkas yang mungkin berubah:** `src/ui/catalog.js`, `src/ui/dashboard.js`, `src/ui/banner.js`, `TEST-REPORT.md`
**Rujukan:** NFR-02, AC-31, R-02

### T-7.3 Audit tautan dan sumber gambar `M`

**Acceptance criteria:**
- [ ] Semua tautan yang membuka tab baru memiliki `noopener noreferrer` (AC-25).
- [ ] Satu-satunya tujuan keluar adalah `wa.me`, hanya saat tombol diklik. Tab Network saat memuat halaman tidak menunjukkan request ke domain luar (NFR-04, AC-43).
- [ ] `imageUrl` berskema `http`, `https`, `data`, `javascript`, path tanpa `/images/`, atau berisi `..` ditolak di form maupun saat membaca dari storage.
- [ ] Nomor WhatsApp divalidasi dan pesan di-encode (R-05).

**Berkas yang mungkin berubah:** `src/utils/validate.js`, `src/utils/whatsapp.js`, `src/services/storage.js`, `src/ui/catalog.js`
**Rujukan:** NFR-02, NFR-04, AC-25, AC-43

### T-7.4 Rahasia, data pribadi, dan dependensi `M`

**Acceptance criteria:**
- [ ] Pencarian di seluruh repositori (termasuk dokumen) untuk `API_KEY`, `token`, `secret`, `password`, dan pola nomor telepon tidak menemukan rahasia atau nomor pribadi (AC-43, AC-44).
- [ ] Tidak ada berkas `.env` berisi rahasia dan `.gitignore` mencegahnya. Riwayat Git diperiksa untuk rahasia.
- [ ] `git status` dan `git diff --check` dijalankan dan hasil aktualnya dicatat.
- [ ] `npm audit` dijalankan, hasil aktual dicatat dan temuan dianalisis, bukan diabaikan. Tidak memakai `npm audit fix --force` tanpa tinjauan.
- [ ] `package.json`: `dependencies` kosong dan `devDependencies` hanya `vite` (ditambah `vitest` bila T-6.5 dikerjakan). Daftar paket turunan diperiksa sekilas untuk nama mencurigakan.
- [ ] Tabel temuan saran AI di `CATATAN.md` berisi minimal satu entri.

**Berkas yang mungkin berubah:** `.gitignore`, `package.json`, `package-lock.json`, `CATATAN.md`
**Rujukan:** NFR-02, NFR-03, AC-43, AC-44, R-01, R-12

### T-7.5 Remediasi dan retest `M`

**Acceptance criteria:**
- [ ] Temuan terverifikasi diprioritaskan. Untuk tiap temuan diusulkan patch terkecil dan test keamanan yang mereproduksi isu.
- [ ] Rencana disetujui lebih dulu sebelum agent mengimplementasikan. Tidak ada perubahan dependensi besar tanpa persetujuan.
- [ ] Setelah patch: retest isu yang sama dan regression test (uji asap T-6.6 dan `npm test`) lolos.
- [ ] Temuan yang tidak diperbaiki dicatat beserta alasannya.

**Berkas yang mungkin berubah:** berkas di `src/` sesuai temuan, `SECURITY-REPORT.md`, `CATATAN.md`
**Rujukan:** R-02, SPEC 9

### T-7.6 Kebijakan keamanan konten (CSP) pada build `S`

**Acceptance criteria:**
- [ ] Setelah `npm run preview` terbukti berfungsi, kebijakan yang hanya mengizinkan sumber dari asal sendiri (dan `wa.me` hanya sebagai tujuan navigasi) ditambahkan untuk build produksi. Pengecualian dicatat alasannya.
- [ ] Alur lengkap dijalankan dengan Console terbuka tanpa pelanggaran kebijakan.
- [ ] Mode pengembangan tetap berjalan atau kebijakan hanya berlaku pada build.

**Berkas yang mungkin berubah:** `index.html`, `vite.config.js`
**Rujukan:** NFR-02, R-02

### T-7.7 Checklist pra-rilis dan tinjau perintah terminal `M`

**Acceptance criteria:**
- [ ] Checklist: tidak ada token atau API key, tidak ada data pelanggan nyata, test dan build dijalankan, link WhatsApp benar, halaman mobile baik, dan keterbatasan localStorage tercantum.
- [ ] Riwayat perintah terminal ditinjau: tidak ada `sudo`, `rm -rf` di luar folder proyek, `curl ... | sh`, instal paket global, atau skrip sumber tak dikenal (NFR-12, SPEC 9.1).
- [ ] Tidak ada rahasia atau data pribadi yang pernah ditempel ke prompt AI.
- [ ] Hasil tinjauan satu paragraf ditulis di `CATATAN.md`.

**Berkas yang mungkin berubah:** `CATATAN.md`
**Rujukan:** NFR-12, R-12, SPEC 9.1

---

## 11. M8: Build

**Tujuan:** hasil build produksi yang bersih, ringan, dan berfungsi sama dengan mode dev.
**Gerbang:** AC-02, AC-43, serta T-8.2 sampai T-8.4.

### T-8.1 Build produksi `M`

**Acceptance criteria:**
- [ ] `npm test` lalu `npm run build` selesai tanpa galat. Peringatan dibaca dan yang relevan ditangani (AC-02).
- [ ] Folder `dist` berisi `index.html`, aset ber-hash, dan folder `images` dari `public`. `dist` tidak dilacak Git.

**Berkas yang mungkin berubah:** `package.json`, `vite.config.js`, `.gitignore`
**Rujukan:** AC-02, NFR-10

### T-8.2 Verifikasi hasil build lewat preview `M`

**Acceptance criteria:**
- [ ] `npm run preview` menampilkan aplikasi yang berperilaku sama dengan mode dev (AC-02, NFR-10).
- [ ] Uji asap pada preview: AC-01, AC-03, AC-23, AC-28, AC-35 lolos.
- [ ] Tab Network tidak menampilkan berkas gagal (404), termasuk gambar di `/images/`. Console bebas galat merah.

**Berkas yang mungkin berubah:** `TEST-REPORT.md`
**Rujukan:** AC-02, NFR-10

### T-8.3 Ukuran dan kebersihan keluaran `M`

**Acceptance criteria:**
- [ ] Total JS dan CSS di `dist` di bawah 100 KB (tidak terkompresi). Tidak ada dependensi runtime.
- [ ] Tidak ada berkas peta sumber `.map`, berkas `.env`, rahasia, atau nomor pribadi di `dist` (ulang pencarian T-7.4 pada hasil build).
- [ ] Setiap gambar di `dist/images` di bawah 10 KB. Request luar saat memuat halaman tidak ada (AC-43).

**Berkas yang mungkin berubah:** `vite.config.js`
**Rujukan:** NFR-04, NFR-01, AC-43

### T-8.4 Base path dan path gambar `M` (lihat D11)

**Acceptance criteria:**
- [ ] Ditetapkan tertulis: nama repo GitHub dan `base` Vite, misalnya `/<nama-repo>/`. Keduanya harus sama persis.
- [ ] Ditunjukkan (dengan build ber-`base` lalu preview) bahwa path gambar `/images/...` gagal tanpa penanganan, lalu diterapkan solusi: awalan base ditambahkan saat render gambar, sementara data tetap `/images/...` dan validasi `imageUrl` tidak berubah.
- [ ] AC-06 (fallback placeholder) dijalankan ulang pada build ber-`base` dan lolos. Perubahan dicatat di `SPEC.md` 4.1 (kolom `imageUrl`) dan `UI-SPEC.md` 8.
- [ ] Keterbatasan dicatat: membuka `dist/index.html` langsung lewat `file://` tidak didukung.

**Berkas yang mungkin berubah:** `vite.config.js`, `src/ui/catalog.js`, `src/ui/dashboard.js`, `src/utils/format.js`, `SPEC.md`, `UI-SPEC.md`, `README.md`
**Rujukan:** D11, AC-06, SPEC 4.1

---

## 12. M9: Deployment

**Tujuan:** aplikasi dapat dibuka publik dan oleh orang lain dari salinan bersih dengan panduan tertulis.
**Gerbang:** T-9.1 sampai T-9.6 selesai dan URL publik dapat dibuka trainer.

### T-9.1 Amandemen SPEC `M`

**Acceptance criteria:**
- [ ] `SPEC.md` bagian 7 diperbarui secara eksplisit: deployment ke hosting statis publik diizinkan, Vitest sebagai `devDependency` diizinkan (D9), dan ekspor/impor JSON diizinkan bila T-5.6 dikerjakan (D12). Bagian 9.1 dan NFR-09 disesuaikan.
- [ ] Risiko R-06 dikaji ulang: dashboard tanpa login akan dapat dibuka siapa pun di internet, tetapi data tetap hanya di browser masing-masing pengunjung.
- [ ] Nomor WhatsApp yang dipakai di publik adalah nomor yang memang boleh dipublikasikan, atau tetap placeholder (D8).
- [ ] Catatan amandemen (tanggal dan alasan) ditulis di `SPEC.md`.

**Berkas yang mungkin berubah:** `SPEC.md`, `CATATAN.md`
**Rujukan:** SPEC 7, R-06, D9, D10, D12

### T-9.2 Persiapan source code `M`

**Acceptance criteria:**
- [ ] `npm test` dan `npm run build` dijalankan ulang dan lolos. Tidak ada rahasia atau `.env` di repositori. `git status` bersih.
- [ ] Nama repositori GitHub ditetapkan sesuai T-8.4. Cabang utama `main`.
- [ ] Remote `origin` diperiksa (`git remote -v`) dan ditambahkan hanya bila belum ada. Repositori di-push ke GitHub (`git push -u origin main`).
- [ ] Jika push ditolak (fetch first), penyebab dipahami lebih dulu dan tidak memakai force push tanpa alasan.

**Berkas yang mungkin berubah:** `.gitignore`, `package.json`
**Rujukan:** NFR-10, NFR-02

### T-9.3 Deploy ke GitHub Pages `M`

**Acceptance criteria:**
- [ ] `vite.config.js` memuat `base` sesuai nama repo (untuk situs proyek `https://USERNAME.github.io/<nama-repo>/`). Gunakan `/` hanya untuk situs pengguna atau domain kustom.
- [ ] Workflow `.github/workflows/deploy.yml` dibuat dengan pemicu push ke `main` dan jalan manual, izin minimal (`contents: read`, `pages: write`, `id-token: write`), langkah install bersih (`npm ci`), build, unggah `dist`, dan deploy. Versi action dibaca dari dokumentasi resmi dan tidak ada token atau kunci di berkas.
- [ ] Di GitHub: Settings, Pages, Build and deployment, Source diatur ke GitHub Actions.
- [ ] Workflow di-commit dan di-push, lalu Actions berstatus sukses. Jika gagal, log dibaca dan penyebab dicatat sebelum memperbaiki.
- [ ] `S`: alternatif Netlify atau Vercel dicoba bila diinginkan. Batas paket gratis dicatat.
- [ ] Cara menarik kembali penerbitan (menonaktifkan Pages atau menghapus situs) dicatat.

**Berkas yang mungkin berubah:** `vite.config.js`, `.github/workflows/deploy.yml`, `README.md`
**Rujukan:** D10, D11, NFR-10

### T-9.4 Verifikasi aplikasi yang sudah online `M`

**Acceptance criteria:**
- [ ] URL publik memakai HTTPS dan dapat dibuka tanpa akun. Halaman tidak putih.
- [ ] Uji asap pada URL publik: katalog tampil, gambar dimuat tanpa 404, pencarian dan filter bekerja, tombol WhatsApp menghasilkan URL benar, tambah produk lalu F5 tetap tersimpan (AC-01, AC-03, AC-23, AC-28, AC-35).
- [ ] Banner mode demo tetap terlihat di dashboard dan dashboard tidak diklaim sebagai admin production.
- [ ] Tampilan mobile 390 px baik. Hasil dicatat di `TEST-REPORT.md`.

**Berkas yang mungkin berubah:** `TEST-REPORT.md`, `CATATAN.md`
**Rujukan:** AC-01, AC-23, AC-26, AC-28, AC-35, NFR-06

### T-9.5 README `M`

**Acceptance criteria:**
- [ ] README berbahasa Indonesia memuat: tujuan, fitur, stack, prasyarat (versi Node), cara instal, jalankan, test, build, preview, struktur folder, cara deployment, cara mengganti nomor WhatsApp, dan cara mereset data (AC-45).
- [ ] Keterbatasan tertulis: tanpa login (dashboard terbuka bagi siapa pun di perangkat yang sama), data localStorage hanya di browser tersebut, stok tidak berkurang otomatis, perubahan dua tab saling menimpa, `file://` tidak didukung, dan fitur S yang belum selesai.
- [ ] Hanya fitur yang benar-benar ada yang ditulis. Tidak ada klaim keamanan multiuser.
- [ ] Peringatan agar nomor pribadi tidak dimasukkan ke repositori publik.
- [ ] Orang yang belum pernah melihat proyek dapat menjalankannya dengan README saja (diuji pada salinan bersih: clone ke folder baru, install, build, preview berhasil).

**Berkas yang mungkin berubah:** `README.md`, `package.json`
**Rujukan:** AC-45, R-10, R-06

### T-9.6 Penutupan proyek dan pengiriman hasil `M`

**Acceptance criteria:**
- [ ] Seluruh Definition of Done umum (bagian 2) tercentang untuk M0 sampai M8.
- [ ] `CATATAN.md` lengkap: tujuan, target aplikasi, tabel temuan pemeriksaan saran AI, URL GitHub, URL aplikasi, screenshot, kendala, hasil test, dan perbaikan prioritas.
- [ ] Status `SPEC.md` diubah menjadi "Selesai" dengan daftar penyimpangan dari rencana.
- [ ] Commit akhir dibuat dan diberi tag versi lokal (misalnya `v1.0.0`).
- [ ] Tautan repository dan demo dikirim lewat halaman "Kirim hasil training" dan keduanya dapat dibuka oleh trainer (bukan tautan contoh `username`).

**Berkas yang mungkin berubah:** `CATATAN.md`, `SPEC.md`, `UI-SPEC.md`, `TASKS.md`
**Rujukan:** SPEC 1.3, R-10

---

## 13. Peta Cakupan Acceptance Criteria

B = tugas yang membangun, V = tugas yang memverifikasi. Verifikasi akhir semuanya terjadi di M6.

| AC | Isi singkat | B | V |
|----|-------------|---|---|
| AC-01 | Setup, Console tanpa galat | T-0.2 | T-6.2, T-8.2 |
| AC-02 | Build dan preview | T-8.1 | T-8.2 |
| AC-03 | 8 kartu pada data kosong | T-1.2, T-1.6, T-5.2 | T-6.2 |
| AC-04 | Produk stok 0 | T-1.6, T-3.2 | T-6.2 |
| AC-05 | Badge Unggulan | T-1.6 | T-6.2 |
| AC-06 | Placeholder gambar | T-1.3, T-1.6 | T-6.2, T-8.4 |
| AC-07 sampai AC-09, AC-11, AC-12 | Pencarian | T-2.1, T-2.2 | T-6.2, T-6.5 |
| AC-10 | Tidak ada hasil | T-2.5 | T-6.2 |
| AC-13 sampai AC-16 | Filter | T-2.3 | T-6.2 |
| AC-17 sampai AC-22 | Sorting | T-2.1, T-2.3 | T-6.2, T-6.5 |
| AC-23, AC-24 | Tautan WhatsApp | T-3.1, T-3.2, T-4.9 | T-6.2, T-6.5 |
| AC-25 | `target` dan `rel` | T-3.2 | T-6.2, T-7.3 |
| AC-26 | Dashboard dan banner demo | T-4.3, T-4.5 | T-6.2 |
| AC-27 | Ringkasan data contoh | T-4.4 | T-6.2 |
| AC-28 | Tambah produk | T-4.6 | T-6.2 |
| AC-29 | Penolakan validasi | T-4.2, T-4.6 | T-6.2, T-6.5 |
| AC-30 | Ubah produk | T-4.6 | T-6.2 |
| AC-31 | Teks apa adanya (XSS) | T-4.6 | T-6.2, T-7.2 |
| AC-32 | Stok 0 dan kembali | T-4.6 | T-6.2 |
| AC-33 | Hapus dengan konfirmasi | T-4.7 | T-6.2 |
| AC-34 | Batal ubah | T-4.6 | T-6.2 |
| AC-35, AC-36 | Persistensi dan kunci | T-5.1, T-5.2 | T-5.5, T-6.2 |
| AC-37 | Data rusak | T-5.3, T-5.4 | T-5.5, T-6.5 |
| AC-38 | Array kosong | T-2.5, T-5.3 | T-5.5 |
| AC-39 | Reset data demo | T-4.8 | T-5.5, T-6.2 |
| AC-40 | Responsif 360 px | T-1.6, T-4.5 | T-6.3 |
| AC-41, AC-42 | Keyboard, alt, label | T-1.5, T-2.3, T-4.6 | T-6.4 |
| AC-43 | Rahasia dan Network | T-3.3, T-7.4 | T-7.3, T-7.4, T-8.3 |
| AC-44 | Data contoh nonpribadi | T-1.2 | T-7.4 |
| AC-45 | README | T-9.5 | T-9.5 |
| AC-46 | `#hash` dashboard | T-4.3 | T-6.2 |

| UI | B | V |
|----|---|---|
| UI-01, UI-02 | T-1.1, T-1.6 | T-6.3 |
| UI-03, UI-04 | T-1.6 | T-6.2 |
| UI-05, UI-18 | T-1.1 | T-6.4 |
| UI-06, UI-07 | T-1.1, T-1.5, T-2.3 | T-6.4 |
| UI-08 | T-2.4 | T-6.2 |
| UI-09 | T-2.5 | T-6.4 |
| UI-10, UI-11 | T-3.2 | T-6.2 |
| UI-12 | T-4.3 | T-6.2 |
| UI-13 | T-4.5 | T-6.3 |
| UI-14 | T-4.6 | T-6.2 |
| UI-15, UI-16 | T-4.7 | T-6.2 |
| UI-17 | T-1.1 | T-6.4 |

---

## 14. Peta Risiko ke Tugas

| Risiko (SPEC 6) | Ditangani oleh |
|-----------------|----------------|
| R-01 Cakupan melebar | Prioritas `M`/`S`, bagian 15 |
| R-02 XSS lewat localStorage | T-1.6, T-4.5, T-7.1, T-7.2, T-7.6 |
| R-03 localStorage rusak/penuh | T-5.3, T-5.4, T-6.5 |
| R-04 NaN, negatif, desimal | T-4.2, T-4.6, T-6.5 |
| R-05 Karakter khusus di tautan WhatsApp | T-3.1, T-4.9, T-6.5 |
| R-06 Dashboard dikira aman | T-4.3, T-9.1, T-9.5 |
| R-07 Stok tidak sinkron dengan pesanan | T-3.2, T-9.5 |
| R-08 Gambar rusak/hilang | T-1.3, T-1.6, T-8.4 |
| R-09 Nomor placeholder tidak aktif | T-3.3, T-9.5 |
| R-10 Data tidak ikut ke browser lain | T-9.5 |
| R-11 Waktu habis di dashboard dan validasi | Bagian 15, T-6.6 |
| R-12 Perintah atau skrip tak dikenal | T-0.1, T-7.4, T-7.7 |
| R-13 Versi Node tidak cocok | T-0.1, T-9.5 |

---

## 15. Jika Waktu Terbatas

Urutan yang dikorbankan lebih dulu, dari yang paling aman dilewati:

1. T-9.3 bagian alternatif hosting, T-7.6 (CSP), dan bagian `S` di T-6.3 (kasus tepi).
2. T-5.6 (ekspor/impor JSON) dan `#hash` di T-4.3 (F-13, AC-46).
3. Penyempurnaan visual (ornamen hero, ilustrasi produk yang lebih rapi) dan penyempurnaan responsif tabel dashboard (cukup gulir di dalam wadahnya).

Yang **tidak boleh** dilewati: validasi form (T-4.2, T-4.6), pemulihan data rusak (T-5.3), audit XSS (T-7.2), pencarian rahasia (T-7.4), `npm test` dan build serta preview (T-6.5, T-8.1, T-8.2), deploy dan verifikasi online (T-9.3, T-9.4), README (T-9.5), dan pengiriman hasil (T-9.6). Jika fitur `M` terancam, kurangi tampilan visual, bukan perilaku.