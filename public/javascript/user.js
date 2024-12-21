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
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const userData = {
                email: email,
                password: password
            };
            try {
                const response = await fetch('/api/login', {  
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),  
                });
    
                const result = await response.json();  
    
                if (response.ok) {
                    console.log(result.message);  
                    window.location.href = '/';  
                } else {
                    createNotification(result.message);
                }
            } catch (error) {
                createNotification('An error occurred during login: ' + error.message)
                }
        });
    }
        
    // deletion Form Submission
    const deleteUserForm = document.getElementById('deleteForm');
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('deleteEmail').value;
            const password = document.getElementById('deletePassword').value;
            const userData = {
                email: email,
                password: password
            };
            try {
                const response = await fetch(`/api/delete/${email}`, {  
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),  
                });
    
                const result = await response.json();  
    
                if (response.ok) {
                    console.log(result.message);  
                    createNotification('User deleted successfully');
                    window.location.href = '/signup';  
                } else {
                    createNotification(result.message);
                }
            } catch (error) {
                createNotification('An error occurred during deletion: ' + error.message)
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
                alert('Passwords do not match.');
                return;
            }

            if (email && password && securityAnswer) {
                const userData = {
                    email: email,
                    password: password,
                    securityQuestion: securityQuestion,
                    securityAnswer: securityAnswer
                };

                try {
                    const response = await fetch('/api/signup', {  
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),  
                    });

                    const result = await response.json();  

                    if (response.ok) {
                        console.log(result.message);  
                        window.location.href = '/login';  
                    } else {
                        createNotification(result.message);  
                    }
                } catch (error) {
                    createNotification('An error occurred during Signup: ' + error.message);
                }
            } else {
                createNotification('Please fill out all fields.');
            }
        });
    }


    // Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('fpEmail').value;
            const securityAnswer = document.getElementById('fpSecurityAnswer').value;
            const securityQuestion = document.getElementById('fpSecurityQuestion').value;
            const newPassword = document.getElementById('newPassword').value;

            if (email && securityAnswer && newPassword) {
                const userData = {
                    email: email,
                    password: newPassword,
                    securityQuestion: securityQuestion,
                    securityAnswer: securityAnswer
                };

                try {
                    const response = await fetch(`/api/forget/${email}`, {  
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),  
                    });

                    const result = await response.json();  

                    if (response.ok) {
                        console.log(result.message); 
                        createNotification('Password reset successful!'); 
                        window.location.href = '/login';  
                    } else {
                        createNotification(result.message); 
                    }
                } catch (error) {
                    createNotification('An error occurred during registration: ' + error.message);
                }
            } else {
                createNotification('Please complete all fields.');
            }
        });
    }

    const showForgotPassword = document.getElementById('showForgotPassword');
    if (showForgotPassword) {
        showForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/forget-password'; 
        });
    }

    const showLoginFromForgot = document.getElementById('showLoginFromForgot');
    if (showLoginFromForgot) {
        showLoginFromForgot.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login'; 
        });
    }

    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login'; 
        });
    }

    const showSignup = document.getElementById('showSignup');
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/signup'; 
        });
    }
});
