function createSeoUrl(title, id) {
    return (
      title
        .toLowerCase() // Küçük harfe çevir
        .replace(/ğ/g, "g") // Türkçe karakterleri düzelt
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "") // Harf, rakam, boşluk ve tire dışında her şeyi sil
        .trim() // Baştaki ve sondaki boşlukları sil
        .replace(/\s+/g, "-") // Boşlukları tire ile değiştir
        + "-" +
        id // Sonuna ID ekle
    );
  }
  
export default createSeoUrl;
  