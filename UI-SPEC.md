# UI-SPEC.md: RemahManis

Spesifikasi antarmuka untuk aplikasi web jualan cookies RemahManis. Dokumen ini melengkapi `SPEC.md` dan tidak mengubah data model, fitur, maupun acceptance criteria di dalamnya.

- **Versi dokumen:** 1.0
- **Tanggal:** 19 November 2026
- **Status:** Draf untuk disetujui sebelum implementasi UI
- **Acuan:** `SPEC.md` (ID fitur F-xx, NFR-xx, AC-xx)
- **Cakupan:** Katalog dan Dashboard Demo, tampilan mobile dan desktop. Tidak ada kode pada dokumen ini.

---

## 1. Tujuan dan Prinsip Desain

### 1.1 Tujuan

- Memberi tampilan hangat, bersih, dan menggugah selera yang mudah dipindai untuk produk cookies.
- Memastikan semua fitur MVP di `SPEC.md` dapat dipakai dengan sentuhan, mouse, dan keyboard.
- Memenuhi aksesibilitas dasar WCAG 2.2 level AA, terutama kontras warna.

### 1.2 Prinsip

1. **Mobile-first.** Rancang dari lebar 360 px, lalu perluas ke layar lebih besar.
2. **Informasi sebelum hiasan.** Nama, harga, dan stok selalu paling jelas. Ornamen tidak boleh menutupi data.
3. **Tidak mengandalkan warna saja.** Status (Habis, Unggulan, galat, menu aktif) selalu disertai teks atau ikon.
4. **Satu aksi utama per area.** Pada kartu produk, aksi utamanya "Pesan via WhatsApp". Pada form, "Simpan".
5. **Jujur soal mode demo.** Dashboard tidak boleh terlihat seperti area yang aman atau terlindungi.
6. **Ringan dan luring.** Tanpa font web, tanpa gambar jarak jauh, tanpa pustaka UI (sejalan dengan NFR-P3 dan bagian 5.1 `SPEC.md`).

### 1.3 Hal yang ditambahkan UI dan tidak ada di SPEC

Elemen berikut hanya pelengkap tampilan statis atau status, tidak menambah data atau aturan bisnis:

| Elemen | Alasan |
|--------|--------|
| Hero | Diminta pada desain. Berisi teks statis dan tombol gulir ke daftar produk |
| Teks jumlah hasil ("Menampilkan 5 dari 8 produk") | Umpan balik saat pencarian dan filter berubah |
| Opsi urutan "Urutan awal" | Keadaan default sorting (sesuai urutan data). Empat opsi sorting di F-08 tidak berubah. Reset (F-10) mengembalikan sorting ke opsi ini |
| Footer | Keterangan bahwa data contoh fiktif |
| Notifikasi inline | Umpan balik setelah simpan, hapus, reset, dan pemulihan data (F-22) |

---

## 2. Design Tokens

### 2.1 Warna

Tema: **krem hangat** untuk latar dan **cokelat** untuk aksi utama. Karamel dipakai hemat sebagai aksen, stroberi hanya untuk galat dan status habis. Tidak ada mode gelap pada MVP.

| Token | Hex | Pemakaian |
|-------|-----|-----------|
| `krem-100` | `#FAF4E8` | Latar halaman |
| `krem-50` | `#FFFDF8` | Permukaan kartu, navbar, form, tabel |
| `krem-300` | `#EDE3CE` | Garis dekoratif, latar tombol nonaktif, placeholder gambar |
| `cokelat-700` | `#6B3E26` | Aksi utama, tautan, harga, hero, penanda menu aktif |
| `cokelat-900` | `#4A2A18` | Hover dan tekan pada tombol utama |
| `cokelat-100` | `#F1E2D3` | Latar header tabel, chip atau ringkasan |
| `karamel-400` | `#F0B24B` | Badge Unggulan, tombol CTA hero, badge DEMO |
| `karamel-100` | `#FFF1D6` | Banner mode demo dan banner pemberitahuan |
| `stroberi-700` | `#B3243E` | Teks galat, status Habis, tombol Hapus |
| `arang-900` | `#2B2A24` | Teks utama |
| `arang-600` | `#5C584B` | Teks sekunder (kategori, stok, bantuan) |
| `garis-kontrol` | `#8A8470` | Batas input, select, kotak centang |
| `fokus` | `#0F3D6B` | Cincin fokus keyboard |
| `putih` | `#FFFFFF` | Teks di atas cokelat-700 dan stroberi-700 |

### 2.2 Pasangan warna dan kontras

Rasio dihitung dengan rumus WCAG dan dibulatkan ke bawah. Syarat: teks biasa >= 4,5:1, komponen UI dan batas kontrol >= 3:1. **Verifikasi ulang dengan alat kontras di DevTools sebelum dianggap final.**

| Teks / elemen | Latar | Rasio | Syarat |
|---------------|-------|------:|--------|
| `arang-900` | `krem-100` | 13,1 | 4,5 |
| `arang-900` | `krem-50` | 14,1 | 4,5 |
| `arang-600` | `krem-100` | 6,4 | 4,5 |
| `arang-600` | `krem-50` | 6,9 | 4,5 |
| `cokelat-700` (tautan, harga) | `krem-100` | 8,1 | 4,5 |
| `cokelat-700` (harga) | `krem-50` | 8,8 | 4,5 |
| `cokelat-700` | `cokelat-100` | 7,0 | 4,5 |
| `putih` (tombol utama) | `cokelat-700` | 8,9 | 4,5 |
| `putih` (tombol utama, hover) | `cokelat-900` | 12,8 | 4,5 |
| `krem-100` (teks hero) | `cokelat-700` | 8,1 | 4,5 |
| `arang-900` (CTA hero, badge Unggulan) | `karamel-400` | 7,6 | 4,5 |
| `arang-900` (teks banner) | `karamel-100` | 12,8 | 4,5 |
| `putih` (badge Habis, tombol Hapus) | `stroberi-700` | 6,4 | 4,5 |
| `stroberi-700` (teks galat) | `krem-50` | 6,3 | 4,5 |
| `stroberi-700` (teks galat) | `krem-100` | 5,9 | 4,5 |
| `arang-600` (tombol nonaktif) | `krem-300` | 5,5 | dianjurkan |
| `garis-kontrol` (batas input) | `krem-50` | 3,6 | 3 |
| `garis-kontrol` | `krem-100` | 3,4 | 3 |
| `fokus` (cincin) | `krem-100` | 10,0 | 3 |
| tombol `karamel-400` terhadap hero `cokelat-700` | | 4,7 | 3 |

