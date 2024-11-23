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

// Level ma'lumotlari
const levels = [
  { plus_score: 1, max_score: 1000, energy_limit: 1000 },
  { plus_score: 2, max_score: 10000, energy_limit: 1500 },
  { plus_score: 3, max_score: 30000, energy_limit: 2000 },
  { plus_score: 4, max_score: 60000, energy_limit: 2500 },
  { plus_score: 5, max_score: 100000, energy_limit: 3000 },
  { plus_score: 6, max_score: 150000, energy_limit: 3500 },
  { plus_score: 7, max_score: 200000, energy_limit: 4000 },
  { plus_score: 8, max_score: 250000, energy_limit: 4500 },
  { plus_score: 9, max_score: 300000, energy_limit: 5000 },
  { plus_score: 10, max_score: 400000, energy_limit: 6000 },
];

// Energiya qayta tiklash funksiyasi
function rechargeEnergy() {
  if (energy < energyLimit) {
    energy = energy + plus_score;
    energyElement.textContent = energy;
    localStorage.setItem("energy", energy);
  }
}

// Sahifani tark etgan vaqtda so'nggi tashrif vaqtini saqlash
window.addEventListener("beforeunload", () => {
  localStorage.setItem("lastVisitTime", Date.now());
});

// Sahifa ochilganda energiyani yangilash
const lastVisitTime =
  parseInt(localStorage.getItem("lastVisitTime")) || Date.now();
const timeElapsed = Date.now() - lastVisitTime;

// Qancha energiya tiklanganini hisoblash
const energyRecovered =
  Math.floor(timeElapsed / energyRechargeInterval) * plus_score;
energy = Math.min(energy + energyRecovered, energyLimit); // Energiya limitdan oshmasin
energyElement.textContent = energy;

// LocalStorage'ni yangilash
localStorage.setItem("energy", energy);

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

  // Levelga ko'ra energiyani va intervalni yangilash
  levels.forEach((level, index) => {
      if (score >= level.max_score && energyLimit === level.energy_limit) {
      plus_score = level.plus_score + 1; // Ballni oshirish qiymati
      energyLimit = level.energy_limit + 500; // Maksimal energiyani oshirish
      energy = Math.min(energy + level.energy_limit, energyLimit); // Energiya miqdorini oshirish
      energyRechargeInterval = Math.max(
          energyRechargeInterval - 1000 * (index + 1),
          1000
          ); // Qayta tiklanish tezligini oshirish
          console.log(energyRechargeInterval);

      // Intervalni yangilash
      clearInterval(rechargeInterval);
      rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

      // LocalStorage'ni yangilash
      localStorage.setItem("plus_score", plus_score);
      localStorage.setItem("energy_limit", energyLimit);
      localStorage.setItem("energy", energy);
      localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
    }
  });

  // LocalStorage'ni yangilash
  localStorage.setItem("score", score);

  // Animatsiya tugagach, elementni o'chirish
  numberElement.addEventListener("animationend", () => {
    numberElement.remove();
  });
});
