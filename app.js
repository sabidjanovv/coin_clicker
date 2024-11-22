// Elementlarni olish
const button = document.getElementById("action-button");
const animationContainer = document.getElementById("animation-container");
const scoreElement = document.getElementById("score");
const energyElement = document.getElementById("energy");

// LocalStorage'dan ball, plus_score va energiyani olish yoki standart qiymatlarni belgilash
let score = parseInt(localStorage.getItem("score")) || 0;
let plus_score = parseInt(localStorage.getItem("plus_score")) || 1;
let energy = parseInt(localStorage.getItem("energy")) || 10;
let maxEnergy = parseInt(localStorage.getItem("max_energy")) || 10;
let energyRechargeInterval =
  parseInt(localStorage.getItem("energy_recharge_interval")) || 5000;

scoreElement.textContent = score;
energyElement.textContent = energy;

// Energiya qayta tiklash funksiyasi
function rechargeEnergy() {
  if (energy < maxEnergy) {
    energy++;
    energyElement.textContent = energy;
    localStorage.setItem("energy", energy);
  }
}

// Energiya qayta tiklash uchun intervalni sozlash
let rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

// Tugma bosilganda ishlovchi kod
button.addEventListener("click", (event) => {
  if (energy <= 0) {
    alert("Energiya tugadi! Qayta tiklanishini kuting.");
    return;
  }

  // Energiya kamaytirish
  energy--;
  energyElement.textContent = energy;
  localStorage.setItem("energy", energy);

  // Raqamli element yaratish
  const numberElement = document.createElement("div");
  numberElement.classList.add("number");
  numberElement.textContent = `+${plus_score}`;

  // Tugma bosilgan joyni aniqlash
  const { left, top } = button.getBoundingClientRect();
  numberElement.style.left = `${event.clientX - left}px`;
  numberElement.style.top = `${event.clientY - top}px`;
  animationContainer.appendChild(numberElement);

  // Ballni yangilash
  score += plus_score;
  scoreElement.textContent = score;

  // Ball 500 ga yetganda yoki oshganda energiyani oshirish
  if (score >= 500 && maxEnergy === 10) {
    // Bir marta ishlashi uchun maxEnergy tekshiriladi
    plus_score = 3; // Ballni oshirish qiymati
    maxEnergy = 15; // Maksimal energiyani oshirish
    energy = Math.min(energy + 5, maxEnergy); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 2000, 1000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("max_energy", maxEnergy);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }
  else if(score >= 1000 && maxEnergy === 15){
    // Birinchi marta ishlashi uchun maxEnergy tekshiriladi
    plus_score = 1; // Ballni oshirish qiymati
    maxEnergy = 20; // Maksimal energiyani oshirish
    energy = Math.min(energy + 10, maxEnergy); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 3000, 2000); // Qayta tiklanish tezligini oshirish
    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);
    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("max_energy", maxEnergy);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }

  // LocalStorage'ni yangilash
  localStorage.setItem("score", score);

  // Animatsiya tugagach, elementni o'chirish
  numberElement.addEventListener("animationend", () => {
    numberElement.remove();
  });
});
