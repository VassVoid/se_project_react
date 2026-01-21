const base = "http://localhost:3002";

export const getItems = () =>
  fetch(`${base}/items`).then((r) => (r.ok ? r.json() : Promise.reject()));

export const addItem = ({ name, imageUrl, weather }) =>
  fetch(`${base}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      link: imageUrl, // ← This line converts imageUrl to link automatically
      weather,
    }),
  }).then((r) => (r.ok ? r.json() : Promise.reject()));

export const deleteItem = (_id) =>
  fetch(`${base}/items/${_id}`, { method: "DELETE" }).then((r) =>
    r.ok ? r.json() : Promise.reject()
  );
