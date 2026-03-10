// ============================================
// MEDIVOGUE HOSPITAL - COMPLETE SCRIPT.JS
// Includes: Event Handlers, DOM Manipulation, Exception Handling
// ============================================

// ==================== 1. DATE & TIME DISPLAY ====================
function updateDateTime() {
    try { //CO5: try block
        const now = new Date();
        const dateTimeElement = document.getElementById("dateTime");
        if (dateTimeElement) {
            //CO4: DOM selection
            dateTimeElement.innerHTML = now.toDateString() + " | " + now.toLocaleTimeString();
        }
    } catch (error) {
        console.error("Error updating date/time:", error);//CO5:Error logging
    }
}
// CO3: Callback function
//CO4: setInterval
setInterval(updateDateTime, 1000);
updateDateTime();

// ==================== 2. EVENT HANDLERS ====================

// Book Appointment Handler
function bookappointment() {  // CO3: Function declaration
    try {//CO5: try block
        alert("Redirecting to Appointment Booking Page...");
        window.location.href = "appointment.html";
    } catch (error) {
        handleError("Navigation error", error);
    }
}

// Logout Handler
function logout() {
    try {
        if (confirm("Are you sure you want to logout?")) {
            alert("Successfully Logout. Redirecting to Home Page...");
            window.location.href = "index.html";
        }
    } catch (error) {
        handleError("Logout error", error);
    }
}

// Service Card Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    try {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {  // CO3: Arrow function
            card.addEventListener("click", () => {
                alert("Service Selected: " + card.innerText);
            });
        });
    } catch (error) {
        console.error("Error attaching card listeners:", error);
    }
});

// ==================== 3. LAB REPORTS - OPEN IN NEW TAB ====================
function openReport(pdfFile, event) {
    try {
        event.preventDefault(); // Prevent default link behavior
        
        // Validate if file exists
        //CO5: Throwing custom errors
        if (!pdfFile) {
            throw new Error("Report file not found");
        }
        
        // Open in new tab
        //CO5: Global handlers
        window.open(pdfFile, '_blank');
        
        // Log the action
        console.log("Report opened: " + pdfFile);
        
    } catch (error) {
        handleError("Error opening report", error);
        alert("Unable to open report. Please try again later.");
    }
}

function refreshReports() {
    try {
        const table = document.getElementById("labReportsTable");
        if (!table) {
            throw new Error("Reports table not found");
        }
        
        // DOM Manipulation: Add loading animation
        const messageDiv = document.getElementById("reportMessage");
        if (messageDiv) {
            messageDiv.innerHTML = "🔄 Refreshing reports...";
            messageDiv.style.color = "blue";
        }
        
        // Simulate refresh with timeout
        setTimeout(() => {
            if (messageDiv) {
                messageDiv.innerHTML = "✅ Reports updated successfully!";
                messageDiv.style.color = "green";
                
                // Clear message after 3 seconds
                setTimeout(() => {
                    messageDiv.innerHTML = "";
                }, 3000);
            }
        }, 1500);
        
    } catch (error) {
        handleError("Error refreshing reports", error);
    }
}

// ==================== 4. PRESCRIPTION MANAGEMENT ====================

// Sample prescription data (simulated database)

// CO3: Arrays and array methods
const prescriptionsData = [
    {
        id: 1,
        date: "12-01-2026",
        doctor: "Dr. Meera",
        specialty: "Cardiology",
        diagnosis: "Mild chest pain, irregular heartbeat",
        prescription: "Aspirin 75mg daily, Metoprolol 25mg twice daily, Rest for 2 days",
        remarks: "Patient advised to avoid stress and fatty foods. Follow-up in 2 weeks."
    },
    {
        id: 2,
        date: "15-01-2026",
        doctor: "Dr. Arjun",
        specialty: "General Medicine",
        diagnosis: "Viral fever, body aches",
        prescription: "Paracetamol 650mg thrice daily for 3 days, Vitamin C supplements",
        remarks: "Cancelled - Patient didn't show up"
    },
    {
        id: 3,
        date: "22-02-2026",
        doctor: "Dr. Ravi",
        specialty: "Pediatrics",
        diagnosis: "Seasonal allergies, cough",
        prescription: "Cetirizine 5ml once daily, Cough syrup 5ml thrice daily",
        remarks: "Scheduled for follow-up next week"
    }
];

// Load prescriptions on page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (window.location.pathname.includes('pat_prescription.html')) {
            loadPrescriptions();
        }
    } catch (error) {
        handleError("Error loading prescriptions", error);
    }
});

