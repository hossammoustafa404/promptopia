import axios from "axios";

const baseURL = "/api/prompts";
const deleteSinglePrompt = async (id: string) => {
  try {
    const { data } = await axios(`${baseURL}/${id}`, { method: "delete" });

    return data;
  } catch (error) {

    throw new Error("Failed to delete prompt");
  }
};

export default deleteSinglePrompt;
