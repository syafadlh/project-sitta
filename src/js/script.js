// ======= LOGIN =======
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  window.location.href = "dashboard.html";
}


// ======= GREETING OTOMATIS =======
if (document.getElementById("greeting")) {
  const jam = new Date().getHours();
  let sapaan = "Selamat Malam";
  if (jam < 12) sapaan = "Selamat Pagi";
  else if (jam < 15) sapaan = "Selamat Siang";
  else sapaan = "Selamat Sore";
  document.getElementById("greeting").textContent = sapaan;
}

// ============ TRACKING ============
function cariDO() {
  const noDO = document.getElementById("noDO").value;
  const hasil = document.getElementById("hasilTracking");
  hasil.innerHTML = "";

  const data = dataTracking.find(d => d.noDO === noDO);

  if (!data) {
    alert("Nomor DO tidak ditemukan");
    return;
  }

  hasil.innerHTML = `
    <p><strong>Nama:</strong> ${data.nama}</p>
    <p><strong>Status:</strong> ${data.status}</p>
    <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
    <p><strong>Tanggal Kirim:</strong> ${data.tanggal}</p>
    <p><strong>Total Pembayaran:</strong> ${data.total}</p>
    <div class="progress-bar"><div style="width:${data.progress}%">${data.progress}%</div></div>
  `;
}

function cariDO() {
  const noDO = document.getElementById("noDO").value.trim();
  const hasil = document.getElementById("hasilTracking");
  hasil.innerHTML = "";

  const data = dataTracking.find(item => item.noDO === noDO);

  if (!data) {
    hasil.innerHTML = `<p style="color:red;text-align:center;">Nomor DO tidak ditemukan</p>`;
    return;
  }

  hasil.innerHTML = `
    <div class="tracking-card">
      <h3>${data.nama}</h3>
      <p>${data.noDO}</p>
      <p>${data.asal} ➜ ${data.tujuan}</p>
      <p>${data.alamat}</p>
      <small>${data.tanggal} ${data.waktu}</small>
    </div>

    <div class="timeline">
      ${data.perjalanan.map(step => `
        <div class="timeline-item">
          <p><strong>${step.keterangan}</strong></p>
          <span>${step.tanggal} ${step.waktu}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ======= DATA DUMMY TRACKING =======
const dataTracking = [
  {
    noDO: "DO001",
    nama: "FAI EKA",
    asal: "SURABAYA",
    tujuan: "MADIUN",
    alamat: "Jalan Diponegoro No. 45, Kelurahan Kartoharjo, Madiun",
    tanggal: "2025-03-10",
    waktu: "15:56:02",
    perjalanan: [
      { keterangan: "Selesai antar di MADIUN (Diterima oleh FAI EKA)", tanggal: "2025-03-20", waktu: "13:34:59" },
      { keterangan: "Proses antar di MADIUN", tanggal: "2025-03-20", waktu: "09:05:06" },
      { keterangan: "Diteruskan ke Kantor Antaran MADIUN", tanggal: "2025-03-19", waktu: "20:03:46" },
      { keterangan: "Tiba di Hub SPP SURABAYA", tanggal: "2025-03-18", waktu: "21:05:42" },
      { keterangan: "Diteruskan ke Hub SPP SURABAYA", tanggal: "2025-03-18", waktu: "13:29:06" },
      { keterangan: "Diteruskan ke Kantor Antaran SIDOARJO", tanggal: "2025-03-18", waktu: "09:22:14" },
      { keterangan: "Tiba di Hub SURABAYA", tanggal: "2025-03-18", waktu: "07:02:22" },
      { keterangan: "Pengiriman di loket SURABAYA", tanggal: "2025-03-15", waktu: "15:56:02" }
    ]
  }
];