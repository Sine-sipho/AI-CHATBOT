const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");

let userMessage = "";
//Funtion to create message elements
const createMessageElement = (content, className) => {
  const div = document.createElement("div");
  div.classList.add("message", className);
  div.innerHTML = content;
  return div;
};

//Handles the form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  userMessage = promptInput.value.trim();
  if (!userMessage) return;
  //Generate user message HTML and add in the chats container
  const userMessageElement = `<p class="message-text"></p>`;
  const userMessageDiv = createMessageElement(
    userMessageElement,
    "user-message"
  );
  userMessageDiv.querySelector(".message-text").textContent = userMessage;
  chatsContainer.appendChild(userMessageDiv);
};

promptForm.addEventListener("submit", handleFormSubmit);
