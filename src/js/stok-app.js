// Pastikan dataBahanAjar tersedia (dari dataBahanAjar.js)

// Utility formatting
function formatCurrencyRaw(num) {
  if (num === null || num === undefined || isNaN(num)) return "Rp 0";
  // simple thousand separator
  return "Rp " + Number(num).toLocaleString("id-ID");
}
function formatQtyRaw(num) {
  if (num === null || num === undefined || isNaN(num)) return "0 buah";
  return `${num} buah`;
}

const app = Vue.createApp({
  data() {
    return {
      dataAsli: Array.isArray(dataBahanAjar) ? dataBahanAjar : [],
      selectedUpbjj: "",
      selectedKategori: "",
      filterMenipis: false,
      filterHabis: false,
      sortBy: "",
      showModal: false,
      isEditing: false,
      editingIndex: null,
      form: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: null,
        qty: null,
        safety: null,
        catatanHTML: "",
      },
      tooltip: { visible: false, x: 0, y: 0, html: "" },
      dropdownOpen: false,
    };
  },
  computed: {
    // unique lists
    upbjjList() {
      return [...new Set(this.dataAsli.map((i) => i.upbjj).filter(Boolean))];
    },
    kategoriList() {
      return [...new Set(this.dataAsli.map((i) => i.kategori).filter(Boolean))];
    },
    // categories limited to selectedUpbjj (dependent options)
    kategoriListForSelectedUpbjj() {
      if (!this.selectedUpbjj) return this.kategoriList;
      return [
        ...new Set(
          this.dataAsli
            .filter((i) => i.upbjj === this.selectedUpbjj)
            .map((i) => i.kategori)
        ),
      ];
    },
    filteredData() {
      let result = this.dataAsli.slice();

      // filter UPBJJ
      if (this.selectedUpbjj) {
        result = result.filter((i) => i.upbjj === this.selectedUpbjj);
      }

      // filter kategori
      if (this.selectedKategori) {
        result = result.filter((i) => i.kategori === this.selectedKategori);
      }

      // filter stok menipis
      if (this.filterMenipis) {
        result = result.filter((i) => i.qty > 0 && i.qty <= i.safety);
      }

      // filter stok habis
      if (this.filterHabis) {
        result = result.filter((i) => i.qty === 0);
      }

      // sorting
      if (this.sortBy) {
        result.sort((a, b) => {
          if (this.sortBy === "judul")
            return (a.judul || "").localeCompare(b.judul || "");
          if (this.sortBy === "qty")
            return (Number(a.qty) || 0) - (Number(b.qty) || 0);
          if (this.sortBy === "harga")
            return (Number(a.harga) || 0) - (Number(b.harga) || 0);
          return 0;
        });
      }

      return result;
    },
  },
  methods: {
    resetFilter() {
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.onlyWarning = false;
      this.sortBy = "";
    },

    formatCurrency(v) {
      return formatCurrencyRaw(v);
    },
    formatQty(v) {
      return formatQtyRaw(v);
    },

    getStatusHtml(item) {
      if (item.qty === 0) {
        return `<span class="status-kosong">⚠ KOSONG</span>`;
      } else if (item.qty < item.safety) {
        return `<span class="status-menipis">⚠ MENIPIS</span>`;
      } else {
        return `<span class="status-aman">✔ AMAN</span>`;
      }
    },

    // tooltip preview for catatanHTML
    showNotePreview(evt, html) {
      if (!html) return;
      const offsetX = 12;
      const offsetY = 12;
      this.tooltip.html = html;
      this.tooltip.x = evt.clientX + offsetX;
      this.tooltip.y = evt.clientY + offsetY;
      this.tooltip.visible = true;
    },
    hideNotePreview() {
      this.tooltip.visible = false;
    },

    // open add modal
    openAddModal() {
      this.isEditing = false;
      this.editingIndex = null;
      this.form = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: null,
        qty: null,
        safety: null,
        catatanHTML: "",
      };
      this.showModal = true;
    },

    // open edit modal for index in filteredData -> convert to actual index in dataAsli
    openEditModal(filteredIndex) {
      const item = this.filteredData[filteredIndex];
      if (!item) return;
      // find actual index in dataAsli
      const actualIndex = this.dataAsli.findIndex((i) => i === item);
      if (actualIndex === -1) return;
      this.isEditing = true;
      this.editingIndex = actualIndex;
      this.form = { ...this.dataAsli[actualIndex] };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    // submit form (create or update)
    submitForm() {
      // basic validation
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj ||
        !this.form.lokasiRak
      ) {
        alert("Semua kolom wajib diisi!");
        return;
      }
      if (
        this.form.qty === null ||
        this.form.safety === null ||
        this.form.harga === null
      ) {
        alert("Nilai angka (qty, safety, harga) wajib diisi!");
        return;
      }

      // If editing, update
      if (this.isEditing && Number.isInteger(this.editingIndex)) {
        // prevent duplicate kode (unless same item)
        const dup = this.dataAsli.findIndex(
          (d, idx) => d.kode === this.form.kode && idx !== this.editingIndex
        );
        if (dup !== -1) {
          alert("Kode sudah ada pada data lain. Gunakan kode unik.");
          return;
        }
        this.dataAsli.splice(this.editingIndex, 1, { ...this.form });
        this.showModal = false;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        // create: ensure kode unik
        const exists = this.dataAsli.find((d) => d.kode === this.form.kode);
        if (exists) {
          alert("Kode Mata Kuliah sudah ada. Gunakan kode unik.");
          return;
        }
        this.dataAsli.push({ ...this.form });
        this.showModal = false;
      }
    },

    confirmDelete(filteredIndex) {
      const item = this.filteredData[filteredIndex];
      if (!item) return;
      const actualIndex = this.dataAsli.findIndex((i) => i === item);
      if (actualIndex === -1) return;
      const ok = confirm(`Hapus data "${item.judul}" (kode: ${item.kode}) ?`);
      if (ok) {
        this.dataAsli.splice(actualIndex, 1);
      }
    },

    // dropdown toggle (nav)
    toggleDropdown() {
      const el = document.getElementById("laporanDropdown");
      if (!el) return;
      el.style.display = el.style.display === "block" ? "none" : "block";
    },
  },
});

app.mount("#app");
