const app = Vue.createApp({
  data() {
    return {
      inputDO: "",
      hasil: null,
      dataTracking: trackingData,
      ekspedisiList: ekspedisiList,
      paketList: paketBahanAjar,
      newDO: { nim: "", nama: "", ekspedisi: "", paket: "", tanggalKirim: "" },
    };
  },

  computed: {
    paketDipilih() {
      return this.paketList.find(p => p.kode === this.newDO.paket);
    },
    nextDO() {
      const tahun = new Date().getFullYear();
      const urutan = this.dataTracking.length + 1;
      return `DO${tahun}-${String(urutan).padStart(3, "0")}`;
    },
  },

  methods: {
    cariDO() {
  this.hasil = this.dataTracking.find(d => d.noDO === this.inputDO);
},


    tambahTracking() {
      if (!this.newDO.nim || !this.newDO.nama || !this.newDO.ekspedisi || !this.newDO.paket) {
        alert("Semua field harus diisi!");
        return;
      }

      const paket = this.paketList.find(p => p.kode === this.newDO.paket);

      this.dataTracking.push({
        noDO: this.nextDO,
        nim: this.newDO.nim,
        nama: this.newDO.nama,
        ekspedisi: this.newDO.ekspedisi,
        totalHarga: paket ? paket.harga : 0,
        asal: "UPBJJ",
        tujuan: "Alamat Mahasiswa",
        alamat: "Belum Diisi",
        tanggal: this.newDO.tanggalKirim || new Date().toISOString().split("T")[0],
        waktu: new Date().toTimeString().split(" ")[0],
        perjalanan: [],
      });

      alert(`DO baru berhasil disimpan: ${this.nextDO}`);
      this.newDO = { nim: "", nama: "", ekspedisi: "", paket: "", tanggalKirim: "" };
    }
  }
});

app.mount("#app");
