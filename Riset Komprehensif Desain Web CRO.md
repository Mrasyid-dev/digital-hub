# **Arsitektur Konversi dan Sistem Desain Web: Laporan Deep Research untuk Pengembangan Aturan AI Agent (Knowledge Base)**

## **BAB 1: FRAMEWORK & ANATOMI LANDING PAGE HIGH-CONVERTING (CRO)**

### **Struktur Above the Fold & Aturan 5 Detik**

Bagian *above the fold* merupakan penentu utama apakah pengguna akan melanjutkan penjelajahan atau meninggalkan halaman pendarat (*landing page*) dalam waktu singkat. Berdasarkan prinsip optimasi tingkat konversi (*Conversion Rate Optimization* atau CRO), halaman pendarat harus mampu menyampaikan nilai proposisinya dalam jendela perhatian kritis pengguna yang dikenal sebagai "Aturan 5 Detik"1. Jika dalam 5 detik pertama pengunjung tidak memahami apa yang ditawarkan, siapa target audiensnya, dan tindakan apa yang harus diambil berikutnya, probabilitas pentalan (*bounce rate*) akan meningkat secara eksponensial1.  
Anatomi struktural *above the fold* yang dirancang untuk konversi tinggi wajib mengintegrasikan lima elemen esensial secara hierarkis:

* **Headline Utama**: Berfungsi sebagai kait perhatian (*attention hook*) yang berfokus pada hasil akhir yang diinginkan pengguna1. Headline tidak boleh menggunakan jargon teknis yang ambigu, melainkan harus menyampaikan solusi langsung atas masalah terbesar yang dihadapi target audiens1.  
* **Subheadline**: Bertindak sebagai jembatan penjelas yang memperkuat headline2. Elemen ini mendefinisikan fungsionalitas produk atau layanan, memberikan konteks spesifik tentang bagaimana solusi tersebut bekerja, serta menegaskan keunggulan kompetitif yang ditawarkan1.  
* **Visual Pendukung (Hero Visual)**: Representasi grafis berkualitas tinggi yang merepresentasikan produk atau hasil akhir dalam skenario penggunaan nyata2. Penggunaan visual yang buruk, abstrak, atau tidak relevan dapat mengaburkan pesan utama dan menciptakan disonansi kognitif2.  
* **Indikator Kepercayaan (Trust Indicators)**: Elemen validasi sosial instan, seperti logo mitra strategis, lencana keamanan, atau penilaian mikro (misalnya, peringkat bintang 5 dari platform pihak ketiga) yang diletakkan langsung di bawah atau di sekitar CTA utama2.  
* **Reduksi FUDs (Fear, Uncertainty, Doubts)**: Mikro-teks penurun kecemasan yang ditempatkan sangat dekat dengan tombol aksi3. Contoh penanganan FUDs secara taktis meliputi frasa seperti "Tidak memerlukan kartu kredit," "Uji coba gratis 14 hari," atau "Sertifikasi enkripsi 256-bit"3.

Untuk menyusun elemen-elemen ini ke dalam kode atau instruksi AI Agent, berikut adalah aturan operasional dan parameter metrik yang harus diterapkan pada area *above the fold*:

| Elemen Above the Fold | Aturan Teknis & Batasan Desain | Parameter Metrik Keberhasilan |
| :---- | :---- | :---- |
| **Headline Utama** | Maksimal 12 kata; ukuran font minimal 48px; teks harus memuat kata kunci fungsional utama1. | Rasio keterbacaan tinggi dalam 2 detik pertama scanning visual. |
| **Subheadline** | Maksimal 2 kalimat (30 kata); ukuran font 18px-24px dengan opasitas 70%-87%6. | Menjelaskan kegunaan spesifik produk dan mendukung kejelasan headline1. |
| **Hero Visual** | Gambar produk riil, cuplikan antarmuka (UI mockup), atau video fungsional singkat; hindari stok foto abstrak2. | Waktu muat visual kurang dari 1.5 detik (LCP optimal)7. |
| **Call to Action (CTA)** | Kontras warna minimal ![][image1] terhadap latar belakang; menggunakan tombol solid dengan teks berorientasi aksi3. | Rasio klik-tayang (*Click-Through Rate* / CTR) di atas 3%3. |
| **FUDs Reduction** | Penempatan teks berukuran 12px-14px dengan opasitas 60% tepat di bawah tombol CTA utama3. | Penurunan tingkat pengabaian keranjang atau formulir pendaftaran3. |

### **Halaman Panjang & Scannability**

Halaman pendarat yang panjang (*long-form landing page*) secara empiris terbukti menghasilkan konversi yang lebih tinggi untuk produk atau layanan dengan tingkat keterlibatan (*engagement*) tinggi, harga premium, atau solusi yang membutuhkan edukasi mendalam3. Halaman panjang bekerja dengan menyelaraskan struktur informasi dengan tahapan psikologis dalam pengambilan keputusan, mulai dari pembentukan kesadaran (*awareness*), evaluasi solusi (*consideration*), hingga tindakan akhir (*decision*)3.  
Agar halaman panjang tetap efektif tanpa membuat pengguna merasa kewalahan, prinsip keterbacaan cepat (*scannability*) harus diterapkan secara ketat melalui aturan operasional berikut:

* **Visual Hierarchy (Hierarki Visual)**: Pengaturan skala font dan kontras warna untuk memandu arah pandang mata3. Kepala bab (*headings*) harus menonjol secara signifikan dibanding teks isi untuk memfasilitasi pemindaian cepat6.  
* **Pemanfaatan Bolding (Penebalan Teks)**: Penebalan kata kunci fungsional di dalam paragraf membantu pembaca menangkap inti kalimat dalam fraksi detik tanpa harus membaca keseluruhan teks6.  
* **Bullet Points (Poin Bersusun)**: Transformasi teks paragraf padat menjadi daftar poin terstruktur yang menyoroti manfaat utama secara spesifik dan ringkas3. Setiap poin harus diawali dengan kata kerja aksi atau frasa hasil yang kuat.  
* **Mobile Layout Optimization**: Mengingat mayoritas lalu lintas internet saat ini didominasi oleh perangkat seluler, tata letak mobile memerlukan penanganan khusus3. Elemen sekunder yang terlalu panjang (seperti tabel spesifikasi teknis yang detail atau testimoni tambahan) harus disembunyikan di balik elemen interaktif seperti *accordion*, tab, atau tautan *read more* untuk mencegah kelelahan gulir (*scroll fatigue*) yang merusak pengalaman pengguna3.

