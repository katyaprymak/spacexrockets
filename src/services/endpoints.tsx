import api from "./httpService";

export const fetchRockets = async () => {
  try {
    const response = await api.get("/rockets");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching rockets:",
      error.response || error.message || error
    );
    throw error;
  }
};
