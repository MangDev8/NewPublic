document.getElementById("upload-btn").addEventListener("click", function() {
  document.getElementById("upload").click();
});

document.getElementById("upload").addEventListener("change", async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Tampilkan loading
  const loading = document.getElementById("loading");
  const progressBar = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");
  loading.style.display = "block";
  progressBar.style.width = "0";
  progressText.textContent = "0%";

  // Simulasi progress
  let progress = 0;
  const simulateProgress = setInterval(() => {
    if (progress < 90) {
      progress += 10;
      progressBar.style.width = progress + "%";
      progressText.textContent = progress + "%";
    } else {
      clearInterval(simulateProgress);
    }
  }, 500);

  // Simulasi API remove.bg (ganti dengan API asli jika ada)
  setTimeout(() => {
    clearInterval(simulateProgress);
    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    setTimeout(() => {
      loading.style.display = "none";
      document.getElementById("result-image").src = URL.createObjectURL(file);
      document.getElementById("result-section").style.display = "block";
    }, 1000);
  }, 4000);
});

document.getElementById('hd-btn').addEventListener('click', () => {
  const img = document.getElementById('result-image');
  const canvas = document.getElementById('hd-canvas');
  const ctx = canvas.getContext('2d');

  // Set ukuran HD
  const hdWidth = img.naturalWidth * 2; // Perbesar 2x resolusi asli
  const hdHeight = img.naturalHeight * 2;

  // Set ukuran canvas
  canvas.width = hdWidth;
  canvas.height = hdHeight;

  // Proses peningkatan kualitas menggunakan interpolasi
  ctx.imageSmoothingEnabled = true; // Mengaktifkan interpolasi
  ctx.imageSmoothingQuality = 'high'; // Kualitas interpolasi tinggi
  ctx.drawImage(img, 0, 0, hdWidth, hdHeight);

  // Tampilkan hasil HD di elemen <img>
  const hdImageURL = canvas.toDataURL('image/png');
  img.src = hdImageURL;

  // Tampilkan pesan berhasil
  alert('Gambar berhasil ditingkatkan ke  HD!');
});

document.getElementById('remove-bg-btn').addEventListener('click', async () => {
  const file = document.getElementById('upload').files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const apiKey = "ipx4EavpqVrD92mJk9AhHQUm"; // Masukkan API Key Remove.bg
  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Tampilkan hasil
    document.getElementById("result-image").src = url;
    document.getElementById("result-section").style.display = "block";

    // Tombol untuk download
    document.getElementById("download-btn").addEventListener("click", function() {
      const a = document.createElement("a");
      a.href = url;
      a.download = "hasil-remove-bg.png";
      a.click();
    });

    // Peningkatan kualitas gambar HD
    document.getElementById("hd-btn").addEventListener("click", function() {
      alert("Fitur HD sedang diterapkan!");
    });
  } else {
    alert("Gagal menghapus background. Coba lagi!");
  }
});

document.getElementById('download-btn').addEventListener('click', () => {
  const img = document.getElementById('result-image');
  const link = document.createElement('a');
  link.href = img.src; // URL gambar hasil
  link.download = 'gambar-hd.png'; // Nama file yang diunduh
  link.click();
});



// Script untuk mengatur gambar dan perbandingan
document.getElementById('upload-btn').addEventListener('click', function() {
  document.getElementById('upload').click();
});

document.getElementById('upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = document.createElement('img');
      img.src = event.target.result;

      // Set gambar sebelum
      document.getElementById('before-image').src = event.target.result;
      document.getElementById('before-image').style.display = 'block';

      // Gambar hasil setelah remove bg & HD atau HD
      // Misalnya, gambar setelah remove BG diatur setelah diproses
      document.getElementById('result-image').src = event.target.result; // Ganti dengan gambar hasil
      document.getElementById('result-image').style.display = 'block';

      document.getElementById('result-section').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});