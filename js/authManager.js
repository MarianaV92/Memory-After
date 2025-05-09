import { saveUser, getUsers, setSession } from "./storageManager.js";
import { isValidEmail, isValidPassword, isValidUser } from "./validators.js";
// source https://github.com/AzamWahid/signup-login-form-local-storage/blob/main/login/login.js
// https://github.com/kartavya-rupal/login-form-using-localstorage/blob/main/registeration.html

//------------ Objet statique ------------
export const AuthManager = {
  // -------------Vérification Username + Adresse mail------------
  register(email, username, password, passwordConfirm) {
    //------------ Vérifier le nom d'utilisateur-----------------
    const userCheck = isValidUser(username);
    if (userCheck !== true) {
      alert(userCheck.join(" "));
      return { success: false };
    }

    // ------------Vérifier l'email------------------
    if (!email) {
      alert("L'adresse email est requise.");
      return { success: false };
    }
  
    if (!isValidEmail(email) ) {
      alert("Email invalide.");
      return { success: false };
    }

    // ------Vérification Mdp------
    const passwordCheck = isValidPassword(password);
    if (passwordCheck !== true) {
      alert(passwordCheck.join(" "));
      return { success: false };
    }

    // ----Vérifier l’unicité de l’email-------
    const users = getUsers(); //
    if (users.some((u) => u.email === email)) {
      //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some
      alert("Email déjà utilisé.");
      return { success: false };
    }

    //------- Vérification de la confirmation du mot de passe--------
    if (password !== passwordConfirm) {
      alert("Les mots de passe ne correspondent pas.");
      return { success: false };
    }

    //----- Créer l’utilisateur-------
    const newUser = { email, username, password };
    users.push(newUser);
    saveUser(users);
    return { success: true };
  },

  //----------- Connexion --------
  login(email, password) {
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      alert("Identifiants incorrects.");
      return { success: false };
    }
    setSession(user);
    return { success: true };
  },

  logout() {
    localStorage.removeItem("userConnexion");
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("userConnexion"));
  },
};
