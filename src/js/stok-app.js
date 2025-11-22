// ===== MENAMPILKAN DATA DUMMY KE TABEL =====
function tampilkanData() {
  const tabel = document
    .getElementById("tabelStok")
    .getElementsByTagName("tbody")[0];
  tabel.innerHTML = "";

  dataBahanAjar.forEach((item) => {
    const status =
      item.qty < item.safety
        ? `<span style="color:red; font-weight:bold;">Menipis</span>`
        : `<span style="color:green; font-weight:bold;">Aman</span>`;

    const row = tabel.insertRow();
    row.innerHTML = `
      <td>${item.kode}</td>
      <td>${item.judul}</td>
      <td>${item.kategori}</td>
      <td>${item.upbjj}</td>
      <td>${item.lokasiRak}</td>
      <td>${item.qty}</td>
      <td>${item.safety}</td>
      <td>${status}</td>
      <td>${item.catatanHTML}</td>
    `;
  });
}

// ===== TAMBAH BARIS BARU =====
function tambahBaris() {
  const kode = document.getElementById("kode").value.trim();
  const judul = document.getElementById("judul").value.trim();
  const kategori = document.getElementById("kategori").value.trim();
  const upbjj = document.getElementById("upbjj").value.trim();
  const lokasiRak = document.getElementById("lokasiRak").value.trim();
  const qty = parseInt(document.getElementById("qty").value);
  const safety = parseInt(document.getElementById("safety").value);
  const catatanHTML = document.getElementById("catatan").value.trim();

  if (!kode || !judul || !kategori || !upbjj || !lokasiRak || !qty || !safety) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  dataBahanAjar.push({
    kode,
    judul,
    kategori,
    upbjj,
    lokasiRak,
    qty,
    safety,
    catatanHTML,
  });

  tampilkanData();
  closeModal();
  document
    .querySelectorAll(".form-container input")
    .forEach((i) => (i.value = ""));
}

// Vue App
const app = Vue.createApp({
  data() {
    return {
      dataAsli: dataBahanAjar,
      selectedUpbjj: "",
      selectedKategori: "",
      onlyWarning: false,
      sortBy: "",

      // list UNIQUE utk dropdown
      upbjjList: [...new Set(dataBahanAjar.map((i) => i.upbjj))],
      kategoriList: [...new Set(dataBahanAjar.map((i) => i.kategori))],

      // FORM TAMBAH DATA
      newItem: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: null,
        safety: null,
        catatanHTML: "",
      },
    };
  },
  computed: {
    filteredData() {
      return this.dataAsli
        .filter(i => !this.selectedUpbjj || i.upbjj === this.selectedUpbjj)
        .filter(i => !this.selectedKategori || i.kategori === this.selectedKategori)
        .filter(i => !this.onlyWarning || i.qty < i.safety || i.qty == 0)
        .sort((a, b) => {
          if (!this.sortBy) return 0;
          return a[this.sortBy] > b[this.sortBy] ? 1 : -1;
        });
    }
  },
  methods: {
    resetFilter() {
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.onlyWarning = false;
      this.sortBy = "";
    },

    // 🔥 PERBAIKAN SESUAI TUGAS: STATUS STOK (AMAN / MENIPIS / KOSONG)
    getStatus(item) {
      if (item.qty === 0) {
        return `<span class="status-kosong">⚠ KOSONG</span>`;
      } else if (item.qty < item.safety) {
        return `<span class="status-menipis">⚠ MENIPIS</span>`;
      } else {
        return `<span class="status-aman">✔ AMAN</span>`;
      }
    },

    // TAMBAH DATA
    tambahBaris() {
      if (
        !this.newItem.kode ||
        !this.newItem.judul ||
        !this.newItem.kategori ||
        !this.newItem.upbjj ||
        !this.newItem.lokasiRak ||
        this.newItem.qty === null ||
        this.newItem.safety === null
      ) {
        alert("Semua kolom wajib diisi!");
        return;
      }

      this.dataAsli.push({ ...this.newItem }); 

      // RESET FORM
      this.newItem = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: null,
        safety: null,
        catatanHTML: "",
      };

      closeModal(); 
    }
  }
});

app.mount("#app");