Catatan:
- Garis `krem-300` bersifat dekoratif (pemisah kartu dan baris tabel) dan tidak dipakai sebagai satu-satunya penanda batas kontrol.
- Teks `arang-600` dilarang dipakai di atas `cokelat-700`.

### 2.3 Tipografi

- **Keluarga font:** sans-serif sistem, tanpa unduhan font. Urutan: `system-ui`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, lalu `sans-serif`. Alasannya: cepat, tajam di semua perangkat, dan berfungsi luring.
- **Satuan:** `rem` agar mengikuti pengaturan ukuran teks pengguna. Dasar 16 px.
- **Perataan:** rata kiri. Panjang baris teks bacaan maksimal sekitar 70 karakter.

| Peran | Mobile | Desktop (>= 1024 px) | Bobot |
|-------|--------|----------------------|------:|
| H1 (hero, judul dashboard) | 1,75 rem / 1,2 | 2,5 rem / 1,15 | 700 |
| H2 (judul bagian) | 1,375 rem / 1,3 | 1,75 rem / 1,25 | 700 |
| H3 (nama produk) | 1,125 rem / 1,3 | 1,125 rem / 1,3 | 600 |
| Isi | 1 rem / 1,5 | 1 rem / 1,5 | 400 |
| Harga | 1,25 rem / 1,2 | 1,25 rem / 1,2 | 700 |
| Kecil (kategori, stok, bantuan, label badge) | 0,875 rem / 1,4 | 0,875 rem / 1,4 | 500 |
| Tombol dan label form | 1 rem / 1,2 | 1 rem / 1,2 | 600 |

Ukuran terkecil yang dipakai adalah 0,875 rem (14 px). Tidak ada teks di bawah itu.

### 2.4 Spasi, bentuk, bayangan

| Token | Nilai |
|-------|-------|
| Skala spasi (kelipatan 4 px) | 4, 8, 12, 16, 24, 32, 48, 64 |
| Padding wadah halaman | 16 px (mobile), 24 px (>= 768 px) |
| Lebar maksimal konten | 1200 px, di tengah |
| Radius kontrol (tombol, input) | 8 px |
| Radius kartu dan panel | 12 px |
| Radius badge dan chip | pil penuh |
| Bayangan kartu | tipis, warna arang-900 transparan sekitar 8 persen |
| Batas kartu | 1 px `krem-300` |
| Target sentuh minimum | 44 x 44 px untuk semua tombol, tautan navigasi, kotak centang, dan select |

### 2.5 Breakpoint (mobile-first)

| Nama | Lebar | Perubahan utama |
|------|-------|-----------------|
| Dasar | < 480 px | Grid 1 kolom, filter dilipat, tabel dashboard menjadi daftar kartu |
| Kecil | >= 480 px | Grid 2 kolom, badge DEMO di navbar muncul |
| Sedang | >= 768 px | Grid 3 kolom, filter tampil sebaris, tabel dashboard penuh |
| Besar | >= 1024 px | Grid 4 kolom, hero 2 kolom, form dashboard di panel samping |

Lebar uji wajib: **360, 480, 768, 1024, 1280 px**, ditambah perbesaran 200 persen pada 1280 px.

### 2.6 Gerak

- Transisi warna dan bayangan maksimal 150 ms. Lipat dan buka panel filter maksimal 200 ms.
- Jika sistem meminta `prefers-reduced-motion`, semua transisi dan gulir halus dimatikan.
- Tidak ada animasi otomatis, karusel, atau efek paralaks.

---

## 3. Layout dan Struktur Halaman

Satu halaman, dua tampilan (Katalog dan Dashboard Demo) sesuai keputusan A5 di `SPEC.md`. Hanya satu tampilan terlihat pada satu waktu.

Struktur landmark (urutan di DOM):

1. Tautan "Lewati ke konten utama" (muncul saat difokus).
2. `header` berisi navbar.
3. `main` berisi tampilan aktif.
4. `footer`.

Setiap tampilan punya tepat satu H1. Urutan judul tidak melompat (H1, H2, H3).

---

## 4. Komponen

### 4.1 Navbar

- **Isi:** merek "RemahManis" dengan ikon kue (cookie) sederhana di kiri. Dua tautan di kanan: **Katalog** dan **Dashboard**. Badge kecil **DEMO** di samping "Dashboard" (hanya >= 480 px).
- **Perilaku:** menempel di atas saat gulir. Tinggi 56 px (mobile), 64 px (desktop). Latar `krem-50`, garis bawah 1 px `krem-300`.
- **Menu aktif:** teks bobot 700 warna `cokelat-700` dan garis bawah tebal 3 px. Tidak hanya warna. Atribut halaman aktif diberikan ke pembaca layar.
- **Mobile:** tanpa menu hamburger karena hanya dua tautan. Keduanya selalu terlihat.
- **Target sentuh:** setiap tautan setinggi 44 px.

### 4.2 Hero (hanya tampilan Katalog)

- Latar `cokelat-700`, teks `krem-100`.
- **Mobile:** satu kolom. H1, satu kalimat pendukung, tombol CTA.
- **Desktop:** dua kolom. Kiri teks dan CTA. Kanan kartu "Cara memesan" berlatar `krem-50` berisi tiga langkah bernomor (Pilih produk, Klik "Pesan via WhatsApp", Selesaikan di WhatsApp).
- **CTA:** "Lihat Produk", latar `karamel-400`, teks `arang-900`, menggulir ke bagian daftar produk dan memindahkan fokus ke judul "Produk Kami".
- Tidak ada gambar wajib. Ornamen dekoratif boleh dibuat dari bentuk sederhana dan tidak dibaca pembaca layar.

