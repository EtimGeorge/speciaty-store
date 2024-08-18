document.addEventListener('DOMContentLoaded', () => {
   // Chat Assistant functionality
   initChatAssistant();
  const menuToggle = document.getElementById('menu-toggle');
  const menuCancel = document.getElementById('menu-cancel');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
      navLinks.classList.add('active');
      menuToggle.style.display = 'none';
      menuCancel.style.display = 'flex';
  });

  menuCancel.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.style.display = 'flex';
      menuCancel.style.display = 'none';
  });
});

function initChatAssistant() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const closeChat = document.getElementById('close-chat');
  const sendMessage = document.getElementById('send-message');
  const chatMessage = document.getElementById('chat-message');
  const chatContent = document.getElementById('chat-content');

  chatToggle.addEventListener('click', () => {
      chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
  });

  closeChat.addEventListener('click', () => {
      chatBox.style.display = 'none';
  });

  sendMessage.addEventListener('click', sendChatMessage);
  chatMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
  });

  function sendChatMessage() {
      const message = chatMessage.value.trim();
      if (message) {
          appendMessage('You', message);
          chatMessage.value = '';

          fetch('/api/chat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: message }),
          })
          .then(response => response.json())
          .then(data => {
              appendMessage('Bot', data.reply);
          })
          .catch(error => {
              console.error('Error:', error);
              // Simulated fallback
              setTimeout(() => {
                  appendMessage('Bot', 'Thank you for your message. We will get back to you shortly.');
              }, 1000);
          });
      }
  }

  function appendMessage(sender, message) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `${sender}: ${message}`;
      chatContent.appendChild(messageElement);
      chatContent.scrollTop = chatContent.scrollHeight;
  }
}