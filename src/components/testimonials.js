// Testimonial Carousel Component - Iron Peak Gym

export function initTestimonials() {
  const carousel = document.getElementById("testimonialCarousel");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  const indicatorsContainer = document.getElementById("carouselIndicators");

  if (!carousel || slides.length === 0 || !prevBtn || !nextBtn || !indicatorsContainer) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayInterval = 5000;

  // 1. Create Indicators
  indicatorsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute("data-index", index);
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoplay();
    });
    indicatorsContainer.appendChild(dot);
  });

  const dots = indicatorsContainer.querySelectorAll(".carousel-dot");

  // 2. Go to Slide Function
  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    
    // Shift carousel translate position
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    currentIndex = index;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  // 3. Bind Arrow buttons
  nextBtn.addEventListener("click", () => {
    showNext();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    showPrev();
    resetAutoplay();
  });

  // 4. Autoplay logic
  function startAutoplay() {
    if (autoplayTimer) return;
    autoplayTimer = setInterval(showNext, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Start Autoplay on load
  startAutoplay();

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // 5. Swipe Gestures
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNext();
      resetAutoplay();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrev();
      resetAutoplay();
    }
  }
}
