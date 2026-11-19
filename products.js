/* ============================================================
   RemahManis — data & konfigurasi
   Edit file ini untuk mengganti nomor WhatsApp, foto, harga, stok.

   foto : lokasi gambar produk (SVG/JPG/PNG/WEBP). Untuk memakai foto asli,
          taruh file di assets/products/ lalu ubah nama file di sini,
          contoh: foto: 'assets/products/butter-cookies.jpg'
          Rasio gambar yang pas: 4:3 (misal 1200 x 900 px).
   img  : warna cadangan. Dipakai kalau file foto tidak ditemukan.
   ============================================================ */

var CONFIG = {
  NOMOR_WA: '6287761662481', // format internasional, tanpa + atau spasi
  TOKO: 'RemahManis'
};

var PRODUCTS = [
  { id: 'p-001', nama: 'Butter Cookies Original', kategori: 'Klasik', harga: 38000, stok: 25, unggulan: true,
    deskripsi: 'Cookies mentega klasik yang gurih, renyah, dan lumer di mulut.',
    foto: 'assets/products/butter-cookies.svg',
    img: { c1: '#EBC48A', c2: '#CF9A55', c3: '#A87634', chip: '#8A5A2B' } },

  { id: 'p-002', nama: 'Nastar Nanas Premium', kategori: 'Kue & Hampers', harga: 85000, stok: 12, unggulan: true,
    deskripsi: 'Kue kering isi selai nanas buatan sendiri, cocok untuk hampers dan suguhan tamu.',
    foto: 'assets/products/nastar-nanas.svg',
    img: { c1: '#EDB25E', c2: '#D08A2E', c3: '#A8691C', chip: '#F6D27A' } },

  { id: 'p-003', nama: 'Hampers Cookies 4 Toples', kategori: 'Kue & Hampers', harga: 150000, stok: 30, unggulan: false,
    deskripsi: 'Paket empat toples cookies pilihan dalam kemasan rapi, siap dikirim sebagai kado.',
    foto: 'assets/products/hampers-4-toples.svg',
    img: { c1: '#D9B98C', c2: '#B8905C', c3: '#8F6C3E', chip: '#6B3E26' } },

  { id: 'p-004', nama: 'Choco Chip Cookies 250 g', kategori: 'Cokelat', harga: 45000, stok: 8, unggulan: true,
    deskripsi: 'Cookies renyah di tepi dan lembut di tengah dengan potongan choco chip melimpah.',
    foto: 'assets/products/choco-chip-cookies.svg',
    img: { c1: '#E8B063', c2: '#C07A32', c3: '#9C5E22', chip: '#4A2A18' } },

  { id: 'p-005', nama: 'Double Chocolate Cookies', kategori: 'Cokelat', harga: 48000, stok: 0, unggulan: false,
    deskripsi: 'Adonan cocoa pekat dengan potongan chocolate di dalamnya untuk pencinta rasa pahit manis.',
    foto: 'assets/products/double-chocolate-cookies.svg',
    img: { c1: '#6B3B26', c2: '#4A2415', c3: '#33170C', chip: '#E9C9A0' } },

  { id: 'p-006', nama: 'Oatmeal Raisin Cookies', kategori: 'Klasik', harga: 40000, stok: 15, unggulan: false,
    deskripsi: 'Cookies oat kenyal dengan kismis manis dan taburan kayu manis.',
    foto: 'assets/products/oatmeal-raisin-cookies.svg',
    img: { c1: '#D8B27A', c2: '#B58A4E', c3: '#8A6535', chip: '#5A3A22' } },

  { id: 'p-007', nama: 'Red Velvet Cookies', kategori: 'Cokelat', harga: 52000, stok: 20, unggulan: false,
    deskripsi: 'Cookies merah lembut beraroma cocoa ringan dengan isian krim keju.',
    foto: 'assets/products/red-velvet-cookies.svg',
    img: { c1: '#C0504D', c2: '#8E2A2A', c3: '#6E1F1F', chip: '#FFF1DC' } },

  { id: 'p-008', nama: 'Peanut Butter Cookies', kategori: 'Klasik', harga: 35000, stok: 40, unggulan: false,
    deskripsi: 'Cookies kacang gurih dengan selai kacang asli dan sedikit garam laut.',
    foto: 'assets/products/peanut-butter-cookies.svg',
    img: { c1: '#E3B86F', c2: '#C48F43', c3: '#9A6D2B', chip: '#8A5A2B' } }
];
