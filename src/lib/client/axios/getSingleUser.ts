import axios from "axios";

let baseURL = "/api/users";

const getSingleUser = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseURL}/${id}`);

    return data.user;
  } catch (error) {
    throw new Error("Failed to fetch the user");
  }
};

export default getSingleUser;
