# Project Untuk Tes Bidang di Vascomm

## ---Catatan---
- Pembuatan project ini menggunakan Node js versi 18.17.1 dan npm versi 9.6.7
- OS Komputer Windows 11
- Database Mangement System yang digunakan ketika pembuatan adalah postgresql versi 14
- Untuk Mencoba API yang telah dibuat saya lampirkan file Postman collection di project ini dengan nama <strong>Vascomm Test Bidang.postman_collection.json</strong>
- Untuk API, user dengan role USER hanya dapat mengakses api list data, untuk proses CUD hanya role admin yang bisa

## Setup dan Instalasi
1. eksekusi perintah <code>npm install</code> untuk menginstall dependensi
2. Buat file <strong>.env</strong> sesuai dengan file <strong>.env.example</strong> untuk setup environtment aplikasi
3. Setup environtment Database pada file <strong>config.json</strong> di dalam folder config.
4. eksekusi perintah <code> npm run dev </code> untuk memulai aplikasi dalam environtment dev dengan nodemon
5. eksekusi perintah <code> npm run start </code> untuk memulai aplikasi dalam environtment prod dengan node 