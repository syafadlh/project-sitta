// Fungsi login (langsung masuk dashboard tanpa validasi)
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // langsung pindah ke dashboard
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