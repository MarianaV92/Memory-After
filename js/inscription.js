import { AuthManager } from "./authManager.js";
import { evaluatePasswordStrength } from "./validators.js";
// src https://github.com/UrstrulyBhavana/Password-Strength-Indicator/blob/master/script.js

export function initInscriptionPage() {
  const form = document.getElementById("userForm");
  //-------------
  const passwordInput = document.getElementById("userPassword");
  const strengthIndicator = document.getElementById("password-strength");

  // ----------------Fonction pour mettre à jour la force du mot de passe à la volée-----------
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = evaluatePasswordStrength(password);

    //--------- Réinitialiser la classe de l'indicateur de force-------
    strengthIndicator.className = "";
    strengthIndicator.classList.add(strength);

    // ------------------Messages de force de mot de passe---------
    const strengthMessages = {
      faible:
        "Mot de passe trop faible. Utilisez des lettres, des chiffres et des symboles.",
      moyen: "Mot de passe moyen. Essayez d'ajouter plus de complexité.",
      fort: "Mot de passe fort. Très sécurisé !",
    };

    // Appliquer la largeur en fonction de la force
    if (strength === "faible") {
      strengthIndicator.style.width = "30%";
      strengthIndicator.style.backgroundColor = "red";
    } else if (strength === "moyen") {
      strengthIndicator.style.width = "60%";
      strengthIndicator.style.backgroundColor = "orange";
    } else {
      strengthIndicator.style.width = "100%";
      strengthIndicator.style.backgroundColor = "green";
    }

    // Affichage du message de la force du mot de passe
    const strengthMessage = strengthMessages[strength];
    document.getElementById("password-strength-message").textContent =
      strengthMessage;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userName = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("userPassword").value;
    const passwordConfirm = document.getElementById("userPassword2").value;

    // ---------Utiliser AuthManager pour l'enregistrement de l'utilisateur--------
    const registrationResult = AuthManager.register(
      email,
      userName,
      password,
      passwordConfirm
    );

    if (registrationResult.success) {
      alert("Données enregistrées dans le localStorage !");
      loadPage("connexion"); /// Ne marche pas avec cette nouvelle version il faut creer un module en pplus pour la gestion des pages
    } else {
      // Les messages d'erreur sont déjà affichés par AuthManager, donc pas besoin de faire plus ici
      //console.log(registrationResult.message);
    }
  });


  const exit = document.getElementById("exit");
  exit.addEventListener("click", function (event) {
    event.preventDefault();
    AuthManager.logout();
    window.location.href = "index.html";
  });

}
