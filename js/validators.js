export function isValidEmail(email) {
  const errors = [];

  // src https://www.geeksforgeeks.org/username-validation-in-js-regex/?utm_source=chatgpt.com

  if (!email) {
    errors.push("L'adresse email est requise.");
    // [a-zA-Z0-9._%+-]+ Doit contenir au moins un caractère parmi :- lettres (maj/min)- chiffres- caractères spéciaux autorisés (. _ % + -)
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.push("L'adresse email n'est pas valide.");
  }
  

  return errors.length === 0 ? true : errors;
}

export function isValidPassword(password) {
  const errors = [];

  if (password.length < 6)
    errors.push("Le mot de passe doit contenir au moins 6 caractères.");
  if (!/(?=.*[a-z])/.test(password))
    errors.push("Il doit contenir au moins une lettre minuscule.");
  if (!/(?=.*[A-Z])/.test(password))
    errors.push("Il doit contenir au moins une lettre majuscule.");
  if (!/(?=.*\d)/.test(password))
    errors.push("Il doit contenir au moins un chiffre.");
  if (!/(?=.*[@$!%*?&])/.test(password))
    errors.push("Il doit contenir au moins un caractère spécial.");

  return errors.length === 0 ? true : errors;
}

export function isValidUser(username) {
  const errors = [];

  if (!username || username.length < 3) {
    errors.push("Le nom d'utilisateur doit contenir au moins 3 caractères.");
  }

  return errors.length === 0 ? true : errors;
}

export function evaluatePasswordStrength(password) {
  let score = 0;

  // Vérifier la longueur
  if (password.length >= 8) {
    score++;
  }

  // Vérifier la présence de chiffres
  if (/\d/.test(password)) {
    score++;
  }

  // Vérifier la présence de lettres majuscules
  if (/[A-Z]/.test(password)) {
    score++;
  }

  // Vérifier la présence de caractères spéciaux
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++;
  }

  // Évaluer la force
  if (score <= 1) {
    return "faible";
  } else if (score === 2 || score === 3) {
    return "moyen";
  } else {
    return "fort";
  }
}
