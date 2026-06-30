// Contact & Newsletter Form Components - Iron Peak Gym

export function initContactForm() {
  const form = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");

  if (form) {
    setupEnrollmentForm(form);
  }

  if (newsletterForm) {
    setupNewsletterForm(newsletterForm);
  }
}

function setupEnrollmentForm(form) {
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const phoneInput = document.getElementById("contactPhone");
  const programSelect = document.getElementById("contactProgram");
  const submitBtn = document.getElementById("contactSubmitBtn");
  const spinner = document.getElementById("formSpinner");

  // Validate on blur
  const inputsToValidate = [nameInput, emailInput, phoneInput, programSelect];
  inputsToValidate.forEach(input => {
    if (!input) return;
    input.addEventListener("blur", () => {
      validateField(input);
    });
    
    // Clear invalid state on type
    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group && group.classList.contains("invalid")) {
        group.classList.remove("invalid");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    inputsToValidate.forEach(input => {
      if (input && !validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      showToast("Please fix the validation errors before submitting.", "error");
      return;
    }

    // Set Loading State
    setFormLoading(true);

    // Simulate API Submission (1.5 seconds)
    setTimeout(() => {
      setFormLoading(false);
      showToast("Welcome to the peak! Your free session enrollment was successful. A coach will call you shortly.", "success");
      form.reset();
      
      // Remove placeholder-shown / floating label active classes
      inputsToValidate.forEach(input => {
        if (!input) return;
        const group = input.closest(".form-group");
        if (group) group.classList.remove("invalid");
      });
    }, 1500);
  });

  function validateField(input) {
    const group = input.closest(".form-group");
    if (!group) return true;

    let isValid = true;

    // Check basic HTML validation first
    if (!input.checkValidity()) {
      isValid = false;
    }

    // Custom check for Select dropdown
    if (input.tagName === "SELECT" && input.value === "") {
      isValid = false;
    }

    // Custom check for email pattern
    if (input.type === "email" && input.value !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
      }
    }

    if (!isValid) {
      group.classList.add("invalid");
    } else {
      group.classList.remove("invalid");
    }

    return isValid;
  }

  function setFormLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.querySelector(".btn-text").textContent = "SUBMITTING...";
      spinner.style.display = "inline-block";
    } else {
      submitBtn.disabled = false;
      submitBtn.querySelector(".btn-text").textContent = "SUBMIT ENROLLMENT";
      spinner.style.display = "none";
    }
  }
}

function setupNewsletterForm(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    
    if (!input || !input.value) return;

    // Simulate quick subscription
    showToast("Subscription successful! Welcome to the Iron Peak newsletter.", "success");
    form.reset();
  });
}

// Toast Notifications System
export function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  // Icon select
  const icon = type === "success" ? "✓" : "✗";
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove after 4 seconds (1s transition + 3s display)
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3700);
}
