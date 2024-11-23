// Elementlarni olish
const button = document.getElementById("action-button");
const animationContainer = document.getElementById("animation-container");
const scoreElement = document.getElementById("score");
const energyElement = document.getElementById("energy");
const levelElement = document.getElementById("level");
const nextLevelElement = document.getElementById("next-level");

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
  { plus_score: 2, max_score: 5000, energy_limit: 1500 },
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

// Levelga qarab ballarni yangilash
function updateLevel() {
  const level = levels.find((level) => score <= level.max_score);
  levelElement.textContent = level.plus_score;
  nextLevelElement.textContent = level.max_score;
}

// Progress bar yaratish va yangilash
const progressBar = document.getElementById("progress-bar");
const progressBarFill = document.getElementById("progress-bar-fill");

function updateProgressBar() {
  const level = levels.find((level) => score <= level.max_score);
  const progress = (score / level.max_score) * 100;
  progressBarFill.style.width = `${progress}%`;
}

// Sahifa yuklanganda Progress Barni tiklash
window.addEventListener("load", () => {
  updateProgressBar(); // Sahifa yuklanganda Progress Barni yangilash
  updateLevel(); // Levelni yangilash
});

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
    console.log("Score: ", score);
    console.log("Level Max Score: ", level.max_score);
    console.log("Energy Limit: ", energyLimit);
    console.log("Level Energy Limit: ", level.energy_limit);
    if (score >= level.max_score && energyLimit <= level.energy_limit) {
      console.log("kirdi");
      plus_score = level.plus_score + 1; // Ball qiymatini o'zgartirish
      energyLimit = level.energy_limit + 500; // Energiya limitini yangilash
      energyRechargeInterval = Math.max(
        energyRechargeInterval - 1000 * (index + 1),
        1000
      ); // Energiya tiklanish intervalini qisqartirish

      // Intervalni yangilash
      clearInterval(rechargeInterval);
      rechargeInterval = setInterval(rechargeEnergy, energyRechargeInterval);

      // LocalStorage'ni yangilash
      localStorage.setItem("plus_score", plus_score);
      localStorage.setItem("energy_limit", energyLimit);
      localStorage.setItem("energy_recharge_interval", energyRechargeInterval);
    }
    updateLevel();
    // Progress barni yangilash
    updateProgressBar();
  });

  // LocalStorage'ni yangilash
  localStorage.setItem("score", score);

  // Animatsiya tugagach, elementni o'chirish
  numberElement.addEventListener("animationend", () => {
    numberElement.remove();
  });
});
