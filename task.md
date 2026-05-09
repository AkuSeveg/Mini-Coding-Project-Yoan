# Implementations & Task Breakdown (Work Breakdown Structure)

Dokumen ini memecah proses pengembangan menjadi fase-fase terstruktur. Beri tanda centang `[x]` jika tugas telah selesai.

## Fase 1: Persiapan Ekosistem & HTML Skeleton
- [ ] **T1.1:** Buat direktori utama proyek, lalu buat sub-direktori `css/` dan `js/`.
- [ ] **T1.2:** Deklarasikan file `index.html` dengan HTML5 boilerplate. Pastikan meta tag viewport disertakan untuk responsivitas mobile.
- [ ] **T1.3:** Rancang struktur semantik: Buat elemen `<header>` untuk navigasi dan jam, lalu `<main>` yang berisi tiga `<section>` terpisah untuk Timer, Todo, dan Links.
- [ ] **T1.4:** Berikan atribut `id` pada semua elemen interaktif (tombol, input, teks dinamis) agar mudah diseleksi oleh DOM API di fase JavaScript.

## Fase 2: Desain Visual & Responsivitas (CSS)
- [ ] **T2.1:** Definisikan sistem variabel (`:root`) di `style.css`. Buat palet warna untuk *Light Mode* dan siapkan *class* pembungkus `body.dark-mode` untuk palet *Dark Mode*.
- [ ] **T2.2:** Terapkan global reset (`box-sizing: border-box; margin: 0; padding: 0;`).
- [ ] **T2.3:** Tata letak utama: Gunakan CSS Flexbox untuk pusatkan kontainer di tengah layar vertikal/horizontal. Gunakan CSS Grid untuk mengatur layout komponen di dalam `<main>`.
- [ ] **T2.4:** Berikan sentuhan mikro-interaksi: Tambahkan efek `hover`, transisi `0.3s` pada perubahan warna background, dan *drop-shadow* ringan pada *card* komponen.

## Fase 3: Logika Waktu, Timer, & Tema (JavaScript Tahap 1)
- [ ] **T3.1:** Di file `script.js`, deklarasikan satu object konstan (`DOM = {}`) yang menampung semua `document.getElementById` agar kode lebih rapi.
- [ ] **T3.2:** Buat fungsi `setInterval(..., 1000)` untuk memperbarui jam dan tanggal *real-time*. Sisipkan logika `if-else` untuk salam Pagi/Siang/Sore/Malam.
- [ ] **T3.3:** Implementasikan variabel status tema (Light/Dark). Hubungkan dengan klik tombol *toggle* dan simpan preferensi ke Local Storage.
- [ ] **T3.4:** Buat *state machine* untuk Timer. Tulis logika `setInterval` terpisah untuk pengurangan mundur detik, dan fungsi format ke string `MM:SS`. Aktifkan tombol Mulai, Jeda, dan Reset.

## Fase 4: Struktur Data, CRUD, & Validasi (JavaScript Tahap 2)
- [ ] **T4.1:** Buat fungsi `renderTodos()` dan `saveTodos()`. Tulis logika *Create* dari input form, *Update* (*toggle* teks dicoret atau edit teks), dan *Delete* berdasarkan ID unik (`Date.now()`).
- [ ] **T4.2:** Tambahkan logika validasi di *Todo List*: Tolak *submit* kosong dan tolak nama tugas yang sudah terdaftar (gunakan metode `array.some()`).
- [ ] **T4.3:** Tambahkan fungsi pengurutan `array.sort()` pada *Todo List* agar *item* yang nilai `completed: true` otomatis turun ke bawah daftar.
- [ ] **T4.4:** Ulangi pola arsitektur CRUD di atas untuk fitur Tautan Cepat (Quick Links).
- [ ] **T4.5:** Tambahkan logika auto-koreksi URL pada fitur tautan. Jika string tidak mengandung `http://` atau `https://`, sisipkan otomatis.

## Fase 5: Pengujian (Quality Assurance) & Finalisasi
- [ ] **T5.1:** Lakukan *Cross-Browser Testing* (Uji buka di Chrome, Firefox, dan Safari).
- [ ] **T5.2:** Lakukan uji responsivitas: Ubah ukuran jendela peramban ke resolusi *smartphone* (360px), pastikan Grid berubah dari 2 kolom menjadi 1 kolom tanpa ada teks meluber.
- [ ] **T5.3:** Lakukan *Data Persistence Test*: Isi Todo, atur tema Dark, jalankan timer. Refresh halaman. Pastikan semua data bertahan (*persist*) kecuali timer yang me-reset ke state awal.
- [ ] **T5.4:** (Opsional) Persiapkan `manifest.json` jika proyek ingin dikonversi menjadi ekstensi *Chrome/Edge New Tab*.
