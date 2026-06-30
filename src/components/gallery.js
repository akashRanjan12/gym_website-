// Gallery Component with Lightbox - Iron Peak Gym

export function initGallery() {
  const grid = document.getElementById("galleryGrid");
  const filters = document.querySelectorAll(".gallery-filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  
  if (!grid || filters.length === 0 || items.length === 0) return;

  // 1. Grid Filtering
  filters.forEach(button => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Toggle active button
      filters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter grid items
      items.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300); // match transition
        }
      });
    });
  });

  // 2. Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  let activeIndex = 0;
  const visibleItems = [];

  // Populate list of current visible items for sliding index reference
  function updateVisibleItems() {
    visibleItems.length = 0;
    items.forEach(item => {
      if (item.style.display !== "none") {
        visibleItems.push(item);
      }
    });
  }

  // Open Lightbox
  items.forEach(item => {
    const zoomBtn = item.querySelector(".gallery-zoom-btn");
    
    const triggerOpen = () => {
      updateVisibleItems();
      activeIndex = visibleItems.indexOf(item);
      openLightbox(item);
    };

    if (zoomBtn) {
      zoomBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        triggerOpen();
      });
    }
    
    // Allow clicking the card itself to open lightbox
    item.addEventListener("click", () => {
      triggerOpen();
    });
  });

  function openLightbox(item) {
    const img = item.querySelector(".gallery-img");
    const title = item.querySelector(".gallery-item-title");
    
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Gym Sanctuary Image";
    lightboxCaption.textContent = title ? title.textContent : "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // disable scroll
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // enable scroll
    lightboxImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector(".lightbox-content-wrapper")) {
      closeLightbox();
    }
  });

  // Navigation functions
  function showNext() {
    updateVisibleItems();
    if (visibleItems.length <= 1) return;
    activeIndex = (activeIndex + 1) % visibleItems.length;
    openLightbox(visibleItems[activeIndex]);
  }

  function showPrev() {
    updateVisibleItems();
    if (visibleItems.length <= 1) return;
    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(visibleItems[activeIndex]);
  }

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
  
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Mobile Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left -> Show Next
      showNext();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right -> Show Prev
      showPrev();
    }
  }
}
