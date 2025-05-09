import { AuthManager } from "./authManager.js";

// src https://github.com/Mohamed-Elfar/Login-Register-System-Using-JavaScript/blob/main/js/main.js
// https://github.com/Dhodraj/LogIn-SignUp-With-JavaScript-LocalStorage/blob/main/script.js

export function initConnexionPage() {
  const formLogin = document.getElementById("connexion");

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("userConnexion").value.trim(); // .trim enleve les espaces https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const password = document.getElementById("passwordConnexion").value;

    // ------Utiliser AuthManager pour la connexion---------
    const loginResult = AuthManager.login(email, password);

    if (loginResult.success) {
      alert("Connexion réussie !");
     // loadPage(profil); /// Ne marche pas avec cette nouvelle version
    } else {
      //------- Les messages d'erreur sont déjà affichés par AuthManager------ A verifier
      //console.log(loginResult.message);
    }
  });
  //---------------------------------------------
  const exit = document.getElementById("exit");
  exit.addEventListener("click", function (event) {
    event.preventDefault();
    AuthManager.logout();
    window.location.href = "index.html";
  });

  // ------------Vérifier si l'utilisateur est déjà connecté au chargement de la page
  const currentUser = AuthManager.getCurrentUser();
  if (currentUser) {
    const messageContainer = document.getElementById("messageConnexion");
    if (userConnexion) {
      messageContainer.innerHTML = `
    <p style="color: green; font-weight: bold;">
      ✅ Vous êtes déjà connecté en tant que <em>${currentUser.username}</em>.
    </p>
  `;
      console.log(currentUser.username);

      document.getElementById("connexion").style.display = "none";
    }
  }
}
