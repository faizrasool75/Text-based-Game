const sceneContainer = document.getElementById("scene");
const descriptionContainer = document.getElementById("description");
const optionsContainer = document.getElementById("options");
const usernameInput = document.getElementById("usernameInput");
const startButton = document.getElementById("startBtn");
const quitButton = document.getElementById("quitBtn");
const greetingContainer = document.getElementById("greeting");
const timeDisplay = document.getElementById("timeDisplay");
const levelDisplay = document.getElementById("levelDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const gameInstructions = document.getElementById("gameInstructions");

let currentScene = 1;
let startTime, endTime, totalTime;
let score = 0;
let username = "";
let level = 1;

const scenes = {
  1: {
    description:
      "You wake up in a mysterious forest. You see a path leading to a clearing. What do you do?",
    options: {
      "Follow the path to the clearing": 2,
      "Explore the forest": 3,
    },
  },
  2: {
    description:
      "You reach the clearing and find a magical fountain. A voice whispers, 'Make a wish'. What do you wish for?",
    options: {
      Wisdom: 4,
      Wealth: 5,
      Adventure: 6,
    },
  },
  3: {
    description:
      "As you explore the forest, you stumble upon a hidden cave. Do you dare to enter?",
    options: {
      "Enter the cave": 7,
      "Continue exploring the forest": 8,
    },
  },
  4: {
    description:
      "You wish for wisdom and suddenly feel enlightened. You gain a deeper understanding of the world around you.",
    options: {
      "Continue your journey": 9,
    },
  },
  5: {
    description:
      "You wish for wealth and find yourself surrounded by riches. However, you realize that material possessions cannot buy happiness.",
    options: {
      "Continue your journey": 9,
    },
  },
  6: {
    description:
      "You wish for adventure and find yourself on an epic quest. Along the way, you face many challenges and learn valuable lessons.",
    options: {
      "Continue your journey": 9,
    },
  },
  7: {
    description:
      "You enter the cave and encounter a dragon. It asks you a riddle: 'What is always in front of you but can't be seen?'",
    options: {
      "The future": 10,
      "The past": 11,
      "Your nose": 12,
    },
  },
  8: {
    description:
      "You continue exploring the forest and discover a hidden treasure chest. What do you do?",
    options: {
      "Open the chest": 13,
      "Leave it alone": 14,
    },
  },
  9: {
    description:
      "As you journey further, you encounter a wise old sage who offers you guidance. What do you ask the sage?",
    options: {
      "How can I find true happiness?": 15,
      "What is the meaning of life?": 16,
      "How can I become a better person?": 17,
    },
  },
  // Updated scenes...
  10: {
    description:
      "Correct! The dragon allows you to pass. You continue your journey.",
    options: {
      "Continue your journey": 9,
    },
  },
  11: {
    description: "Incorrect! The dragon attacks you. Game over.",
    options: {},
  },
  12: {
    description: "Incorrect! The dragon laughs at your answer. Game over.",
    options: {},
  },
  13: {
    description:
      "You open the chest and find a magical artifact. You continue your journey.",
    options: {
      "Continue your journey": 9,
    },
  },
  14: {
    description:
      "You decide to leave the treasure chest alone. You continue your journey.",
    options: {
      "Continue your journey": 9,
    },
  },
  15: {
    description:
      "The sage tells you that true happiness comes from within. You must cultivate inner peace and contentment.",
    options: {
      "Thank the sage and continue your journey": 18,
    },
  },
  16: {
    description:
      "The sage tells you that the meaning of life is different for everyone. It is up to you to find your own purpose and fulfillment.",
    options: {
      "Thank the sage and continue your journey": 18,
    },
  },
  17: {
    description:
      "The sage advises you to practice kindness, compassion, and self-reflection. By improving yourself, you can positively impact the world around you.",
    options: {
      "Thank the sage and continue your journey": 18,
    },
  },
  18: {
    description:
      "Armed with the sage's wisdom, you continue your journey with renewed determination. As you walk further, you come across a crossroads. Which path do you choose?",
    options: {
      "The path of righteousness": 19,
      "The path of adventure": 20,
      "The path of self-discovery": 21,
    },
  },
  19: {
    description:
      "You choose the path of righteousness and strive to uphold moral values and principles. Your journey is filled with challenges, but you face them with integrity.",
    options: {
      "Continue your journey": 22,
    },
  },
  20: {
    description:
      "You choose the path of adventure and seek excitement and thrills. Along the way, you encounter danger and excitement at every turn.",
    options: {
      "Continue your journey": 22,
    },
  },
  21: {
    description:
      "You choose the path of self-discovery and embark on a journey of introspection and growth. You delve deep into your own psyche, uncovering hidden truths about yourself.",
    options: {
      "Continue your journey": 22,
    },
  },
  22: {
    description:
      "As you continue your journey, you encounter various challenges and obstacles. Each one tests your resolve and determination. How do you overcome them?",
    options: {
      "With courage and bravery": 23,
      "With wisdom and insight": 24,
      "With kindness and compassion": 25,
    },
  },
  23: {
    description:
      "Your courage and bravery help you overcome the challenges you face. You emerge victorious and stronger than before.",
    options: {
      "Continue your journey": 26,
    },
  },
  24: {
    description:
      "Your wisdom and insight allow you to see through the challenges and find solutions. You navigate the obstacles with ease.",
    options: {
      "Continue your journey": 26,
    },
  },
  25: {
    description:
      "Your kindness and compassion touch the hearts of others, and they offer their help in overcoming the challenges. Together, you overcome the obstacles.",
    options: {
      "Continue your journey": 26,
    },
  },
  26: {
    description:
      "With each challenge you overcome, you grow stronger and wiser. Your journey is not yet over, but you know that you have the strength and determination to face whatever lies ahead.",
    options: {
      "Continue your journey": 27, // Introduce a new scene after overcoming challenges
      "Reflect on your journey": 37, // Allow the player to reflect on their journey and end the game
    },
  },
  27: {
    description:
      "You stumble upon a hidden village in the forest. The villagers seem friendly. What do you do?",
    options: {
      "Explore the village": 28,
      "Leave the village and continue your journey": 29,
    },
  },
  28: {
    description:
      "As you explore the village, you discover a secret library filled with ancient books. What do you do?",
    options: {
      "Read one of the books": 30,
      "Leave the library and continue exploring": 29,
    },
  },
  29: {
    description:
      "You decide to leave the village and continue your journey through the forest.",
    options: {
      "Continue your journey": 22,
    },
  },
  30: {
    description:
      "You pick up a dusty old book and start reading. It contains knowledge about mythical creatures. What do you do with the book?",
    options: {
      "Keep the book for reference": 31,
      "Return the book to the library": 32,
    },
  },
  31: {
    description:
      "You decide to keep the book. As you continue your journey, you encounter a group of adventurers looking for information about mythical creatures. They offer to trade valuable items for the book.",
    options: {
      "Trade the book for valuable items": 33,
      "Refuse the offer and keep the book": 34,
    },
  },
  32: {
    description:
      "You return the book to the library. The village elder is grateful for your honesty and offers you a reward.",
    options: {
      "Accept the reward": 35,
      "Decline the reward": 36,
    },
  },
  33: {
    description:
      "You trade the book for valuable items. The adventurers thank you and continue on their journey.",
    options: {
      "Continue your journey": 22,
    },
  },
  34: {
    description:
      "You refuse the offer and keep the book. The adventurers leave disappointed, but you feel good about your decision.",
    options: {
      "Continue your journey": 22,
    },
  },
  35: {
    description:
      "You accept the reward from the village elder and receive a rare artifact that grants you special abilities.",
    options: {
      "Continue your journey": 22,
    },
  },
  36: {
    description:
      "You decline the reward, preferring the satisfaction of doing the right thing. The village elder respects your decision and wishes you luck on your journey.",
    options: {
      "Continue your journey": 22,
    },
  },
  37: {
    description: "You have reached the end of your journey. Congratulations!",
    options: {
      "Play again": 1, // Assuming scene 1 is the starting scene
      Quit: "end", // This indicates the end of the game
    },
  },
};

const visitedScenes = [];

function handleBackButton() {
  if (visitedScenes.length > 1) {
    visitedScenes.pop();
    goToScene(visitedScenes.pop());
  }
}

const backButton = document.createElement("button");
backButton.textContent = "Back";
backButton.id = "backButton";
backButton.addEventListener("click", handleBackButton);
backButton.style.display = "none";

const gameContainer = document.getElementById("game");
gameContainer.appendChild(backButton);

function showScene(sceneId) {
  const scene = scenes[sceneId];
  descriptionContainer.textContent = scene.description;
  optionsContainer.innerHTML = "";
  Object.entries(scene.options).forEach(([text, nextScene]) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => {
      visitedScenes.push(sceneId);
      goToScene(nextScene);
    });
    optionsContainer.appendChild(button);
  });
}

