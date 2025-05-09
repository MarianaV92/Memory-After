import { AuthManager } from "./authManager.js";
// ------ https://www.geeksforgeeks.org/how-to-clear-session-storage-data-with-specified-session-storage-item/?utm_source=chatgpt.com

export function initProfilPage() {
  const currentUser = AuthManager.getCurrentUser();

  if (!currentUser) {
    alert("Aucun utilisateur connecté. Veuillez vous connecter.");
    return;
  }

  const username = currentUser.username;

  // Remplir les champs utilisateur
  const input = document.getElementById("username");
  if (input) {
    input.value = username;
    input.setAttribute("readonly", "true");
  }

  const email = document.getElementById("email");
  if (email) {
    email.value = currentUser.email;
    email.setAttribute("readonly", "true");
  }

  // ---------------- choix des images --------
  const select = document.getElementById("themeSelector2");
  const imagePreview = document.getElementById("imageTheme");

  const images = {
    legumes: "/medias/memory_detail.png",
    animaux: "/medias/animaux.png",
    animauxAnimés: "/medias/animes.png",
    animauxDomestiques: "/medias/domestiques.png",
  };

  select.addEventListener("click", function () {
    const value = select.value;
    if (images[value]) {
      imagePreview.src = images[value];
      imagePreview.style.display = "block";
    } else {
      imagePreview.style.display = "none";
    }
  });

  //-------- Sauvegarde du thème dans localStorage spécifique à l'utilisateur ------
  const save = document.getElementById("sumbitProfil");

  save.addEventListener("click", function (event) {
    event.preventDefault();
    const theme = document.getElementById("themeSelector2").value.trim();
    const choix = document.getElementById("memorySize").value;
    const image2 = images[theme];

    if (theme !== "choix" && choix !== "choix") {
      const profil = {
        theme,
        choix,
        image: image2,
      };

      localStorage.setItem(`profil_${username}`, JSON.stringify(profil));
      alert("Votre choix est enregistré !");
    } else {
      alert("Veuillez faire votre choix.");
    }
  });

  //------------ Récupérer le profil utilisateur enregistré -----------
  const savedProfil = localStorage.getItem(`profil_${username}`);
  if (savedProfil) {
    const profil = JSON.parse(savedProfil);
    document.getElementById("themeSelector2").value = profil.theme;
    document.getElementById("memorySize").value = profil.choix;
    imagePreview.src = profil.image;
    imagePreview.style.display = "block";
    console.log("Profil chargé pour", username, ":", profil);
  }

  //---------------------------------------------
  const exit = document.getElementById("exit");
  exit.addEventListener("click", function (event) {
    event.preventDefault();
    AuthManager.logout();
    window.location.href = "index.html";
  });
}