### 4.3 Bilah pencarian, filter, dan sorting (F-06 sampai F-10)

Urutan elemen: pencarian, kategori, urutkan, kotak centang "Hanya tersedia", kotak centang "Hanya unggulan", Reset.

| Elemen | Spesifikasi |
|--------|-------------|
| Pencarian | Lebar penuh, tinggi 44 px, ikon lup di kiri (dekoratif), label tertaut (boleh tersembunyi secara visual tetapi ada), placeholder hanya sebagai contoh |
| Kategori | Select: "Semua kategori", Klasik, Cokelat, Kue & Hampers |
| Urutkan | Select: Urutan awal (default), Nama A-Z, Harga terendah, Harga tertinggi, Stok terbanyak |
| Hanya tersedia, Hanya unggulan | Kotak centang dengan label di sebelahnya. Seluruh baris label dapat diklik |
| Reset | Tombol sekunder. Mengembalikan semua kontrol ke default (F-10) |
| Jumlah hasil | Teks kecil `arang-600`: "Menampilkan N dari 8 produk". Diumumkan ke pembaca layar secara sopan (tidak memotong bacaan) |

- **Mobile (< 768 px):** pencarian selalu tampak. Sisanya berada dalam panel yang dibuka dengan tombol "Filter & Urutkan (n)", n = jumlah kontrol yang nilainya berbeda dari default. Tombol menyatakan status buka/tutup ke pembaca layar. Panel tertutup secara default.
- **Desktop (>= 768 px):** semua kontrol tampil sebaris di bawah pencarian, tanpa tombol lipat.
- Hasil diperbarui saat pengetikan atau perubahan kontrol, tanpa tombol "Cari" terpisah.

### 4.4 Kartu produk (F-01 sampai F-05, F-12)

Urutan isi dari atas ke bawah:

1. Gambar rasio 4:3, sudut atas membulat. Badge di sudut gambar.
2. Kategori (teks kecil `arang-600`).
3. Nama produk (H3, maksimal 2 baris, sisanya dipotong dengan tanda elipsis).
4. Baris harga dan stok: harga di kiri (`cokelat-700`, tebal), "Stok: N" di kanan (`arang-600`).
5. Tombol "Pesan via WhatsApp" selebar kartu.

| Keadaan | Tampilan |
|---------|----------|
| Normal | Seperti di atas |
| Unggulan | Badge "Unggulan" dengan ikon bintang di kiri atas gambar, latar `karamel-400`, teks `arang-900` |
| Habis (stok 0) | Badge "Habis" di kanan atas (latar `stroberi-700`, teks putih). Gambar diredupkan. Teks stok menjadi "Stok habis" berwarna `stroberi-700`. Tombol nonaktif dengan label "Stok habis" |
| Tanpa gambar atau gambar gagal | Placeholder lokal berlatar `krem-300` dengan ikon sederhana. Tidak ada ikon gambar rusak |

- Kartu bukan elemen yang dapat diklik. Hanya tombol di dalamnya yang interaktif, sehingga tidak ada urutan fokus ganda.
- Teks alternatif gambar: nama produk (NFR-U5).
- Produk bisa unggulan sekaligus habis. Kedua badge tampil dan tidak saling menutupi (Unggulan di kiri, Habis di kanan).

### 4.5 Tombol

| Jenis | Tampilan | Dipakai untuk |
|-------|----------|---------------|
| Utama | Latar `cokelat-700`, teks putih, radius 8 px, tinggi minimal 44 px | Pesan via WhatsApp, Simpan, Tambah Produk |
| Sekunder | Latar transparan, batas 2 px `cokelat-700`, teks `cokelat-700` | Batal, Reset, Ubah, Reset data contoh |
| Bahaya | Latar `stroberi-700`, teks putih | Hapus (di dialog konfirmasi) |
| CTA hero | Latar `karamel-400`, teks `arang-900` | Lihat Produk |

| Keadaan | Aturan |
|---------|--------|
| Hover | Tombol utama menjadi `cokelat-900`. Sekunder berlatar `cokelat-100` |
| Fokus keyboard | Cincin 3 px warna `fokus` dengan jarak 2 px dari tepi tombol, sehingga cincin berbatasan dengan latar halaman. Tidak boleh dihilangkan |
| Tekan | Satu tingkat lebih gelap dari hover |
| Nonaktif | Latar `krem-300`, teks `arang-600`, kursor tidak diizinkan. Maknanya juga tertulis lewat label ("Stok habis"), bukan hanya warna pudar |

**Tombol WhatsApp:**
- Label terlihat: "Pesan via WhatsApp", dengan ikon gelembung percakapan generik di kiri (bukan logo merek, supaya warna tetap cokelat dan kontras terjaga).
- Nama aksesibel diawali label terlihat lalu nama produk dan petunjuk tab baru: "Pesan via WhatsApp: Nastar Nanas Premium (membuka tab baru)".
- Membuka tab baru dengan aman sesuai NFR-S4 `SPEC.md`.

### 4.6 Keadaan kosong (F-11)

Panel berbatas putus-putus `krem-300` di tempat grid: ikon lup, judul "Produk tidak ditemukan", saran "Coba kata kunci lain atau hapus filter", dan tombol "Reset pencarian". Pesan diumumkan ke pembaca layar bersama jumlah hasil.

### 4.7 Banner dan notifikasi

| Jenis | Tampilan | Perilaku |
|-------|----------|----------|
| Banner mode demo (F-19) | Latar `karamel-100`, ikon tanda seru, teks tebal "MODE DEMO" lalu keterangan. Lebar penuh di atas konten dashboard | Permanen. Tidak bisa ditutup |
| Banner pemulihan data (F-22) | Gaya sama, ada tombol tutup 44 px | Tampil saat data rusak dipulihkan. Ditutup manual |
| Banner penyimpanan tidak tersedia (NFR-R2) | Gaya sama | Tampil selama penyimpanan tidak tersedia |
| Notifikasi hasil aksi | Baris inline di bawah judul tampilan, latar `cokelat-100`, ikon centang | Tampil setelah simpan, hapus, reset. Bertahan sampai aksi berikutnya atau ditutup. Tidak hilang otomatis |

