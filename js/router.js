/*import { MemoryGame } from "./jouer.js"; // 
import { initConnexionPage } from "./connexion.js";
import { initInscriptionPage } from "./inscription.js";
import { initProfilPage } from "./profil.js";


// ------- je cree une fonction pour inserer les contenus html dynamiquement
export function loadPage(page) {
  const contentElement = document.getElementById("content");
  contentElement.innerHTML = content[page] || "<p>Page introuvable.</p>";

  //--------------- Page jouer -----------------
  // Si la page est "jouer", on lance le jeu automatiquement
  if (page === "jouer") {
    const gameBoard = document.getElementById("gameBoard");
    const themeSelector = document.getElementById("themeSelector");
    // Crée et démarre le jeu avec les données JSON + theme
    fetch("library.json")
      .then((response) => response.json())
      .then((library) => {
        const savedTheme = localStorage.getItem("theme") || "legumes"; // fallback valeur par defaut legume
        themeSelector.value = savedTheme;
        let memoryGame = new MemoryGame(gameBoard, library);
        memoryGame.selectedTheme = savedTheme; // Appliquer le thème choisi
        //memoryGame.startGame();
        themeSelector.addEventListener("change", (event) => {
          const newTheme = event.target.value; // Obtenir le thème sélectionné
          localStorage.setItem("theme", newTheme); // Sauvegarder le thème choisi dans localStorage
          memoryGame.selectedTheme = newTheme; // Appliquer le nouveau thème
          memoryGame.startGame(); // Redémarrer le jeu avec le nouveau thème
          gameBoard.style.visibility = "visible";
          gameBoard.style.opacity = 1; // Rendre le tableau visibl
        });

        // Récupérer la taille de la grille choisie par l'utilisateur
        const gridSizeSelect = document.getElementById("memorySize2");
        gridSizeSelect.addEventListener("change", (event) => {
          const [rows, cols] = event.target.value.split("*").map(Number); // Séparer les deux dimensions
          localStorage.setItem("rows", rows);
          localStorage.setItem("cols", cols);
          memoryGame.rows = rows;
          memoryGame.cols = cols;
          memoryGame.numberOfCards = rows * cols;
          memoryGame.startGame(); // Redémarrer le jeu
        });

        // Afficher le tableau de jeu lors de la première exécution
        gameBoard.style.visibility = "visible";
        gameBoard.style.opacity = 1; // Appliquer l'animation de visibilité
        // Redémarrer le jeu lorsqu'on appuie sur "Espace"
        document.addEventListener("keydown", (event) => {
          if (event.code === "Space") {
            console.log("Espace pressée : redémarrage du jeu");
            const newGame = new MemoryGame(gameBoard, library);
            newGame.startGame();
          }
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de library.json :", error);
      });
  }

  if (page === "inscription") initInscriptionPage();
  if (page === "profil") initProfilPage();
  if (page === "connexion") initConnexionPage();
  localStorage.setItem("lastVisitedPage", page); // Enregistre la dernière page
}*/