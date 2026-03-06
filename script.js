// ============================================
// MEDIVOGUE HOSPITAL - COMPLETE SCRIPT.JS
// Includes: Event Handlers, DOM Manipulation, Exception Handling
// ============================================

// ==================== 1. DATE & TIME DISPLAY ====================
function updateDateTime() {
    try {
        const now = new Date();
        const dateTimeElement = document.getElementById("dateTime");
        if (dateTimeElement) {
            dateTimeElement.innerHTML = now.toDateString() + " | " + now.toLocaleTimeString();
        }
    } catch (error) {
        console.error("Error updating date/time:", error);
    }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ==================== 2. EVENT HANDLERS ====================

// Book Appointment Handler
function bookappointment() {
    try {
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
        cards.forEach(card => {
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
        if (!pdfFile) {
            throw new Error("Report file not found");
        }
        
        // Open in new tab
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
        let rows = document.querySelectorAll("#medicineTable tr");

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
        
        if (!phone.value || !phone.value.match(/^[0-9]{10}$/)) {
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