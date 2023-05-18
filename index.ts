import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// Initialize Chalk Animation
const rainbowAnimation = chalkAnimation.rainbow("Adventure Game");

// Utility function to display messages with chalk styling
const showMessage = (message: string, color: string = "white") => {
  console.log(chalk.bgCyan(message));
};

// Function to display the main menu
const showMainMenu = async () => {
  showMessage("--- Main Menu ---", "cyan");
  const { option } = await inquirer.prompt([
    {
      name: "option",
      type: "list",
      message: "What would you like to do?",
      choices: ["Start Game", "Exit"],
    },
  ]);
  return option;
};

// Function to start the game
const startGame = async () => {
  showMessage("--- Welcome to the Adventure Game ---", "green");
  showMessage("You find yourself in a dark room.");
  showMessage("There are two doors in front of you.");

  const { door } = await inquirer.prompt([
    {
      name: "door",
      type: "list",
      message: "Which door do you choose?",
      choices: ["Door 1", "Door 2"],
    },
  ]);

  showMessage(`You chose ${door}.`);

  if (door === "Door 1") {
    showMessage("You enter a room filled with treasure!");
    showMessage("But beware, there is a fierce lion guarding the treasure.");
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What do you do?",
        choices: ["Fight the lion", "Try to sneak past the lion"],
      },
    ]);
    if (action === "Fight the lion") {
      showMessage("You grab a nearby sword and bravely face the lion.");
      showMessage(
        "After a fierce battle, you defeat the lion and claim the treasure!"
      );
    } else {
      showMessage("You attempt to sneak past the lion...");
      showMessage("But the lion spots you and attacks!");
      showMessage("You manage to escape, but the treasure remains lost.");
    }
  } else {
    showMessage("You enter a room with a table.");
    showMessage("On the table, you find a shiny sword!");
    showMessage("Congratulations! You have found a powerful weapon!");
  }

  showMessage(
    "Congratulations! You have successfully completed the adventure game!",
    "green"
  );
};

// Function to prompt the user if they want to repeat the game
const askRepeat = async () => {
  const { repeat } = await inquirer.prompt([
    {
      name: "repeat",
      type: "confirm",
      message: "Do you want to play again?",
    },
  ]);
  return repeat;
};

// Function to start the adventure game
const startAdventureGame = async () => {
  showMessage("--- Adventure Game ---", "magenta");
  let shouldExit = false;
  while (!shouldExit) {
    const option = await showMainMenu();
    switch (option) {
      case "Start Game":
        await startGame();
        break;
      case "Exit":
        shouldExit = true;
        break;
      default:
        showMessage("Invalid option!", "red");
        break;
    }
    if (!shouldExit) {
      const repeat = await askRepeat();
      if (!repeat) {
        shouldExit = true;
      }
    }
  }
  rainbowAnimation.stop();
  showMessage("Exiting the program. Goodbye!", "magenta");
};

// Start the adventure game
startAdventureGame();
