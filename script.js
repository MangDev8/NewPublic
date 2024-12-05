document.getElementById("upload-btn").addEventListener("click", () => {
  document.getElementById("upload").click();
});

document.getElementById("upload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Tampilkan animasi loading
  showLoading();

  // Simulasi progress bar
  await simulateProgressBar();

  // Proses upload file
  displayResult(file);
});

// Menampilkan animasi loading
function showLoading() {
  const loading = document.getElementById("loading");
  const progressBar = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  loading.style.display = "block";
  progressBar.style.width = "0";
  progressText.textContent = "0%";
}

// Simulasi progress bar
function simulateProgressBar() {
  return new Promise((resolve) => {
    let progress = 0;
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");

    const interval = setInterval(() => {
      if (progress < 90) {
        progress += 10;
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

// Menampilkan hasil
function displayResult(file) {
  const loading = document.getElementById("loading");
  const resultSection = document.getElementById("result-section");
  const resultImage = document.getElementById("result-image");

  setTimeout(() => {
    loading.style.display = "none";
    resultImage.src = URL.createObjectURL(file);
    resultSection.style.display = "block";
  }, 1000);
}

// Tombol untuk meningkatkan kualitas HD
document.getElementById("hd-btn").addEventListener("click", () => {
  const img = document.getElementById("result-image");
  const canvas = document.getElementById("hd-canvas");
  const ctx = canvas.getContext("2d");

  const hdWidth = img.naturalWidth * 2;
  const hdHeight = img.naturalHeight * 2;

  canvas.width = hdWidth;
  canvas.height = hdHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, hdWidth, hdHeight);

  img.src = canvas.toDataURL("image/png");
  alert("Gambar berhasil ditingkatkan ke HD!");
});

// Tombol untuk menghapus background
document.getElementById("remove-bg-btn").addEventListener("click", async () => {
  const file = document.getElementById("upload").files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const apiKey = "ipx4EavpqVrD92mJk9AhHQUm";

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      document.getElementById("result-image").src = url;
      document.getElementById("result-section").style.display = "block";

      document.getElementById("download-btn").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = url;
        a.download = "hasil-remove-bg.png";
        a.click();
      });
    } else {
      alert("Gagal menghapus background. Silakan coba lagi.");
    }
  } catch (error) {
    alert("Terjadi kesalahan. Coba lagi nanti.");
  }
});

// Tombol untuk download gambar
document.getElementById("download-btn").addEventListener("click", () => {
  const img = document.getElementById("result-image");
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "gambar-hd.png";
  link.click();
});