Dalam mengimplementasikan scannability pada halaman panjang, arsitektur informasi harus disusun mengikuti pola aliran kognitif pengguna:

\[Hero Section: Kesadaran Instan\]  
       │  
       ▼  
\[Social Proof Pertama: Validasi Awal\]  
       │  
       ▼  
\[Manfaat Utama & Fitur: Edukasi Terstruktur\]  
       │  
       ▼  
\[Social Proof Kedua: Pendalaman Kepercayaan\]  
       │  
       ▼  
\[FAQ: Penanganan Keberatan Sisa\]  
       │  
       ▼  
\[CTA Akhir: Rekonsiliasi Konversi\]

### **Penanganan Objek & Konversi Akhir**

Konversi akhir sering kali terhambat oleh keberatan psikologis atau pertanyaan teknis yang belum terjawab di sepanjang halaman. Dua instrumen krusial untuk mengatasi hambatan ini adalah penempatan bagian Pertanyaan yang Sering Diajukan (*Frequently Asked Questions* atau FAQ) dan strategi penempatan tombol Panggilan Aksi (*Call-to-Action* atau CTA)2.  
Metodologi FAQ dalam konteks CRO tidak boleh diperlakukan sekadar sebagai daftar pertanyaan administratif, melainkan sebagai alat penanganan keberatan aktif (*objection handling*)2. FAQ dirancang untuk menyasar ketakutan sisa yang menghalangi konversi dengan mengubah keraguan menjadi penegasan nilai fungsional.

| Keberatan Psikologis Pengguna | Strategi Jawaban FAQ Konversional |
| :---- | :---- |
| "Apakah implementasi sistem ini memerlukan waktu lama dan mengganggu operasional?" | Menjelaskan proses integrasi kilat (kurang dari 15 menit) dengan bantuan tim migrasi gratis tanpa waktu henti (*zero downtime*). |
| "Bagaimana jika layanan ini tidak memberikan dampak nyata bagi bisnis saya?" | Menegaskan garansi pengembalian dana penuh 100% tanpa syarat dalam waktu 30 hari pertama pemakaian. |
| "Apakah ada biaya tersembunyi setelah saya mendaftar?" | Memberikan transparansi struktur harga, merinci apa saja yang termasuk dalam paket, dan menegaskan tidak ada biaya tambahan. |

Untuk memastikan penempatan CTA yang optimal di sepanjang perjalanan pengguna, arsitektur halaman harus mengadopsi sistem penempatan multi-titik2. Pertama, satu CTA primer wajib ditempatkan di bagian *above the fold* untuk memfasilitasi konversi instan dari pengguna dengan niat beli (*buying intent*) tinggi2. Kedua, CTA sekunder ditempatkan secara berkala di akhir setiap bagian penjelasan manfaat utama atau fitur3. Ketiga, satu CTA penutup diletakkan tepat di bawah bagian FAQ atau sebelum footer untuk menangkap pengguna yang baru tuntas terekonsiliasi setelah membaca seluruh materi penjelasan2.  
Pada perangkat mobile, sangat disarankan untuk menerapkan pola *sticky CTA* di bagian bawah layar (*bottom navigation bar*). Tombol ini akan tetap melayang secara presisi saat pengguna menggulir halaman panjang, memastikan akses konversi selalu tersedia dalam jangkauan ibu jari tanpa mengganggu pembacaan konten utama3.

## **BAB 2: METODOLOGI COPYWRITING & IRRESISTIBLE OFFER**

### **Formula Penawaran Konkret (Clear Offer Formula)**

Penawaran yang menarik tidak dibangun di atas abstraksi nilai, melainkan pada kejelasan mutlak yang meminimalkan friksi kognitif. Formula penawaran konkret yang dirancang untuk menyampaikan proposisi nilai secara instan dinyatakan sebagai berikut:  
![][image2]  
Atau secara tekstual didefinisikan sebagai:  
**\[Produk/Layanan Anda (X)\] untuk \[Target Audiens Spesifik (Y)\] agar dapat \[Mencapai Hasil Maksimal (Z)\] tanpa harus \[Mengalami Hambatan/Ketakutan Terbesar (W)\].**

Formulasi matematis ini memaksa penyusunan pesan berfokus pada hasil fungsional dan emosional dengan menghilangkan friksi tradisional.

* Variabel ![][image3] (Produk/Layanan): Harus didefinisikan secara langsung, bukan melalui metafora teknologi yang rumit1.  
* Variabel ![][image4] (Target Audiens): Harus divalidasi dan disegmentasikan secara tajam agar penerima pesan merasa penawaran tersebut dibuat khusus untuk mereka3.  
* Variabel ![][image5] (Manfaat Utama): Harus berbentuk hasil konkret yang dapat diukur dan divalidasi1.  
* Variabel ![][image6] (Friksi/Ketakutan): Merupakan titik nyeri (*pain point*) utama yang biasanya membuat audiens enggan mengambil keputusan1.

Sebagai perbandingan fungsional antara implementasi formula penawaran yang buruk dan yang optimal, perhatikan matriks berikut:

| Kategori Penawaran | Penawaran Lemah (Tidak Terstruktur) | Penawaran Konkret (Sesuai Formula) |
| :---- | :---- | :---- |
| **Aplikasi Kebugaran** | "Aplikasi kebugaran berbasis AI tercanggih dengan ratusan fitur pelacakan."1 | "Sistem kebugaran adaptif (![][image3]) untuk profesional sibuk (![][image4]) agar dapat mencapai berat badan ideal dalam 12 minggu (![][image5]) tanpa harus pergi ke gym atau menghitung kalori secara manual (![][image6])."1 |
| **SaaS Akuntansi** | "Sistem pembukuan cloud otomatis untuk kelancaran bisnis Anda." | "Platform akuntansi otomatis (![][image3]) untuk pemilik UMKM (![][image4]) agar dapat menyelesaikan laporan pajak tahunan dalam 30 menit (![][image5]) tanpa perlu menyewa konsultan keuangan eksternal (![][image6])." |
| **Agensi CRO** | "Kami mengoptimalkan situs web Anda dengan desain modern terbaru." | "Layanan rekayasa konversi (![][image3]) untuk toko e-commerce skala menengah (![][image4]) untuk melipatgandakan profitabilitas penjualan (![][image5]) tanpa menaikkan anggaran iklan berbayar (![][image6])." |

### **Metodologi Psikologi Copywriting**

