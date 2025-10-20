const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");

//API Setup
const apiKey = "AIzaSyD3TU73DQZd27w1v01qIJ5FKd8VNJ7iG-M";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

let userMessage = "";
const chatHistory = [];
//Funtion to create message elements
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Make API call and generate the bot's response

async function generateResponse() {
  //Stores user messages to chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }],
  });
  try {
    //Send the chat history to the api to get a response
    const response = await fetch(apiUrl, {
      //setting methods
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: chatHistory }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);

      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

//Handles the form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  userMessage = promptInput.value.trim();
  if (!userMessage) return;
  promptInput.value = "";
  //Generate user message HTML and add in the chats container
  const userMessageElement = `<p class="message-text"></p>`;
  const userMessageDiv = createMessageElement(
    userMessageElement,
    "user-message"
  );
  userMessageDiv.querySelector(".message-text").textContent = userMessage;
  chatsContainer.appendChild(userMessageDiv);

  setTimeout(() => {
    //Generate bot message HTML and add in the chats container in 600ms
    const botMessageElement = `<img src="images/gemini-chatbot-logo.svg" alt="geminin logo" class="avatar" /><p class="message-text">Just a sec...</p>`;
    const botMessageDiv = createMessageElement(
      botMessageElement,
      "bot-message",
      "loading"
    );
    chatsContainer.appendChild(botMessageDiv);
  }, 600);

  generateResponse();
};

promptForm.addEventListener("submit", handleFormSubmit);
