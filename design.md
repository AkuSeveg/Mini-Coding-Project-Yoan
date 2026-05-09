# System Design & Architecture Document

## 1. Pendekatan Arsitektur (Client-Side Monolith)
Aplikasi ini sepenuhnya mengadopsi pola *Client-Side Rendering (CSR)* statis. Tidak ada proses *build* (seperti Webpack atau Vite) yang diwajibkan, sehingga eksekusi program bertumpu langsung pada JavaScript Engine di browser pengguna (V8/SpiderMonkey). Keuntungan pendekatan ini adalah *Zero-Latency* pada interaksi UI.

## 2. Struktur Pohon DOM & Komponen (Visual Design)
Meskipun tidak menggunakan *framework* berbasis komponen seperti React, antarmuka tetap didesain dengan konsep modular secara visual:
*   `App Container` (Max-width: 800px, di tengah layar)
    *   `Header Component`
        *   `Theme Switcher` (Tombol)
        *   `Name Input` (Teks reaktif)
        *   `Clock & Greeting Text`
    *   `Main Content` (CSS Grid: 1 Kolom Mobile / 2 Kolom Desktop)
        *   `Timer Card` (Berada di kolom kiri atau atas)
        *   `Todo Card` (Span penuh 2 kolom agar teks tugas tidak terpotong)
        *   `Quick Links Card` (Berada di kolom kanan atau bawah)

## 3. Sistem Manajemen Status (State Management)
Data aplikasi hidup di dua tempat secara bersamaan: **JavaScript Memory (Variables)** dan **Browser Local Storage**.
*   **Alur Baca (Read Flow):** Saat inisialisasi awal, `script.js` mengambil JSON dari Local Storage -> *Parse* menjadi Array/Object JS -> Merender DOM.
*   **Alur Tulis (Write Flow):** User Action (Klik/Ketik) -> Modifikasi Array/Object JS di memori -> Stringify ke JSON -> Timpa (`setItem`) ke Local Storage -> Panggil fungsi `render()` untuk memicu pembaruan UI secara sinkron.

## 4. Skema Database Local Storage
| Kunci (Key) | Tipe Data | Contoh Format JSON |
| :--- | :--- | :--- |
| `userName` | String | `"Kiro"` |
| `theme` | String | `"dark"` |
| `timerDuration` | Number | `25` |
| `todos` | Array of Objects | `[{"id": 1684300, "text": "Review PR", "completed": false}]` |
| `links` | Array of Objects | `[{"id": 1684301, "name": "GitHub", "url": "https://github.com"}]` |

## 5. UI/UX & Psikologi Warna
*   **Palet Warna:** 
    *   *Light Mode:* Background abu-abu sangat muda (`#f4f4f5`) dengan Card putih murni (`#ffffff`) untuk kontras yang bersih.
    *   *Dark Mode:* Background abu-abu sangat gelap (`#18181b`) untuk mengurangi ketegangan mata (eye-strain).
*   **Aksen Visual:** Tombol aksi utama (*Primary*) menggunakan warna biru (`#3b82f6`) yang melambangkan fokus dan ketenangan. Aksi destruktif (Hapus/Reset) menggunakan warna merah (`#ef4444`) sebagai sinyal bahaya/peringatan.
*   **Tipografi:** Menggunakan font sistem *built-in* (`system-ui`, `-apple-system`) agar teks terlihat familiar, profesional, dan tidak memerlukan waktu *loading* ekstra dari Google Fonts.
