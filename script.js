document.getElementById("telegramForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const text = `
  📢 *New Form Submission*  
  👤 **Name:** ${data.name}  
  📧 **Email:** ${data.email}  
  📞 **Phone:** ${data.phone}  
  💬 **Message:**  
  ${data.message}
  `;

  // Send to Telegram (with Markdown formatting)
  fetch(`https://api.telegram.org/bot8101442954:AAGBNz1uHe9v1dWDhMr9duIT_N33lUv-A9Y/sendMessage?chat_id=8101442954&text=${encodeURIComponent(text)}&parse_mode=Markdown`);
});
