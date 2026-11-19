/* RemahManis — logika katalog.
   Butuh js/products.js dimuat lebih dulu (CONFIG dan PRODUCTS). */
(function () {
  'use strict';

  var DEFAULTS = { q: '', kat: '', tersedia: false, urut: 'unggulan' };
  var state = { q: DEFAULTS.q, kat: DEFAULTS.kat, tersedia: DEFAULTS.tersedia, urut: DEFAULTS.urut };

  var $ = function (id) { return document.getElementById(id); };

  function rupiah(n) { return 'Rp ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function cmpNama(a, b) { return a.nama.localeCompare(b.nama, 'id', { sensitivity: 'base' }); }

  // Pencarian -> filter -> urutkan.
  function filterProducts(list, s) {
    var q = s.q.trim().toLowerCase();
    var out = list.filter(function (p) {
      if (q && p.nama.toLowerCase().indexOf(q) === -1 && p.deskripsi.toLowerCase().indexOf(q) === -1) return false;
      if (s.kat && p.kategori !== s.kat) return false;
      if (s.tersedia && p.stok <= 0) return false;
      return true;
    });
    var sorters = {
      unggulan: function (a, b) { return (b.unggulan - a.unggulan) || cmpNama(a, b); },
      nama:     cmpNama,
      murah:    function (a, b) { return (a.harga - b.harga) || cmpNama(a, b); },
      mahal:    function (a, b) { return (b.harga - a.harga) || cmpNama(a, b); },
      stok:     function (a, b) { return (b.stok - a.stok) || cmpNama(a, b); }
    };
    return out.sort(sorters[s.urut] || sorters.unggulan);
  }

  function nomorValid(nomor) { return /^\d{8,15}$/.test(nomor); }

  function waUrl(teks) {
    if (!nomorValid(CONFIG.NOMOR_WA)) return null;
    return 'https://wa.me/' + CONFIG.NOMOR_WA + '?text=' + encodeURIComponent(teks);
  }

  function buildWhatsAppUrl(p) {
    return waUrl('Halo ' + CONFIG.TOKO + ', saya ingin memesan: ' + p.nama + ' (' + rupiah(p.harga) +
      '). Jumlah: 1. Mohon info ketersediaan dan cara pembayaran.');
  }

  // Semua teks lewat textContent (bukan HTML mentah).
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // Ilustrasi cookie CSS: cadangan kalau file foto tidak ada.
  function cookie(img) {
    var c = el('div', 'ck' + (img ? '' : ' ph'));
    if (img) {
      c.style.setProperty('--c1', img.c1); c.style.setProperty('--c2', img.c2);
      c.style.setProperty('--c3', img.c3); c.style.setProperty('--chip', img.chip);
      for (var i = 0; i < 6; i++) c.appendChild(document.createElement('i'));
    }
    return c;
  }

  function showFallback(wrap, p) {
    wrap.textContent = '';
    wrap.classList.add('fallback');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', p.nama);
    wrap.appendChild(cookie(p.img));
  }

  function foto(p) {
    var wrap = el('div', 'ill');
    if (p.foto) {
      var im = document.createElement('img');
      im.alt = p.nama;
      im.width = 800; im.height = 600;
      im.loading = 'lazy'; im.decoding = 'async';
      im.addEventListener('error', function () { showFallback(wrap, p); });
      im.src = p.foto;
      wrap.appendChild(im);
    } else {
      showFallback(wrap, p);
    }
    return wrap;
  }

  function card(p) {
    var habis = p.stok <= 0;
    var li = el('li');
    var a = el('article', 'card' + (habis ? ' habis' : ''));

    var art = el('div', 'art');
    art.appendChild(foto(p));
    if (p.unggulan) art.appendChild(el('span', 'badge ung', '★ Unggulan'));
    if (habis) art.appendChild(el('span', 'badge hab', 'Habis'));
    a.appendChild(art);

    var body = el('div', 'body');
    body.appendChild(el('p', 'cat', p.kategori));
    body.appendChild(el('h3', 'name', p.nama));
    body.appendChild(el('p', 'desc', p.deskripsi));
    var row = el('div', 'row');
    row.appendChild(el('span', 'price', rupiah(p.harga)));
    row.appendChild(el('span', 'stock' + (habis ? ' out' : ''), habis ? 'Stok habis' : 'Stok: ' + p.stok));
    body.appendChild(row);

    var url = habis ? null : buildWhatsAppUrl(p);
    if (url) {
      var btn = el('a', 'btn btn-primary', 'Pesan via WhatsApp');
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.setAttribute('aria-label', 'Pesan via WhatsApp: ' + p.nama + ' (membuka tab baru)');
      body.appendChild(btn);
    } else {
      var off = el('button', 'btn btn-primary', 'Stok Habis');
      off.type = 'button';
      off.disabled = true;
      body.appendChild(off);
    }
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function activeFilters() {
    return (state.kat !== DEFAULTS.kat) + (state.tersedia !== DEFAULTS.tersedia) + (state.urut !== DEFAULTS.urut);
  }

  function render() {
    var hasil = filterProducts(PRODUCTS, state);
    var box = $('hasil');
    box.textContent = '';

    $('count').textContent = 'Menampilkan ' + hasil.length + ' dari ' + PRODUCTS.length + ' produk';
    $('toggle').textContent = 'Filter & Urutkan (' + activeFilters() + ')';

    if (!hasil.length) {
      var e = el('div', 'empty');
      e.appendChild(el('h3', null, 'Produk tidak ditemukan'));
      e.appendChild(el('p', null, 'Coba kata kunci lain atau hapus filter.'));
      var b = el('button', 'btn btn-secondary', 'Reset filter');
      b.type = 'button';
      b.addEventListener('click', resetAll);
      e.appendChild(b);
      box.appendChild(e);
      return;
    }
    var ul = el('ul', 'grid');
    hasil.forEach(function (p) { ul.appendChild(card(p)); });
    box.appendChild(ul);
  }

  function resetAll() {
    state = { q: DEFAULTS.q, kat: DEFAULTS.kat, tersedia: DEFAULTS.tersedia, urut: DEFAULTS.urut };
    $('q').value = ''; $('kat').value = ''; $('urut').value = 'unggulan'; $('tersedia').checked = false;
    render();
  }

  $('q').addEventListener('input', function (e) { state.q = e.target.value.slice(0, 100); render(); });
  $('kat').addEventListener('change', function (e) { state.kat = e.target.value; render(); });
  $('urut').addEventListener('change', function (e) { state.urut = e.target.value; render(); });
  $('tersedia').addEventListener('change', function (e) { state.tersedia = e.target.checked; render(); });
  $('reset').addEventListener('click', resetAll);

  $('toggle').addEventListener('click', function () {
    var open = $('panel').classList.toggle('open');
    this.setAttribute('aria-expanded', String(open));
  });

  // Tombol "Lihat produk": gulir ke katalog dan pindahkan fokus ke judulnya.
  $('cta').addEventListener('click', function (e) {
    e.preventDefault();
    var h = $('produk-judul');
    h.scrollIntoView();
    h.focus({ preventScroll: true });
  });

  // Tautan WhatsApp umum (header, kontak, footer) dan harga awal di hero.
  var umum = waUrl('Halo ' + CONFIG.TOKO + ', saya ingin bertanya soal pesanan cookies.');
  Array.prototype.forEach.call(document.querySelectorAll('[data-wa]'), function (a) {
    if (umum) { a.href = umum; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else { a.hidden = true; }
  });

  var termurah = Math.min.apply(null, PRODUCTS.map(function (p) { return p.harga; }));
  $('harga-mulai').textContent = rupiah(termurah);

  render();
})();
