// calendar.js
    // Init datepicker
    flatpickr("#date", {
      minDate: "today",
      dateFormat: "Y-m-d",
      onChange: function() {
        document.querySelector("label[for='service']").classList.remove("hidden");
        document.getElementById("service").classList.remove("hidden");
      }
    });

    // When service selected, show times
    const serviceSelect = document.getElementById("service");
    const timeSlotsDiv = document.getElementById("timeSlots");
    const timeField = document.getElementById("timeField");
    const contactFields = document.getElementById("contactFields");

    const serviceTimes = {
      "Haircut": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"],
      "Color": ["9:30 AM", "12:00 PM", "3:00 PM"],
      "Nails": ["10:15 AM", "11:45 AM", "2:15 PM"],
      "Massage": ["9:00 AM", "11:00 AM", "1:30 PM", "4:00 PM"]
    };

    serviceSelect.addEventListener("change", function() {
      timeSlotsDiv.innerHTML = "";
      timeSlotsDiv.classList.remove("hidden");

      const times = serviceTimes[this.value] || [];
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
    });