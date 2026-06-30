// BMI Calculator Component - Iron Peak Gym

export function initBmiCalculator() {
  const form = document.getElementById("bmiForm");
  const metricBtn = document.getElementById("unitMetric");
  const imperialBtn = document.getElementById("unitImperial");
  const heightLabel = document.getElementById("heightLabel");
  const weightLabel = document.getElementById("weightLabel");
  const bmiHeight = document.getElementById("bmiHeight");
  const bmiWeight = document.getElementById("bmiWeight");
  
  const resultBlock = document.getElementById("bmiResult");
  const resultVal = document.getElementById("resultBmiVal");
  const resultStatus = document.getElementById("resultBmiStatus");
  const resultAdvice = document.getElementById("resultBmiAdvice");

  if (!form || !metricBtn || !imperialBtn || !resultBlock) return;

  let unitMode = "metric"; // default

  // Unit Toggle: Metric
  metricBtn.addEventListener("click", () => {
    if (unitMode === "metric") return;
    unitMode = "metric";
    metricBtn.classList.add("active");
    imperialBtn.classList.remove("active");
    
    heightLabel.textContent = "Height (cm)";
    weightLabel.textContent = "Weight (kg)";
    bmiHeight.placeholder = "e.g. 175";
    bmiWeight.placeholder = "e.g. 70";
    
    bmiHeight.min = "50";
    bmiHeight.max = "250";
    bmiWeight.min = "10";
    bmiWeight.max = "300";
    
    // Clear inputs and result
    form.reset();
    resultBlock.style.display = "none";
  });

  // Unit Toggle: Imperial
  imperialBtn.addEventListener("click", () => {
    if (unitMode === "imperial") return;
    unitMode = "imperial";
    imperialBtn.classList.add("active");
    metricBtn.classList.remove("active");
    
    heightLabel.textContent = "Height (inches)";
    weightLabel.textContent = "Weight (lbs)";
    bmiHeight.placeholder = "e.g. 69";
    bmiWeight.placeholder = "e.g. 154";
    
    bmiHeight.min = "20";
    bmiHeight.max = "100";
    bmiWeight.min = "20";
    bmiWeight.max = "600";
    
    form.reset();
    resultBlock.style.display = "none";
  });

  // Calculation logic
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const h = parseFloat(bmiHeight.value);
    const w = parseFloat(bmiWeight.value);
    
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    let bmi = 0;
    if (unitMode === "metric") {
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      bmi = 703 * (w / (h * h));
    }

    bmi = parseFloat(bmi.toFixed(1));

    // Show result block with flex
    resultBlock.style.display = "flex";
    
    // Animate value count up (simple JS interval)
    animateBmiValue(bmi);
    
    // Status details
    let statusText = "";
    let statusClass = "";
    let adviceText = "";
    
    if (bmi < 18.5) {
      statusText = "Underweight";
      statusClass = "text-yellow";
      adviceText = "Focus on nutrient-dense calorie surplus and heavy strength training to build lean mass.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      statusText = "Healthy Weight";
      statusClass = "text-yellow"; // matching yellow styling or default
      adviceText = "Great shape! Continue maintaining with structured weights and consistent cardio conditioning.";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      statusText = "Overweight";
      statusClass = "text-red";
      adviceText = "Consider a slight calorie deficit combined with high-intensity training and heavy resistance exercises.";
    } else {
      statusText = "Obese";
      statusClass = "text-red";
      adviceText = "Action required. Prioritize cardio conditioning, compound lifting, and consistent nutrition coaching.";
    }

    resultStatus.textContent = statusText;
    
    // Reset status color classes
    resultStatus.className = "";
    resultStatus.classList.add(statusClass);
    
    resultAdvice.textContent = adviceText;
  });

  function animateBmiValue(target) {
    let current = 0;
    const duration = 800; // ms
    const stepTime = 16; // roughly 60 fps
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        resultVal.textContent = target.toFixed(1);
        clearInterval(timer);
      } else {
        resultVal.textContent = current.toFixed(1);
      }
    }, stepTime);
  }
}