Notifikasi hasil aksi memakai peran status (diumumkan sopan). Banner kesalahan penyimpanan memakai peran peringatan (diumumkan segera).

### 4.8 Ringkasan dashboard (F-17)

Tiga kartu: **Total produk**, **Total unit stok**, **Stok habis**. Setiap kartu berisi label kecil di atas dan angka besar (1,75 rem, tebal). Latar `krem-50`, batas `krem-300`.
- >= 480 px: tiga kolom sejajar.
- < 480 px: tiga baris ringkas, label di kiri dan angka di kanan.
- Kartu "Stok habis" memakai teks `stroberi-700` pada angka hanya jika nilainya lebih dari 0, tetap dengan label tertulis.

### 4.9 Daftar produk dashboard (F-13)

- **>= 768 px:** tabel sungguhan dengan keterangan tabel ("Daftar produk"), header berlatar `cokelat-100`. Kolom: Gambar (thumbnail 48 px), Nama, Kategori, Harga (rata kanan), Stok (rata kanan), Unggulan ("Ya" atau "Tidak"), Aksi (Ubah, Hapus). Stok 0 ditandai badge "Habis" di samping angka. Saat form terbuka di >= 1024 px, tabel menyempit dan kolom Gambar, Kategori, dan Unggulan disembunyikan agar tetap terbaca.
- **< 768 px:** setiap produk menjadi kartu ringkas: thumbnail 56 px di kiri, di kanan nama, "Kategori - Rp harga", "Stok N - Unggulan" (jika ya), lalu dua tombol Ubah dan Hapus berdampingan (masing-masing minimal 44 px). Setiap nilai tetap disertai labelnya bagi pembaca layar.
- Tombol aksi punya nama aksesibel yang menyebut produk: "Ubah Nastar Nanas Premium", "Hapus Nastar Nanas Premium".

### 4.10 Form produk (F-14, F-15)

- Satu kolom, label di atas kolom. Urutan: Nama, Kategori, Harga, Stok, Deskripsi, Gambar, Unggulan, tombol Simpan dan Batal.
- Judul panel: "Tambah Produk" atau "Ubah Produk".
- Penempatan: panel samping kanan (menempel saat gulir) pada >= 1024 px. Pada lebar lebih kecil, form tampil di atas daftar produk.
- Penanda wajib berupa teks "(wajib)" pada label, bukan hanya bintang atau warna.

| Kolom | Kontrol | Catatan |
|-------|---------|---------|
| Nama | Teks | 2 sampai 60 karakter |
| Kategori | Select dengan opsi awal "Pilih kategori" | Tiga kategori tetap |
| Harga | Teks dengan awalan "Rp" dan papan angka di perangkat sentuh | Bilangan bulat >= 0 |
| Stok | Angka | Bilangan bulat >= 0 |
| Deskripsi | Area teks 3 baris, penghitung "n/200" | Opsional |
| Gambar | Teks | Teks bantuan: "Contoh: /images/choco-chip.svg. Kosongkan untuk memakai placeholder." |
| Unggulan | Kotak centang | Default tidak dicentang |

**Keadaan kolom:**
- Fokus: batas 2 px `cokelat-700` ditambah cincin fokus.
- Galat: batas 2 px `stroberi-700`, ikon tanda seru, dan pesan teks di bawah kolom yang tertaut ke kolom. Kolom ditandai tidak valid bagi pembaca layar.
- Saat Simpan ditekan dengan galat: data tidak tersimpan, muncul ringkasan galat di atas form ("Ada n kolom yang perlu diperbaiki") berisi tautan ke tiap kolom, dan fokus pindah ke ringkasan itu.
- Setelah simpan berhasil: form ditutup, notifikasi hasil aksi muncul, fokus pindah ke tombol "Tambah Produk" (atau ke baris yang baru diubah).

**Pesan galat (bahasa Indonesia):**

| Kolom | Pesan |
|-------|-------|
| Nama | Nama wajib diisi, 2 sampai 60 karakter. |
| Kategori | Pilih salah satu kategori. |
| Harga | Harga harus bilangan bulat Rupiah, 0 atau lebih. |
| Stok | Stok harus bilangan bulat, 0 atau lebih. |
| Deskripsi | Deskripsi maksimal 200 karakter. |
| Gambar | Path gambar harus diawali /images/ atau dikosongkan. |

### 4.11 Dialog konfirmasi (F-16, F-18)

- Dialog modal bawaan browser dengan latar belakang diredupkan. Lebar maksimal 420 px, di tengah.
- Isi: judul, satu atau dua kalimat penjelasan, dua tombol: **Batal** (sekunder, mendapat fokus awal) dan **Hapus** atau **Reset** (bahaya).
- Keyboard: fokus terkurung di dalam dialog. Esc sama dengan Batal. Klik latar sama dengan Batal. Setelah ditutup, fokus kembali ke tombol pemicu, atau ke judul tampilan jika baris pemicu sudah tidak ada.

| Dialog | Judul | Isi |
|--------|-------|-----|
| Hapus produk | Hapus produk? | "{Nama}" akan dihapus dari katalog. Tindakan ini tidak dapat dibatalkan. |
| Reset data | Kembalikan data contoh? | Semua perubahan Anda akan diganti dengan 8 produk contoh. |

### 4.12 Footer

Satu baris teks kecil `arang-600` di atas latar `krem-100` dengan garis atas `krem-300`: "RemahManis. Proyek latihan. Seluruh data produk adalah contoh fiktif."

---

## 5. Wireframe Desktop

Lebar acuan 1280 px. Kotak mewakili area, bukan ukuran piksel. Tanda `[ ]` adalah tombol atau kontrol, `(!)` ikon peringatan, `====` garis penanda menu aktif.

### 5.1 Katalog, desktop

