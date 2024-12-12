

function fuzzifikasiHarga(harga) {
    if (harga <= 5) return "murah";
    if (harga > 5 && harga <= 10) return "sedang";
    return "mahal";
}

function fuzzifikasiProsesor(prosesor) {
    if (prosesor <= 2) return "lemah";
    if (prosesor > 2 && prosesor <= 3.5) return "sedang";
    return "kuat";
}

function fuzzifikasiRAM(ram) {
    if (ram <= 4) return "kecil";
    if (ram > 4 && ram <= 8) return "sedang";
    return "besar";
}

function fuzzifikasiPenyimpanan(penyimpanan) {
    if (penyimpanan <= 256) return "kecil";
    if (penyimpanan > 256 && penyimpanan <= 512) return "sedang";
    return "besar";
}

function fuzzifikasiBaterai(baterai) {
    if (baterai <= 5) return "pendek";
    if (baterai > 5 && baterai <= 10) return "sedang";
    return "panjang";
}

function fuzzifikasiBerat(berat) {
    if (berat <= 1.5) return "ringan";
    if (berat > 1.5 && berat <= 2.5) return "sedang";
    return "berat";
}

function inferensiDanDefuzzifikasi(harga, prosesor, ram, penyimpanan, baterai, berat) {
    let rekomendasiSkor;

    if (harga === "murah" && prosesor === "kuat" && ram === "besar" && penyimpanan === "sedang" && baterai === "panjang" && berat === "ringan") {
        rekomendasiSkor = 9;
    } else if (harga === "sedang" && prosesor === "sedang" && ram === "sedang" && penyimpanan === "sedang" && baterai === "sedang" && berat === "sedang") {
        rekomendasiSkor = 7;
    } else if (harga === "mahal" && prosesor === "kuat" && ram === "besar" && penyimpanan === "besar" && baterai === "panjang" && berat === "berat") {
        rekomendasiSkor = 8;
    } else if (harga === "murah" && prosesor === "lemah" && ram === "kecil" && penyimpanan === "kecil" && baterai === "pendek" && berat === "ringan") {
        rekomendasiSkor = 4;
    } else if (harga === "sedang" && prosesor === "kuat" && ram === "besar" && penyimpanan === "besar" && baterai === "panjang" && berat === "berat") {
        rekomendasiSkor = 8;
    } else {
        rekomendasiSkor = 5;
    }

    return rekomendasiSkor;
}

function prosesFuzzy() {
    const harga = parseFloat(document.getElementById("harga").value);
    const prosesor = parseFloat(document.getElementById("prosesor").value);
    const ram = parseFloat(document.getElementById("ram").value);
    const penyimpanan = parseFloat(document.getElementById("penyimpanan").value);
    const baterai = parseFloat(document.getElementById("baterai").value);
    const berat = parseFloat(document.getElementById("berat").value);

    if (isNaN(harga) || isNaN(prosesor) || isNaN(ram) || isNaN(penyimpanan) || isNaN(baterai) || isNaN(berat)) {
        document.getElementById("hasil").innerText = "Harap masukkan semua nilai dengan benar.";
        return;
    }

    const fuzzyHarga = fuzzifikasiHarga(harga);
    const fuzzyProsesor = fuzzifikasiProsesor(prosesor);
    const fuzzyRAM = fuzzifikasiRAM(ram);
    const fuzzyPenyimpanan = fuzzifikasiPenyimpanan(penyimpanan);
    const fuzzyBaterai = fuzzifikasiBaterai(baterai);
    const fuzzyBerat = fuzzifikasiBerat(berat);

    const hasilSkor = inferensiDanDefuzzifikasi(fuzzyHarga, fuzzyProsesor, fuzzyRAM, fuzzyPenyimpanan, fuzzyBaterai, fuzzyBerat);

    const rekomendasiLaptop = laptops.find(laptop => {
        return laptop.harga <= harga && laptop.prosesor >= prosesor && laptop.ram >= ram && laptop.penyimpanan >= penyimpanan && laptop.baterai >= baterai && laptop.berat <= berat;
    });

    if (rekomendasiLaptop) {
        document.getElementById("hasil").innerHTML = `
            <h2>Rekomendasi Laptop</h2>
            <div class="card" style="width: 18rem;">
                <img src="${rekomendasiLaptop.image}" class="card-img-top" alt="${rekomendasiLaptop.model}">
                <div class="card-body">
                    <h5 class="card-title">${rekomendasiLaptop.brand} ${rekomendasiLaptop.model}</h5>
                    <p class="card-text">
                        Harga: ${rekomendasiLaptop.harga} juta<br>
                        Prosesor: ${rekomendasiLaptop.prosesor} GHz<br>
                        RAM: ${rekomendasiLaptop.ram} GB<br>
                        Penyimpanan: ${rekomendasiLaptop.penyimpanan} GB<br>
                        Baterai: ${rekomendasiLaptop.baterai} jam<br>
                        Berat: ${rekomendasiLaptop.berat} kg
                    </p>
                    <a href="${rekomendasiLaptop.link}" class="btn btn-primary" target="_blank">Beli Sekarang</a>
                </div>
            </div>
        `;
    } else {
        document.getElementById("hasil").innerText = "Tidak ada laptop yang memenuhi kriteria.";
    }
}
