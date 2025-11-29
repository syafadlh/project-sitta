const { createApp } = Vue;

createApp({
    data() {
        return {
            // Data untuk pencarian
            searchNoDO: '',
            searchNIM: '',
            searchPerformed: false,
            
            // Data untuk DO baru
            newDO: {
                noDO: '',
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: null,
                tanggalKirim: this.getCurrentDate(),
                totalHarga: 0
            },
            
            // Data untuk progress tracking
            progressForms: {},
            
            // Error handling
            nimError: '',
            
            // Data master
            paketList: [
                { kode: 'PKT001', nama: 'Paket Ekonomi', isi: 'Buku Ajar Ekonomi, Modul, Soal Latihan', harga: 150000 },
                { kode: 'PKT002', nama: 'Paket Manajemen', isi: 'Buku Manajemen, Studi Kasus, Modul', harga: 200000 },
                { kode: 'PKT003', nama: 'Paket Teknik', isi: 'Buku Teknik, Panduan Praktikum, Modul', harga: 250000 },
                { kode: 'PKT004', nama: 'Paket Komputer', isi: 'Buku Pemrograman, Modul, CD Tutorial', harga: 300000 }
            ],
            
            // Data DO (simulasi database)
            deliveryOrders: [
                {
                    noDO: 'DO2025-001',
                    nim: '123456789',
                    nama: 'Ahmad Fauzi',
                    ekspedisi: 'JNE Regular',
                    paket: { kode: 'PKT001', nama: 'Paket Ekonomi', isi: 'Buku Ajar Ekonomi, Modul, Soal Latihan', harga: 150000 },
                    tanggalKirim: '2025-03-15',
                    totalHarga: 150000,
                    status: 'Dikirim',
                    progress: [
                        { waktu: new Date('2025-03-15T08:00:00'), keterangan: 'Pesanan diterima' },
                        { waktu: new Date('2025-03-15T10:30:00'), keterangan: 'Pesanan diproses' },
                        { waktu: new Date('2025-03-16T09:15:00'), keterangan: 'Pesanan dikirim' }
                    ]
                },
                {
                    noDO: 'DO2025-002',
                    nim: '987654321',
                    nama: 'Siti Rahma',
                    ekspedisi: 'JNE Express',
                    paket: { kode: 'PKT003', nama: 'Paket Teknik', isi: 'Buku Teknik, Panduan Praktikum, Modul', harga: 250000 },
                    tanggalKirim: '2025-03-10',
                    totalHarga: 250000,
                    status: 'Selesai',
                    progress: [
                        { waktu: new Date('2025-03-10T09:00:00'), keterangan: 'Pesanan diterima' },
                        { waktu: new Date('2025-03-10T11:45:00'), keterangan: 'Pesanan diproses' },
                        { waktu: new Date('2025-03-11T08:30:00'), keterangan: 'Pesanan dikirim' },
                        { waktu: new Date('2025-03-12T14:20:00'), keterangan: 'Pesanan diterima mahasiswa' }
                    ]
                }
            ],
            
            // Hasil pencarian
            searchResults: []
        };
    },
    
    computed: {
        // Generate nomor DO otomatis
        generatedNoDO() {
            const year = new Date().getFullYear();
            const sequence = this.deliveryOrders.length + 1;
            return `DO${year}-${sequence.toString().padStart(3, '0')}`;
        },
        
        // Detail paket yang dipilih
        paketDetail() {
            return this.newDO.paket;
        },
        
        // Format total harga dengan currency
        totalHargaFormatted() {
            return this.formatCurrency(this.newDO.totalHarga);
        }
    },
    
    mounted() {
        // Set nomor DO otomatis saat komponen dimuat
        this.newDO.noDO = this.generatedNoDO;
    },
    
    methods: {
        // Pencarian DO berdasarkan nomor DO atau NIM
        searchDO() {
 this.searchPerformed = true;

    const searchNo = this.searchNoDO.trim().toLowerCase();
    const searchNim = this.searchNIM.trim();

    if (!searchNo && !searchNim) {
        this.searchResults = [];
        return;
    }

    this.searchResults = this.deliveryOrders.filter(doItem => {
        const matchesNoDO = searchNo && doItem.noDO.toLowerCase().includes(searchNo);
        const matchesNIM = searchNim && doItem.nim.includes(searchNim);
        return matchesNoDO || matchesNIM;
    });
        },
        
        // Reset pencarian
        resetSearch() {
            this.searchNoDO = '';
            this.searchNIM = '';
            this.searchResults = [];
            this.searchPerformed = false;
        },
        
        // Validasi NIM
        validateNIM() {
            if (this.newDO.nim && !/^\d+$/.test(this.newDO.nim)) {
                this.nimError = 'NIM harus berupa angka';
            } else {
                this.nimError = '';
            }
        },
        
        // Update detail paket saat paket dipilih
        updatePaketDetail() {
            if (this.newDO.paket) {
                this.newDO.totalHarga = this.newDO.paket.harga;
            } else {
                this.newDO.totalHarga = 0;
            }
        },
        
        // Tambah DO baru
        addNewDO() {
            // Validasi form
            if (!this.newDO.nim || !this.newDO.nama || !this.newDO.ekspedisi || !this.newDO.paket || !this.newDO.tanggalKirim) {
                alert('Harap lengkapi semua field yang wajib diisi');
                return;
            }
            
            if (this.nimError) {
                alert('Harap perbaiki error sebelum menyimpan');
                return;
            }
            
            // Buat DO baru
            const newDeliveryOrder = {
                noDO: this.newDO.noDO,
                nim: this.newDO.nim,
                nama: this.newDO.nama,
                ekspedisi: this.newDO.ekspedisi,
                paket: this.newDO.paket,
                tanggalKirim: this.newDO.tanggalKirim,
                totalHarga: this.newDO.totalHarga,
                status: 'Diproses',
                progress: [
                    { 
                        waktu: new Date(), 
                        keterangan: 'Pesanan dibuat' 
                    }
                ]
            };
            
            // Tambahkan ke data
            this.deliveryOrders.push(newDeliveryOrder);
            
            // Reset form
            this.resetForm();
            
            // Tampilkan pesan sukses
            alert('Delivery Order berhasil ditambahkan');
        },
        
        // Reset form DO baru
        resetForm() {
            this.newDO = {
                noDO: this.generatedNoDO,
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: null,
                tanggalKirim: this.getCurrentDate(),
                totalHarga: 0
            };
            this.nimError = '';
        },
        
        // Tambah progress tracking
        addProgress(noDO) {
            const keterangan = this.progressForms[noDO];
            if (!keterangan) {
                alert('Harap isi keterangan progress');
                return;
            }
            
            const doItem = this.deliveryOrders.find(item => item.noDO === noDO);
            if (doItem) {
                doItem.progress.push({
                    waktu: new Date(),
                    keterangan: keterangan
                });
                
                // Update status berdasarkan progress terakhir
                if (keterangan.toLowerCase().includes('selesai') || keterangan.toLowerCase().includes('diterima')) {
                    doItem.status = 'Selesai';
                } else if (keterangan.toLowerCase().includes('dikirim')) {
                    doItem.status = 'Dikirim';
                }
                
                // Reset form progress
                this.progressForms[noDO] = '';
            }
        },
        
        // Format tanggal untuk tampilan
        formatTanggal(tanggal) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return new Date(tanggal).toLocaleDateString('id-ID', options);
        },
        
        // Format waktu untuk progress
        formatWaktu(waktu) {
            const date = new Date(waktu);
            return date.toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        
        // Format currency
        formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(amount);
        },
        
        // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        
        // Dapatkan class untuk status badge
        getStatusClass(status) {
            switch(status) {
                case 'Diproses': return 'status-diproses';
                case 'Dikirim': return 'status-dikirim';
                case 'Selesai': return 'status-selesai';
                default: return '';
            }
        },
        
        // Dapatkan icon untuk status
        getStatusIcon(status) {
            switch(status) {
                case 'Diproses': return 'fas fa-cog';
                case 'Dikirim': return 'fas fa-shipping-fast';
                case 'Selesai': return 'fas fa-check-circle';
                default: return 'fas fa-info-circle';
            }
        }
    }
}).mount('#app');