function goToScene(sceneId) {
  currentScene = sceneId;

  // Check if the current scene triggers a random event
  if (currentScene in randomEvents) {
    handleRandomEvent();
  }

  if (
    currentScene === 10 ||
    currentScene === 11 ||
    currentScene === 30 ||
    currentScene === 31
  ) {
    gameOver();
  } else if (currentScene === 14) {
    if (level === 1) {
      level++;
      currentScene = 27;
      updateLevel();
      updateScore(); // Update score when level changes
    }
  } else if (currentScene === 33) {
    currentScene = 28;
  } else if (currentScene === 37) {
    endGame();
  }

  // Check if the current scene is sage advice, and if so, continue the game
  if (currentScene >= 9 && currentScene <= 17) {
    showScene(currentScene);
  } else {
    showScene(currentScene); // Show the scene only if it's not sage advice
  }

  score = level * 100; // Update score when level changes
  updateScore(); // Update score display

  // Call handleRandomEvent when a random event scene is reached (for example, scene 15)
  if (currentScene === 15) {
    handleRandomEvent();
  }
}

function endGame() {
  endTime = new Date();
  totalTime = Math.floor((endTime - startTime) / 1000);

  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  const playerData = {
    username: username,
    score: score,
    totalTime: {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    },
    level: level,
  };

  const jsonString = JSON.stringify(playerData);
  savePlayerData(jsonString);

  sceneContainer.innerHTML = `
        <h2>Player: ${username}</h2>
        <p>Total Score: ${score}</p>
        <p>Total Time Spent: ${hours} hours, ${minutes} minutes, ${seconds} seconds</p>
        <p>Player data saved to JSON file.</p>
    `;

  quitButton.style.display = "none";
  backButton.style.display = "none";
  visitedScenes.length = 0; // Clear visited scenes
}

