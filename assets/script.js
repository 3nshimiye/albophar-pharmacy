// ==============================
// Refill Form Handling
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const refillForm = document.getElementById("refillForm");
    const statusMessage = document.getElementById("refillStatusMessage");
    const fileInput = document.getElementById("prescriptionFile");
    const fileNameDisplay = document.getElementById("fileNameDisplay");

    // Display selected file name
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        fileNameDisplay.textContent = file ? `Selected: ${file.name}` : '';
    });

    refillForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const patientName = document.getElementById("patientName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const prescriptionDetails = document.getElementById("prescriptionDetails").value.trim();
        const preferredPickupTime = document.getElementById("pickupTime").value;

        // Validation
        if (!patientName || !phoneNumber || !prescriptionDetails || !preferredPickupTime) {
            displayStatus("Please fill out all fields.", "red");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            displayStatus("Please enter a valid 10-digit phone number.", "red");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("patientName", patientName);
        formData.append("phoneNumber", phoneNumber);
        formData.append("prescriptionDetails", prescriptionDetails);
        formData.append("preferredPickupTime", preferredPickupTime);

        if (fileInput.files[0]) {
            formData.append("prescriptionFile", fileInput.files[0]);
        }

        try {
            const res = await fetch("http://localhost:5000/api/refills", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                displayStatus(data.message || "Refill submitted successfully!", "green");
                refillForm.reset();
                fileNameDisplay.textContent = '';
            } else {
                throw new Error(data.error || "Submission failed");
            }
        } catch (err) {
            displayStatus(err.message, "red");
        }
    });

    function displayStatus(message, color) {
        statusMessage.textContent = message;
        statusMessage.style.color = color;
        statusMessage.style.display = "block";
    }
});

// ==============================
// Contact Form Handling
// ==============================

document.getElementById("contact-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        } else {
            alert("Error sending message.");
        }
    })
    .catch(error => console.error("Error:", error));
});