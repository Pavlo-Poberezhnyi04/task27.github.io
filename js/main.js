const slides = document.querySelectorAll(".slides img");
const indicators = document.querySelectorAll(".indicator");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);
document.addEventListener("keydown", handleKeyboardNavigation);
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);

function initializeSlider() {
    if (slides.length > 0) {
        showSlide(slideIndex);
        intervalId = setInterval(nextSlide, 5000); 
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0; 
    } else if (index < 0) {
        slideIndex = slides.length - 1; 
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide"); 
    });
    slides[slideIndex].classList.add("displaySlide"); 

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === slideIndex); 
    });
}

function prevSlide() {
    clearInterval(intervalId); 
    slideIndex--; 
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++; 
    showSlide(slideIndex);
}

function stopSlide() {
    clearInterval(intervalId); 
    intervalId = null; 
}

function startSlide() {
    if (!intervalId) { 
        intervalId = setInterval(nextSlide, 5000); 
    }
}

function goToSlide(index) {
    clearInterval(intervalId); 
    slideIndex = index; 
    showSlide(slideIndex);
}

function handleKeyboardNavigation(event) {
    if (event.key === "ArrowLeft") {
        prevSlide(); 
    } else if (event.key === "ArrowRight") {
        nextSlide(); 
    }
}

let touchStartX = 0;
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX; 
}

function handleTouchMove(event) {
    const touchEndX = event.touches[0].clientX; 
    if (touchStartX - touchEndX > 50) {
        nextSlide();  
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();  
    }
}
