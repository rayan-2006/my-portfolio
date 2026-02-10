// Get the BUY button element from DOM
const btn = document.getElementById("btn");

// Main function to handle order purchase
const buy = () => {
  // Extract user inputs from form elements
  const InputCustomerName = document.getElementById("Customer-name").value.trim();
  const inputCustomerDrink = document.getElementById("Customer-drink").value;
  const inputCustomerAddOns = document.getElementById("Customer-Add-ons").value.trim();
  const ordersTr = document.getElementById("ordersTr");

  let CustomerName = InputCustomerName || undefined;

  // Validate drink selection - required field
  if (!inputCustomerDrink) return alert("Error: Drink type is required.");

  // Parse add-ons into array if provided
  let AddOns = inputCustomerAddOns ? inputCustomerAddOns.split(",") : [];

  // Function to create and append new order row to table
  const orderCoffee = (CustomerName = "Anonymous customer", inputCustomerDrink, ...AddOns) => {
    const newOrder = document.createElement("tr");
    newOrder.innerHTML = `<td>${CustomerName}</td>
        <td>${inputCustomerDrink}</td>
        <td>${AddOns.length > 0 ? AddOns.join(" - ") : "No extras selected."}</td>`;
    ordersTr.appendChild(newOrder);
  };

  // Call order creation function
  orderCoffee(CustomerName, inputCustomerDrink, ...AddOns);

  // Reset the order form after purchase
  document.querySelector(".order-box").reset();

  // Ask user if they want to play the free order game
  let play = confirm("If you guess the number correctly, your order will be free!");

  if (play) {
    // Generate random magic number for game (1-10)
    const magicNumber = Math.floor(Math.random() * 10);
    console.log(magicNumber);

    let guessedCorrect = false;

    // Game loop: 3 attempts to guess the number
    for (let i = 1; i <= 3; i++) {
      let Guess = Number(prompt("Guess a number between 1 and 10"));

      // Validate guess input
      if (Guess < 0 || Guess > 10 || isNaN(Guess)) {
        alert("please enter a number between 1 and 10");
        continue;
      }
      // Check if user gave up
      if (Guess == 0) {
        alert(`You gave up.`);
        return;
      }

      // Check if guess is correct
      if (Guess === magicNumber) {
        alert(`Congratulations! You guessed ${magicNumber}. Your order is FREE! 🎉`);
        guessedCorrect = true;
        break;
      } else {
        // Provide hint for next guess
        let hint = Guess < magicNumber ? "too low" : "too high";
        alert(`Try again! It's ${hint}.`);
      }
    }

    // Show game over if user didn't win
    if (!guessedCorrect) {
      alert(`Game over! The magic number was ${magicNumber}. 😔`);
    }
  }
};

// Attach buy function to button click event
btn.onclick = buy;

// Get the clean button element from DOM
const tdClean = document.getElementById("clean");

// Function to clear all orders from table
const clean = () => ordersTr.innerHTML = "";

// Attach clean function to clean button click event
tdClean.onclick = clean;