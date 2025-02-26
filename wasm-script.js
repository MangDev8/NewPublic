document.getElementById("upload").addEventListener("change", async function(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Pilih gambar terlebih dahulu!");
    return;
  }
  
  const reader = new FileReader();
  reader.onload = async function(e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = async function() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      document.getElementById("loading").style.display = "block";
      
      const removeBg = await loadWasmRemoveBackground();
      const resultBlob = await removeBg(canvas);
      
      document.getElementById("loading").style.display = "none";
      
      const resultURL = URL.createObjectURL(resultBlob);
      document.getElementById("result-image").src = resultURL;
      document.getElementById("result-section").style.display = "block";
      
      document.getElementById("download-btn").onclick = function() {
        const a = document.createElement("a");
        a.href = resultURL;
        a.download = "gambar-tanpa-bg.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    };
  };
  reader.readAsDataURL(file);
});