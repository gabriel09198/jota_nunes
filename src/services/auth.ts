import api from "./api";

interface LoginResponse {
  acess: string;
  refresh: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("authentication/token/", {
    username,
    password,
  });
  return response.data;
};
