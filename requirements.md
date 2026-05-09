# Product Requirements Document (PRD): Dashboard Produktivitas Pribadi

## 1. Pendahuluan
Aplikasi "Dashboard Produktivitas Pribadi" adalah solusi manajemen waktu dan tugas berbasis peramban (browser) yang dirancang untuk membantu pengguna tetap fokus dan terorganisir. Proyek ini dibangun dengan prinsip *Zero-Dependency* untuk memastikan performa maksimal dan kemudahan *deployment* baik sebagai halaman web statis maupun ekstensi *New Tab* pada browser.

## 2. Target Pengguna & Persona
*   **Pelajar/Mahasiswa:** Membutuhkan timer untuk teknik Pomodoro saat belajar dan tempat untuk mencatat tugas harian.
*   **Pekerja Lepas (Freelancer) / Developer:** Membutuhkan akses cepat ke tautan-tautan penting dan pelacak fokus kerja tanpa gangguan notifikasi aplikasi berat.

## 3. User Stories (Kisah Pengguna)
*   Sebagai pengguna, saya ingin disapa dengan nama saya dan waktu yang akurat setiap kali membuka halaman, agar merasa disambut secara personal.
*   Sebagai pengguna, saya ingin bisa mengatur timer dari 1 hingga 120 menit agar sesuai dengan sesi kerja atau belajar saya.
*   Sebagai pengguna, saya ingin tugas yang sudah selesai tetap ada namun dicoret dan ditaruh di bawah tugas aktif, agar saya bisa melihat progres apa saja yang sudah saya kerjakan.
*   Sebagai pengguna, saya ingin tema situs bisa diubah menjadi gelap (Dark Mode) agar mata saya tidak lelah saat bekerja di malam hari.
*   Sebagai pengguna, saya ingin semua data saya tetap ada meski browser ditutup, tanpa harus membuat akun atau *login*.

## 4. Spesifikasi Teknis Inti
*   **Teknologi:** HTML5 semantik, CSS3 modern (Flexbox/Grid), dan Vanilla JavaScript (ES6+).
*   **Batasan File:** Proyek dipusatkan pada maksimal 3 file utama (`index.html`, `style.css`, `script.js`) untuk menjaga kesederhanaan *codebase*.
*   **Penyimpanan:** 100% *Client-side* menggunakan `window.localStorage`. Tidak ada data yang dikirim ke server eksternal, menjamin privasi pengguna secara mutlak.
*   **Kompatibilitas:** Mendukung peramban modern (Chrome, Firefox, Safari, Edge) versi 3 tahun terakhir.

## 5. Rincian Fitur Utama & Penanganan Batasan (Edge Cases)
### 5.1. Sapaan & Waktu Waktu (Real-time Clock)
*   **Deskripsi:** Detik dan menit berjalan secara sinkron dengan waktu sistem pengguna. Sapaan berubah otomatis: Pagi (05:00-11:59), Siang (12:00-14:59), Sore (15:00-17:59), Malam (18:00-04:59).
*   **Edge Case:** Jika input nama dikosongkan, sapaan akan *fallback* ke "Kawan".

### 5.2. Timer Fokus (Pomodoro Engine)
*   **Deskripsi:** Penghitung waktu mundur yang presisi. Tersedia input numerik untuk durasi kustom.
*   **Edge Case:** Jika pengguna memasukkan angka negatif atau teks pada input durasi, sistem akan memaksa nilai kembali ke *default* (25 menit). Timer akan menampilkan *alert* sistem saat mencapai angka `00:00`.

### 5.3. Manajemen Tugas (Smart To-Do List)
*   **Deskripsi:** Input teks untuk tugas baru. Setiap item memiliki tombol "Edit" dan "Hapus". Item dapat diklik untuk mencoret (*toggle complete*).
*   **Edge Case:** Mencegah *submit* teks kosong. Sistem melakukan validasi *case-insensitive* untuk mencegah input tugas dengan nama yang sama persis (duplikasi).

### 5.4. Tautan Cepat (Quick Bookmarks)
*   **Deskripsi:** Form sederhana berisi "Nama" dan "URL". Menghasilkan tombol kecil yang jika diklik akan membuka tab baru (`target="_blank"`).
*   **Edge Case:** Pengguna sering lupa mengetik `https://`. Jika URL yang dimasukkan tidak memiliki protokol tersebut, sistem akan menyisipkannya secara otomatis sebelum menyimpan ke Local Storage.
