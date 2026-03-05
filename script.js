function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

/* ===== AUTOMATIC SLIDESHOW ===== */

let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";

  if (dots.length === slides.length) {
    dots[slideIndex - 1].classList.add("active");
  }

  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides();
});

/* ===== GALLERY SLIDESHOW ===== */

let gallerySlideIndex = 1;

function plusGallerySlides(n) {
  showGallerySlides(gallerySlideIndex += n);
}

function currentGallerySlide(n) {
  showGallerySlides(gallerySlideIndex = n);
}

function showGallerySlides(n) {
  const slides = document.getElementsByClassName("gallery-slide");
  const thumbs = document.querySelectorAll(".thumb-column img");
  const captionText = document.getElementById("gallery-caption");

  if (slides.length === 0) return;

  if (n > slides.length) gallerySlideIndex = 1;
  if (n < 1) gallerySlideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  thumbs.forEach(img => img.classList.remove("active-thumb"));

  slides[gallerySlideIndex - 1].style.display = "block";

  if (thumbs.length === slides.length) {
    thumbs[gallerySlideIndex - 1].classList.add("active-thumb");
  }

  if (captionText && thumbs[gallerySlideIndex - 1]) {
    captionText.textContent = thumbs[gallerySlideIndex - 1].alt;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showGallerySlides(gallerySlideIndex);
});
/* ===== NAVIGATION MENU ===== */
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}


/* ===== GAME VARIABLES ===== */
let score = 0;
let timeLeft = 30;
let timer = null;
let gameActive = false;

const correctIngredients = [
    "pasta",
    "bacon",
    "cream",
    "egg",
    "cheese",
    "pepper"
];


/* ===== START GAME ===== */
function startGame() {

    clearInterval(timer);
    gameActive = true;
    score = 0;
    timeLeft = 30;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = timeLeft;

    document.getElementById("gameOverScreen").style.display = "none";

    const buttons = document.querySelectorAll(".ingredients button");
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}


/* ===== CHECK INGREDIENT ===== */
function checkIngredient(event, item) {

    if (!gameActive) return;

    const clickedButton = event.target;

    if (correctIngredients.includes(item)) {
        score += 10;
        clickedButton.classList.add("correct");
    } else {
        score -= 5;
        clickedButton.classList.add("wrong");
    }

    clickedButton.disabled = true;
    document.getElementById("score").innerText = score;
}


/* ===== END GAME ===== */
function endGame() {

    clearInterval(timer);
    gameActive = false;

    const buttons = document.querySelectorAll(".ingredients button");
    buttons.forEach(btn => btn.disabled = true);

    let message = "";

    if (score >= 50) {
        message = "🎉 Congratulations! You successfully made Carbonara!";
    } else {
        message = "❌ Time's up! Try again to complete the recipe.";
    }

    document.getElementById("finalMessage").innerText = message;
    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOverScreen").style.display = "flex";
}


/* ===== CLOSE GAME OVER SCREEN ===== */
function closeGameOver() {
    document.getElementById("gameOverScreen").style.display = "none";
}