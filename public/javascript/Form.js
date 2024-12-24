// Create a notification element
function createNotification(message) {
    // Check if a notification already exists
    let notification = document.getElementById('.notification');
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

    const section = document.getElementById(`.${sectionClass}`);
    if (!section) return; // Exit if no section matches

    const newSection = section.cloneNode(true);

    // Clear the cloned section's input fields
    newSection.getElementByIdAll("input, textarea").forEach((input) => (input.value = ""));

    // Remove the "Add More" button from the cloned section
    const addMoreButton = newSection.getElementById('.add-more');
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
    document.getElementByIdAll('input, textarea, select').forEach(input => {
        formData[input.name] = input.value;
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

    const handleFormSubmission = async (event, apiEndpoint, method) => {
        event.preventDefault();
        const skills = [];
        document.querySelectorAll('.skill-form').forEach(skillForm => {
            const skillData = {
                skillName: skillForm.querySelector('#skills').value,
                skillSummary: skillForm.querySelector('#skillDescription').value,
                skillImage: skillForm.querySelector('#skillImage').files[0]?.name || '',
                level: parseInt(skillForm.querySelector('#proficiency').value, 10) || 50
            };
            skills.push(skillData);
        });
        const education = [];
        document.querySelectorAll('.education-form').forEach(educationForm => {
            const educationData = {
                degree: educationForm.querySelector('#degree').value,
                institution: educationForm.querySelector('#institution').value,
                city: educationForm.querySelector('#city').value,
                graduation: educationForm.querySelector('#graduation').value
            };
            education.push(educationData);
        });
        const workExperience = [];
        document.querySelectorAll('.experience-form').forEach(experienceForm => {
            const experienceData = {
                jobTitle: experienceForm.querySelector('#job-title').value,
                company: experienceForm.querySelector('#company').value,
                startDate: experienceForm.querySelector('#start-date').value,
                endDate: experienceForm.querySelector('#end-date').value,
                jobDescription: experienceForm.querySelector('#job-description').value
            };
            workExperience.push(experienceData);
        });
        const projects = [];
        document.querySelectorAll('.project-form').forEach(projectsForm => {
            const projectsData = {
                projectName: projectsForm.querySelector('#project-name').value,
                projectSummary: projectsForm.querySelector('#project-description').value,
                projectImage: projectsForm.querySelector('#projectImage').value,
                projectLink: projectsForm.querySelector('#project-link').value
            };
            projects.push(projectsData);
        });
        const userEmail = document.getElementById('user-mail').value;
        const password = document.getElementById('password').value;
        const name= document.getElementById('name').value;
        const fatherName= document.getElementById('fatherName').value;
        const cnic= document.getElementById('cnic').value;
        const nationality= document.getElementById('nationality').value;
        const dateOfBirth= document.getElementById('dateOfBirth').value;
        const maritalStatus= document.getElementById('maritalStatus').value;
        const fieldTitle= document.getElementById('title').value;
        const gender= document.getElementById('gender').value;
        const imagePath= document.getElementById('image').files[0]?.name || ''; 
        const bio= document.getElementById('bio').value;   
        const email= document.getElementById('email').value;
        const phone= document.getElementById('phone').value;
        const address= document.getElementById('address').value;
        const linkedin= document.getElementById('linkedin').value;
        const github= document.getElementById('github').value;
        const youtube= document.getElementById('youtube').value;
        const twitter= document.getElementById('twitter').value;
        const instagram= document.getElementById('instagram').value;
        const formData = {
            user: { userEmail, password },
            personalInfo: { name, fatherName, cnic, nationality,
                dateOfBirth, maritalStatus, fieldTitle,
                gender, imagePath,  bio },
            education,
            workExperience,
            projects,
            skills,
            contactInfo: { email, phone, address },
            socialMedia: { linkedin, github, youtube, twitter, instagram }
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
                window.location.href = '/';
                createNotification(method === 'POST' ? 'Form submitted successfully!' : 'Form updated successfully!');
                event.target.reset(); 
            } else {
                createNotification(`Error: ${result.message}`);
            }
        } catch (error) {
            createNotification(`An error occurred: ${error.message}`);
        }
    };
    
        const form = document.getElementById('resume-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                handleFormSubmission(e, '/submit-form', 'POST');
            });
        } 

        const updateform = document.getElementById('resume-update-form');
        if (updateform) {
            updateform.addEventListener('submit', (e) => {
                handleFormSubmission(e, '/update-form', 'PUT');
            });
        }   
        
        // Helper function for API calls
    async function makeApiRequest(url, method, body = {}) {
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Request failed');
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
        // Account Deletion
        const deleteForm = document.getElementById('deleteForm');
        if (deleteForm) {
            deleteForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('deleteEmail').value;
                const password = document.getElementById('deletePassword').value;

                try {
                    const result = await makeApiRequest(`/delete-form/${email}`, 'DELETE', { email, password });
                    createNotification(' deleted successfully');
                    window.location.href = '/user-signup';
                } catch (error) {
                    createNotification('Deletion failed: ' + error.message);
                }
            });
        }
});

