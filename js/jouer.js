//---------  Creation d'un objet dans le JS ---------------
// ---- Les méthodes ne peuvent pas etré apppelées directement dans la classe-----
//Les méthodes de classe sont accessibles entre elles, quel que soit l’ordre dans lequel elles sont écrites dans la classe.
// La déclaration des fonctions se fait sans le  "function"

class MemoryGame {
  constructor(selector, library) {
    this.selector = selector;
    this.library = library;
    this.selectedTheme = localStorage.getItem("theme") || "extraterrestre"; // ici je vais remonter le choix de l'utilisateur via le profil stocké dans le local storage
    this.imagePaths = [];
    this.cards = [];
    this.flippedCards = [];
    this.cardsContainer = document.querySelectorAll(".card");
    this.delay = 3000;
    this.rows = parseInt(localStorage.getItem("rows")) || 4;
    this.cols = parseInt(localStorage.getItem("cols")) || 4;
  }

  // ----Récupérer la taille de la grille choisie par l'utilisateur-------
  // ------------- Méthode pour  mélanger le tableau des images
  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  //----------Methode pour recuperer les images en fonction de theme choisi KO à ce stade -----
  randomize() {
    this.imagePaths = [];
    this.library[this.selectedTheme].forEach((img) => {
      this.imagePaths.push(img, img); // Ajoute 2 copies de chaque image
    });

    // ---------Vérifier si le nombre d'images correspond à la taille de la grille-----
    const numberOfCards = this.rows * this.cols;
    if (this.imagePaths.length < numberOfCards) {
      console.error("Pas assez d'images pour remplir la grille.");
      return;
    }

    // -----------------------------Couper le tableau d'images pour correspondre à la taille de la grille
    this.imagePaths = this.imagePaths.slice(0, numberOfCards);

    // --------Mélange les images-------
    this.imagePaths = this.shuffle(this.imagePaths);
  }

  //---------- Game Board ----------
  buildGrid() {
    this.selector.style.display = "grid";
    this.selector.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.selector.style.gridAutoRows = "100px";
    this.selector.style.gap = "20px";

    let html = "";
    for (let i = 0; i < this.imagePaths.length; i++) {
      html += `
      <div class="card">
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">
        <img src="${this.imagePaths[i]}" class="card-img" />
      </div>
    </div>
  </div>
    `;
    }
    this.selector.innerHTML = html;
    //-----Pour cibler les cartes du bpalteau uniquement
    this.cards = this.selector.querySelectorAll(".card");
    //this.cards = document.querySelectorAll(".card");
    this.cards.forEach((card) => {
      // J'ajoute les écouteurs d'événement
      this.addCardListeners(card);
    });
  }

  addCardListeners(card) {
    card.addEventListener("click", () => this.flipCard(card)); // Lors du clic, appel de flipCard
  }

  // ------ FlipCard  --- je pioche une carte que je recuperer par  le selector img
  // après on le cache et en attandant on stocke l'image dans un tableau dex cartés piochés

  flipCard(card) {
    //---------- ne pas piocher que deux cartes ---------
    if (
      card.classList.contains("flipped") ||
      //  si la carte cliquée est déjà retournée.
      this.flippedCards.length >= 2
      //si deux cartes sont déjà retournées.
    ) {
      return;
    }
    this.flippedCards.push(card);
    card.classList.add("flipped");
    // si on a deux cartes de piochées on actionne la méthode checkMatrch
    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    const img1 = card1.querySelector(".card-img");
    const img2 = card2.querySelector(".card-img");
    // si la source des deux images sont identiques alors cheque
    if (img1.getAttribute("src") === img2.getAttribute("src")) {
      // je vais stocker les elements dans le tableaux flippedCards pour pouvoir les chopper dans la classe has-match
      card1.classList.add("has-match");
      card2.classList.add("has-match");
      this.flippedCards = [];
      // je Vérifie si le jeu est terminé
      const matchedCards = document.querySelectorAll(".card.has-match");
      const totalPairs = this.imagePaths.length;

      if (matchedCards.length === totalPairs) {
        this.win();
      }
    } else {
      // Les cartes ne sont pas une paire, on les retourne après un délai
      setTimeout(() => {
        //---------- si les deux cartes ne sont pas identique je retourne la carte
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        //----------- Et on réinitialise le tableau-------
        this.flippedCards = [];
      }, this.delay);
    }
  }

  win() {
    setTimeout(() => {
      const messageWin = document.getElementById("messageWin");
      alert("🎉 Vous avez gagné !");
      if (messageWin) {
        messageWin.innerHTML = `
        <div id="win" class="win-message">
          <p style="color: green; font-weight: bold;">
            🎉 Vous avez gagné !
          </p>
          <button id="rejouerBtn" style="margin-top:10px;">Rejouer</button>
        </div>
      `;
        console.log(messageWin);

        //  Bouton rejouer marche pas
        document.getElementById("rejouerBtn").addEventListener("click", () => {
          this.startGame();
          messageWin.innerHTML = ""; // Nettoie le message
        });
      }
    }, 500);
  }

  startGame() {
    // Réinitialiser le tableau de cartes et le tableau de cartes retournées
    this.flippedCards = [];
    this.randomize(); // Mélanger les images
    this.buildGrid(); // Construire le plateau de jeu
  }
}