```
+--------------------------------------------------------------------------------------------------+
| [kue] RemahManis                                                     Katalog    Dashboard [DEMO] |
|                                                                      =======                     |
+--------------------------------------------------------------------------------------------------+
| HERO (latar cokelat, teks krem)                                                                  |
|                                                                                                  |
|   Cookies Renyah Buatan Rumah                       +----------------------------------+         |
|   Pilih cookies klasik, cokelat, hingga             | Cara memesan                     |         |
|   hampers, lalu pesan lewat WhatsApp.               | 1. Pilih produk                  |         |
|                                                     | 2. Klik "Pesan via WhatsApp"     |         |
|   [ Lihat Produk ]                                  | 3. Selesaikan di WhatsApp        |         |
|                                                     +----------------------------------+         |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   Produk Kami                                                                                    |
|                                                                                                  |
|   +------------------------------------------------------------------------------------------+   |
|   | (lup) Cari nama atau kategori produk...                                                  |   |
|   +------------------------------------------------------------------------------------------+   |
|                                                                                                  |
|   Kategori [Semua kategori v]  Urutkan [Urutan awal v]  [ ] Hanya tersedia  [ ] Hanya unggulan   |
|                                                                                      [ Reset ]   |
|   Menampilkan 8 dari 8 produk                                                                    |
|                                                                                                  |
|   +------------------+  +------------------+  +------------------+  +------------------+         |
|   | [Unggulan]       |  | [Unggulan]       |  |                  |  | [Unggulan]       |         |
|   |                  |  |                  |  |                  |  |                  |         |
|   |    gambar 4:3    |  |    gambar 4:3    |  |    gambar 4:3    |  |    gambar 4:3    |         |
|   |                  |  |                  |  |                  |  |                  |         |
|   | Klasik           |  | Kue & Hampers    |  | Kue & Hampers    |  | Cokelat          |         |
|   | Butter Cookies   |  | Nastar Nanas     |  | Hampers Cookies  |  | Choco Chip       |         |
|   | Original         |  | Premium          |  | 4 Toples         |  | Cookies 250 g    |         |
|   | Rp 38.000        |  | Rp 85.000        |  | Rp 150.000       |  | Rp 45.000        |         |
|   | Stok: 25         |  | Stok: 12         |  | Stok: 30         |  | Stok: 8          |         |
|   | [Pesan via WA]   |  | [Pesan via WA]   |  | [Pesan via WA]   |  | [Pesan via WA]   |         |
|   +------------------+  +------------------+  +------------------+  +------------------+         |
|                                                                                                  |
|   +------------------+  +------------------+  +------------------+  +------------------+         |
|   |          [Habis] |  |                  |  |                  |  |                  |         |
|   |                  |  |                  |  |                  |  |                  |         |
|   |   placeholder    |  |    gambar 4:3    |  |    gambar 4:3    |  |    gambar 4:3    |         |
|   |                  |  |                  |  |                  |  |                  |         |
|   | Cokelat          |  | Klasik           |  | Cokelat          |  | Klasik           |         |
|   | Double Chocolate |  | Oatmeal Raisin   |  | Red Velvet       |  | Peanut Butter    |         |
|   | Cookies          |  | Cookies          |  | Cookies          |  | Cookies          |         |
|   | Rp 48.000        |  | Rp 40.000        |  | Rp 52.000        |  | Rp 35.000        |         |
|   | Stok habis       |  | Stok: 15         |  | Stok: 20         |  | Stok: 40         |         |
|   | [Stok habis]     |  | [Pesan via WA]   |  | [Pesan via WA]   |  | [Pesan via WA]   |         |
|   +------------------+  +------------------+  +------------------+  +------------------+         |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| RemahManis. Proyek latihan. Seluruh data produk adalah contoh fiktif.                            |
+--------------------------------------------------------------------------------------------------+
```

Urutan kartu mengikuti urutan data contoh (sorting default "Urutan awal"). Pada contoh ini Double Chocolate Cookies adalah satu-satunya produk habis dan satu-satunya tanpa gambar.

### 5.2 Dashboard Demo, desktop (form tertutup)

```
+--------------------------------------------------------------------------------------------------+
| [kue] RemahManis                                                     Katalog    Dashboard [DEMO] |
|                                                                                 =========        |
+--------------------------------------------------------------------------------------------------+
| (!) MODE DEMO: tanpa login. Data hanya tersimpan di browser ini.                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   Dashboard Demo                                    [ + Tambah Produk ]  [ Reset data contoh ]   |
|                                                                                                  |
|   +------------------+  +------------------+  +------------------+                               |
|   | Total produk     |  | Total unit stok  |  | Stok habis       |                               |
|   | 8                |  | 150              |  | 1                |                               |
|   +------------------+  +------------------+  +------------------+                               |
|                                                                                                  |
|   Daftar produk                                                                                  |
|   +------------------------------------------------------------------------------------------+   |
|   | Gbr    Nama                      Kategori          Harga     Stok  Unggulan  Aksi        |   |
|   | -------------------------------------------------------------------------------------    |   |
|   | [img]  Butter Cookies Original   Klasik        Rp 38.000       25  Ya        [Ubah]      |   |
|   |                                                                              [Hapus]     |   |
|   | [img]  Nastar Nanas Premium      Kue & Hampers Rp 85.000       12  Ya        [Ubah]      |   |
|   |                                                                              [Hapus]     |   |
|   | ...    ...                       ...                     ...      ...  ...       ...     |   |
|   | (ph)   Double Chocolate Cookies  Cokelat       Rp 48.000  0 Habis  Tidak     [Ubah]      |   |
|   |                                                                              [Hapus]     |   |
|   +------------------------------------------------------------------------------------------+   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| RemahManis. Proyek latihan. Seluruh data produk adalah contoh fiktif.                            |
+--------------------------------------------------------------------------------------------------+
```

### 5.3 Dashboard Demo, desktop (form terbuka, ada galat)

Saat form terbuka, tabel menyempit dan kolom Gambar, Kategori, serta Unggulan disembunyikan. Form tampil di panel kanan yang menempel saat gulir.

