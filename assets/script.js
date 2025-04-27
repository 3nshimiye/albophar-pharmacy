// Form Validation and Modal for Refill Form
document.getElementById("refill-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form elements
    const patientName = document.getElementById("patientName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const prescriptionDetails = document.getElementById("prescriptionDetails").value;
    const pickupTime = document.getElementById("preferredPickupTime").value;

    // Basic validation
    if (!patientName || !phoneNumber || !prescriptionDetails || !pickupTime) {
        alert("Please fill out all fields.");
        return;
    }

    // Check if phone number is in correct format (simple example: must be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Show modal upon successful submission
    showModal();
});

// Modal Control
function showModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Contact Form - AJAX Submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate fields
    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    // Send data via AJAX (using Fetch API)
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