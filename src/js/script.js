// ============ LOGIN ============
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "admin@ut.ac.id" && password === "admin123") {
    alert("Login berhasil!");
    window.location.href = "dashboard.html";
  } else {
    alert("Email/password yang Anda masukkan salah");
  }
}