```
+--------------------------------------------------------------------------------------------------+
| (!) MODE DEMO: tanpa login. Data hanya tersimpan di browser ini.                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   Dashboard Demo                                    [ + Tambah Produk ]  [ Reset data contoh ]   |
|   (ringkasan: Total produk 8 | Total unit stok 150 | Stok habis 1)                               |
|                                                                                                  |
|   +----------------------------------------------------+  +------------------------------------+ |
|   | Daftar produk                                      |  | Tambah Produk                      | |
|   |                                                    |  |                                    | |
|   | Nama                        Harga Stok Aksi        |  | (!) Ada 2 kolom yang perlu         | |
|   | -------------------------------------------------  |  |     diperbaiki: Nama, Harga        | |
|   | Butter Cookies Original    38.000   25 Ubah Hapus  |  |                                    | |
|   | Nastar Nanas Premium       85.000   12 Ubah Hapus  |  | Nama (wajib)                       | |
|   | Hampers Cookies 4 Toples  150.000   30 Ubah Hapus  |  | [                            ]     | |
|   | Choco Chip Cookies 250 g   45.000    8 Ubah Hapus  |  | (!) Nama wajib diisi, 2 s.d.       | |
|   | ...                           ...  ... ...         |  |     60 karakter.                   | |
|   |                                                    |  |                                    | |
|   |                                                    |  | Kategori (wajib)                   | |
|   |                                                    |  | [ Pilih kategori           v ]     | |
|   |                                                    |  |                                    | |
|   |                                                    |  | Harga dalam Rupiah (wajib)         | |
|   |                                                    |  | [Rp][ -1                     ]     | |
|   |                                                    |  | (!) Harga harus bilangan           | |
|   |                                                    |  |     bulat Rupiah, 0 atau lebih.    | |
|   |                                                    |  |                                    | |
|   |                                                    |  | Stok (wajib)                       | |
|   |                                                    |  | [ 10                         ]     | |
|   |                                                    |  |                                    | |
|   |                                                    |  | Deskripsi (opsional)         0/200 | |
|   |                                                    |  | [                            ]     | |
|   |                                                    |  |                                    | |
|   |                                                    |  | Gambar (opsional)                  | |
|   |                                                    |  | [ /images/...                ]     | |
|   |                                                    |  | Contoh: /images/kue.svg            | |
|   |                                                    |  |                                    | |
|   |                                                    |  | [ ] Tandai sebagai unggulan        | |
|   |                                                    |  |                                    | |
|   |                                                    |  | [ Simpan ]           [ Batal ]     | |
|   +----------------------------------------------------+  +------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### 5.4 Dialog konfirmasi hapus, desktop

```
+--------------------------------------------------------------------------------------------------+
| ////////////////////////////////// (latar halaman diredupkan) ////////////////////////////////// |
| //////////////////////////////////////////////////////////////////////////////////////////////// |
| ////////////////////////////+--------------------------------------+//////////////////////////// |
| ////////////////////////////| Hapus produk?                        |//////////////////////////// |
| ////////////////////////////|                                      |//////////////////////////// |
| ////////////////////////////| "Nastar Nanas Premium" akan dihapus  |//////////////////////////// |
| ////////////////////////////| dari katalog. Tindakan ini tidak     |//////////////////////////// |
| ////////////////////////////| dapat dibatalkan.                    |//////////////////////////// |
| ////////////////////////////|                                      |//////////////////////////// |
| ////////////////////////////|               [ Batal ]    [ Hapus ] |//////////////////////////// |
| ////////////////////////////+--------------------------------------+//////////////////////////// |
| //////////////////////////////////////////////////////////////////////////////////////////////// |
+--------------------------------------------------------------------------------------------------+
```

---

## 6. Wireframe Mobile

Lebar acuan 360 px. Semua tampilan satu kolom.

### 6.1 Katalog, bagian atas

```
+--------------------------------+
|[k] RemahManis Katalog Dashboard|
|               =======          |
+--------------------------------+
| HERO (cokelat)                 |
|                                |
| Cookies Renyah                 |
| Buatan Rumah                   |
|                                |
| Pilih cookies favorit, lalu    |
| pesan lewat WhatsApp.          |
|                                |
| [ Lihat Produk ]               |
+--------------------------------+
| Produk Kami                    |
|                                |
| +----------------------------+ |
| | (lup) Cari produk...       | |
| +----------------------------+ |
| [ Filter & Urutkan (0)     v ] |
|                                |
| Menampilkan 8 dari 8 produk    |
|                                |
| +----------------------------+ |
| | [Unggulan]                 | |
| |                            | |
| |         gambar 4:3         | |
| |                            | |
| | Klasik                     | |
| | Butter Cookies Original    | |
| | Rp 38.000         Stok: 25 | |
| | [  Pesan via WhatsApp  ]   | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [Unggulan]                 | |
| |                            | |
| |         gambar 4:3         | |
| |                            | |
| | Kue & Hampers              | |
| | Nastar Nanas Premium       | |
| | Rp 85.000         Stok: 12 | |
| | [  Pesan via WhatsApp  ]   | |
| +----------------------------+ |
| ... (kartu berikutnya)         |
+--------------------------------+
| RemahManis. Proyek latihan.    |
| Data produk adalah contoh.     |
+--------------------------------+
```

Pada 360 px merek, ikon, dan dua tautan harus muat dalam satu baris tanpa terpotong atau menumpuk. Badge DEMO disembunyikan di bawah 480 px.

### 6.2 Panel filter terbuka (3 kontrol berubah dari default)

```
+--------------------------------+
| Produk Kami                    |
|                                |
| +----------------------------+ |
| | (lup) Cari produk...       | |
| +----------------------------+ |
| [ Filter & Urutkan (3)     ^ ] |
| +----------------------------+ |
| | Kategori                   | |
| | [ Cokelat              v ] | |
| |                            | |
| | Urutkan                    | |
| | [ Harga terendah       v ] | |
| |                            | |
| | [x] Hanya tersedia         | |
| | [ ] Hanya unggulan         | |
| |                            | |
| | [ Reset ]                  | |
| +----------------------------+ |
|                                |
| Menampilkan 2 dari 8 produk    |
+--------------------------------+
```

### 6.3 Kartu stok habis dan keadaan kosong

```
+--------------------------------+
| +----------------------------+ |
| |                    [Habis] | |
| |  placeholder (diredupkan)  | |
| |                            | |
| | Cokelat                    | |
| | Double Chocolate Cookies   | |
| | Rp 48.000       Stok habis | |
| | [ Stok habis (nonaktif) ]  | |
| +----------------------------+ |
|                                |
| ------ pencarian "zzzz" ------ |
|                                |
| +----------------------------+ |
| |         (ikon lup)         | |
| |   Produk tidak ditemukan   | |
| |    Coba kata kunci lain    | |
| |     atau hapus filter.     | |
| |    [ Reset pencarian ]     | |
| +----------------------------+ |
+--------------------------------+
```

### 6.4 Dashboard Demo

```
+--------------------------------+
|[k] RemahManis Katalog Dashboard|
|                       =========|
+--------------------------------+
| (!) MODE DEMO: tanpa login.    |
| Data hanya tersimpan di        |
| browser ini.                   |
+--------------------------------+
| Dashboard Demo                 |
|                                |
| [ + Tambah Produk ]            |
| [ Reset data contoh ]          |
|                                |
| +----------------------------+ |
| | Total produk             8 | |
| | Total unit stok        150 | |
| | Stok habis               1 | |
| +----------------------------+ |
|                                |
| Daftar produk                  |
| +----------------------------+ |
| | [img] Butter Cookies       | |
| |       Original             | |
| |       Klasik - Rp 38.000   | |
| |       Stok 25 - Unggulan   | |
| |                            | |
| |   [ Ubah ]     [ Hapus ]   | |
| +----------------------------+ |
| +----------------------------+ |
| | [img] Double Chocolate     | |
| |       Cookies              | |
| |       Cokelat - Rp 48.000  | |
| |       Stok 0 [Habis]       | |
| |                            | |
| |   [ Ubah ]     [ Hapus ]   | |
| +----------------------------+ |
| ... (produk berikutnya)        |
+--------------------------------+
```

### 6.5 Form produk dengan galat

Pada mobile, saat "Tambah Produk" atau "Ubah" ditekan, form tampil di atas daftar dan halaman menggulir ke judul form, fokus berpindah ke kolom pertama.

```
+--------------------------------+
| Tambah Produk                  |
|                                |
| (!) Ada 2 kolom yang perlu     |
|     diperbaiki:                |
|     - Nama                     |
|     - Harga                    |
|                                |
| Nama (wajib)                   |
| [                          ]   |
| (!) Nama wajib diisi, 2        |
|     sampai 60 karakter.        |
|                                |
| Kategori (wajib)               |
| [ Pilih kategori         v ]   |
|                                |
| Harga dalam Rupiah (wajib)     |
| [Rp][ -1                   ]   |
| (!) Harga harus bilangan       |
|     bulat Rupiah, 0 atau       |
|     lebih.                     |
|                                |
| Stok (wajib)                   |
| [ 10                       ]   |
|                                |
| Deskripsi (opsional)   0/200   |
| [                          ]   |
|                                |
| Gambar (opsional)              |
| [ /images/...              ]   |
| Contoh: /images/kue.svg        |
|                                |
| [ ] Tandai sebagai unggulan    |
|                                |
| [ Simpan ]         [ Batal ]   |
+--------------------------------+
```

### 6.6 Dialog konfirmasi hapus, mobile

```
+--------------------------------+
| ////////////////////////////// |
| ////////////////////////////// |
| ///+----------------------+/// |
| ///| Hapus produk?        |/// |
| ///|                      |/// |
| ///| "Nastar Nanas        |/// |
| ///| Premium" akan        |/// |
| ///| dihapus dari         |/// |
| ///| katalog. Tindakan    |/// |
| ///| ini tidak dapat      |/// |
| ///| dibatalkan.          |/// |
| ///|                      |/// |
| ///| [Batal]    [Hapus]   |/// |
| ///+----------------------+/// |
| ////////////////////////////// |
+--------------------------------+
```

---

## 7. Aksesibilitas

Target: WCAG 2.2 level AA. Pemeriksaan manual dijabarkan di bagian 10.

| Area | Aturan |
|------|--------|
| Bahasa | Dokumen bertanda bahasa Indonesia |
| Kontras | Semua pasangan warna mengikuti tabel 2.2. Pasangan baru harus diperiksa sebelum dipakai |
| Warna bukan satu-satunya penanda | Habis, Unggulan, menu aktif, galat, dan banner memakai teks atau ikon bersama warna |
| Keyboard | Semua kontrol dapat dijangkau dan dioperasikan lewat Tab, Shift+Tab, Enter, Spasi, dan Esc. Urutan fokus mengikuti urutan visual |
| Fokus terlihat | Cincin 3 px warna `fokus`, jarak 2 px, tidak pernah dihilangkan |
| Tautan lewati | "Lewati ke konten utama" sebagai elemen fokus pertama |
| Landmark dan judul | Header, nav, main, footer. Satu H1 per tampilan, judul berurutan |
| Label form | Setiap kolom punya label tertaut. Galat tertaut ke kolomnya. Kolom bermasalah ditandai tidak valid |
| Pengumuman dinamis | Jumlah hasil dan notifikasi aksi diumumkan sopan. Kesalahan penyimpanan diumumkan segera |
| Dialog | Fokus terkurung, Esc menutup, fokus kembali ke pemicu |
| Target sentuh | Minimum 44 x 44 px, dengan jarak antartombol minimal 8 px |
| Gambar | Teks alternatif berupa nama produk. Ikon dan ornamen dekoratif disembunyikan dari pembaca layar |
| Perbesaran | Tata letak tetap terbaca dan tanpa gulir horizontal pada perbesaran 200 persen dan saat jarak teks diperlebar |
| Gerak | Menghormati `prefers-reduced-motion` |
| Nama tombol | Label terlihat selalu menjadi bagian awal nama aksesibel |

---

## 8. Aset Visual

| Aset | Spesifikasi |
|------|-------------|
| `placeholder.svg` | Rasio 4:3, latar `krem-300`, ikon cookie atau kue garis `cokelat-700`. Tanpa teks di dalam gambar |
| Gambar produk (7 SVG) | Ilustrasi datar sederhana dari bentuk geometris dengan palet bagian 2.1. Rasio 4:3. Tanpa teks di dalam gambar. Ukuran masing-masing di bawah 10 KB |
| Ikon | Set kecil SVG sebaris: lup, gelembung percakapan, bintang, cookie, centang, tanda seru, panah turun dan naik, tutup. Semua dekoratif dan disembunyikan dari pembaca layar, kecuali bila berdiri sendiri (tombol tutup punya nama) |
| Ornamen hero | Opsional, dibuat dengan bentuk sederhana. Tidak wajib ada file baru |
| Sumber | Semua aset dibuat lokal. Tidak memakai CDN, font ikon, atau gambar pihak ketiga |

---

## 9. Pemetaan ke SPEC dan Iterasi

| Komponen UI | Fitur SPEC | Iterasi |
|-------------|-----------|---------|
| Token, font, spasi, breakpoint, tautan lewati, footer | NFR-U1 sampai U6 | 1 |
| Navbar (tampilan Katalog saja, tab Dashboard belum aktif) | A5 | 1 |
| Hero | Tambahan UI | 1 |
| Grid dan kartu produk, badge, placeholder | F-01 sampai F-05 | 1 |
| Bilah pencarian, filter, sorting, jumlah hasil, keadaan kosong | F-06 sampai F-11 | 2 |
| Tombol WhatsApp (perilaku) | F-12 | 3 |
| Aktivasi navbar dua tampilan, banner mode demo | F-19 | 4 |
| Ringkasan, tabel dan daftar dashboard | F-13, F-17 | 4 |
| Form, galat, dialog konfirmasi, notifikasi, banner pemulihan | F-14 sampai F-16, F-18, F-22 | 4 |
| Audit aksesibilitas dan perbaikan visual akhir | NFR-U, AC-39, AC-40 | 5 |

---

## 10. Checklist Verifikasi UI

Dikerjakan manual di browser. Tambahan terhadap AC-01 sampai AC-46 di `SPEC.md`.

| ID | Langkah | Hasil yang diharapkan |
|----|---------|-----------------------|
| UI-01 | Buka katalog pada 360, 480, 768, 1024, 1280 px | Grid 1, 2, 3, 4 kolom sesuai breakpoint. Tidak ada gulir horizontal. Tidak ada teks terpotong atau tumpang tindih |
| UI-02 | Perbesar halaman 200 persen pada 1280 px | Tata letak tetap terbaca, tidak ada konten hilang |
| UI-03 | Periksa nama produk panjang (2 baris) pada kartu | Dipotong rapi, tinggi kartu dalam satu baris tetap seragam, tombol sejajar |
| UI-04 | Periksa kartu Unggulan, Habis, dan tanpa gambar | Tampilan sesuai 4.4. Unggulan dan Habis dapat dikenali tanpa melihat warna |
| UI-05 | Ukur kontras pasangan pada tabel 2.2 dengan alat kontras | Semua memenuhi syarat. Catat jika ada yang meleset dan perbaiki token |
| UI-06 | Tab dari awal halaman | Fokus pertama pada "Lewati ke konten utama". Cincin fokus terlihat jelas di semua kontrol |
| UI-07 | Jalankan pencarian, filter, dan sorting hanya dengan keyboard | Semua bisa dilakukan. Jumlah hasil ikut berubah |
| UI-08 | Buka panel filter di mobile | Tombol menunjukkan status buka/tutup dan jumlah kontrol yang berubah dari default. Reset mengosongkan semuanya |
| UI-09 | Aktifkan pembaca layar, ubah pencarian | Jumlah hasil diumumkan tanpa memindahkan fokus |
| UI-10 | Tekan tombol Pesan via WhatsApp dengan Enter | Tab baru terbuka. Nama tombol menyebut produk |
| UI-11 | Lihat tombol pada produk stok 0 | Label "Stok habis", tidak dapat diklik, terbaca jelas |
| UI-12 | Buka Dashboard Demo | Banner mode demo terlihat tanpa gulir dan tidak dapat ditutup |
| UI-13 | Lihat tabel di >= 768 px dan daftar kartu di < 768 px | Semua data produk dan aksi tersedia di kedua bentuk. Tombol minimal 44 px |
| UI-14 | Kirim form kosong | Ringkasan galat muncul dan mendapat fokus. Setiap kolom bermasalah punya pesan teks dan ikon, bukan hanya warna merah |
| UI-15 | Tekan Hapus lalu Esc | Dialog tertutup, produk tetap ada, fokus kembali ke tombol Hapus |
| UI-16 | Tekan Hapus lalu Konfirmasi | Produk hilang, notifikasi muncul, fokus pindah ke judul tampilan |
| UI-17 | Aktifkan pengaturan sistem "kurangi gerakan" | Tidak ada transisi atau gulir halus |
| UI-18 | Cetak ulang tabel 2.2 setelah perubahan warna apa pun | Daftar rasio diperbarui dan tetap memenuhi syarat |

---

## 11. Keputusan dan Pertanyaan Terbuka

| No | Keputusan saat ini | Alternatif jika ingin diubah |
|----|--------------------|------------------------------|
| K1 | Grid mobile 1 kolom agar nama dan tombol terbaca | 2 kolom kompak di 360 px, dengan tombol berlabel pendek |
| K2 | Navbar tanpa hamburger karena hanya dua tautan | Bilah tab di bawah layar pada mobile |
| K3 | Hero tanpa gambar wajib, hanya teks dan ornamen opsional | Menambah ilustrasi atau kolase produk |
| K4 | Ikon WhatsApp berupa gelembung percakapan generik berwarna cokelat | Logo resmi WhatsApp (perlu memeriksa kontras dan pedoman merek) |
| K5 | Tidak ada mode gelap | Menambah set token gelap dan menghitung ulang kontras |
| K6 | Dialog memakai elemen dialog bawaan browser | Dialog kustom (lebih banyak pekerjaan aksesibilitas) |
