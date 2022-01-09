import { AppState } from "./AppStateContext";
export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .catch(console.log);
};

export const load = () => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`).then(
    (res) => res.json() as Promise<AppState>
  );
};
