// Main Application Entry Point - Iron Peak Gym

// Import styles
import "./style.css";

// Import libraries
import * as L from "leaflet";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createIcons,
  Zap,
  Dumbbell,
  Shield,
  Target,
  Award,
  User,
  Calendar,
  Eye,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Minus,
  Check,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
} from "lucide";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import components
import { initSchedule } from "./components/schedule.js";
import { initGallery } from "./components/gallery.js";
import { initTestimonials } from "./components/testimonials.js";
import { initBmiCalculator } from "./components/bmiCalculator.js";
import { initContactForm } from "./components/contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Sub-Components
  try {
    initSchedule();
  } catch (e) {
    console.error("initSchedule failed:", e);
  }
  try {
    initGallery();
  } catch (e) {
    console.error("initGallery failed:", e);
  }
  try {
    initTestimonials();
  } catch (e) {
    console.error("initTestimonials failed:", e);
  }
  try {
    initBmiCalculator();
  } catch (e) {
    console.error("initBmiCalculator failed:", e);
  }
  try {
    initContactForm();
  } catch (e) {
    console.error("initContactForm failed:", e);
  }

  // 2. Navigation Sticky Header & Progress Bar
  try {
    setupHeaderAndScrollProgress();
  } catch (e) {
    console.error("setupHeaderAndScrollProgress failed:", e);
  }

  // 3. Custom Mouse Follower Cursor (Desktop)
  try {
    setupCustomCursor();
  } catch (e) {
    console.error("setupCustomCursor failed:", e);
  }

  // 4. Interactive Dark Theme Map (Leaflet)
  try {
    setupInteractiveMap();
  } catch (e) {
    console.error("setupInteractiveMap failed:", e);
  }

  // 5. GSAP Animations
  try {
    setupAnimations();
  } catch (e) {
    console.error("setupAnimations failed:", e);
  }

  // 6. Initialize Icons (after all dynamic content has rendered)
  try {
    createIcons({
      icons: {
        Zap,
        Dumbbell,
        Shield,
        Target,
        Award,
        User,
        Calendar,
        Eye,
        ArrowLeft,
        ArrowRight,
        MapPin,
        Phone,
        Mail,
        Clock,
        Plus,
        Minus,
        Check,
        Twitter,
        Youtube,
        Instagram,
        Facebook,
      },
    });
  } catch (e) {
    console.error("createIcons failed:", e);
  }
});

// Preloader Fade Out & Entrance Animations
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      // Trigger Hero entrance animation after preloader fades
      triggerHeroEntrance();
      // Recalculate ScrollTrigger thresholds after all assets load
      ScrollTrigger.refresh();
    }, 400);
  }
});

function setupHeaderAndScrollProgress() {
  const header = document.querySelector(".header");
  const scrollBar = document.getElementById("scrollBar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  // Sticky header toggle
  window.addEventListener("scroll", () => {
    // Header height shrink
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll progress bar fill
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollBar) {
      scrollBar.style.width = scrolled + "%";
    }

    // Dynamic active nav link highlighting
    highlightNavLink();
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  function highlightNavLink() {
    const scrollPos = window.scrollY + 200;
    document.querySelectorAll("section[id]").forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

function setupCustomCursor() {
  const cursor = document.querySelector(".custom-cursor");
  const dot = document.querySelector(".custom-cursor-dot");

  if (!cursor || !dot) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Set dot immediately
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // Lag the outline cursor for elastic feedback
  function animateOutline() {
    // Easing formula
    const ease = 0.15;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateOutline);
  }
  requestAnimationFrame(animateOutline);

  // Hover states expansion on clickables
  const clickables = document.querySelectorAll(
    "a, button, select, input, textarea, .gallery-item, .schedule-tab-btn, .unit-btn",
  );
  clickables.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
    });
  });
}

function setupInteractiveMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  // Latitude and Longitude for Manhattan, NY (Iron Peak Gym simulated location)
  const coords = [40.7484, -73.9857]; // Empire State area

  // Initialize Leaflet map, disable scroll wheel to prevent trapping
  const map = L.map("map", {
    center: coords,
    zoom: 15,
    scrollWheelZoom: false,
  });

  // Load CartoDB Dark Matter tile layer (gorgeous styling matching dark theme)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }).addTo(map);

  // Custom premium marker html
  const customIcon = L.divIcon({
    className: "custom-leaflet-marker",
    html: '<div class="marker-pin"></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // Add marker
  L.marker(coords, { icon: customIcon })
    .addTo(map)
    .bindPopup(
      '<b>IRON PEAK GYM</b><br>108 Peak Boulevard, NY 10001<br><a href="https://maps.google.com" target="_blank" style="color: #ffcc00; font-weight: bold; font-size: 11px;">GET DIRECTIONS</a>',
    )
    .openPopup();
}

function triggerHeroEntrance() {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    y: 50,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  })
    .from(
      ".hero-subtitle",
      {
        y: 30,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .from(
      ".hero-ctas .btn",
      {
        scale: 0.8,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )
    .from(
      ".hero-scroll-indicator",
      {
        y: -20,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2",
    );
}

function setupAnimations() {
  // Stats counter trigger
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"), 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      val: target,
      duration: 2,
      snap: { val: 1 },
      ease: "power2.out",
      onUpdate: function () {
        // Ensure values display cleanly
        stat.textContent = Math.ceil(obj.val);
      },
    });
  });

  // Section Headers Reveal
  const headers = document.querySelectorAll(".section-header");
  headers.forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Class Cards staggered reveal
  gsap.from(".class-card", {
    scrollTrigger: {
      trigger: ".classes-grid",
      start: "top 92%",
    },
    y: 60,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });

  // Pricing Cards staggered reveal
  gsap.from(".pricing-card", {
    scrollTrigger: {
      trigger: ".pricing-grid",
      start: "top 92%",
    },
    y: 60,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });

  // Trainer Cards reveal
  gsap.from(".trainer-card", {
    scrollTrigger: {
      trigger: ".trainers-grid",
      start: "top 92%",
    },
    y: 60,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });

  // Gallery items reveal
  gsap.from(".gallery-item", {
    scrollTrigger: {
      trigger: "#galleryGrid",
      start: "top 92%",
    },
    scale: 0.9,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
  });

  // About Us split card entrances
  gsap.from(".about-content", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 92%",
    },
    x: -50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".about-image-showcase", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 92%",
    },
    x: 50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  // BMI calculator split card entrances
  gsap.from(".bmi-info-content", {
    scrollTrigger: {
      trigger: ".bmi-grid",
      start: "top 92%",
    },
    x: -50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".bmi-calculator-box", {
    scrollTrigger: {
      trigger: ".bmi-grid",
      start: "top 92%",
    },
    x: 50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  // Blog Cards staggered reveal
  gsap.from(".blog-card", {
    scrollTrigger: {
      trigger: ".blog-grid",
      start: "top 92%",
    },
    y: 50,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });

  // Map & Contact splits
  gsap.from(".location-info-card", {
    scrollTrigger: {
      trigger: ".location-grid",
      start: "top 92%",
    },
    x: -50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".map-container-box", {
    scrollTrigger: {
      trigger: ".location-grid",
      start: "top 92%",
    },
    x: 50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  // Contact Form split
  gsap.from(".contact-form-intro", {
    scrollTrigger: {
      trigger: ".contact-grid",
      start: "top 92%",
    },
    x: -50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".contact-form-wrapper", {
    scrollTrigger: {
      trigger: ".contact-grid",
      start: "top 92%",
    },
    x: 50,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });
}
