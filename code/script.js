// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");

// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `;
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }

  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

// A function to start the conversation
const greetUser = () => {
  // Here we call the function showMessage, that we declared earlier with the argument:
  // "Hello there, what's your name?" for message, and the argument "bot" for sender
  showMessage("Hello there, what's your name?", "bot");
};

const handleInput = (event) => {
  event.preventDefault();
  // Store the value in a variable so we can access it after we
  // clear it from the input
  const name = document.getElementById("user-input").value;
  showMessage(name, "user");
  document.getElementById("user-input").value = "";

  // After 1 second, show the next question by invoking the next function.
  // passing the name into it to have access to the user's name if we want
  // to use it in the next question from the bot.
  setTimeout(() => showFoodOptions(name), 1000);
};

const showFoodOptions = () => {
  showMessage(
    "What would you like to order? Please choose your tea base:",
    "bot"
  );
  document.getElementById("user-input").classList.add("hidden");
  document.querySelector(".send-btn").classList.add("hidden");
  const buttonTea = document.createElement("div");
  buttonTea.classList.add("button-tea");

  const greenTea = document.createElement("button");
  greenTea.textContent = "Green Tea";
  greenTea.addEventListener("click", () => handleFoodChoice("Green Tea"));

  const blackTea = document.createElement("button");
  blackTea.textContent = "Black Tea";
  blackTea.addEventListener("click", () => handleFoodChoice("Black Tea"));

  const milkTea = document.createElement("button");
  milkTea.textContent = "Milk Tea";
  milkTea.addEventListener("click", () => handleFoodChoice("Oolong Tea"));


  buttonTea.appendChild(greenTea);
  buttonTea.appendChild(blackTea);
  buttonTea.appendChild(milkTea);

  form.appendChild(buttonTea);
};

const handleFoodChoice = (choice) => {
  showMessage(`You chose ${choice}.`, "user");
};

// Eventlisteners goes here 👇
form.addEventListener("submit", handleInput);

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, 1000);
