document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const voteCount = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const resetButton = document.getElementById("reset-btn");

  // Function to display character details in "detailed-info" div
  function displayCharacterDetails(character) {
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    voteCount.textContent = character.votes;
  }

  // Function to fetch characters and display them in the character bar
  function fetchAndDisplayCharacters() {
    fetch("http://localhost:3000/characters")
      .then((response) => response.json())
      .then((characters) => {
        characterBar.innerHTML = ""; // Clear existing characters

        characters.forEach((character) => {
          const characterNameSpan = document.createElement("span");
          characterNameSpan.textContent = character.name;
          characterNameSpan.addEventListener("click", () => {
            displayCharacterDetails(character);
          });
          characterBar.appendChild(characterNameSpan);
        });

        // Display the first character's details by default (if available)
        if (characters.length > 0) {
          displayCharacterDetails(characters[0]);
        }
      })
      .catch((error) => console.error(error));
  }

  // Function to handle vote submission
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes");
    const votes = parseInt(votesInput.value, 10);
    if (!isNaN(votes)) {
      // Update the displayed vote count
      const currentVotes = parseInt(voteCount.textContent, 10);
      voteCount.textContent = currentVotes + votes;

      // Clear the input field
      votesInput.value = "";
    }
  });

  // Function to handle vote reset
  resetButton.addEventListener("click", () => {
    voteCount.textContent = "0"; // Reset the displayed vote count to 0
  });

  // Fetch and display characters when the page loads
  fetchAndDisplayCharacters();
});