//-------- https://www.geeksforgeeks.org/javascript-localstorage/

export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function saveUser(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function setSession(user) {
  localStorage.setItem("userConnexion", JSON.stringify(user));
}

export function getSession() {
  return JSON.parse(localStorage.getItem("userConnexion"));
}

export function clearSession() {
  localStorage.removeItem("userConnexion");
}
