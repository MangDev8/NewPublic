document.getElementById("upload").addEventListener("change", async function(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Pilih gambar terlebih dahulu!");
    return;
  }
  
  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");
  
  document.getElementById("loading").style.display = "block";
  
  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "ipx4EavpqVrD92mJk9AhHQUm" // Ganti dengan API Key kamu
      },
      body: formData
    });
    
    if (!response.ok) {
      alert("Gagal menghapus background. Coba API key lain.");
      document.getElementById("loading").style.display = "none";
      return;
    }
    
    const blob = await response.blob();
    console.log("Blob hasil:", blob);
    
    document.getElementById("loading").style.display = "none";
    
    const resultURL = URL.createObjectURL(blob);
    console.log("URL hasil:", resultURL);
    
    document.getElementById("result-image").src = resultURL;
    document.getElementById("result-section").style.display = "block";
    
    // Pastikan tombol download bisa bekerja
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.style.display = "block"; // Tampilkan tombol download jika belum terlihat
    downloadBtn.onclick = function() {
      const a = document.createElement("a");
      a.href = resultURL;
      a.download = "gambar-tanpa-bg.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    
  } catch (error) {
    alert("Terjadi kesalahan. Coba lagi nanti.");
    console.error("Error:", error);
    document.getElementById("loading").style.display = "none";
  }
});


function updateProgressBar(percent) {
  let progressBar = document.getElementById("progress-bar");
  let progressText = document.getElementById("progress-text");
  
  progressBar.style.width = percent + "%"; // Update lebar progress bar
  progressText.innerText = percent + "%"; // Update teks persentase
}

// Simulasi proses upload dengan setInterval
function startUploadSimulation() {
  let progress = 0;
  updateProgressBar(progress); // Set awal 0%
  
  let interval = setInterval(() => {
    progress += 10; // Tambah 10% setiap interval
    updateProgressBar(progress);
    
    if (progress >= 100) {
      clearInterval(interval);
      alert("Upload selesai!"); // Notifikasi jika sudah 100%
    }
  }, 500); // Update setiap 0.5 detik
}

// Event listener untuk tombol upload
document.getElementById("upload-btn").addEventListener("click", () => {
  startUploadSimulation();
});