Metodologi copywriting yang efektif mengarahkan emosi dan logika pembaca secara simultan untuk mengambil tindakan. Dua framework utama dalam domain ini adalah kerangka kerja *Problem-Agitate-Solve* (PAS) dan metafora fungsional *Features vs Benefits* yang dianalogikan melalui Bunga Mario1.  
Framework PAS bekerja dengan mengeksploitasi kecenderungan psikologis manusia yang lebih termotivasi untuk menghindari rasa sakit (*pain avoidance*) daripada mengejar kesenangan (*pleasure seeking*):

> 1. **Problem (Masalah)**: Identifikasi dan nyatakan masalah nyata yang dihadapi audiens secara spesifik dan empatik1. Tujuannya adalah membuat pembaca merasa dipahami secara mendalam.  
> 2. **Agitate (Agitasi)**: Perluas dan perparah dampak dari masalah tersebut1. Tunjukkan konsekuensi emosional, finansial, atau operasional jika masalah dibiarkan tanpa penanganan. Di tahap ini, rasa sakit akibat masalah ditingkatkan intensitasnya.  
> 3. **Solve (Solusi)**: Sajikan produk atau layanan sebagai satu-satunya jalan keluar logis dan efisien untuk menyelesaikan masalah tersebut1.

Dalam mengomunikasikan solusi tersebut, kesalahan umum yang sering terjadi adalah fokus yang berlebihan pada spesifikasi teknis (fitur) daripada transformasi nyata (manfaat)1. Untuk mengatasi hal ini, analogi Bunga Mario digunakan sebagai panduan mendasar:

\[Fitur: Bunga Api\] ──\> \[Kemampuan: Mario Menembak Bola Api\] ──\> \[Manfaat/Hasil Akhir: Menyelamatkan Tuan Putri\]

Berdasarkan analogi di atas, bunga api berwarna merah-putih merupakan fitur (karakteristik fisik produk). Kemampuan menembakkan bola api setelah menyentuh bunga tersebut adalah kemampuan baru yang diperoleh pengguna. Manfaat utamanya adalah Mario kini dapat mengalahkan musuh dengan mudah dari jarak jauh dan menyelamatkan Tuan Putri dengan aman1.  
Copywriting konversional tidak menjual bunga api fungsional; copywriting konversional menjual kehebatan Mario setelah ia mengonsumsi bunga api tersebut1. Konsumen tidak membeli produk; mereka membeli versi diri mereka yang lebih baik, lebih cepat, atau lebih efisien setelah menggunakan produk tersebut1.

| Spesifikasi Fitur (Mata Uang Produk) | Kemampuan Baru Pengguna | Manfaat Hasil Akhir (Mata Uang Pengguna) |
| :---- | :---- | :---- |
| Integrasi API satu-klik dengan sistem CRM. | Sinkronisasi data pelanggan secara otomatis dan langsung (*real-time*). | Menghemat 8 jam kerja manual per minggu sehingga tim penjualan bisa fokus menutup kesepakatan (*deals*). |
| Enkripsi data standar militer AES 256-bit. | Mengamankan seluruh transmisi informasi keuangan dari peretasan. | Menghilangkan kecemasan hukum dan kebocoran data sensitif perusahaan di hadapan regulator. |
| Pengarsipan otomatis berbasis cloud server. | Akses dokumen kerja dari perangkat apa saja tanpa ketergantungan kantor fisik. | Tim kerja dapat melakukan kolaborasi secara fleksibel dari mana pun tanpa kendala akses. |

### **Prinsip Content Congruence**

Prinsip *Content Congruence* (Kesesuaian Konten) menetapkan bahwa tingkat konversi berbanding lurus dengan konsistensi pesan di sepanjang corong pemasaran (*marketing funnel*)3. Setiap gesekan atau ketidakcocokan informasi antara sumber lalu lintas (*traffic source*) dan halaman pendarat akan langsung memicu disonansi kognitif, menurunkan tingkat kepercayaan, dan meningkatkan rasio pentalan3.  
Kesesuaian ini harus dipelihara secara ketat pada tiga dimensi utama:

* **Kesesuaian Media**: Format visual yang digunakan pada materi iklan (misalnya video demo produk atau infografis teks) harus langsung tercermin pada elemen *above the fold* halaman pendarat3. Jika pengguna mengklik iklan video, menempatkan video yang selaras di halaman pendarat akan memperkuat jalur konversi3.  
* **Kesesuaian Informasi**: Istilah, angka penawaran, diskon, atau janji nilai yang dipromosikan pada iklan (misalnya di Google Ads atau Meta Ads) harus sama persis dengan yang tertulis di halaman pendarat3. Perbedaan harga atau detail penawaran sekecil apa pun akan dianggap sebagai taktik manipulatif.  
* **Kesesuaian Brand**: Nada suara (*tone of voice*), palet warna, tipografi, dan gaya visual dari platform eksternal harus mengalir mulus ke halaman pendarat3. Transisi visual yang terlalu drastis membuat pengunjung merasa tersesat atau menduga mereka diarahkan ke situs web yang salah.

## **BAB 3: KERANGKA KERJA COMPANY PROFILE (10 STEPS FRAMEWORK)**

### **Identifikasi Tujuan Utama ("Why") & Penyesuaian Tone**

Penyusunan profil perusahaan (*company profile*) sering kali gagal karena absennya arah tujuan yang jelas, di mana dokumen tersebut ditulis secara generik tanpa mempertimbangkan siapa pembaca utamanya8. Langkah pertama dalam kerangka kerja 10 langkah HubSpot adalah mendefinisikan tujuan utama (*Why*) dari profil perusahaan8. Profil perusahaan harus disesuaikan secara dinamis, baik dari segi penekanan konten maupun nada bahasa (*tone of voice*), tergantung pada target audiens utama8:

* **Orientasi Investor**: Membutuhkan pendekatan berbasis data, proyeksi pertumbuhan yang objektif, analisis skalabilitas pasar, serta kepatuhan tata kelola perusahaan yang ketat8.  
* **Orientasi Pelanggan**: Berfokus pada keandalan solusi, empati terhadap kebutuhan konsumen, nilai-nilai kemanusiaan di balik merek, serta komitmen terhadap kualitas layanan8.

