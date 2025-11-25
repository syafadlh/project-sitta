// 🔹 List ekspedisi (sesuai perintah tugas)
const ekspedisiList = ["JNE REG", "JNE EXPRESS", "POS", "TIKI"];

// 🔹 List Paket Bahan Ajar
const paketBahanAjar = [
  {
    kode: "PKT01",
    nama: "Paket Semester 1",
    isi: ["Pemrograman Dasar", "Matematika Diskrit", "Pancasila"],
    harga: 250000
  },
  {
    kode: "PKT02",
    nama: "Paket Semester 2",
    isi: ["Basis Data", "Algoritma Pemrograman", "Kewirausahaan"],
    harga: 280000
  },
  {
    kode: "PKT03",
    nama: "Paket Semester 3",
    isi: ["Struktur Data", "Pemrograman Web", "Sistem Operasi"],
    harga: 300000
  }
];

// 🔹 DATA DUMMY TRACKING AWAL
const trackingData = [
  {
    noDO: "DO2025-001",
    nim: "2341760001",
    nama: "FAI EKA",
    ekspedisi: "JNE EXPRESS",
    totalHarga: 280000,
    asal: "UPBJJ SURABAYA",
    tujuan: "MADIUN",
    alamat: "Jalan Diponegoro No. 45, Kartoharjo, Madiun",
    tanggal: "2025-03-10",
    waktu: "15:56:02",
    perjalanan: [
      { keterangan: "Pengiriman diterima", tanggal: "2025-03-20", waktu: "13:34:59" },
      { keterangan: "Proses antar", tanggal: "2025-03-20", waktu: "09:05:06" },
      { keterangan: "Menuju kantor antaran", tanggal: "2025-03-19", waktu: "20:03:46" }
    ]
  }
];
