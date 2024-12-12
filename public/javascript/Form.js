const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const extraText = button.previousElementSibling; // Get the corresponding 'extra-text' element
        if (extraText.style.display === "inline") {
            extraText.style.display = "none";
            button.textContent = "Read More";
        } else {
            extraText.style.display = "inline";
            button.textContent = "Read Less";
        }
    });
});

// Create a notification element
function createNotification(message) {
    // Check if a notification already exists
    let notification = document.querySelector('.notification');
    if (!notification) {
        // Create and style the notification element
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = '#f44336'; // Red background
        notification.style.color = '#fff'; // White text
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        notification.style.fontSize = '14px';
        notification.style.zIndex = '1000';
        notification.style.display = 'none';
    }

    // Set the message and show the notification
    notification.textContent = message;
    notification.style.display = 'block';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Initialize counters for each section type
const sectionLimits = {
    'education-form': 3,
    'experience-form': 4,
    'project-form': 6,
    'skill-form': 10,
};

const sectionCounters = {
    'education-form': 1,
    'experience-form': 1,
    'project-form': 1,
    'skill-form': 1,
};

// Function to add more sections dynamically
function addMoreSection(sectionClass) {
    // Check if the section can be added based on the limit
    if (sectionCounters[sectionClass] >= sectionLimits[sectionClass]) {
        createNotification(`You can only add up to ${sectionLimits[sectionClass]} ${sectionClass.replace('-', ' ')} sections.`);
        return;
    }

    const section = document.querySelector(`.${sectionClass}`);
    if (!section) return; // Exit if no section matches

    const newSection = section.cloneNode(true);

    // Clear the cloned section's input fields
    newSection.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));

    // Remove the "Add More" button from the cloned section
    const addMoreButton = newSection.querySelector('.add-more');
    if (addMoreButton) addMoreButton.remove();

    // Append the cloned section
    section.parentNode.insertBefore(newSection, section.nextSibling);

    // Increment the section counter
    sectionCounters[sectionClass]++;
}

// Add event listeners to all "Add More" buttons
document.querySelectorAll('.add-more').forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get the section class from the button's data attribute
        const sectionClass = button.getAttribute('data-section-class');
        if (sectionClass) {
            addMoreSection(sectionClass);
        }
    });
});

// Handle form submission
document.getElementById('resume-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent page reload
    const formData = collectFormData();
    if (validateForm(formData)) {
        console.log("Form Submitted Successfully", formData);
        alert("Form submitted successfully!");
    } else {
        alert("Please fill in all required fields.");
    }
});

// Collect all form data
function collectFormData() {
    const formData = {};
    document.querySelectorAll('input, textarea, select').forEach(input => {
        formData[input.name] = input.value.trim();
    });
    return formData;
}

// Validate the form fields
function validateForm(data) {
    for (const key in data) {
        if (!data[key]) {
            console.warn(`Missing field: ${key}`);
            return false;
        }
    }
    return true;
}
