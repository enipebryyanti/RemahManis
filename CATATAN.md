# CATATAN.md

## 1. Tujuan Latihan

- Berlatih membangun aplikasi kecil dengan bantuan AI, dari ide sampai bisa dijalankan.
- Belajar menulis instruksi (prompt) yang jelas dan memeriksa hasil AI sebelum dipakai.
- Memahami batas kemampuan AI: bagian mana yang boleh diandalkan, bagian mana yang harus diverifikasi sendiri.

## 2. Target Aplikasi

- **Nama:** RemahManis, web jualan cookies sederhana.
- **Fungsi inti:** tampilkan katalog cookies, cari, saring, dan urutkan produk, pesan lewat tombol WhatsApp, serta kelola produk (tambah, ubah, hapus) lewat dashboard demo.
- **Teknologi:** Node.js + npm, Vite + JavaScript vanilla, tampilan web sederhana, data di `localStorage` browser.
- **Batasan (di luar cakupan):** tanpa login, tanpa database eksternal, tanpa keranjang atau pembayaran online, tanpa deploy ke server publik.
- **Kriteria selesai:** aplikasi berjalan lokal dengan `npm run dev`, `npm run build` dan `npm run preview` berhasil, serta fitur inti (katalog, pencarian, pesan WhatsApp, tambah/ubah/hapus produk) bisa dicoba.

## 3. Risiko Penggunaan AI yang Diperiksa

**Risiko:** AI bisa menyarankan paket npm, perintah, atau fungsi yang tidak ada (halusinasi) atau yang tidak aman/usang.

**Cara memeriksa:**
1. Cari setiap paket yang disarankan di npmjs.com. Pastikan namanya ada, masih dirawat, dan unduhannya wajar.
2. Jalankan `npm audit` setelah instalasi untuk melihat kerentanan.
3. Baca kode hasil AI baris demi baris sebelum dijalankan, terutama perintah yang menghapus file atau mengakses jaringan.
4. Catat setiap temuan di bawah ini.

**Temuan:**

| Saran AI | Hasil pemeriksaan | Tindakan |
|----------|-------------------|----------|
|          |                   |          |