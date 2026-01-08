// booking javascript - Updated for Modern Booking Page

// Define any specific blocked dates (holidays, vacations, etc.)
const blockedDates = [
  "2025-12-25", // Christmas
  "2025-12-26",
  "2026-01-01", // New Year's
];

// Progress tracking function
function updateProgress(step) {
  const steps = document.querySelectorAll('.progress-step');
  const progressFill = document.getElementById('progressFill');
  
  if (!steps.length || !progressFill) return;
  
  steps.forEach((stepEl, index) => {
    if (index < step) {
      stepEl.classList.add('completed');
      stepEl.classList.remove('active');
    } else if (index === step - 1) {
      stepEl.classList.add('active');
      stepEl.classList.remove('completed');
    } else {
      stepEl.classList.remove('active', 'completed');
    }
  });
  
  const progress = ((step - 1) / 3) * 100;
  progressFill.style.width = progress + '%';
}

// Init datepicker
flatpickr("#date", {
  minDate: "today",
  dateFormat: "Y-m-d",
  
  // Only allow Thursday (4), Friday (5), Saturday (6), Sunday (0)
  enable: [
    function(date) {
      const day = date.getDay();
      const isBusinessDay = day === 0 || day === 4 || day === 5 || day === 6;
      
      // Check if date is not blocked
      const dateStr = date.toISOString().split('T')[0];
      const isNotBlocked = !blockedDates.includes(dateStr);
      
      return isBusinessDay && isNotBlocked;
    }
  ],
  
  locale: {
    firstDayOfWeek: 0
  },
  
  onChange: function() {
    // Show category section
    const categorySection = document.getElementById('categorySection');
    if (categorySection) {
      categorySection.classList.remove('hidden');
      updateProgress(2);
    }
  }
});

// Define service categories and their sub-services
const serviceOptions = {
  "Color Services": [
    "Color Mathematics - $150+",
    "Fantasy Realization - $200+",
    "Color Correction - $180+",
    "Full Color Transformation - $350+"
  ],
  "Cutting & Styling": [
    "Precision Carved Art - $80+",
    "Bold Statement Styling - $120+",
    "Haircut & Style - $60+",
    "Trim & Refresh - $40+"
  ],
  "Specialty Services": [
    "Consultation - $50",
    "Full Transformation - $350+",
    "Event Styling - $100+",
    "Hair Extensions - $300+"
  ]
};

// Define time slots for each specific service
const serviceTimes = {
  // Color Services (longer appointments)
  "Color Mathematics - $150+": ["9:00 AM", "12:00 PM", "3:00 PM"],
  "Fantasy Realization - $200+": ["9:00 AM", "1:00 PM"],
  "Color Correction - $180+": ["9:00 AM", "12:00 PM", "3:00 PM"],
  "Full Color Transformation - $350+": ["9:00 AM"],
  
  // Cutting & Styling (shorter appointments)
  "Precision Carved Art - $80+": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM"],
  "Bold Statement Styling - $120+": ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
  "Haircut & Style - $60+": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  "Trim & Refresh - $40+": ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
  
  // Specialty Services
  "Consultation - $50": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  "Full Transformation - $350+": ["9:00 AM"],
  "Event Styling - $100+": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "Hair Extensions - $300+": ["9:00 AM", "1:00 PM"]
};

const serviceSelect = document.getElementById("service");
const subServiceSelect = document.getElementById("subService");
const timeSlotsDiv = document.getElementById("timeSlots");
const timeField = document.getElementById("timeField");
const contactSection = document.getElementById("contactSection");
const addServiceBtn = document.getElementById("addServiceBtn");
const addServiceSection = document.getElementById("addServiceSection");
const additionalServicesContainer = document.getElementById("additionalServicesContainer");

let additionalServiceCount = 0;

