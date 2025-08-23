// GPA Calculator
function addGPARow() {
  const div = document.createElement("div");
  div.innerHTML = `
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
        <option value="0.00">F(0-49)</option>


    </select>
    <input type="number" placeholder="Credit Hours" required>
  `;
  document.getElementById("gpaInputs").appendChild(div);
}

document.getElementById("gpaForm").addEventListener("submit", function(e){
  e.preventDefault();
  let rows = document.querySelectorAll("#gpaInputs div");
  let totalPoints = 0, totalCredits = 0;
  rows.forEach(row => {
    let grade = parseFloat(row.querySelector("select").value);
    let credit = parseFloat(row.querySelectorAll("input")[1].value);
    totalPoints += grade * credit;
    totalCredits += credit;
  });
  let gpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("gpaResult").innerText = "Your GPA: " + gpa;
});

// CGPA Calculator
function addCGPARow() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="number" placeholder="Semester GPA" step="0.01" required>
    <input type="number" placeholder="Credit Hours" required>
  `;
  document.getElementById("cgpaInputs").appendChild(div);
}

document.getElementById("cgpaForm").addEventListener("submit", function(e){
  e.preventDefault();
  let rows = document.querySelectorAll("#cgpaInputs div");
  let totalPoints = 0, totalCredits = 0;
  rows.forEach(row => {
    let gpa = parseFloat(row.querySelectorAll("input")[0].value);
    let credit = parseFloat(row.querySelectorAll("input")[1].value);
    totalPoints += gpa * credit;
    totalCredits += credit;
  });
  let cgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("cgpaResult").innerText = "Your CGPA: " + cgpa;
});

// Aggregate Calculator
document.getElementById("aggregateForm").addEventListener("submit", function(e){
  e.preventDefault();
  let matric = parseFloat(document.getElementById("matric").value);
  let inter = parseFloat(document.getElementById("inter").value);
  let test = parseFloat(document.getElementById("test").value);
  let agg = ((matric*0.1)+(inter*0.4)+(test*0.5)).toFixed(2);
  document.getElementById("aggregateResult").innerText = "Your Aggregate: " + agg + "%";
});

// Front Page Generator
function generateFrontPage() {
  let name = document.getElementById("studentName").value;
  let roll = document.getElementById("rollNo").value;
  let subject = document.getElementById("subject").value;
  let includeLogo = document.getElementById("includeLogo").checked;

  let output = `<h2>${subject}</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Roll No:</strong> ${roll}</p>`;

  let file = document.getElementById("profilePic").files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("frontPageOutput").innerHTML =
        output +
        `<img src="${e.target.result}" alt="Profile">` +
        (includeLogo ? `<img src="images/buitems-logo.png" alt="Logo">` : "");
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("frontPageOutput").innerHTML =
      output +
      (includeLogo ? `<img src="images/buitems-logo.png" alt="Logo">` : "");
  }
}