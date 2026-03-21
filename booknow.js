document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // ELEMENTS
  // =========================
  const servicesContainer = document.getElementById("servicesContainer");
  const addBtn = document.getElementById("addServiceBtn");


  // =========================
  // CREATE SERVICE BLOCK
  // =========================
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
          <option value="styling">Styling</option>
          <option value="treatments">Treatments</option>
        </select>
      </div>

      <div class="form-section hidden">
        <label class="form-label">Specific Service</label>
        <select class="form-select service-select" name="service[]">
          <option value="">Choose your service</option>
        </select>
      </div>

      <!-- COLOR -->
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

      <!-- CUT -->
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

      <!-- STYLING -->
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

      <!-- TREATMENTS -->
      <div class="treatment-questions hidden">
        <div class="form-section">
          <label class="form-label">Hair Concerns</label>
          <input type="text" name="concerns[]" class="form-input">
        </div>
        <div class="form-section">
          <label class="form-label">What are you hoping to achieve?</label>
          <textarea name="treatment_goal[]" class="form-input"></textarea>
        </div>
      </div>

      <button type="button" class="remove-service-icon">×</button>
    `;

    servicesContainer.appendChild(block);

    attachLogic(block);

    block.querySelector(".remove-service-icon").addEventListener("click", () => {
      block.remove();
    });
  }


  // =========================
  // ATTACH LOGIC
  // =========================
  function attachLogic(block) {
    const category = block.querySelector(".service-category");
    const serviceSelect = block.querySelector(".service-select");
    const serviceSection = serviceSelect.closest(".form-section");

    const colorQ = block.querySelector(".color-questions");
    const cutQ = block.querySelector(".cut-questions");
    const stylingQ = block.querySelector(".styling-questions");
    const treatmentsQ = block.querySelector(".treatment-questions");

    category.addEventListener("change", () => {
      const value = category.value;

      serviceSection.classList.remove("hidden");

      // RESET dropdown
      serviceSelect.innerHTML = `<option value="">Choose your service</option>`;

      // HIDE ALL
      colorQ.classList.add("hidden");
      cutQ.classList.add("hidden");
      stylingQ.classList.add("hidden");
      treatmentsQ.classList.add("hidden");

      // SWITCH LOGIC
      if (value === "color") {
        serviceSelect.innerHTML += `
          <option>Root Re-color $60</option>
          <option>Highlight Retouch $85</option>
          <option>Partial Highlight $140</option>
          <option>Full Highlight $200</option>
          <option>Partial Balyage $160</option>
          <option>Full Balyage $220</option>
          <option>Full Color $110+</option>
          <option>Ombre $150</option>
          <option>Peek-A-Boo Color $85</option>
          <option>Blonde Toning $35</option>
        `;
        colorQ.classList.remove("hidden");

      } else if (value === "cut") {
        serviceSelect.innerHTML += `
          <option>Essential Cut $40</option>
          <option>Specialty Cut $50</option>
          <option>Hair Tattoo $45/hr</option>
          <option>Kid's Cut $25</option>
        `;
        cutQ.classList.remove("hidden");

      } else if (value === "styling") {
        serviceSelect.innerHTML += `
          <option>Shampoo & Style $45</option>
          <option>Blowout $30</option>
          <option>Curls $25</option>
          <option>Straightening $25</option>
          <option>Wet-set Curls $30+</option>
          <option>Full Braids $110+</option>
          <option>Hair Extensions $ varies</option>
          <option>Special Occasion Updo $ varies</option>
          <option>Full Transformation $350+</option>
        `;
        stylingQ.classList.remove("hidden");

      } else if (value === "treatments") {
        serviceSelect.innerHTML += `
          <option>Perm $75-100</option>
          <option>Deep Conditioning $45</option>
          <option>Hair Glossing $35+</option>
          <option>Conditioning Mask $20</option>
        `;
        treatmentsQ.classList.remove("hidden");
      }
    });
  }


  // =========================
  // INIT EXISTING BLOCK
  // =========================
  const firstBlock = document.querySelector(".service-block");
  if (firstBlock) {
    attachLogic(firstBlock);
  }


  // =========================
  // ADD BUTTON
  // =========================
  if (addBtn) {
    addBtn.addEventListener("click", createServiceBlock);
  }


  // =========================
  // TOGGLE STEPS
  // =========================
  const toggle = document.getElementById("toggleSteps");
  const steps = document.getElementById("bookingSteps");

  if (toggle && steps) {

    if (steps.classList.contains("collapsed")) {
      toggle.textContent = "Click for Instructions";
      toggle.setAttribute("aria-expanded", "false");
    } else {
      toggle.textContent = "Hide Info";
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      const collapsed = steps.classList.toggle("collapsed");

      if (collapsed) {
        toggle.textContent = "Click for Instructions";
        toggle.setAttribute("aria-expanded", "false");
      } else {
        toggle.textContent = "Hide Info";
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }

});