document.addEventListener("DOMContentLoaded", function () {

  const servicesContainer = document.getElementById("servicesContainer");
  const addBtn = document.getElementById("addServiceBtn");

  // ===== CREATE NEW SERVICE BLOCK =====
  function createServiceBlock() {
    const block = document.createElement("div");
 block.classList.add("service-block", "additional-service");


    block.innerHTML = `
      <div class="form-section">
        <label class="form-label">Service Category</label>
        <select class="form-select service-category" name="service_category[]">
          <option value="">Choose a category</option>
          <option value="color">Color Services</option>
          <option value="cut">Haircuts</option>
          <option value="styling">Styling & Treatments</option>
        </select>
      </div>

      <div class="form-section hidden">
        <label class="form-label">Specific Service</label>
        <select class="form-select service-select" name="service[]">
          <option value="">Choose your service</option>
        </select>
      </div>

      <!-- COLOR QUESTIONS -->
      <div class="color-questions hidden">
        <div class="form-section">
          <label class="form-label">Current Hair Color</label>
          <input type="text" name="current_color[]" class="form-input">
        </div>

        <div class="form-section">
          <label class="form-label">Hair History</label>
          <textarea name="hair_history[]" class="form-input"></textarea>
        </div>

        <div class="form-section">
          <label class="form-label">Goal / Inspiration</label>
          <textarea name="color_goal[]" class="form-input"></textarea>
        </div>
      </div>

      <!-- CUT QUESTIONS -->
      <div class="cut-questions hidden">
        <div class="form-section">
          <label class="form-label">Current Length</label>
          <select name="length[]" class="form-select">
            <option value="">Select length</option>
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>

        <div class="form-section">
          <label class="form-label">What change are you looking for?</label>
          <textarea name="cut_goal[]" class="form-input"></textarea>
        </div>
      </div>

      <!-- STYLING QUESTIONS -->
      <div class="styling-questions hidden">
        <div class="form-section">
          <label class="form-label">Hair Concerns</label>
          <input type="text" name="concerns[]" class="form-input">
        </div>

        <div class="form-section">
          <label class="form-label">What are you hoping to achieve?</label>
          <textarea name="styling_goal[]" class="form-input"></textarea>
        </div>
      </div>

      <button type="button" class="remove-service-icon">×</button>
    `;

    servicesContainer.appendChild(block);

    attachLogic(block);

    // remove button
    block.querySelector(".remove-service-icon").addEventListener("click", () => {
      block.remove();
    });
  }

  // ===== ADD BUTTON =====
  if (addBtn) {
    addBtn.addEventListener("click", createServiceBlock);
  }

  // ===== LOGIC FOR EACH BLOCK =====
  function attachLogic(block) {
    const category = block.querySelector(".service-category");
    const serviceSelect = block.querySelector(".service-select");
    const serviceSection = serviceSelect.closest(".form-section");

    const colorQ = block.querySelector(".color-questions");
    const cutQ = block.querySelector(".cut-questions");
    const stylingQ = block.querySelector(".styling-questions");

    category.addEventListener("change", () => {
      const value = category.value;

      serviceSection.classList.remove("hidden");

      serviceSelect.innerHTML = `<option value="">Choose your service</option>`;

      // hide all first
      colorQ.classList.add("hidden");
      cutQ.classList.add("hidden");
      stylingQ.classList.add("hidden");

      if (value === "color") {
        serviceSelect.innerHTML += `
          <option>Balayage</option>
          <option>Full Color</option>
          <option>Bleach & Tone</option>
        `;
        colorQ.classList.remove("hidden");
      }

      if (value === "cut") {
        serviceSelect.innerHTML += `
          <option>Haircut</option>
          <option>Restyle</option>
        `;
        cutQ.classList.remove("hidden");
      }

      if (value === "styling") {
        serviceSelect.innerHTML += `
          <option>Blowout</option>
          <option>Treatment</option>
        `;
        stylingQ.classList.remove("hidden");
      }
    });
  }

  // ===== INITIALIZE FIRST BLOCK =====
  const firstBlock = document.querySelector(".service-block");
  if (firstBlock) {
    attachLogic(firstBlock);
  }

});


// Toggle booking steps show/hide (accessible)
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggleSteps');
  const steps = document.getElementById('bookingSteps');
  if (!toggle || !steps) return;

  // Initialize text based on current state
  if (steps.classList.contains('collapsed')) {
    toggle.textContent = 'Click for Instructions';
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    toggle.textContent = 'Hide Info';
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const collapsed = steps.classList.toggle('collapsed');
    if (collapsed) {
      toggle.textContent = 'Click for Instructions';
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.textContent = 'Hide Info';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});


