# Moviora - Streaming Web

Moviora adalah aplikasi web katalog dan *streaming* film berpenampilan modern yang dirancang untuk memberikan pengalaman terbaik kepada pengguna. Dibuat dengan pendekatan _single-page application_ (SPA), aplikasi ini mementingkan aspek kecepatan (dibangun di atas Vite dan React) serta desain premium bergaya *Glassmorphism*.

## 🌟 Fitur Unggulan

* **Dukungan Dua Bahasa (Bilingual)**: Tersedia pilihan untuk mengganti konten aplikasi antara **Bahasa Inggris (EN)** dan **Bahasa Indonesia (ID)**.
* **Jelajah Film**: Melihat kumpulan film *Trending*, Populer, dan rilis terbaru bersumber dari **The Movie Database (TMDB) API**.
* **Mode Gelap/Terang (Dark/Light Mode)**: Secara instan dapat menyesuaikan tema tampilan sesuai dengan tingkat kenyamanan mata pengguna.
* **Manajemen Daftar Tontonan (Watchlist)**: Menyimpan film favorit ke dalam daftar tontonan yang datanya tersimpan (*local storage*).
* **Riwayat Film (History)**: Secara rekam jejak otomatis mencatat riwayat film-film apa saja yang telah dibuka/dilihat.
* **Sistem Rating Pribadi**: Pengguna dapat menyimpan penilaian bintang pada film-film tertentu.
* **Navigasi Super Mulus**: Didukung oleh implementasi animasi mulus **Framer Motion** untuk peralihan antar halaman.
* **Desain Sangat Responsif**: Memberikan jaminan kemudahan akses baik di gawai besar (PC/Laptop) hingga gawai terkecil (Ponsel Pintar).

## 💻 Teknologi yang Digunakan

* **Kerangka Kerja UI**: [React (v19)](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Routing**: [React Router DOM (v7)](https://reactrouter.com/)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **Animasi Komponen**: [Framer Motion](https://www.framer.com/motion/)
* **Ikon Visual**: [React Icons](https://react-icons.github.io/react-icons/)
* **Backend API**: [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)

## 🚀 Panduan Eksekusi (Menjalankan Secara Lokal)

1. **Pastikan Komprabilitas Sistem**
   Pastikan mesin Anda sudah terpasang [Node.js](https://nodejs.org/).

2. **Pengunduhan (*Clone*) repositori ini:**
   ```bash
   git clone https://github.com/AuliaHafidh/streaming-web.git
   cd streaming-web
   ```

3. **Pemasangan Paket Modul (Dependencies):**
   Gunakan _package manager_ kesukaan Anda (`npm`, `yarn`, atau `pnpm`).
   ```bash
   npm install
   ```

4. **Persiapan Kunci API (Environment Variables):**
   Duplikat atau buat sebuah file bernama `.env` di _root_ poyek Anda. Masukkan API Key TMDB yang Anda miliki seperti berikut:
   ```env
   VITE_TMDB_API_KEY=ISI_DENGAN_API_KEY_TMDB_ANDA
   ```

5. **Mulai Menjalankan Program (Development Server):**
   ```bash
   npm run dev
   ```
   Buka peramban (browser) dan akses alamat lokal yang diberikan (umumnya di `http://localhost:5173`).

---

