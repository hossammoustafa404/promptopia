import axios from "axios";

const getAllPrompts = async (url: string, queryObj?: any) => {
  const queryString =
    queryObj &&
    Object.keys(queryObj)
      .map((key) => {
        return `${key}=${queryObj[key]}`;
      })
      .join("&");

  if (queryString) {
    url = url + "?" + queryString;
  }

  try {
    const { data } = await axios.get(url);

    return data.prompts;
  } catch (error) {
    throw new Error("Failed to fetch prompts");
  }
};

export default getAllPrompts;
