// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const buttonTea = document.createElement("div");
const greenTea = document.createElement("button");
const milkTea = document.createElement("button");
const blackTea = document.createElement("button");
const jelly = document.createElement("button");
const cream = document.createElement("button");
const boba = document.createElement("button");
const yes = document.createElement("button");
const no = document.createElement("button");
let teaChoice = "";
let topping = "";

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
  buttonTea.classList.add("button-tea");

  greenTea.textContent = "Green Tea";
  greenTea.addEventListener("click", () => handleFoodChoice("Green Tea"));

  blackTea.textContent = "Black Tea";
  blackTea.addEventListener("click", () => handleFoodChoice("Black Tea"));

  milkTea.textContent = "Milk Tea";
  milkTea.addEventListener("click", () => handleFoodChoice("Milk Tea"));

  buttonTea.appendChild(greenTea);
  buttonTea.appendChild(blackTea);
  buttonTea.appendChild(milkTea);

  form.appendChild(buttonTea);
};

const handleFoodChoice = (choice) => {
  showMessage(` ${choice}.`, "user");
  showMessage(`You chose ${choice}.`, "bot");
  teaChoice = choice;
  console.log(teaChoice);

  buttonTea.removeChild(blackTea);
  buttonTea.removeChild(milkTea);
  buttonTea.removeChild(greenTea);
  setTimeout(() => toppingChoice(name), 1000);
};

const handleToppingChoice = (choice) => {
  showMessage(`${choice}.`, "user");
  showMessage(`You chose ${choice}.`, "bot");
  topping = choice;
  console.log(topping);

  buttonTea.removeChild(boba);
  buttonTea.removeChild(cream);
  buttonTea.removeChild(jelly);
  setTimeout(() => checkOut(name), 1000);
};

// Eventlisteners goes here 👇
form.addEventListener("submit", handleInput);

setTimeout(greetUser, 1000);

const toppingChoice = () => {
  showMessage(`Please choose your toppings:`, "bot");

  document.getElementById("user-input").classList.add("hidden");
  document.querySelector(".send-btn").classList.add("hidden");
  buttonTea.classList.add("button-tea");

  boba.textContent = "Boba";
  boba.addEventListener("click", () => handleToppingChoice("Boba"));

  jelly.textContent = "Jelly";
  jelly.addEventListener("click", () => handleToppingChoice("Jelly"));

  cream.textContent = "Cream";
  cream.addEventListener("click", () => handleToppingChoice("Cream"));

  buttonTea.appendChild(boba);
  buttonTea.appendChild(jelly);
  buttonTea.appendChild(cream);

  form.appendChild(buttonTea);
};

const checkOut = (choice) => {
  showMessage(`You chose ${teaChoice} with ${topping}`, "bot");
  showMessage(`Are you happy with your choice?`, "bot");
  yes.textContent = "Yes";
  yes.addEventListener("click", () => confirm("Yes"));

  no.textContent = "No";
  no.addEventListener("click", () => confirm("No"));
  buttonTea.appendChild(yes);
  buttonTea.appendChild(no);

  console.log(topping);
  console.log(teaChoice);
};

const confirm = (choice) => {
  buttonTea.removeChild(yes);
  buttonTea.removeChild(no);
  if (choice == "Yes") {
    showMessage(`Yes`, "user");
    showMessage(`Amazing! Your drink will be ready in 5 minutes`, "bot");
  } else if (choice == "No") {
    showMessage(`No`, "user");
    showMessage(`ok see you never`, "bot");
  }
  form.removeEventListener("submit", handleInput);
};
