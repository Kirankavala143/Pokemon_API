// Function to fetch and display Pokémon image
function searchPokemon() {
  const name = document.getElementById("pokemonInput").value.toLowerCase();
  const imgBox = document.getElementById("pokemonImageBox");

  // Clear previous result
  imgBox.innerHTML = "";

  if (!name) {
    alert("Please enter a Pokémon name!");
    return;
  }

  // Use PokéAPI to fetch data
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon not found!");
      }
      return response.json();
    })
    .then(data => {
      const imageURL = data.sprites.front_default;
      const img = document.createElement("img");
      img.src = imageURL;
      img.alt = name;
      imgBox.appendChild(img);
    })
    .catch(error => {
      imgBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
