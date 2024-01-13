import axios from "axios";

const baseURL = "https://connections-api.herokuapp.com";

//USER-related requests

export async function registerUser(newUserCreds) {
  /*
  newUserCreds = {
    "name",
    "email",
    "password",
  }
  */
  return axios.post(baseURL + "/users/signup", newUserCreds);
}

export function loginUser(userCreds) {
  /*
  userCreds = {
    "email",
    "password",
  }
  */
  return axios.post(baseURL + "/users/login", userCreds);
}

export function logoutUser(token) {
  /*
  token = valid JWS auth token
  */
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(baseURL + "/users/logout", null, config);
}

export function refreshUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(baseURL + "/users/current", config);
}

//CONTACT-related requests

export function fetchContacts(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(baseURL + "/contacts", config);
}


export function postContact(newContact, token) {
  /*
  newContact = {
    "name": "Jacob Mercer",
    "number": "761-23-96"
  }
  */
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(baseURL + "/contacts", newContact, config);
}

export function delContact(id, token) {
  const deleteURL = baseURL + "/contacts/" + id.toString();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(deleteURL, config);
}

export function patchContact(id, updatedContact, token) {
  /*
  updatedContact = same schema as for new contact
  */
  const updateURL = baseURL + "/contacts/" + id.toString();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(updateURL, updatedContact, config);
}

