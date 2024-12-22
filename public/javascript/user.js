document.addEventListener('DOMContentLoaded', () => {
    // Helper function for notifications
    function createNotification(message) {
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            Object.assign(notification.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                fontSize: '18px',
                width: '300px',
                textAlign: 'center',
                zIndex: '1000',
                display: 'none',
            });
        }
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => (notification.style.display = 'none'), 3000);
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

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const result = await makeApiRequest('/login', 'POST', { email, password });
                createNotification(result.message);
                localStorage.setItem('userId', result.userId);
                window.location.href = '/';
            } catch (error) {
                createNotification('Login failed: ' + error.message);
            }
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const securityQuestion = document.getElementById('signupSecurityQuestion').value;
            const securityAnswer = document.getElementById('signupSecurityAnswer').value;

            if (password !== confirmPassword) {
                createNotification('Passwords do not match.');
                return;
            }

            try {
                const result = await makeApiRequest('/signup', 'POST', {
                    email,
                    password,
                    securityQuestion,
                    securityAnswer,
                });
                createNotification(result.message);
                window.location.href = '/user-login';
            } catch (error) {
                createNotification('Signup failed: ' + error.message);
            }
        });
    }

    // Account Deletion
    const deleteUserForm = document.getElementById('deleteForm');
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('deleteEmail').value;
            const password = document.getElementById('deletePassword').value;

            try {
                const result = await makeApiRequest(`/delete/${email}`, 'DELETE', { email, password });
                createNotification('User deleted successfully');
                window.location.href = '/user-signup';
            } catch (error) {
                createNotification('Deletion failed: ' + error.message);
            }
        });
    }

    // Password Reset
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('fpEmail').value;
            const securityQuestion = document.getElementById('fpSecurityQuestion').value;
            const securityAnswer = document.getElementById('fpSecurityAnswer').value;
            const newPassword = document.getElementById('newPassword').value;

            try {
                const result = await makeApiRequest(`/forget/${email}`, 'PUT', {
                    email,
                    securityQuestion,
                    securityAnswer,
                    newPassword,
                });
                createNotification('Password reset successful!');
                window.location.href = '/user-login';
            } catch (error) {
                createNotification('Password reset failed: ' + error.message);
            }
        });
    }

    // Navigation Handlers
    const navigationLinks = {
        showForgotPassword: '/user-forget-password',
        showLoginFromForgot: '/user-login',
        showLogin: '/user-login',
        showSignup: '/user-signup',
    };

    Object.entries(navigationLinks).forEach(([id, href]) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = href;
            });
        }
    });
});
