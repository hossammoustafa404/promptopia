import axios from "axios";

let baseURL = "/api/prompts";

const getSinglePrompt = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/${id}`);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch the prompt");
  }
};

export default getSinglePrompt;
