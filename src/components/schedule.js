// Schedule Component - Iron Peak Gym

const scheduleData = {
  monday: [
    { time: "06:00 AM - 07:00 AM", class: "HIIT Training", trainer: "Sarah Connor", spots: "5 / 15", status: "limited" },
    { time: "08:30 AM - 09:30 AM", class: "Powerlifting", trainer: "Marcus Steele", spots: "12 / 12", status: "full" },
    { time: "10:00 AM - 11:00 AM", class: "Yoga & Mobility", trainer: "Sarah Connor", spots: "8 / 20", status: "open" },
    { time: "05:30 PM - 06:30 PM", class: "Boxing Conditioning", trainer: "Viktor Vance", spots: "9 / 15", status: "open" },
    { time: "07:00 PM - 08:00 PM", class: "CrossFit", trainer: "Marcus Steele", spots: "3 / 12", status: "limited" }
  ],
  tuesday: [
    { time: "06:00 AM - 07:00 AM", class: "CrossFit", trainer: "Marcus Steele", spots: "8 / 12", status: "open" },
    { time: "08:30 AM - 09:30 AM", class: "HIIT Training", trainer: "Sarah Connor", spots: "14 / 15", status: "limited" },
    { time: "05:30 PM - 06:30 PM", class: "Yoga & Mobility", trainer: "Sarah Connor", spots: "15 / 20", status: "open" },
    { time: "07:00 PM - 08:00 PM", class: "Boxing Conditioning", trainer: "Viktor Vance", spots: "12 / 12", status: "full" }
  ],
  wednesday: [
    { time: "06:00 AM - 07:00 AM", class: "HIIT Training", trainer: "Sarah Connor", spots: "10 / 15", status: "open" },
    { time: "08:30 AM - 09:30 AM", class: "Powerlifting", trainer: "Marcus Steele", spots: "11 / 12", status: "limited" },
    { time: "05:30 PM - 06:30 PM", class: "CrossFit", trainer: "Marcus Steele", spots: "12 / 12", status: "full" },
    { time: "07:00 PM - 08:00 PM", class: "Yoga & Mobility", trainer: "Sarah Connor", spots: "5 / 20", status: "open" }
  ],
  thursday: [
    { time: "06:00 AM - 07:00 AM", class: "Boxing Conditioning", trainer: "Viktor Vance", spots: "7 / 15", status: "open" },
    { time: "08:30 AM - 09:30 AM", class: "CrossFit", trainer: "Marcus Steele", spots: "11 / 12", status: "limited" },
    { time: "05:30 PM - 06:30 PM", class: "HIIT Training", trainer: "Sarah Connor", spots: "15 / 15", status: "full" },
    { time: "07:00 PM - 08:00 PM", class: "Powerlifting", trainer: "Marcus Steele", spots: "8 / 12", status: "open" }
  ],
  friday: [
    { time: "06:00 AM - 07:00 AM", class: "HIIT Training", trainer: "Sarah Connor", spots: "12 / 15", status: "open" },
    { time: "08:30 AM - 09:30 AM", class: "Powerlifting", trainer: "Marcus Steele", spots: "12 / 12", status: "full" },
    { time: "10:00 AM - 11:00 AM", class: "Yoga & Mobility", trainer: "Sarah Connor", spots: "10 / 20", status: "open" },
    { time: "05:30 PM - 06:30 PM", class: "Boxing Conditioning", trainer: "Viktor Vance", spots: "14 / 15", status: "limited" }
  ],
  saturday: [
    { time: "08:00 AM - 09:00 AM", class: "CrossFit", trainer: "Marcus Steele", spots: "10 / 12", status: "open" },
    { time: "09:30 AM - 10:30 AM", class: "HIIT Training", trainer: "Sarah Connor", spots: "15 / 15", status: "full" },
    { time: "11:00 AM - 12:00 PM", class: "Yoga & Mobility", trainer: "Sarah Connor", spots: "18 / 20", status: "limited" }
  ]
};

export function initSchedule() {
  const container = document.getElementById("schedulePanelContainer");
  const tabs = document.querySelectorAll(".schedule-tab-btn");
  
  if (!container || tabs.length === 0) return;

  // Render all panels
  renderAllPanels(container);

  // Bind tab events
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetDay = tab.getAttribute("data-day");
      
      // Toggle active tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Toggle active panel
      const panels = container.querySelectorAll(".schedule-panel");
      panels.forEach(panel => {
        if (panel.id === `panel-${targetDay}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
}

function renderAllPanels(container) {
  container.innerHTML = ""; // Clear loader/previous
  
  Object.keys(scheduleData).forEach((day, index) => {
    const isActive = index === 0; // Mon active by default
    const panel = document.createElement("div");
    panel.className = `schedule-panel ${isActive ? 'active' : ''}`;
    panel.id = `panel-${day}`;

    const dayClasses = scheduleData[day];
    
    if (dayClasses.length === 0) {
      panel.innerHTML = `<div class="text-center text-muted">No classes scheduled. Rest Day.</div>`;
    } else {
      dayClasses.forEach(item => {
        const isFull = item.status === "full";
        const isLimited = item.status === "limited";
        
        let statusClass = "text-yellow";
        let statusText = `${item.spots} spots left`;
        
        if (isFull) {
          statusClass = "full";
          statusText = "FULLY BOOKED";
        } else if (isLimited) {
          statusClass = "text-red";
        }

        panel.innerHTML += `
          <div class="schedule-row">
            <div class="schedule-time">${item.time}</div>
            <div class="schedule-class-name">${item.class}</div>
            <div class="schedule-trainer">
              <i data-lucide="user"></i> ${item.trainer}
            </div>
            <div class="schedule-availability ${statusClass}">${statusText}</div>
            <a href="#contact" class="btn ${isFull ? 'btn-outline' : 'btn-primary'} btn-cta" ${isFull ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
              ${isFull ? 'FULL' : 'BOOK NOW'}
            </a>
          </div>
        `;
      });
    }

    container.appendChild(panel);
  });
}
