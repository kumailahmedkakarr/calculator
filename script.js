// ============================================
// GPA Calculator
// ============================================
function addGPARow() {
  const row = document.createElement("div");
  row.className = "ledger-row gpa-row";
  row.innerHTML = `
    <input type="text" placeholder="Subject" required>
    <select>
      <option value="4">A (85-100)</option>
      <option value="3.70">A- (80-84)</option>
      <option value="3.30">B+ (75-79)</option>
      <option value="3.00">B  (70-74)</option>
      <option value="2.70">B- (65-69)</option>
      <option value="2.30">C+ (61-64)</option>
      <option value="2.00">C  (58-60)</option>
      <option value="1.70">C- (55-57)</option>
      <option value="1.00">D (50-54)</option>
      <option value="0.00">F (0-49)</option>
    </select>
    <input type="number" placeholder="Credit Hours" min="0" step="1" required>
    <button type="button" class="row-remove" aria-label="Remove subject">&times;</button>
  `;
  row.querySelector(".row-remove").addEventListener("click", () => row.remove());
  document.getElementById("gpaInputs").appendChild(row);
}

document.getElementById("gpaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const rows = document.querySelectorAll("#gpaInputs .gpa-row");
  const resultEl = document.getElementById("gpaResult");

  if (rows.length === 0) {
    showStamp(resultEl, "Add at least one subject", true);
    return;
  }

  let totalPoints = 0;
  let totalCredits = 0;
  rows.forEach((row) => {
    const grade = parseFloat(row.querySelector("select").value);
    const credit = parseFloat(row.querySelectorAll("input")[1].value) || 0;
    totalPoints += grade * credit;
    totalCredits += credit;
  });

  if (totalCredits === 0) {
    showStamp(resultEl, "Credit hours can't be zero", true);
    return;
  }

  const gpa = (totalPoints / totalCredits).toFixed(2);
  showStamp(resultEl, "Your GPA", gpa);
});

// ============================================
// CGPA Calculator
// ============================================
function addCGPARow() {
  const row = document.createElement("div");
  row.className = "ledger-row cgpa-row";
  row.innerHTML = `
    <input type="number" placeholder="Semester GPA" step="0.01" min="0" max="4" required>
    <input type="number" placeholder="Credit Hours" min="0" step="1" required>
    <button type="button" class="row-remove" aria-label="Remove semester">&times;</button>
  `;
  row.querySelector(".row-remove").addEventListener("click", () => row.remove());
  document.getElementById("cgpaInputs").appendChild(row);
}

document.getElementById("cgpaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const rows = document.querySelectorAll("#cgpaInputs .cgpa-row");
  const resultEl = document.getElementById("cgpaResult");

  if (rows.length === 0) {
    showStamp(resultEl, "Add at least one semester", true);
    return;
  }

  let totalPoints = 0;
  let totalCredits = 0;
  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input");
    const gpa = parseFloat(inputs[0].value) || 0;
    const credit = parseFloat(inputs[1].value) || 0;
    totalPoints += gpa * credit;
    totalCredits += credit;
  });

  if (totalCredits === 0) {
    showStamp(resultEl, "Credit hours can't be zero", true);
    return;
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);
  showStamp(resultEl, "Your CGPA", cgpa);
});

// ============================================
// Aggregate Calculator
// ============================================
document.getElementById("aggregateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const resultEl = document.getElementById("aggregateResult");
  const matric = parseFloat(document.getElementById("matric").value);
  const inter = parseFloat(document.getElementById("inter").value);
  const test = parseFloat(document.getElementById("test").value);

  if ([matric, inter, test].some((v) => isNaN(v))) {
    showStamp(resultEl, "Fill in all three percentages", true);
    return;
  }

  const agg = (matric * 0.1 + inter * 0.4 + test * 0.5).toFixed(2);
  showStamp(resultEl, "Your Aggregate", agg + "%");
});

// ============================================
// Shared result stamp renderer
// ============================================
function showStamp(el, label, value, isError) {
  // Backward-compatible overload: showStamp(el, message, true) for errors
  if (value === true) {
    isError = true;
    value = label;
    label = "Notice";
  }
  el.hidden = false;
  el.classList.toggle("is-error", !!isError);
  el.innerHTML = `
    <span class="stamp-label">${label}</span>
    <span class="stamp-value">${value}</span>
  `;
}

// ============================================
// Front Page Generator
// ============================================
function generateFrontPage() {
  const name = document.getElementById("studentName").value;
  const roll = document.getElementById("rollNo").value;
  const subject = document.getElementById("subject").value;
  const includeLogo = document.getElementById("includeLogo").checked;
  const output = document.getElementById("frontPageOutput");

  if (!name || !roll || !subject) {
    output.innerHTML = `<div class="fp-page"><p>Please fill in name, roll number and subject first.</p></div>`;
    return;
  }

  const logoTag = includeLogo
    ? `<img src="images/buitems-logo.png" alt="BUITEMS Logo" class="fp-logo">`
    : "";

  const baseHTML = `
    <div class="fp-page">
      <h2>${escapeHTML(subject)}</h2>
      <p><strong>Name:</strong> ${escapeHTML(name)}</p>
      <p><strong>Roll No:</strong> ${escapeHTML(roll)}</p>
      __PHOTO__
      ${logoTag}
    </div>
  `;

  const file = document.getElementById("profilePic").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      output.innerHTML = baseHTML.replace(
        "__PHOTO__",
        `<img src="${e.target.result}" alt="Profile photo">`
      );
    };
    reader.readAsDataURL(file);
  } else {
    output.innerHTML = baseHTML.replace("__PHOTO__", "");
  }
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Show the chosen file name next to the upload field
document.getElementById("profilePic").addEventListener("change", function () {
  const label = document.getElementById("fileLabel");
  label.textContent = this.files[0] ? this.files[0].name : "Upload profile photo";
});

// ============================================
// Mobile nav toggle
// ============================================
document.getElementById("navToggle").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// ============================================
// Start each calculator with one row filled in
// ============================================
addGPARow();
addCGPARow();
