import axios from "axios";

export const getCurrentUser = async (token: string) => {
  return await axios.post(
    `http://localhost:8000/api/v1/users/current-user`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