function savePlayerData(jsonString) {
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "player_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function gameOver() {
  sceneContainer.innerHTML = `
        <h2>Game Over!</h2>
        <p>You have reached a dead end.</p>
    `;

  quitButton.style.display = "none";
  backButton.style.display = "none";
}

function updateTime() {
  if (startTime) {
    const currentTime = new Date();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    timeDisplay.textContent = `Time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}

function updateLevel() {
  levelDisplay.textContent = `Level: ${level}`;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`; // Update score display
}

const randomEvents = {
  1: {
    description: "You stumble upon a hidden treasure chest. What do you do?",
    options: {
      "Open the chest": {
        outcome: "You find a valuable treasure inside!",
        scoreChange: 50, // Increase score by 50
      },
      "Ignore it and continue": {
        outcome: "You decide to leave the chest alone.",
        scoreChange: 0, // No change in score
      },
    },
  },
  2: {
    description:
      "A friendly traveler offers to share their provisions with you. What do you do?",
    options: {
      "Accept their offer": {
        outcome: "You graciously accept their offer and share a meal together.",
        scoreChange: 20, // Increase score by 20
      },
      "Decline politely": {
        outcome: "You thank them for their generosity but politely decline.",
        scoreChange: 0, // No change in score
      },
    },
  },
};

function handleRandomEvent() {
  const randomEventKeys = Object.keys(randomEvents);
  const randomEventKey =
    randomEventKeys[Math.floor(Math.random() * randomEventKeys.length)];
  const event = randomEvents[randomEventKey];

  descriptionContainer.textContent = event.description;
  optionsContainer.innerHTML = "";

  Object.entries(event.options).forEach(([text, option]) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => {
      descriptionContainer.textContent = option.outcome;
      score += option.scoreChange; // Update score based on the outcome
      updateScore(); // Update score display
      optionsContainer.innerHTML =
        '<button id="continueButton">Continue</button>';

      const continueButton = document.getElementById("continueButton");
      continueButton.addEventListener("click", () => {
        visitedScenes.push(currentScene);
        goToScene(currentScene + 1); // Continue to the next scene
      });
    });
    optionsContainer.appendChild(button);
  });
}

// Call handleRandomEvent when a random event scene is reached (for example, scene 15)
if (currentScene === 15) {
  handleRandomEvent();
}

startButton.addEventListener("click", () => {
  username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Please enter your username to start the game.");
  } else {
    greetingContainer.textContent = `Welcome, ${username}!`;
    startTime = new Date();
    usernameInput.style.display = "none";
    sceneContainer.style.display = "block";
    showScene(currentScene);
    updateLevel();
    updateScore(); // Update score display
    setInterval(updateTime, 1000);
    backButton.style.display = "inline-block";
    gameInstructions.style.display = "none";
  }
});

function resetGame() {
  currentScene = 1;
  startTime = null;
  endTime = null;
  totalTime = 0;
  score = 0;
  username = "";
  level = 1;
  greetingContainer.textContent = "";
  timeDisplay.textContent = "";
  levelDisplay.textContent = "";
  scoreDisplay.textContent = ""; // Clear score display
  usernameInput.value = "";
  usernameInput.style.display = "block";
  sceneContainer.style.display = "none";
  backButton.style.display = "none";
}

quitButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to quit?")) {
    alert("Thanks for playing!");
    resetGame();
  }
});
