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
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=Markdown`);
});