// When main service category is selected
if (serviceSelect) {
  serviceSelect.addEventListener("change", function() {
    // Reset subsequent sections
    if (subServiceSelect) {
      subServiceSelect.innerHTML = '<option value="">Choose your service</option>';
    }
    
    const serviceSection = document.getElementById('serviceSection');
    const timeSection = document.getElementById('timeSection');
    
    if (timeSlotsDiv) {
      timeSlotsDiv.innerHTML = "";
    }
    
    if (timeSection) {
      timeSection.classList.add("hidden");
    }
    
    if (contactSection) {
      contactSection.classList.add("hidden");
    }
    
    if (addServiceSection) {
      addServiceSection.classList.add("hidden");
    }
    
    if (timeField) {
      timeField.value = "";
    }
    
    if (this.value) {
      // Show sub-service section
      if (serviceSection) {
        serviceSection.classList.remove("hidden");
      }
      
      // Populate sub-service options
      const subServices = serviceOptions[this.value] || [];
      subServices.forEach(service => {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        subServiceSelect.appendChild(option);
      });
    } else {
      if (serviceSection) {
        serviceSection.classList.add("hidden");
      }
    }
  });
}

// When specific sub-service is selected, show time slots
if (subServiceSelect) {
  subServiceSelect.addEventListener("change", function() {
    if (timeSlotsDiv) {
      timeSlotsDiv.innerHTML = "";
    }
    
    const timeSection = document.getElementById('timeSection');
    
    if (contactSection) {
      contactSection.classList.add("hidden");
    }
    
    if (addServiceSection) {
      addServiceSection.classList.add("hidden");
    }
    
    if (timeField) {
      timeField.value = "";
    }
    
    if (this.value) {
      // Show time section
      if (timeSection) {
        timeSection.classList.remove("hidden");
      }
      
      // Update progress to step 3
      updateProgress(3);
      
      const times = serviceTimes[this.value] || [];
      
      if (times.length === 0 && timeSlotsDiv) {
        timeSlotsDiv.innerHTML = '<p style="color: var(--vibrant-purple-neon); padding: 1rem; text-align: center;">Please call for availability for this service.</p>';
      } else if (timeSlotsDiv) {
        times.forEach(t => {
          const btn = document.createElement("div");
          btn.classList.add("time-slot-btn");
          btn.textContent = t;
          btn.onclick = () => {
            // Remove selected from all
            document.querySelectorAll(".time-slot-btn").forEach(el => el.classList.remove("selected"));
            // Add selected to clicked
            btn.classList.add("selected");
            
            if (timeField) {
              timeField.value = t;
            }
            
            // Show add service and contact sections
            if (addServiceSection) {
              addServiceSection.classList.remove("hidden");
            }
            if (contactSection) {
              contactSection.classList.remove("hidden");
            }
            
            // Update progress to step 4
            updateProgress(4);
          };
          timeSlotsDiv.appendChild(btn);
        });
      }
    } else {
      if (timeSection) {
        timeSection.classList.add("hidden");
      }
    }
  });
}

// Add Another Service Button Click Handler
if (addServiceBtn) {
  addServiceBtn.addEventListener("click", function() {
    additionalServiceCount++;
    const serviceCard = document.createElement("div");
    serviceCard.classList.add("additional-service-item");
    serviceCard.id = `additional-service-${additionalServiceCount}`;
    serviceCard.innerHTML = `
      <button type="button" class="remove-service-icon" onclick="removeAdditionalService(${additionalServiceCount})">✕</button>
      <label class="form-label">Additional Service ${additionalServiceCount}</label>
      <select name="additional_service_${additionalServiceCount}" class="form-select" required>
        <option value="">Choose service</option>
        ${getAllServices().map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
    `;
    
    if (additionalServicesContainer) {
      additionalServicesContainer.appendChild(serviceCard);
    }
  });
}

// Function to get all services in a flat list
function getAllServices() {
  const allServices = [];
  for (const category in serviceOptions) {
    allServices.push(...serviceOptions[category]);
  }
  return allServices;
}

// Function to remove an additional service
function removeAdditionalService(id) {
  const serviceCard = document.getElementById(`additional-service-${id}`);
  if (serviceCard) {
    serviceCard.remove();
  }
}

// Toggle booking steps show/hide (accessible)
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggleSteps');
  const steps = document.getElementById('bookingSteps');
  if (!toggle || !steps) return;

  // Initialize text based on current state
  if (steps.classList.contains('collapsed')) {
    toggle.textContent = 'Show More Info';
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    toggle.textContent = 'Hide Info';
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const collapsed = steps.classList.toggle('collapsed');
    if (collapsed) {
      toggle.textContent = 'Show More Info';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.textContent = 'Hide Info';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});