import { API_BASE_URL, GET_TICKETS } from "../constants";

export const fetchTickets = () => {
  const url = `${API_BASE_URL}${GET_TICKETS}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
