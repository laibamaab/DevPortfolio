// Handle form submissions and basic validation
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email && password) {
                alert('Login successful!');
                // Add actual login logic here (e.g., API calls)
            } else {
                alert('Please enter valid credentials.');
            }
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const securityAnswer = document.getElementById('signupSecurityAnswer').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (email && password && securityAnswer) {
                alert('Signup successful!');
                // Add actual signup logic here
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

    // Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('fpEmail').value;
            const securityAnswer = document.getElementById('fpSecurityAnswer').value;
            const newPassword = document.getElementById('newPassword').value;

            if (email && securityAnswer && newPassword) {
                alert('Password reset successful!');
                // Add actual password reset logic here
            } else {
                alert('Please complete all fields.');
            }
        });
    }

    // Page Navigation between forms
    const showForgotPassword = document.getElementById('showForgotPassword');
    if (showForgotPassword) {
        showForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/forget-password'; // Redirect to Forget Password page
        });
    }

    const showLoginFromForgot = document.getElementById('showLoginFromForgot');
    if (showLoginFromForgot) {
        showLoginFromForgot.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login'; // Redirect back to Login page
        });
    }

    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login'; // Redirect to Login page from Signup
        });
    }

    const showSignup = document.getElementById('showSignup');
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/signup'; // Redirect to Signup page from Login
        });
    }
});
