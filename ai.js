function processImageOnCanvas(imageElement) {
  const ctx = canvasElement.getContext('2d');
  if (!ctx) return;

  // 1. Sesuaikan ukuran canvas dengan gambar
  canvasElement.width = imageElement.naturalWidth;
  canvasElement.height = imageElement.naturalHeight;

  // 2. Gambar ke dalam canvas
  ctx.drawImage(imageElement, 0, 0);

  // 3. Ambil data piksel mentah (RGBA)
  const imgData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
  const data = imgData.data;

  // 4. Lakukan looping per piksel untuk Grayscale & Threshold
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Rumus Grayscale (Luminosity)
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

    // Rumus Threshold (Hitam atau Putih)
    const finalVal = gray >= thresholdValue ? 255 : 0;

    data[i]     = finalVal; // Red
    data[i + 1] = finalVal; // Green
    data[i + 2] = finalVal; // Blue
    // data[i + 3] adalah Alpha (transparansi), biarkan tetap
  }

  // 5. Kembalikan data piksel yang sudah diubah ke canvas
  ctx.putImageData(imgData, 0, 0);
}


// Membuat objek URL dari data Blob
const imageUrl = URL.createObjectURL(blobData);
const img = new Image();

img.onload = function() {
  // Blok ini berfungsi untuk menyesuaikan dimensi elemen kanvas agar sama persis dengan ukuran gambar asli
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // Blok ini berfungsi untuk merender atau menggambar piksel dari objek gambar ke dalam konteks dua dimensi kanvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Membersihkan memori URL objek setelah gambar berhasil dimuat
  URL.revokeObjectURL(imageUrl);
  
  // Canvas siap digunakan untuk image processing
};

img.src = imageUrl;