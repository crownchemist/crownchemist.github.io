// calendar.js

// Define any specific blocked dates (holidays, vacations, etc.)
const blockedDates = [
  "2025-12-25", // Christmas
  "2025-12-26",
  "2026-01-01", // New Year's
  // Add more blocked dates as needed
];

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
    firstDayOfWeek: 0 // Start week on Sunday
  },
  
  onChange: function() {
    document.querySelector("label[for='service']").classList.remove("hidden");
    document.getElementById("service").classList.remove("hidden");
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
const contactFields = document.getElementById("contactFields");

// When main service category is selected
serviceSelect.addEventListener("change", function() {
  // Reset and hide subsequent fields
  subServiceSelect.innerHTML = '<option value="">-- Choose Specific Service --</option>';
  timeSlotsDiv.innerHTML = "";
  timeSlotsDiv.classList.add("hidden");
  contactFields.classList.add("hidden");
  timeField.value = "";
  
  if (this.value) {
    // Show sub-service dropdown
    document.querySelector("label[for='subService']").classList.remove("hidden");
    subServiceSelect.classList.remove("hidden");
    
    // Populate sub-service options
    const subServices = serviceOptions[this.value] || [];
    subServices.forEach(service => {
      const option = document.createElement("option");
      option.value = service;
      option.textContent = service;
      subServiceSelect.appendChild(option);
    });
  } else {
    // Hide sub-service if no category selected
    document.querySelector("label[for='subService']").classList.add("hidden");
    subServiceSelect.classList.add("hidden");
  }
});

// When specific sub-service is selected, show time slots
subServiceSelect.addEventListener("change", function() {
  timeSlotsDiv.innerHTML = "";
  contactFields.classList.add("hidden");
  timeField.value = "";
  
  if (this.value) {
    timeSlotsDiv.classList.remove("hidden");
    
    const times = serviceTimes[this.value] || [];
    
    if (times.length === 0) {
      timeSlotsDiv.innerHTML = '<p style="color: var(--vibrant-purple-neon);">Please call for availability for this service.</p>';
    } else {
      times.forEach(t => {
        const btn = document.createElement("div");
        btn.classList.add("time-slot");
        btn.textContent = t;
        btn.onclick = () => {
          document.querySelectorAll(".time-slot").forEach(el => el.classList.remove("selected"));
          btn.classList.add("selected");
          timeField.value = t;
          contactFields.classList.remove("hidden");
        };
        timeSlotsDiv.appendChild(btn);
      });
    }
  } else {
    timeSlotsDiv.classList.add("hidden");
  }
});