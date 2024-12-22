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
        notification.style.top = '50%'; // Center vertically
        notification.style.left = '50%'; // Center horizontally
        notification.style.transform = 'translate(-50%, -50%)'; // Adjust to center the notification
        notification.style.padding = 'auto';
        notification.style.backgroundColor = '#fff'; // Black background
        notification.style.color = '#000000'; // White text
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        notification.style.fontSize = '18px';
        notification.style.width = '300px';
        notification.style.height = '50px';
        notification.style.textAlign = 'center';
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
    'education-form': 2,
    'experience-form': 4,
    'project-form': 6,
    'skill-form': 8,
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

document.addEventListener('DOMContentLoaded', () => {

    function createNotification(message) {
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            notification.style.position = 'fixed';
            notification.style.top = '50%'; 
            notification.style.left = '50%'; 
            notification.style.transform = 'translate(-50%, -50%)'; 
            notification.style.paddingTop = '20px';
            notification.style.backgroundColor = '#000000'; 
            notification.style.color = '#ffffff'; 
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            notification.style.fontSize = '18px';
            notification.style.width = '300px';
            notification.style.height = '50px';
            notification.style.textAlign = 'center';
            notification.style.zIndex = '1000';
            notification.style.display = 'none';
        }

        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    const handleFormSubmission = async (event, apiEndpoint, method) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            createNotification('You must be logged in to submit the form.');
            return;
        }
        const formData = {
            userId, 
            personalInfo: {
                name: document.getElementById('name').value.trim(),
                fatherName: document.getElementById('fatherName').value.trim(),
                cnic: document.getElementById('cnic').value.trim(),
                nationality: document.getElementById('nationality').value.trim(),
                dateOfBirth: document.getElementById('dateOfBirth').value.trim(),
                maritalStatus: document.getElementById('maritalStatus').value.trim(),
                fieldTitle: document.getElementById('title').value.trim(),
                gender: document.getElementById('gender').value.trim(),
                imagePath: document.getElementById('image').files[0]?.name || '', 
                bio: document.getElementById('bio').value.trim()
            },
            education: [{
                degree: document.getElementById('degree').value.trim(),
                institution: document.getElementById('institution').value.trim(),
                city: document.getElementById('city').value.trim(),
                graduation: document.getElementById('graduation').value.trim()
            }],
            workExperience: [{
                jobTitle: document.getElementById('job-title').value.trim(),
                company: document.getElementById('company').value.trim(),
                startDate: document.getElementById('start-date').value.trim(),
                endDate: document.getElementById('end-date').value.trim(),
                jobDescription: document.getElementById('job-description').value.trim()
            }],
            projects: [{
                projectName: document.getElementById('project-name').value.trim(),
                projectSummary: document.getElementById('project-description').value.trim(),
                projectImage: document.getElementById('projectImage').files[0]?.name || '',
                projectLink: document.getElementById('project-link').value.trim()
            }],
            skills: [{
                skillName: document.getElementById('skills').value.trim(),
                skillSummary: document.getElementById('skillDescription').value.trim(),
                skillImage: document.getElementById('skillImage').files[0]?.name || '',
                level: parseInt(document.getElementById('proficiency').value.trim(), 10) || 50
            }],
            contactInfo: {
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim()
            },
            socialMedia: {
                linkedin: document.getElementById('linkedin').value.trim(),
                github: document.getElementById('github').value.trim(),
                youtube: document.getElementById('youtube').value.trim(),
                twitter: document.getElementById('twitter').value.trim(),
                instagram: document.getElementById('instagram').value.trim()
            }
        };
        
    
        try {
            const response = await fetch(apiEndpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            if (response.ok) {
                createNotification(method === 'POST' ? 'Form submitted successfully!' : 'Form updated successfully!');
                event.target.reset(); 
            } else {
                createNotification(`Error: ${result.message}`);
            }
        } catch (error) {
            createNotification(`An error occurred: ${error.message}`);
        }
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('resume-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                handleFormSubmission(e, '/submit-form', 'POST');
            });
        } else {
            console.log('Form with ID "resume-form" not found');
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('resume-update-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                handleFormSubmission(e, '/update-form', 'PUT');
            });
        } else {
            console.log('Form with ID "resume-update-form" not found');
        }
    });
        
        
});

