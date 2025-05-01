document.addEventListener('DOMContentLoaded', () => {
  const chatIcon = document.getElementById('chatbot-icon');
  const chatContainer = document.getElementById('chatbot-container');
  const closeBtn = document.getElementById('close-btn');
  const sendBtn = document.getElementById('send-btn');
  const chatInput = document.getElementById('chatbot-input');
  const chatBody = document.getElementById('chatbot-body');

  chatIcon.addEventListener('click', () => {
    chatContainer.classList.remove('hidden');
    chatIcon.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
    chatIcon.style.display = 'flex';
  });

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage('user', msg);
    chatInput.value = '';
    getBotResponse(msg);
  }

  function addMessage(who, text) {
    const div = document.createElement('div');
    div.classList.add('message', who);
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function getBotResponse(input) {
    const API_KEY = 'AIzaSyAXAd4wjccEzawFlBJCVrlKbwVJEKr5QxQ'; // Replace with your Gemini key
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
      addMessage('bot', reply);
    } catch (err) {
      console.error('Error:', err);
      addMessage('bot', 'Error—please try again.');
    }
  }
});