function loadPrescriptions(filterDoctor = 'all') {
    try {
        const container = document.getElementById("prescriptionsContainer");
        if (!container) return;
        
        // Clear container
        container.innerHTML = "";
        
        // Filter prescriptions
        let filteredPrescriptions = prescriptionsData;
        if (filterDoctor !== 'all') {
            filteredPrescriptions = prescriptionsData.filter(p => p.doctor === filterDoctor);
        }
        
        // DOM Manipulation: Create prescription cards
        filteredPrescriptions.forEach(pres => {
            const card = document.createElement('div');
            card.className = 'prescription-card';
            card.id = `pres-${pres.id}`;
            //Co4: Event Handlers
            card.innerHTML = `
                <div class="doctor-info">👨‍⚕️ ${pres.doctor} - ${pres.specialty}</div>
                <div class="date">📅 ${pres.date}</div>
                <div class="remarks">
                    <strong>📋 Diagnosis:</strong> ${pres.diagnosis}
                </div>
                <div class="prescription">
                    <strong>💊 Prescription:</strong> ${pres.prescription}
                </div>
                <div class="remarks">
                    <strong>📝 Doctor's Remarks:</strong> ${pres.remarks}
                </div>
                <div style="text-align: right; margin-top: 10px;">
                    <button onclick="printPrescription(${pres.id})">🖨️ Print</button> 
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Handle empty results
        if (filteredPrescriptions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: gray;">No prescriptions found for this doctor.</p>';
        }
        
    } catch (error) {
        handleError("Error loading prescriptions", error);
    }
}

function filterPrescriptions() {
    try {
        const filter = document.getElementById("doctorFilter").value;
        loadPrescriptions(filter);
    } catch (error) {
        handleError("Error filtering prescriptions", error);
    }
}

function viewPrescription(id) {
    try {
        // Navigate to prescriptions page with selected prescription highlighted
        window.location.href = "pat_prescription.html?highlight=" + id;
    } catch (error) {
        handleError("Error viewing prescription", error);
    }
}

function printPrescription(id) {
    try {
        const prescription = prescriptionsData.find(p => p.id === id);
        if (!prescription) {
            throw new Error("Prescription not found");
        }
        
        // Create printable content
        const printContent = `
            <html>
            <head>
                <title>Prescription - MediVogue Hospital</title>
                <style>
                    body { font-family: Arial; padding: 30px; }
                    .header { text-align: center; color: #0f766e; }
                    .doctor { color: #0f766e; font-weight: bold; }
                    .content { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>MediVogue Hospital</h1>
                    <p>Care • Compassion • Commitment</p>
                </div>
                <h3>Prescription Details</h3>
                <p><strong>Doctor:</strong> ${prescription.doctor} (${prescription.specialty})</p>
                <p><strong>Date:</strong> ${prescription.date}</p>
                <div class="content">
                    <p><strong>Diagnosis:</strong> ${prescription.diagnosis}</p>
                    <p><strong>Prescription:</strong> ${prescription.prescription}</p>
                    <p><strong>Doctor's Remarks:</strong> ${prescription.remarks}</p>
                </div>
                <p style="text-align: center; color: gray;">Thank you for choosing MediVogue Hospital</p>
            </body>
            </html>
        `;
        
        // Open print window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
        
    } catch (error) {
        handleError("Error printing prescription", error);
    }
}

// ==================== 5. DOCTOR MANAGEMENT (ADMIN) ====================

function showAddDoctorForm() {
    try {
        const form = document.getElementById("addDoctorForm");
        if (form) {
            form.style.display = "block";
            
            // DOM Manipulation: Scroll to form smoothly
            form.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        handleError("Error showing form", error);
    }
}

function hideAddDoctorForm() {
    try {
        const form = document.getElementById("addDoctorForm");
        if (form) {
            form.style.display = "none";
            
            // Clear form fields
            document.getElementById("docName").value = "";
            document.getElementById("docDept").value = "";
            document.getElementById("docStatus").value = "av";
        }
    } catch (error) {
        handleError("Error hiding form", error);
    }
}

function addNewDoctor(event) {
    try {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById("docName").value.trim();
        const dept = document.getElementById("docDept").value;
        const status = document.getElementById("docStatus").value;
        
        // Validation with exception handling
        if (!name) {
            throw new Error("Doctor name is required");
        }
        if (name.length < 3) {
            throw new Error("Doctor name must be at least 3 characters");
        }
        if (!dept) {
            throw new Error("Please select a department");
        }
        
        // Generate unique ID for new row
        const newId = "doctor" + (document.querySelectorAll("#doctorTable tr").length);
        
        // Get status text and class
        let statusText, statusClass, statusIcon;
        switch(status) {
            case "av":
                statusText = "Free";
                statusClass = "av";
                statusIcon = '<i class="fas fa-check-circle"></i>';
                break;
            case "n":
                statusText = "Busy";
                statusClass = "n";
                statusIcon = '<i class="fas fa-clock"></i>';
                break;
            case "n_av":
                statusText = "Not Available";
                statusClass = "n_av";
                statusIcon = '<i class="fas fa-times-circle"></i>';
                break;
        }
        
        // DOM Manipulation: Add new row to table
        const table = document.getElementById("doctorTable");
        const newRow = table.insertRow();
        newRow.id = newId;
        //CO4: Event Handlers
        newRow.innerHTML = `
            <td>Dr. ${name}</td>
            <td>${dept}</td>
            <td class="${statusClass}">${statusText} ${statusIcon}</td>
            <td>
                <i class="fas fa-edit" onclick="editDoctor('${newId}')" style="cursor: pointer; color: #0f766e;"></i>
                <i class="fas fa-trash" onclick="deleteDoctor('${newId}')" style="cursor: pointer; color: red; margin-left: 10px;"></i>
            </td>
        `;
        
        // Hide form and show success message
        hideAddDoctorForm();
        showTemporaryMessage("Doctor added successfully!", "green");
        
    } catch (error) {
        handleError("Error adding doctor", error);
        showTemporaryMessage(error.message, "red");
    }
}

function editDoctor(rowId) {
    try {
        const row = document.getElementById(rowId);
        if (!row) {
            throw new Error("Doctor not found");
        }
        
        // Get current values
        const cells = row.cells;
        const name = cells[0].innerText.replace('Dr. ', '');
        const dept = cells[1].innerText;
        
        // Populate form with values
        document.getElementById("docName").value = name;
        
        // Select department in dropdown
        const deptSelect = document.getElementById("docDept");
        for (let i = 0; i < deptSelect.options.length; i++) {
            if (deptSelect.options[i].value === dept) {
                deptSelect.selectedIndex = i;
                break;
            }
        }
        
        // Show form with update button
        showAddDoctorForm();
        
        // Change save button to update
        const saveBtn = document.querySelector("#addDoctorForm button[type='submit']");
        saveBtn.innerHTML = '<i class="fas fa-sync"></i> Update Doctor';
        saveBtn.onclick = function(e) {
            e.preventDefault();
            updateDoctor(rowId);
        };
        
    } catch (error) {
        handleError("Error editing doctor", error);
    }
}

function updateDoctor(rowId) {
    try {
        const name = document.getElementById("docName").value.trim();
        const dept = document.getElementById("docDept").value;
        const status = document.getElementById("docStatus").value;
        
        if (!name || !dept) {
            throw new Error("Please fill all fields");
        }
        
        // Get status text and class
        let statusText, statusClass, statusIcon;
        switch(status) {
            case "av":
                statusText = "Free";
                statusClass = "av";
                statusIcon = '<i class="fas fa-check-circle"></i>';
                break;
            case "n":
                statusText = "Busy";
                statusClass = "n";
                statusIcon = '<i class="fas fa-clock"></i>';
                break;
            case "n_av":
                statusText = "Not Available";
                statusClass = "n_av";
                statusIcon = '<i class="fas fa-times-circle"></i>';
                break;
        }
        
        // Update row
        const row = document.getElementById(rowId);
        row.cells[0].innerHTML = `Dr. ${name}`;
        row.cells[1].innerHTML = dept;
        row.cells[2].innerHTML = `${statusText} ${statusIcon}`;
        row.cells[2].className = statusClass;
        
        // Reset form
        hideAddDoctorForm();
        
        // Reset save button
        const saveBtn = document.querySelector("#addDoctorForm button[type='submit']");
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Doctor';
        saveBtn.onclick = function(e) {
            e.preventDefault();
            addNewDoctor(e);
        };
        
        showTemporaryMessage("Doctor updated successfully!", "green");
        
    } catch (error) {
        handleError("Error updating doctor", error);
    }
}

function deleteDoctor(rowId) {
    try {
        if (confirm("Are you sure you want to delete this doctor?")) {
            const row = document.getElementById(rowId);
            if (row) {
                row.remove();
                showTemporaryMessage("Doctor deleted successfully!", "green");
            } else {
                throw new Error("Doctor not found");
            }
        }
    } catch (error) {
        handleError("Error deleting doctor", error);
    }
}

// ==================== 6. BILLING SYSTEM ====================

let total = 0;

function addRow() {
    try {
        let service = document.getElementById("service").value;
        let cost = document.getElementById("cost").value;

        if (service === "" || cost === "") {
            throw new Error("Please enter both service and cost");
        }
        
        if (isNaN(cost) || parseFloat(cost) <= 0) {
            throw new Error("Please enter a valid cost");
        }

        let table = document.getElementById("billTable");
        let row = table.insertRow();
        row.insertCell(0).innerText = service;
        row.insertCell(1).innerText = "₹" + parseFloat(cost).toFixed(2);
        row.insertCell(2).innerHTML = "<button onclick='removeRow(this, " + cost + ")'>Remove</button>";

        total += parseFloat(cost);
        document.getElementById("total").innerText = total.toFixed(2);

        // Clear inputs
        document.getElementById("service").value = "";
        document.getElementById("cost").value = "";
        
    } catch (error) {
        handleError("Error adding row", error);
        alert(error.message);
    }
}

function removeRow(btn, cost) {
    try {
        let row = btn.parentNode.parentNode;
        row.remove();
        total -= parseFloat(cost);
        //Co4: DOM Manipulation
        document.getElementById("total").innerText = total.toFixed(2);
    } catch (error) {
        handleError("Error removing row", error);
    }
}

function printBill() {
    try {
        window.print();
    } catch (error) {
        handleError("Error printing bill", error);
    }
}

// ==================== 7. MEDICINE SEARCH ====================

function searchMedicine() {
    try {
        let input = document.getElementById("search").value.toLowerCase();
        //CO4: DOM manipulation
        let rows = document.querySelectorAll("#medicineTable tr");

        // CO3: Loops
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header
            let text = row.innerText.toLowerCase();
            row.style.display = text.includes(input) ? "" : "none";
        });
        
    } catch (error) {
        handleError("Error searching medicine", error);
    }
}

// ==================== 8. EXCEPTION HANDLING UTILITIES ====================

function handleError(context, error) {
    console.error(context + ":", error.message);
    
    // Show error in UI if error message div exists
    const errorDiv = document.getElementById("errorMessage");
    if (errorDiv) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = "⚠️ " + context + ": " + error.message;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
    }
}

function showTemporaryMessage(message, color) {
    const msgDiv = document.getElementById("errorMessage");
    if (msgDiv) {
        msgDiv.style.display = "block";
        msgDiv.style.color = color;
        msgDiv.innerHTML = "✅ " + message;
        
        setTimeout(() => {
            msgDiv.style.display = "none";
        }, 3000);
    }
}

// Global error handler for uncaught exceptions
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global error:", message, "at", source, "line", lineno);
    alert("An unexpected error occurred. Please try again.");
    return true;
};

// ==================== 9. CONSULTATION DETAILS (DOM Manipulation) ====================

function showConsultationDetails(row) {
    try {
        const detailsDiv = document.getElementById("consultationDetails");
        if (!detailsDiv) return;
        
        const cells = row.cells;
        detailsDiv.style.display = "block";
        detailsDiv.innerHTML = `
            <h3>Consultation Details</h3>
            <p><strong>Date:</strong> ${cells[1].innerText}</p>
            <p><strong>Doctor:</strong> ${cells[2].innerText}</p>
            <p><strong>Specialty:</strong> ${cells[3].innerText}</p>
            <p><strong>Status:</strong> ${cells[4].innerText}</p>
            <button onclick="hideConsultationDetails()">Close</button>
        `;
    } catch (error) {
        handleError("Error showing consultation details", error);
    }
}

function hideConsultationDetails() {
    const detailsDiv = document.getElementById("consultationDetails");
    if (detailsDiv) {
        detailsDiv.style.display = "none";
    }
}

// Add click handlers to consultation rows
//CO4: Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (window.location.pathname.includes('pat_consult.html')) {
            const rows = document.querySelectorAll("#consultationsTable tr");
            rows.forEach((row, index) => {
                if (index > 0) { // Skip header
                    row.addEventListener("click", function() {
                        showConsultationDetails(this);
                    });
                    row.style.cursor = "pointer";
                }
            });
        }
    } catch (error) {
        console.error("Error attaching consultation handlers:", error);
    }
});

// ==================== 10. FORM VALIDATION ====================

    //CO5: Form validation with JavaScript
function validateAppointmentForm() {
    try {
        const name = document.querySelector("input[placeholder='Enter your name']");
        const age = document.querySelector("input[placeholder='Enter your Age']");
        const phone = document.querySelector("input[type='tel']");
        const date = document.querySelector("input[type='date']");
        const time = document.querySelector("input[type='time']");
        
        if (!name.value || name.value.length < 3) {
            throw new Error("Please enter a valid name (min 3 characters)");
        }
        
        if (!age.value || age.value < 0 || age.value > 150) {
            throw new Error("Please enter a valid age (0-150)");
        }
        
        if (!phone.value || !phone.value.match(/^[0-9]{10}$/)) { //CO5: Regex validation
            throw new Error("Please enter a valid 10-digit phone number");
        }
        
        const selectedDate = new Date(date.value);
        const today = new Date();
        if (selectedDate < today) {
            throw new Error("Please select a future date");
        }
        
        const hour = parseInt(time.value.split(':')[0]);
        if (hour < 9 || hour >= 17) {
            throw new Error("Please select time between 9 AM and 5 PM");
        }
        
        return true;
        
    } catch (error) {
        handleError("Validation error", error);
        alert(error.message);
        return false;
    }
}
// ============================================
// USER DATABASES (ID-SPECIFIC PASSWORDS)
// ============================================

// Admin credentials database
//CO3: Objects
const adminUsers = {
    "1001": { password: "admin@123", name: "Admin 1" },
    "1002": { password: "secure@456", name: "Admin 2" },
    "1003": { password: "hospital@789", name: "Super Admin" },
    "2520": { password: "asritha@123", name: "S.Asritha" } // Adding your ID
};

// Doctor credentials database
const doctorUsers = {
    "2001": { password: "dr.meera@cardio", name: "Dr. Meera", dept: "Cardiology" },
    "2002": { password: "dr.tej@neuro", name: "Dr. Tej", dept: "Neurology" },
    "2003": { password: "dr.arjun@ortho", name: "Dr. Arjun", dept: "Orthopedics" },
    "2004": { password: "dr.ravi@ped", name: "Dr. Ravi", dept: "Pediatrics" },
    "2005": { password: "dr.ananya@gen", name: "Dr. Ananya Rao", dept: "General Medicine" }
};

// Patient credentials database
const patientUsers = {
    "P001": { password: "bindu@123", name: "Bindu", age: 28 },
    "P002": { password: "avanthika@456", name: "Avanthika", age: 43 },
    "P003": { password: "raju@789", name: "Raju", age: 55 },
    "P004": { password: "hema@123", name: "Hema Sri", age: 23 }
};

// ============================================
// ADMIN LOGIN VALIDATION
// ============================================
function validateAdminLogin(event) {
    // Prevent form from submitting normally
    event.preventDefault();
    
    try {
        // Get input values
        //CO4: DOM selection
        const empId = document.getElementById("adminId").value.trim();
        const password = document.getElementById("adminPassword").value.trim();
        
        // Get error div
        const errorDiv = document.getElementById("loginError");
        
        // Check if ID exists in database
        if (adminUsers[empId]) {
            // Check if password matches
            if (adminUsers[empId].password === password) {
                // Successful login
                showSuccessMessage("Login successful! Redirecting...");
                
                // Store user info in session
                // CO4: Browser storage
                sessionStorage.setItem("currentUser", JSON.stringify({
                    id: empId,
                    name: adminUsers[empId].name,
                    role: "admin"
                }));
                
                // Redirect after 1 second
                //CO4: Asynchronous programming
                setTimeout(() => {
                    window.location.href = "admin_dashboard.html";
                }, 1000);
                
                return false;
            } else {
                // Wrong password
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "❌ Incorrect password for ID: " + empId;
                errorDiv.style.color = "red";
                
                // Clear password field
                document.getElementById("adminPassword").value = "";
                document.getElementById("adminPassword").focus();
            }
        } else {
            // ID not found
            errorDiv.style.display = "block";
            errorDiv.innerHTML = "❌ Admin ID not found: " + empId;
            errorDiv.style.color = "red";
            
            // Clear both fields
            document.getElementById("adminId").value = "";
            document.getElementById("adminPassword").value = "";
            document.getElementById("adminId").focus();
        }
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
        
        return false;
        
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
        return false;
    }
}

// ============================================
// DOCTOR LOGIN VALIDATION
// ============================================
function validateDoctorLogin(event) {
    event.preventDefault();
    
    try {
        const docId = document.getElementById("doctorId").value.trim();
        const password = document.getElementById("doctorPassword").value.trim();
        const errorDiv = document.getElementById("loginError");
        
        // Check if ID exists in database
        if (doctorUsers[docId]) {
            if (doctorUsers[docId].password === password) {
                // Successful login
                showSuccessMessage("Welcome Dr. " + doctorUsers[docId].name + "! Redirecting...");
                
                // Store user info
                sessionStorage.setItem("currentUser", JSON.stringify({
                    id: docId,
                    name: doctorUsers[docId].name,
                    department: doctorUsers[docId].dept,
                    role: "doctor"
                }));
                
                setTimeout(() => {
                    window.location.href = "doc_dashboard.html";
                }, 1000);
                
                return false;
            } else {
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "❌ Incorrect password for Doctor ID: " + docId;
                document.getElementById("doctorPassword").value = "";
                document.getElementById("doctorPassword").focus();
            }
        } else {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = "❌ Doctor ID not found: " + docId;
            document.getElementById("doctorId").value = "";
            document.getElementById("doctorPassword").value = "";
            document.getElementById("doctorId").focus();
        }
        
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
        
        return false;
        
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
        return false;
    }
}

// ============================================
// PATIENT LOGIN VALIDATION
// ============================================
function validatePatientLogin(event) {
    event.preventDefault();
    
    try {
        const patientId = document.getElementById("patientId").value.trim().toUpperCase();
        const password = document.getElementById("patientPassword").value.trim();
        const errorDiv = document.getElementById("loginError");
        
        // Check if ID exists in database
        if (patientUsers[patientId]) {
            if (patientUsers[patientId].password === password) {
                // Successful login
                showSuccessMessage("Welcome " + patientUsers[patientId].name + "! Redirecting...");
                
                // Store user info
                sessionStorage.setItem("currentUser", JSON.stringify({
                    id: patientId,
                    name: patientUsers[patientId].name,
                    age: patientUsers[patientId].age,
                    role: "patient"
                }));
                
                setTimeout(() => {
                    window.location.href = "patient_dashboard.html";
                }, 1000);
                
                return false;
            } else {
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "❌ Incorrect password for Patient ID: " + patientId;
                document.getElementById("patientPassword").value = "";
                document.getElementById("patientPassword").focus();
            }
        } else {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = "❌ Patient ID not found: " + patientId;
            document.getElementById("patientId").value = "";
            document.getElementById("patientPassword").value = "";
            document.getElementById("patientId").focus();
        }
        
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
        
        return false;
        
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
        return false;
    }
}

// ============================================
// SUCCESS MESSAGE DISPLAY
// ============================================
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement("div");
    successDiv.style.position = "fixed";
    successDiv.style.top = "50%";
    successDiv.style.left = "50%";
    successDiv.style.transform = "translate(-50%, -50%)";
    successDiv.style.backgroundColor = "#28a745";
    successDiv.style.color = "white";
    successDiv.style.padding = "20px 40px";
    successDiv.style.borderRadius = "10px";
    successDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    successDiv.style.zIndex = "9999";
    successDiv.style.fontSize = "18px";
    successDiv.style.fontWeight = "bold";
    successDiv.style.textAlign = "center";
    successDiv.innerHTML = "✅ " + message;
    
    document.body.appendChild(successDiv);
    
    // Remove after 1.5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 1500);
}

// ============================================
// RESET FORM FUNCTION
// ============================================
function resetForm() {
    // Clear any error messages
    const errorDivs = document.querySelectorAll('[id$="Error"]');
    errorDivs.forEach(div => {
        div.style.display = "none";
    });
}

// ============================================
// CHECK LOGIN STATUS ON PAGE LOAD
// ============================================
function checkLoginStatus() {
    const currentUser = sessionStorage.getItem("currentUser");
    const currentPage = window.location.pathname.split("/").pop();
    
    // Protected pages that require login
    const protectedPages = [
        "admin_dashboard.html",
        "doc_dashboard.html", 
        "patient_dashboard.html",
        "pat_consult.html",
        "lab_report_pat.html",
        "pat_prescription.html",
        "billing.html",
        "medicines.html",
        "pat_adm.html",
        "doc_avail_admin.html"
    ];
    
    if (protectedPages.includes(currentPage)) {
        if (!currentUser) {
            // Not logged in, redirect to login page
            window.location.href = "logins.html";
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
// ============================================
// ============================================
// CO4: API INTEGRATION - Live Doctor Availability System
// Complete Implementation with Auto-Refresh, Error Handling & Real-time Updates
// ============================================

// API Configuration
const DOCTOR_API_URL = 'https://medivogue-mock-api.vercel.app/api/doctors';
let refreshInterval = null;
let currentRefreshInterval = 30; // seconds
let isRefreshing = false;

// ============================================
// 1. MAIN API FUNCTION - Fetch Live Doctor Data
// ============================================
async function fetchDoctorAvailability() {
    // Prevent multiple simultaneous refreshes
    if (isRefreshing) {
        console.log('Already refreshing...');
        return;
    }

    try {
        isRefreshing = true;
        showRefreshingState(true);
        
        // Show loading state in table if empty
        updateTableLoadingState(true);
        
        // CO4: Fetch API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(DOCTOR_API_URL, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        clearTimeout(timeoutId);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Validate data structure
        if (!data || !data.doctors || !Array.isArray(data.doctors)) {
            throw new Error('Invalid data format received from API');
        }
        
        // CO4: Success - Update UI with live data
        updateDoctorTable(data.doctors);
        updateStatistics(data.doctors);
        updateLastUpdatedTime(data.lastUpdated);
        showAPIStatus('✅ Live data updated successfully', 'success');
        
        // Store in localStorage as backup
        localStorage.setItem('lastDoctorsData', JSON.stringify({
            doctors: data.doctors,
            timestamp: new Date().toISOString()
        }));
        
    } catch (error) {
        // CO5: Exception handling for different error types
        console.error('API Fetch Error:', error);
        
        if (error.name === 'AbortError') {
            showAPIStatus('❌ Request timeout - Server not responding', 'error');
        } else if (error.message.includes('Failed to fetch')) {
            showAPIStatus('❌ Network error - Check internet connection', 'error');
        } else {
            showAPIStatus(`❌ ${error.message}`, 'error');
        }
        
        // Try to load from cache
        loadCachedDoctorData();
        
    } finally {
        isRefreshing = false;
        showRefreshingState(false);
        updateTableLoadingState(false);
    }
}

// ============================================
// 2. UPDATE DOCTOR TABLE WITH LIVE DATA
// ============================================
function updateDoctorTable(doctors) {
    const tableBody = document.getElementById('doctorTableBody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    if (!doctors || doctors.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No doctors available</td></tr>';
        return;
    }
    
    // CO3: Array methods - forEach to create rows
    doctors.forEach((doctor, index) => {
        const row = document.createElement('tr');
        row.id = `doctor_${doctor.id || index}`;
        row.className = 'doctor-row';
        
        // Determine status with enhanced details
        const statusInfo = getDoctorStatusInfo(doctor);
        
        // Create row content
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="doctor-name">
                <i class="fas fa-user-md"></i> 
                ${doctor.name || 'Unknown'}
                ${doctor.qualification ? `<small>(${doctor.qualification})</small>` : ''}
            </td>
            <td>${doctor.department || 'General'}</td>
            <td class="status-cell ${statusInfo.class}">
                <span class="status-badge ${statusInfo.class}">
                    ${statusInfo.icon} ${statusInfo.text}
                </span>
            </td>
            <td class="patients-count">
                ${doctor.patients !== undefined ? 
                    `<span class="patient-badge ${doctor.patients > 5 ? 'high' : doctor.patients > 2 ? 'medium' : 'low'}">
                        ${doctor.patients} waiting
                    </span>` : 
                    '<span class="na">N/A</span>'
                }
            </td>
            <td class="action-buttons">
                <button class="action-btn refresh-doctor" onclick="refreshDoctor('${doctor.id}')" title="Refresh this doctor">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button class="action-btn view-stats" onclick="viewDoctorStats('${doctor.id}')" title="View statistics">
                    <i class="fas fa-chart-line"></i>
                </button>
                ${doctor.contact ? 
                    `<button class="action-btn contact-doctor" onclick="contactDoctor('${doctor.id}')" title="Contact">
                        <i class="fas fa-phone"></i>
                    </button>` : ''
                }
            </td>
        `;
        
        // Add animation class
        row.classList.add('fade-in');
        tableBody.appendChild(row);
    });
    
    // Update row count for serial numbers
    updateSerialNumbers();
}

// ============================================
// 3. DOCTOR STATUS HELPER FUNCTION
// ============================================
function getDoctorStatusInfo(doctor) {
    const status = (doctor.status || '').toLowerCase();
    const defaultInfo = { class: 'unknown', icon: '❓', text: 'Unknown' };
    
    const statusMap = {
        'available': { class: 'available', icon: '✅', text: 'Available' },
        'free': { class: 'available', icon: '✅', text: 'Available' },
        'busy': { class: 'busy', icon: '⏳', text: 'Busy' },
        'in consultation': { class: 'busy', icon: '👨‍⚕️', text: 'In Consultation' },
        'unavailable': { class: 'unavailable', icon: '❌', text: 'Not Available' },
        'not available': { class: 'unavailable', icon: '❌', text: 'Not Available' },
        'on leave': { class: 'unavailable', icon: '🏖️', text: 'On Leave' },
        'break': { class: 'busy', icon: '☕', text: 'On Break' }
    };
    
    return statusMap[status] || defaultInfo;
}

// ============================================
// 4. UPDATE STATISTICS CARDS
// ============================================
function updateStatistics(doctors) {
    const statsGrid = document.getElementById('liveStats');
    if (!statsGrid) return;
    
    // Calculate statistics
    const stats = {
        total: doctors.length,
        available: doctors.filter(d => 
            ['available', 'free'].includes((d.status || '').toLowerCase())
        ).length,
        busy: doctors.filter(d => 
            ['busy', 'in consultation', 'break'].includes((d.status || '').toLowerCase())
        ).length,
        unavailable: doctors.filter(d => 
            ['unavailable', 'not available', 'on leave'].includes((d.status || '').toLowerCase())
        ).length,
        totalPatients: doctors.reduce((sum, d) => sum + (d.patients || 0), 0),
        departments: [...new Set(doctors.map(d => d.department).filter(Boolean))].length
    };
    
    stats.availablePercent = Math.round((stats.available / stats.total) * 100) || 0;
    stats.busyPercent = Math.round((stats.busy / stats.total) * 100) || 0;
    
    // Create statistics HTML
    statsGrid.innerHTML = `
        <div class="stat-card modern" onclick="filterByStatus('all')">
            <div class="stat-icon"><i class="fas fa-users"></i></div>
            <div class="stat-content">
                <span class="stat-label">Total Doctors</span>
                <span class="stat-value">${stats.total}</span>
                <span class="stat-trend">Live count</span>
            </div>
        </div>
        
        <div class="stat-card modern available" onclick="filterByStatus('available')">
            <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
            <div class="stat-content">
                <span class="stat-label">Available</span>
                <span class="stat-value">${stats.available}</span>
                <span class="stat-trend">${stats.availablePercent}% of total</span>
            </div>
        </div>
        
        <div class="stat-card modern busy" onclick="filterByStatus('busy')">
            <div class="stat-icon"><i class="fas fa-clock"></i></div>
            <div class="stat-content">
                <span class="stat-label">Busy</span>
                <span class="stat-value">${stats.busy}</span>
                <span class="stat-trend">${stats.busyPercent}% of total</span>
            </div>
        </div>
        
        <div class="stat-card modern patients" onclick="showPatientQueue()">
            <div class="stat-icon"><i class="fas fa-procedures"></i></div>
            <div class="stat-content">
                <span class="stat-label">Patients Waiting</span>
                <span class="stat-value">${stats.totalPatients}</span>
                <span class="stat-trend">Across all doctors</span>
            </div>
        </div>
        
        <div class="stat-card modern departments">
            <div class="stat-icon"><i class="fas fa-building"></i></div>
            <div class="stat-content">
                <span class="stat-label">Departments</span>
                <span class="stat-value">${stats.departments}</span>
                <span class="stat-trend">Active departments</span>
            </div>
        </div>
        
        <div class="stat-card modern unavailable" onclick="filterByStatus('unavailable')">
            <div class="stat-icon"><i class="fas fa-times-circle"></i></div>
            <div class="stat-content">
                <span class="stat-label">Unavailable</span>
                <span class="stat-value">${stats.unavailable}</span>
                <span class="stat-trend">On leave/break</span>
            </div>
        </div>
    `;
}

// ============================================
// 5. API STATUS MESSAGE HANDLER
// ============================================
function showAPIStatus(message, type = 'info') {
    const statusDiv = document.getElementById('apiStatus');
    if (!statusDiv) return;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    statusDiv.className = `api-status ${type}`;
    statusDiv.innerHTML = `${icons[type] || ''} ${message}`;
    statusDiv.style.display = 'block';
    
    // Auto hide success messages
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.opacity = '0';
            setTimeout(() => {
                statusDiv.style.display = 'none';
                statusDiv.style.opacity = '1';
            }, 500);
        }, 3000);
    }
}

// ============================================
// 6. UPDATE LAST UPDATED TIME
// ============================================
function updateLastUpdatedTime(timestamp) {
    const lastUpdatedSpan = document.getElementById('lastUpdated');
    if (!lastUpdatedSpan) return;
    
    const date = timestamp ? new Date(timestamp) : new Date();
    const timeStr = date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    lastUpdatedSpan.innerHTML = `(Last updated: ${timeStr})`;
}

// ============================================
// 7. LOAD CACHED DATA (FALLBACK)
// ============================================
function loadCachedDoctorData() {
    const cached = localStorage.getItem('lastDoctorsData');
    
    if (cached) {
        try {
            const data = JSON.parse(cached);
            if (data.doctors && data.doctors.length > 0) {
                updateDoctorTable(data.doctors);
                updateStatistics(data.doctors);
                updateLastUpdatedTime(data.timestamp);
                showAPIStatus('⚠️ Showing cached data (offline mode)', 'warning');
            } else {
                loadFallbackDoctorData();
            }
        } catch (e) {
            loadFallbackDoctorData();
        }
    } else {
        loadFallbackDoctorData();
    }
}

// ============================================
// 8. FALLBACK DOCTOR DATA
// ============================================
function loadFallbackDoctorData() {
    const fallbackDoctors = [
        { id: 1, name: 'Dr. Meera', qualification: 'MD', department: 'Cardiology', status: 'available', patients: 3 },
        { id: 2, name: 'Dr. Tej', qualification: 'DM', department: 'Neurology', status: 'busy', patients: 5 },
        { id: 3, name: 'Dr. Arjun', qualification: 'MS', department: 'Orthopedics', status: 'unavailable', patients: 0 },
        { id: 4, name: 'Dr. Ravi', qualification: 'MD', department: 'Pediatrics', status: 'available', patients: 2 },
        { id: 5, name: 'Dr. Ananya Rao', qualification: 'MD', department: 'General Medicine', status: 'busy', patients: 4 },
        { id: 6, name: 'Dr. Priya', qualification: 'MD', department: 'Dermatology', status: 'available', patients: 1 },
        { id: 7, name: 'Dr. Kumar', qualification: 'DM', department: 'Oncology', status: 'break', patients: 2 }
    ];
    
    updateDoctorTable(fallbackDoctors);
    updateStatistics(fallbackDoctors);
    showAPIStatus('⚠️ Using demo data (offline mode)', 'warning');
}

// ============================================
// 9. REFRESH CONTROLS
// ============================================
function refreshDoctorData() {
    fetchDoctorAvailability();
}

function showRefreshingState(isRefreshing) {
    const refreshIcon = document.getElementById('refreshIcon');
    const refreshBtn = document.getElementById('manualRefreshBtn');
    
    if (refreshIcon && refreshBtn) {
        if (isRefreshing) {
            refreshIcon.classList.add('fa-spin');
            refreshBtn.disabled = true;
            refreshBtn.style.opacity = '0.6';
        } else {
            refreshIcon.classList.remove('fa-spin');
            refreshBtn.disabled = false;
            refreshBtn.style.opacity = '1';
        }
    }
}

function updateTableLoadingState(isLoading) {
    const tableBody = document.getElementById('doctorTableBody');
    if (!tableBody) return;
    
    if (isLoading && tableBody.children.length === 0) {
        tableBody.innerHTML = `
            <tr class="loading-row">
                <td colspan="6" style="text-align: center;">
                    <i class="fas fa-spinner fa-spin"></i> Fetching live data from server...
                </td>
            </tr>
        `;
    }
}

// ============================================
// 10. AUTO-REFRESH MANAGEMENT
// ============================================
function startAutoRefresh(intervalSeconds = 30) {
    stopAutoRefresh();
    currentRefreshInterval = intervalSeconds;
    refreshInterval = setInterval(fetchDoctorAvailability, intervalSeconds * 1000);
    console.log(`Auto-refresh started (every ${intervalSeconds} seconds)`);
    
    // Update status
    const statusText = document.getElementById('liveStatusText');
    if (statusText) {
        statusText.innerHTML = `Connected - Refreshing every ${intervalSeconds}s`;
    }
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
        console.log('Auto-refresh stopped');
    }
}

