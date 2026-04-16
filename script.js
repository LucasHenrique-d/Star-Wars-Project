let allCharacters = [];
let currentPage = 0;
const itemsPerPage = 10;

window.onload = async () => {
  try {
    const response = await fetch(
      "https://akabab.github.io/starwars-api/api/all.json",
    );
    allCharacters = await response.json();

    loadCharacters();
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar personagens");
  }

  document.getElementById("next-btn").addEventListener("click", loadNextPage);
  document
    .getElementById("back-btn")
    .addEventListener("click", loadPreviousPage);
};

function loadCharacters() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  const characters = allCharacters.slice(start, end);

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "cards";
    card.style.backgroundImage = `url('${character.image}')`;

    const characterNameBG = document.createElement("div");
    characterNameBG.className = "character-name-bg";

    const characterName = document.createElement("span");
    characterName.className = "character-name";
    characterName.innerText = character.name;

    characterNameBG.appendChild(characterName);
    card.appendChild(characterNameBG);

    card.onclick = () => openModal(character);

    mainContent.appendChild(card);
  });

  updateButtons();
}

function openModal(character) {
  const modal = document.getElementById("modal");
  modal.style.visibility = "visible";

  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";

  const characterImage = document.createElement("div");
  characterImage.className = "character-image";
  characterImage.style.backgroundImage = `url('${character.image}')`;

  const name = document.createElement("span");
  name.className = "character-details";
  name.innerText = `Nome: ${character.name}`;

  const height = document.createElement("span");
  height.className = "character-details";
  height.innerText = `Altura: ${character.height || "desconhecida"} cm`;

  const mass = document.createElement("span");
  mass.className = "character-details";
  mass.innerText = `Peso: ${character.mass || "desconhecido"} kg`;

  const eyeColor = document.createElement("span");
  eyeColor.className = "character-details";
  eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eyeColor)}`;

  const birthYear = document.createElement("span");
  birthYear.className = "character-details";
  birthYear.innerText = `Nascimento: ${character.birthYear || "desconhecido"}`;

  modalContent.appendChild(characterImage);
  modalContent.appendChild(name);
  modalContent.appendChild(height);
  modalContent.appendChild(mass);
  modalContent.appendChild(eyeColor);
  modalContent.appendChild(birthYear);
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function loadNextPage() {
  if ((currentPage + 1) * itemsPerPage >= allCharacters.length) return;
  currentPage++;
  loadCharacters();
}

function loadPreviousPage() {
  if (currentPage === 0) return;
  currentPage--;
  loadCharacters();
}

function updateButtons() {
  const nextButton = document.getElementById("next-btn");
  const backButton = document.getElementById("back-btn");

  backButton.disabled = currentPage === 0;
  nextButton.disabled =
    (currentPage + 1) * itemsPerPage >= allCharacters.length;

  backButton.style.visibility = currentPage === 0 ? "hidden" : "visible";
}

function convertEyeColor(eyeColor) {
  if (!eyeColor) return "desconhecida";

  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "avelã",
  };

  return cores[eyeColor.toLowerCase()] || eyeColor;
}
