// Define an array of character elements
const characters = [
    { id: "luke", index: 0 },
    { id: "darin", index: 3 },
    { id: "c3", index: 1 },
    { id: "r1", index: 2 },
    { id: "leia", index: 4 },
    { id: "owen", index: 5 },
    { id: "beru", index: 6 },
    { id: "r5", index: 7 },
    { id: "biggs", index: 8 },
    { id: "obi", index: 9 },
];

// Attach event listeners to character elements
characters.forEach((character) => {
    const element = document.getElementById(character.id);
    element.addEventListener("click", () => {
        // Check if the element has the "show-details" class
        if (element.classList.contains("show-details")) {
            // If it has the class, remove it and display the image
            element.classList.remove("show-details");
            element.innerHTML = `<img class="img" src="star-wars-api/${character.id}.png">`;
        } else {
            // If it doesn't have the class, fetch and display character details
            fetchCharacterData(character.index)
                .then((data) => {
                    displayCharacterDetails(element, data);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    });
});

// Function to fetch character data from the API
function fetchCharacterData(index) {
    return fetch(`https://swapi.dev/api/people/${index + 1}/`)
        .then((res) => res.json())
        .then((data) => data);
}

// Function to display character details on the clicked element
function displayCharacterDetails(element, data) {
    element.classList.add("show-details"); // Add the "show-details" class
    element.innerHTML = `
        <h3>Name: ${data.name}</h3>
        <h3>Gender: ${data.gender}</h3>
        <h3>Height: ${data.height} cm</h3>
    `;
}