| Parameter Evaluasi | Profil Berorientasi Investor | Profil Berorientasi Pelanggan |
| :---- | :---- | :---- |
| **Fokus Narasi Utama** | Pertumbuhan finansial, stabilitas pasar, pengembalian investasi (*ROI*), tata kelola bisnis. | Penyelesaian masalah, kepuasan pengguna, nilai produk, jaminan kualitas layanan. |
| **Tone of Voice** | Formal, analitis, taktis, percaya diri, berbasis proyeksi kuantitatif8. | Empatis, ramah, solutif, inspiratif, berpusat pada hubungan manusiawi8. |
| **Metrik Kunci yang Ditampilkan** | CAGR, EBITDA, valuasi pasar, pangsa pasar (*market share*), rencana ekspansi global8. | Skor kepuasan pelanggan (CSAT/NPS), jumlah pengguna aktif, jam dukungan teknis, tingkat retensi. |
| **Visualisasi Dominan** | Grafik tren keuangan, diagram struktur organisasi, peta ekspansi bisnis8. | Foto tim kerja, galeri produk/layanan dalam skenario nyata, infografis dampak sosial8. |

### **Storytelling Autentik & Kronologi Sejarah Perusahaan**

Langkah berikutnya dalam penulisan profil perusahaan adalah menyusun sejarah perusahaan (*Company History*) menggunakan pendekatan *storytelling* yang autentik8. Narasi sejarah tidak boleh disajikan sebagai daftar kronologis yang kering dan membosankan, melainkan sebagai sebuah perjalanan kepahlawanan merek (*brand hero's journey*)8:

* **Konflik Awal (The Spark)**: Mengidentifikasi masalah sistemik atau kesenjangan industri yang memicu pendiri untuk mendirikan perusahaan8.  
* **Perjuangan & Validasi (The Climb)**: Menceritakan rintangan-rintangan awal yang berhasil dilewati, inovasi pertama yang berhasil divalidasi oleh pasar, dan transisi dari entitas kecil menjadi bisnis yang terstruktur.  
* **Titik Keberhasilan (The Milestones)**: Menampilkan pencapaian kunci secara kronologis untuk menunjukkan rekam jejak yang solid dan stabil8. Penggunaan diagram garis waktu (*timeline chart*) visual sangat disarankan di bagian ini demi memudahkan pemahaman cepat.

### **Perumusan Visi, Misi, dan Core Values**

Visi, misi, dan nilai-nilai inti (*Core Values*) sering kali menjadi sekadar pajangan dinding karena dirumuskan menggunakan kalimat klise yang abstrak8. HubSpot menyarankan penggunaan metode pertanyaan kunci fungsional untuk merumuskan ketiga elemen ini agar memiliki dampak operasional yang nyata8:

* **Visi (Tujuan Jangka Panjang)**: Dirumuskan dengan menjawab pertanyaan kunci: *"Jika perusahaan kita berhasil menyelesaikan masalah industri ini secara total dalam 10 tahun ke depan, seperti apa rupa dunia atau industri tersebut?"* Kalimat visi harus bersifat aspiratif namun tetap logis.  
* **Misi (Komitmen Operasional Harian)**: Dirumuskan dengan menjawab pertanyaan kunci: *"Tindakan nyata apa yang kita lakukan setiap hari, untuk siapa kita melakukannya, dan standar kualitas apa yang wajib kita penuhi untuk mewujudkan visi tersebut?"* Kalimat misi harus menggunakan kata kerja aksi yang terukur.  
* **Core Values (Prinsip Perilaku)**: Dirumuskan dengan menjawab pertanyaan kunci: *"Prinsip moral dan standar etis apa yang tidak akan pernah kita kompromikan, bahkan jika berkompromi akan mendatangkan keuntungan finansial jangka pendek?"* Setiap nilai inti harus dijabarkan ke dalam perilaku kerja konkret.

### **Competitive Positioning & Analisis Kompetitor Publik**

Dalam bagian "Stand Out from Competitors," perusahaan harus mendefinisikan posisi kompetitifnya secara tajam tanpa perlu merusak citra atau merendahkan kompetitor publik secara langsung8. Cara terbaik untuk mengeksekusi ini adalah dengan memindahkan fokus dari konfrontasi subjektif ke diferensiasi objektif. Hal ini dilakukan dengan mengidentifikasi parameter nilai unik (*Unique Value Proposition*) yang diabaikan oleh pasar atau kompetitor, kemudian menonjolkan parameter tersebut sebagai kompetensi inti perusahaan8.  
Sebagai instrumen analisis taktis, matriks positioning dapat digunakan untuk memetakan kekuatan relatif perusahaan terhadap standar industri:

                  \[Dimensi Kustomisasi Tinggi\]  
                               │  
                               │        ■ Perusahaan Anda  
                               │        (Premium, Spesifik)  
                               │  
───────────────────────────────┼───────────────────────────────  
\[Harga Rendah\]                 │                 \[Harga Premium\]  
                               │  
               ■ Kompetitor B  │  
               (Komoditas)     │  
                               │  
                  \[Dimensi Standardisasi Massal\]

Melalui visualisasi ini, posisi perusahaan diposisikan secara etis sebagai penyedia kustomisasi tingkat tinggi dengan harga premium, sementara kompetitor diklasifikasikan sebagai penyedia standardisasi massal dengan harga rendah. Perbandingan dilakukan secara murni faktual tanpa mencela integritas kompetitor.

## **BAB 4: SISTEM DESAIN VISUAL & ATURAN UI/UX**

### **Tipografi: Sistem Anchor Font, Kombinasi Super Families, dan Text Opacity Hierarchy**

Tipografi bukan sekadar elemen pembacaan teks, melainkan pilar utama penentu suasana visual (*visual mood*) dan pengendali arah baca pengguna6. Sistem desain yang matang menerapkan aturan tipografi yang ketat untuk memastikan kejelasan pesan dan efisiensi komunikasi visual:

* **Sistem Anchor Font**: Pemilihan satu jenis font utama (*Anchor Font*) yang sangat berkarakter untuk digunakan khusus pada judul utama (*headlines*) dan kepala bab (*headings*)6. Anchor font berfungsi sebagai jangkar visual yang langsung menarik perhatian mata dan membangun identitas visual merek yang kuat6. Font ini bisa berupa serif geometris yang elegan atau sans-serif tebal yang modern6.  
* **Kombinasi Super Families**: Pemasangan font pendukung untuk teks isi (*body text*) yang kontras secara struktural namun tetap harmonis dengan Anchor Font6. Rekomendasi standar adalah memasangkan Anchor Font berjenis Serif (untuk *headlines*) dengan font isi berjenis Sans-Serif yang memiliki tingkat keterbacaan tinggi pada layar digital6. Penyelarasan ini dapat divalidasi dengan mempelajari katalog historis pada platform seperti *Fonts In Use*6.  
* **Text Opacity Hierarchy (Hierarki Transparansi Teks)**: Untuk menciptakan kontras yang halus tanpa perlu menambah jumlah ukuran font yang dapat mengotori tata letak, sistem desain harus menerapkan aturan transparansi teks berbasis kepentingan informasi6:  
  * **100% Opacity (High Emphasis)**: Digunakan untuk headline utama, subheadline kritis, harga, tombol aksi, dan informasi yang membutuhkan perhatian mutlak6.  
  * **70% \- 87% Opacity (Medium Emphasis)**: Diterapkan pada teks isi paragraf (*body text*) dan penjelasan fitur sekunder6. Ini mengurangi kelelahan mata akibat membaca teks putih solid di atas latar belakang gelap, atau teks hitam solid di atas latar belakang putih.  
  * **60% Opacity atau kurang (Low Emphasis)**: Dikhususkan untuk teks penjelas tambahan (*captions*), metadata, lencana tanggal, hak cipta di footer, dan elemen non-aktif6.

| Tingkat Hierarki | Opasitas (Opacity) | Peran fungsional | Contoh Penerapan UI |
| :---- | :---- | :---- | :---- |
| **Primer** | 100% | Menarik perhatian instan6. | Judul bagian, angka kunci, label tombol CTA2. |
| **Sekunder** | 70% \- 87% | Keterbacaan teks panjang6. | Deskripsi paragraf, jawaban FAQ, ulasan pengguna2. |
| **Tersier** | 60% atau kurang | Informasi pendukung non-kritis6. | Hak cipta footer, waktu rilis artikel, teks kecil penurun FUDs3. |

### **Warna & Layout: Aturan 60-30-10, Standar Aksesibilitas Kontras (WCAG), Kritik terhadap F-Pattern, dan Larangan Ghost Button**

Keseimbangan warna dan tata letak memiliki dampak langsung pada psikologi kenyamanan pengguna dan efisiensi navigasi halaman.  
Aturan warna 60-30-10 adalah formula matematis untuk mendistribusikan warna secara proporsional guna menciptakan harmoni visual9:  
![][image7]

* **60% Warna Dominan (Latar Belakang)**: Biasanya berupa warna netral seperti putih, abu-abu muda, atau hitam/gelap untuk situs bertema gelap9. Warna ini mendominasi ruang negatif halaman.  
* **30% Warna Sekunder (Struktur)**: Warna brand utama yang digunakan untuk elemen-elemen struktural seperti kartu informasi (*cards*), pembatas bagian, menu navigasi, dan teks sekunder9.  
* **10% Warna Aksen (Konversi)**: Warna kontras tinggi yang digunakan secara hemat dan strategis hanya untuk elemen konversi krusial seperti tombol CTA utama, indikator penting, atau sorotan khusus9. Membatasi warna aksen hanya sebesar 10% memastikan elemen tersebut langsung menonjol saat mata pengguna memindai halaman9.

Semua kombinasi warna wajib mematuhi standar aksesibilitas kontras yang ditetapkan oleh *Web Content Accessibility Guidelines* (WCAG) untuk memastikan bahwa pengguna dengan keterbatasan penglihatan dapat membaca konten dengan nyaman. Standar WCAG AA mewajibkan rasio kontras minimal ![][image1] untuk teks normal (di bawah 18pt) dan ![][image8] untuk teks berukuran besar (di atas 18pt atau tebal).  
Desain modern mulai meninggalkan ketergantungan penuh pada *F-Pattern* (pola membaca berbentuk huruf F) yang umum terjadi pada halaman bertekstur padat. Pola F berasumsi bahwa mata pengguna hanya membaca bagian atas secara horizontal, lalu turun sedikit dan memindai area yang lebih sempit, kemudian langsung melakukan gulir cepat ke bawah tanpa membaca bagian kanan halaman. Mengandalkan pola ini secara pasif dianggap sebagai kegagalan desain. Desain UI/UX yang proaktif harus memandu pergerakan mata menggunakan pola *Z-Pattern* atau sirkuit visual yang terkendali (*visual flow*) dengan memanfaatkan ruang negatif (*whitespace*) secara agresif untuk mengarahkan fokus ke elemen-elemen konversi penting3.  
Sejalan dengan optimasi konversi, penggunaan *Ghost Button* (tombol transparan dengan garis tepi tipis tanpa warna latar solid) dilarang keras untuk tindakan konversi utama3. Secara empiris, *ghost button* gagal menarik perhatian karena kontras visualnya yang sangat rendah3. Pengguna cenderung mengabaikan tombol ini atau menganggapnya sebagai elemen non-aktif (*disabled*), yang secara dramatis menurunkan rasio klik (*click-through rate*). Tombol CTA utama wajib menggunakan warna latar solid dengan kontras tertinggi berdasarkan aturan aksen 10%3.

### **Micro-Visual Polish**

Detail estetika mikro membedakan desain amatir dari karya profesional kelas dunia. Sentuhan akhir ini memberikan kedalaman emosional dan rasa premium pada situs web:

* **Konsep "Star of the Show"**: Setiap bagian halaman (*section*) harus memiliki satu elemen visual utama yang paling dominan, berkarakter, dan menjadi pusat perhatian6. Elemen ini harus terhubung langsung dengan narasi atau cerita yang ingin disampaikan di bagian tersebut6. Menempatkan terlalu banyak elemen visual yang bersaing memperebutkan perhatian akan membingungkan fokus pengguna dan merusak estetika keseluruhan4.  
* **Visual Rhyming (Rima Visual)**: Teknik pengulangan elemen desain mikro secara konsisten di seluruh halaman untuk menciptakan rasa kesatuan dan kohesi6. Contoh rima visual meliputi penggunaan radius kelengkungan sudut (*border-radius*) yang seragam pada semua kartu dan tombol, pengulangan pola kemiringan garis (*angles*) tertentu, penggunaan motif ikonografi dari satu paket keluarga desain yang sama, atau konsistensi efek gradasi warna halus6.  
* **Teknik Kedalaman (Depth, Noise & Textures)**: Memberikan dimensi spasial pada situs web datar (*flat design*) dengan menerapkan efek kedalaman yang halus6. Teknik ini mencakup penerapan bayangan lembut (*drop shadows* yang berlapis), penambahan tekstur mikro berupa efek butiran (*grain* atau *noise overlay*) untuk memberikan kesan fisik yang organik, serta penggunaan efek kaca buram (*glassmorphism* atau efek blur pada latar belakang)6. Efek ini harus diterapkan secara tipis agar tidak bersaing atau mengalihkan fokus dari elemen "Star of the Show"6.

## **BAB 5: PSIKOLOGI PENGGUNA, TRUST & VALIDASI DATA**

### **Familiaritas Pengguna & Jakob's Law**

Efisiensi navigasi dan kenyamanan psikologis pengguna diatur oleh prinsip familiaritas. Hukum Jakob (*Jakob's Law*) menyatakan bahwa pengguna menghabiskan sebagian besar waktu mereka di situs web lain6. Artinya, mereka mengharapkan situs web Anda bekerja dengan cara yang sama seperti semua situs web lain yang telah mereka kenal6. Upaya memaksakan pola navigasi atau interaksi yang terlalu asing dengan alasan kreativitas murni justru akan meningkatkan beban kognitif, memicu kebingungan, dan berujung pada peninggalan situs web.  
Penerapan operasional Jakob's Law diilustrasikan secara sempurna melalui "Elevator Button Rule" (Aturan Tombol Lift): ketika seseorang masuk ke dalam lift, mereka mengharapkan panel tombol lantai berada di posisi standar di samping pintu dengan urutan angka yang logis. Mereka tidak ingin mencari tombol lift yang disembunyikan di langit-langit atau disusun berdasarkan pola warna abstrak. Di dunia web, aturan ini mewajibkan penempatan elemen-elemen navigasi pada konvensi standar6:

* Logo perusahaan diletakkan di sudut kiri atas (atau tengah atas) dan selalu berfungsi sebagai tombol kembali ke beranda (*homepage*).  
* Menu navigasi utama diposisikan secara horizontal di bagian atas halaman atau di dalam ikon menu standar pada perangkat seluler.  
* Ikon keranjang belanja ditempatkan di sudut kanan atas.  
* Tombol pencarian ditandai dengan ikon kaca pembesar standar.

### **Verifikasi Social Proof**

Kepercayaan tidak dapat dipaksakan melalui klaim sepihak; kepercayaan harus dibangun melalui validasi pihak ketiga yang objektif. Era penggunaan lencana logo media generik (seperti deretan logo "As Seen On" tanpa konteks nyata) sebagai bentuk *social proof* telah kehilangan efektivitasnya karena tingginya skeptisisme pengguna modern yang menyadari bahwa lencana tersebut mudah dimanipulasi dan sering kali dibeli secara komersial.  
Untuk membangun kredibilitas yang tidak terbantahkan, *social proof* harus disajikan secara transparan, kaya detail, dan dapat diverifikasi secara mandiri oleh pengunjung3.

* **Kutipan Langsung (Quotes)**: Testimoni harus fokus pada hasil spesifik yang dicapai, bukan pujian generik3. Gunakan format kutipan langsung yang menyoroti perbandingan sebelum dan sesudah menggunakan produk3.  
* **Identitas Lengkap**: Wajib menyertakan nama asli, foto wajah asli beresolusi tinggi (bukan stok foto), serta jabatan atau profesi yang relevan dari pemberi testimoni.  
* **Sumber Platform Terverifikasi**: Menyertakan tautan langsung atau lencana interaktif yang mengarah ke platform sumber ulasan orisinal, seperti LinkedIn, profil Twitter/X, ulasan Google, Trustpilot, atau platform ulasan B2B seperti G2 Crowd3. Ini memberikan kesempatan bagi pengguna yang skeptis untuk memverifikasi keaslian ulasan tersebut secara mandiri3.

### **Form Design: Inline Form (1-step) vs Pop-up Form (2-step)**

Desain formulir pendaftaran atau pengumpulan data merupakan gerbang akhir konversi. Pemilihan arsitektur formulir yang tepat harus didasarkan pada analisis beban kognitif dan tingkat keterlibatan pengguna3.

* **Inline Form (1-step)**: Menampilkan seluruh kolom formulir secara langsung di halaman pendarat3. Formulir ini bekerja sangat baik untuk penawaran dengan friksi rendah, seperti pendaftaran buletin (*newsletter*) atau pengunduhan e-book gratis, di mana jumlah kolom yang diminta sangat minimal (biasanya hanya 1 hingga 3 kolom)3.  
* **Pop-up/Multi-step Form (2-step)**: Menyembunyikan kolom formulir di balik tombol aksi awal, atau membagi proses pengisian formulir menjadi beberapa langkah terpisah3. Ketika pengguna mengklik tombol CTA, mereka baru dihadapkan pada formulir pengisian data3. Pendekatan ini memanfaatkan fenomena psikologis yang dikenal sebagai efek komitmen bertahap (*incremental commitments*) atau efek biaya tenggelam (*Sunk Cost Effect*)3. Begitu pengguna mengambil langkah pertama yang mudah (seperti mengklik tombol atau menjawab pertanyaan pilihan ganda sederhana di langkah pertama), mereka merasa secara psikologis berkomitmen untuk menyelesaikan proses yang telah mereka mulai3.

| Parameter Perbandingan | Formulir Segaris (Inline Form / 1-Step) | Formulir Bertahap (Pop-up / Multi-Step Form) |
| :---- | :---- | :---- |
| **Beban Kognitif Awal** | Tinggi (pengguna langsung melihat semua kolom pengisian data sekaligus)4. | Sangat Rendah (tampilan bersih hanya menyajikan tombol atau satu pertanyaan sederhana)3. |
| **Tingkat Friksi Visual** | Tinggi (dapat mengotori kebersihan tata letak halaman jika kolom terlalu banyak)3. | Sangat Rendah (formulir hanya muncul saat diinteraksi, menjaga keindahan desain)3. |
| **Peluang Drop-off** | Terjadi di awal (pengguna langsung mundur begitu melihat formulir yang rumit). | Terjadi di tengah jalan (jika langkah berikutnya terlalu panjang atau meminta data sensitif). |
| **Kuantitas vs Kualitas Data** | Menghasilkan kuantitas tinggi jika kolom sedikit, namun kualitas menurun jika dipaksakan banyak kolom. | Menghasilkan kualitas data tinggi karena memfasilitasi kualifikasi bertahap (*progressive profiling*)3. |
| **Skenario Kasus Penggunaan** | Langganan email singkat, pembuatan akun instan, formulir pencarian cepat3. | Pendaftaran uji coba gratis, pengajuan penawaran harga B2B (*quote*), penilaian kebutuhan kustom3. |

## **BAB 6: METODOLOGI PEMILIHAN TOOL & ITERASI**

### **Matriks Pemilihan Tool Web**

Pemilihan infrastruktur teknologi untuk pengembangan situs web harus didasarkan pada keselarasan antara kebutuhan bisnis, kapabilitas tim pengembang, target kinerja teknis, dan skalabilitas jangka panjang6. Menggunakan kerangka kerja yang terlalu kompleks untuk situs web sederhana, atau sebaliknya menggunakan pembuat situs web yang kaku untuk aplikasi web dinamis skala besar, merupakan inefisiensi arsitektur yang serius.

| Kategori Teknologi | Tool/Teknologi Utama | Kinerja Teknis (Kecepatan & SEO) | Fleksibilitas Desain & Kustomisasi | Kemudahan Pemeliharaan & Pembaruan | Skalabilitas & Integrasi Data | Skenario Penggunaan Optimal |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Code Frameworks** | React.js, Next.js, Vue.js | Sangat Tinggi (dengan optimasi SSR/ISR yang tepat). | Mutlak Tanpa Batas (kontrol penuh atas setiap piksel dan logika kode). | Rendah (memerlukan tim pengembang perangkat lunak berdedikasi). | Sangat Tinggi (integrasi API kustom dan database skala besar). | Aplikasi web dinamis, platform SaaS kompleks, portal data interaktif. |
| **Static Site Generators (SSG)** | Astro, Gatsby, Hugo | Maksimal (menghasilkan HTML statis murni dengan waktu muat instan). | Sangat Tinggi (berbasis komponen kode kustom). | Medium (memerlukan pemahaman alur kerja Git dan markdown). | Medium (terbatas pada integrasi API saat proses pembuatan). | Blog konten berskala besar, dokumentasi teknis, situs web korporat statis. |
| **No-Code CMS & Builders** | Webflow, Framer6 | Tinggi (kode hasil ekspor yang bersih dan dioptimalkan secara bawaan). | Sangat Tinggi (kanvas visual berbasis aturan CSS/HTML riil). | Tinggi (dapat diperbarui oleh tim pemasaran non-teknis secara visual). | Tinggi (mendukung integrasi API pihak ketiga dan CMS internal). | Situs agensi profesional, landing page konversi tinggi, profil perusahaan interaktif2. |
| **E-Commerce Builders** | Shopify | Medium (tergantung pada jumlah plugin/tema eksternal yang diinstal). | Medium hingga Tinggi (tergantung kebebasan akses ke kode Liquid). | Sangat Tinggi (sistem manajemen inventaris dan transaksi siap pakai). | Tinggi (ekosistem aplikasi pihak ketiga yang sangat kaya). | Toko ritel online, situs perdagangan elektronik D2C (*Direct-to-Consumer*). |
| **Simple Builders & SSG** | Carrd, Squarespace, Wix7 | Medium (kode bawaan sering kali memuat skrip berlebih). | Rendah hingga Medium (dibatasi oleh batas-batas templat sistem). | Maksimal (pemeliharaan nol, seluruh infrastruktur dikelola penyedia layanan). | Rendah (tergantung pada widget bawaan yang disediakan). | Landing page kampanye jangka pendek, portofolio pribadi sederhana, situs web brosur lokal6. |

### **Filosofi Radical Iteration**

Keberhasilan optimasi konversi tidak dicapai melalui tebakan intuitif tunggal, melainkan melalui komitmen terhadap filosofi *Radical Iteration* (Iterasi Radikal)3. Desain web dan copywriting bukanlah karya seni statis yang selesai sekali seumur hidup, melainkan hipotesis hidup yang harus terus-menerus diuji, diukur, dan direkonstruksi berdasarkan data perilaku pengguna yang nyata3.  
Aturan operasional utama dalam menjalankan Iterasi Radikal adalah "Avoid Vague Commitments" (Hindari Komitmen yang Samar)6. Ketika data analitik menunjukkan kinerja konversi halaman yang buruk, tim desain tidak boleh melakukan perubahan-perubahan mikro yang tidak berdampak signifikan—seperti sekadar mengubah warna tombol CTA dari biru ke hijau atau mengganti satu kata di tengah paragraf—dan berharap mendapatkan keajaiban peningkatan konversi6. Perubahan mikro seperti itu hanya berguna ketika volume lalu lintas halaman sangat masif (jutaan kunjungan per bulan) untuk mendeteksi deviasi statistik yang sangat kecil.  
Untuk sebagian besar kasus optimasi, praktisi harus melakukan perubahan radikal pada elemen-elemen berikut6:

* **Radical Reframing of Value Proposition**: Jika tawaran utama berbasis "Efisiensi Biaya" gagal beresonansi, ubah secara drastis menjadi tawaran berbasis "Kecepatan Implementasi" atau "Mitigasi Risiko" di seluruh halaman pendarat.  
* **Radical Structural Redesign**: Mengganti total struktur visual halaman pendarat, misalnya dari halaman panjang penuh teks menjadi halaman interaktif berbasis video demo, atau mengubah tata letak statis menjadi corong kuis (*conversational quiz funnel*)3.  
* **Radical Offer Reconstruction**: Mengubah paket penawaran itu sendiri, dari sekadar menjual lisensi perangkat lunak bulanan menjadi penawaran paket hasil akhir berupa layanan implementasi terkelola penuh (*Done-For-You service*).

Setiap iterasi radikal harus didokumentasikan secara ketat sebagai eksperimen terkendali: mendefinisikan hipotesis sebelum pengujian dimulai, menetapkan satu metrik keberhasilan utama (KPI) yang jelas (misalnya peningkatan rasio klik-tayang atau penurunan biaya akuisisi pelanggan), dan menjalankan pengujian A/B split secara paralel untuk mengeliminasi bias faktor eksternal (seperti tren musiman atau fluktuasi kualitas lalu lintas iklan)3. Hanya melalui siklus iterasi radikal yang disiplin dan berkelanjutan inilah sistem desain web dapat berevolusi mencapai tingkat efisiensi konversi yang maksimal3.

#### **Karya yang dikutip**

> 1. Launched my landing page 10 days ago. 0 signups so far. Brutally honest feedback needed : r/SaaS \- Reddit, [https://www.reddit.com/r/SaaS/comments/1mf2dgx/launched\_my\_landing\_page\_10\_days\_ago\_0\_signups\_so/](https://www.reddit.com/r/SaaS/comments/1mf2dgx/launched_my_landing_page_10_days_ago_0_signups_so/)  
> 2. Perfect Landing Page Design Explained (in 5 minutes) \- YouTube, [https://www.youtube.com/watch?v=GTNgiTK-ic8](https://www.youtube.com/watch?v=GTNgiTK-ic8)  
> 3. Landing Page Optimization Guide: Master Strategies for 2026, [https://www.greenmo.space/blogs/post/landing-page-optimization](https://www.greenmo.space/blogs/post/landing-page-optimization)  
> 4. First website I designed and built: candid feedback needed : r/design\_critiques \- Reddit, [https://www.reddit.com/r/design\_critiques/comments/14t37of/first\_website\_i\_designed\_and\_built\_candid/](https://www.reddit.com/r/design_critiques/comments/14t37of/first_website_i_designed_and_built_candid/)  
> 5. How to Make a Beautiful Landing Page That Converts | 5 Tips for Optimizing Your Website (2026) \- YouTube, [https://www.youtube.com/watch?v=i4QoHO89HqI](https://www.youtube.com/watch?v=i4QoHO89HqI)  
> 6. 6 EASY Tips to 10x Any Site's Design \- YouTube Music, [https://music.youtube.com/podcast/pbhLsV-Dyho](https://music.youtube.com/podcast/pbhLsV-Dyho)  
> 7. What is a Landing Page and How Can I Use One for My Business?, [https://smallbiztrends.com/what-is-a-landing-page/](https://smallbiztrends.com/what-is-a-landing-page/)  
> 8. 10 Steps to a Company Profile That Closes Deals (Free Template) \- YouTube, [https://www.youtube.com/watch?v=vMgcn76p1Fs](https://www.youtube.com/watch?v=vMgcn76p1Fs)  
> 9. Give Me 7 Minutes & Your Web Design Skills Will Take Off \- YouTube, [https://www.youtube.com/watch?v=1NTKwpAVcHg](https://www.youtube.com/watch?v=1NTKwpAVcHg)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAZCAYAAAB6v90+AAABYklEQVR4Xu2WPUsEMRCGR7ARBDubayzERhBB4bDwoxA7sbBTew+xt/an6F+wl5RiIRZiKxZiYW2hKPoO2eDskKyJ7p2HzAMPt5md/Xh3k+WIDMP4CybhjS4mmIcTqrYFN1StTebggS7m8A4/dDHBPvle6Wqtox3WqX4NV9ubAb+tcHAOm/CRfP8F3Knvbo0OXIPj9INgy/Ca/EElwfhig6Q4GD/xPfpnwbpwutp2VBbsDp7CXXgJD+GIbEoQpnzpg8kOxl81J8a8XRJsW4x5jfLHR9ZSPJO/zqje8Q3ZwW7hrBg7yg8WI7yJfpEVjN9WT9Uc/e7GhiLYAn3dSEyeLikW4VP1KxmKYDHuKX5j/HFZEeMj8n28ziRce1G1GPp8ubQeLPwjCYt9iXyvZIx8z5mqx9Dny6U42Ak1T8Ur+CrGDK/RN3gOH8gfMyUbGoidL0XTkukbM/C4krcNwzAMYxB8Ah46cI9xFKpCAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAA1ElEQVR4XmNgGHaAFYiF0AWRABcanwONz+AJxP+xYBhAF9+KJIcCLIH4JxCfAGJ+JHFbIH4PxIxIYlgBSBNI8z8g9kASfwfEZUh8vECRAeLMJ0AsA8SnGSBhRDQAORPm1z1APAdVmjgA8gbIAHt0CWJBLwPEgCkMRAQcOgBp+MMACUhQOIDChGjgAsTPoWxQlIJcsQMhTRiANAdD2aAoBRkAShcEgTwQX2fAjC6QF0CGEPQGKK7nowsyQAIRZEAOugQIwPyIjJGTbzkW+XQk+VEw4AAATr80JnkJqnIAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAAAwklEQVR4XmNgGLKAEYiZ0cS4oeLIQBiIOZD4rCBCCYj/o+G7QCyOUAcGn6ByMOyCLAkz5C2yIBKwBeL3DJguAgMWBoSp2MB1IC5DF0QGDxggmnWQxPiBeA8QcyKJYQVTGCCac5DEZjFANBMEIkB8FYh/ArElEAcDsRmKCgKglQFi+y4gfo4mRxDYMCACDm8AYQMwzenoEsSAIiD+zQAxhCQASlWg1LWGARLvJAGQbSBbQbYTDXoZMNM3CBMVv6OAHgAAKdMriXmLnvUAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAWCAYAAADwza0nAAAAvElEQVR4XmNgGPJADIgl8WBWhFIEMAbi/wQwSA0K4ADirUCcD8TMSOKMQFzGANE0HUkcDqKB+Dq6IBC8Z4Bo4keXgIH5QNyAJmbGANF0BU0cL9jHANEE0kw0ADkLpOkvugQ+AAsIEA0KGKIASCEs2NHjKwONDwcgv4BCcA8DZgh6ALEImhgcwIJdHk0cZPMqBizOBpkOsgWkET0EQQnhFxA/QBMHg9UMEJvmAnEIEp4JxK+gcsvhqkcBjQAANdIqVP7JB9sAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAABJUlEQVR4Xu2TvU4CURCFxxASjFIQKgsbQ0NFQeig09LGmgewNjE8ADwAb0Bo7CloKKGz8RlstLIx0cJE8ZzMzHIzcRdaIl9ywu45O/dvLiL/lpPwXoNKpmrIiij7wzroHWpBl9DPH7nzGnx+n9E1c5CaxrNoVokBaEONaBKuiEXTGMhmBXH7V9AyeBlnokXz4HP2L8v4TcoCugleBmdn0SrxetCT6KqZNZPsXHS7uZyKFvG8nBl0K5sBfYAjaGi/hbCIHSZ10TMibBSza3ufmLcVFn3YM1fm9+rOMh+QjeCEW/FujkW35HAg+lxVHzpOskJ8wEfRQ3c60Cf0YNnO+IBxO+zuG/QiOZc4D57fdzRF7x+7v1MjUkbQRTRF/3L30TywJ/wCjWtEcMd8PL0AAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,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>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAABL0lEQVR4Xu2VsUoDQRCGf5GARUBBG0EICBYpUqUSLGwEG3sDeYCUoqCkTO0DhKRLJ/Z2FqktBR/AytJGi4QQ/YfZg3XILXuyiMV+8MHtzOb257i5AJnM33JFx/SMbppeamq0aYuWPn321l36RXteLQV39IMuoPeXBxDkFbqx7da7ribKdWrknE9EBBtCg9Xdep++0Re6U2xKSHQwyyM0aMx71oDuvbCNAJWDHdBz6EH3plfGJXT/1NRDVA5WMIAetmcbJbToui0G+HWwbfrklOvURAc7cvrcQJ/ag6mnICrYGjSA6FMEk0FITaVgc68mn40pndFDr76KE+jv5ZMTS1Qw4Z2OvHWHLuk1NHiIKlO5BR2oW+j9J/QY+h6XniNTJdMo/5WndONnO5PJZP4l3w7DPr3odxw8AAAAAElFTkSuQmCC>