// Elementlarni olish
const button = document.getElementById("action-button");
const animationContainer = document.getElementById("animation-container");
const scoreElement = document.getElementById("score");
const energyElement = document.getElementById("energy");

// LocalStorage'dan ball, plus_score va energiyani olish yoki standart qiymatlarni belgilash
let score = parseInt(localStorage.getItem("score")) || 0;
let plus_score = parseInt(localStorage.getItem("plus_score")) || 1;
let energy = parseInt(localStorage.getItem("energy")) || 500;
let energyLimit = parseInt(localStorage.getItem("energy_limit")) || 500; // Energy limit
let energyRechargeInterval =
  parseInt(localStorage.getItem("energy_recharge_interval")) || 5000;

scoreElement.textContent = score;
energyElement.textContent = energy;

// Energiya qayta tiklash funksiyasi
function rechargeEnergy() {
  if (energy < energyLimit) {
    energy = energy + plus_score;
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
  energy = Math.max(0, energy - plus_score); // Energiya 0 dan kam bo'lmasligi kerak
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
  if (score >= 500 && energyLimit === 500) {
    plus_score = 3; // Ballni oshirish qiymati
    energyLimit = 15; // Maksimal energiyani oshirish
    energy = Math.min(energy + 5, energyLimit); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 2000, 1000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("energy_limit", energyLimit);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }
  // Ball 1000 ga yetganda yoki oshganda energiyani oshirish
  else if (score >= 1000 && energyLimit === 15) {
    plus_score = 4; // Ballni oshirish qiymati
    energyLimit = 20; // Maksimal energiyani oshirish
    energy = Math.min(energy + 10, energyLimit); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 3000, 2000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("energy_limit", energyLimit);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }
  // Ball 2000 ga yetganda yoki oshganda energiyani oshirish
  else if (score >= 2000 && energyLimit === 20) {
    plus_score = 5; // Ballni oshirish qiymati
    energyLimit = 30; // Maksimal energiyani oshirish
    energy = Math.min(energy + 15, energyLimit); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 4000, 3000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("energy_limit", energyLimit);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }
  // Ball 5000 ga yetganda yoki oshganda energiyani oshirish
  else if (score >= 5000 && energyLimit === 30) {
    plus_score = 6; // Ballni oshirish qiymati
    energyLimit = 40; // Maksimal energiyani oshirish
    energy = Math.min(energy + 20, energyLimit); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 5000, 4000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("energy_limit", energyLimit);
    localStorage.setItem("energy", energy);
    localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
  }
  // Ball 10000 ga yetganda yoki oshganda energiyani oshirish
  else if (score >= 10000 && energyLimit === 40) {
    plus_score = 7; // Ballni oshirish qiymati
    energyLimit = 50; // Maksimal energiyani oshirish
    energy = Math.min(energy + 25, energyLimit); // Energiya miqdorini oshirish
    energyRechargeInterval = Math.max(energyRechargeInterval - 6000, 5000); // Qayta tiklanish tezligini oshirish

    // Intervalni yangilash
    clearInterval(rechargeInterval);
    rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

    // LocalStorage'ni yangilash
    localStorage.setItem("plus_score", plus_score);
    localStorage.setItem("energy_limit", energyLimit);
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