function changeRefreshInterval() {
    const select = document.getElementById('refreshInterval');
    const interval = parseInt(select.value);
    startAutoRefresh(interval);
    showAPIStatus(`🔄 Auto-refresh set to ${interval} seconds`, 'info');
}

// ============================================
// 11. DOCTOR ACTIONS
// ============================================
function refreshDoctor(doctorId) {
    showAPIStatus(`🔄 Refreshing data for doctor...`, 'info');
    
    // In a real app, you'd fetch just this doctor's data
    setTimeout(() => {
        // Find and highlight the doctor row
        const row = document.getElementById(`doctor_${doctorId}`);
        if (row) {
            row.style.backgroundColor = '#f0f9ff';
            setTimeout(() => {
                row.style.backgroundColor = '';
            }, 1000);
        }
        showAPIStatus(`✅ Doctor data refreshed`, 'success');
    }, 1000);
}

function viewDoctorStats(doctorId) {
    // Create a modal with doctor statistics
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3><i class="fas fa-chart-line"></i> Doctor Statistics</h3>
            <p>Doctor ID: ${doctorId}</p>
            <div class="stats-details">
                <p>📊 Today's Consultations: 12</p>
                <p>📈 Weekly Average: 8.5 patients/day</p>
                <p>⭐ Patient Rating: 4.8/5</p>
                <p>🕒 Average Wait Time: 15 mins</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function contactDoctor(doctorId) {
    alert(`📞 Calling doctor ID: ${doctorId}\nThis would open communication channel in production.`);
}

function filterByStatus(status) {
    const rows = document.querySelectorAll('#doctorTableBody tr');
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            const statusCell = row.querySelector('.status-badge');
            if (statusCell) {
                const cellClass = statusCell.className;
                if (status === 'available' && cellClass.includes('available')) {
                    row.style.display = '';
                } else if (status === 'busy' && cellClass.includes('busy')) {
                    row.style.display = '';
                } else if (status === 'unavailable' && cellClass.includes('unavailable')) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    });
}

