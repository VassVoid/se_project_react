const base = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${base}/items`).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${base}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      link: imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const deleteItem = (_id) => {
  return fetch(`${base}/items/${_id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
