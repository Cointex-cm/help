document.getElementById("telegramForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const text = `
📢 *New Form Submission*  
👤 *Name:* ${data.name}  
📧 *Email:* ${data.email}  
📞 *Phone:* ${data.phone}  
💬 *Message:*  
${data.message}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot8101442954:AAGBNz1uHe9v1dWDhMr9duIT_N33lUv-A9Y/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "8101442954",
        text: text,
        parse_mode: "Markdown"
      })
    });
    
    const result = await response.json();
    if (result.ok) {
      alert("Message sent to Telegram successfully!");
    } else {
      console.error("Telegram API error:", result);
      alert("Failed to send message. Check console for details.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Check console for details.");
  }
});