function showPatientQueue() {
    alert('📋 Patient Queue View\nThis would show all waiting patients across departments.');
}

function updateSerialNumbers() {
    const rows = document.querySelectorAll('#doctorTableBody tr');
    rows.forEach((row, index) => {
        const firstCell = row.cells[0];
        if (firstCell) {
            firstCell.textContent = index + 1;
        }
    });
}

// ============================================
// 12. ADD DOCTOR FORM HANDLERS
// ============================================
function showAddDoctorForm() {
    const form = document.getElementById("addDoctorForm");
    if (form) {
        form.style.display = "block";
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideAddDoctorForm() {
    const form = document.getElementById("addDoctorForm");
    if (form) {
        form.style.display = "none";
        // Clear form fields
        document.getElementById("docName").value = "";
        document.getElementById("docDept").value = "";
        document.getElementById("docStatus").value = "available";
    }
}

function addNewDoctor(event) {
    event.preventDefault();
    
    try {
        const name = document.getElementById("docName").value.trim();
        const dept = document.getElementById("docDept").value;
        const status = document.getElementById("docStatus").value;
        
        if (!name || name.length < 3) {
            throw new Error("Please enter a valid doctor name");
        }
        
        // Add to table
        const tableBody = document.getElementById("doctorTableBody");
        const newRow = document.createElement('tr');
        newRow.className = 'fade-in';
        
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td><i class="fas fa-user-md"></i> Dr. ${name}</td>
            <td>${dept}</td>
            <td class="status-cell ${status}">
                <span class="status-badge ${status}">
                    ${status === 'available' ? '✅' : status === 'busy' ? '⏳' : '❌'} 
                    ${status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </td>
            <td><span class="patient-badge low">0 waiting</span></td>
            <td class="action-buttons">
                <button class="action-btn refresh-doctor"><i class="fas fa-sync-alt"></i></button>
                <button class="action-btn view-stats"><i class="fas fa-chart-line"></i></button>
            </td>
        `;
        
        tableBody.appendChild(newRow);
        hideAddDoctorForm();
        showAPIStatus(`✅ Dr. ${name} added successfully`, 'success');
        
    } catch (error) {
        showAPIStatus(`❌ ${error.message}`, 'error');
    }
}

// ============================================
// 13. CONNECTION CHECK
// ============================================
async function checkConnection() {
    const statusDiv = document.getElementById('connectionStatus');
    if (!statusDiv) return;
    
    try {
        const response = await fetch(DOCTOR_API_URL, { method: 'HEAD', timeout: 5000 });
        if (response.ok) {
            statusDiv.innerHTML = '<i class="fas fa-wifi"></i> Connected to API Server';
            statusDiv.className = 'connection-status connected';
        } else {
            throw new Error();
        }
    } catch (error) {
        statusDiv.innerHTML = '<i class="fas fa-wifi-slash"></i> Offline Mode - Using Cached Data';
        statusDiv.className = 'connection-status disconnected';
    }
}

// ============================================
// 14. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the doctor availability page
    if (window.location.pathname.includes('doc_avail_admin.html')) {
        // Check connection status
        checkConnection();
        
        // Initial fetch
        fetchDoctorAvailability();
        
        // Start auto-refresh (default 30 seconds)
        startAutoRefresh(30);
        
        // Add window focus refresh
        window.addEventListener('focus', function() {
            console.log('Window focused - refreshing data');
            fetchDoctorAvailability();
        });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', function() {
            stopAutoRefresh();
        });
    }
});

// ============================================
// 15. ERROR HANDLING UTILITY
// ============================================
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    showAPIStatus('⚠️ An unexpected error occurred', 'error');
});

// Export functions for HTML onclick handlers
window.refreshDoctorData = refreshDoctorData;
window.changeRefreshInterval = changeRefreshInterval;
window.showAddDoctorForm = showAddDoctorForm;
window.hideAddDoctorForm = hideAddDoctorForm;
window.addNewDoctor = addNewDoctor;
window.refreshDoctor = refreshDoctor;
window.viewDoctorStats = viewDoctorStats;
window.contactDoctor = contactDoctor;
window.filterByStatus = filterByStatus;
window.showPatientQueue = showPatientQueue;
window.logout = logout;