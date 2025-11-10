import api from "./api";
import { StandardModel } from "@/app/types/standartModels";

export const getStandardModels = async (): Promise<StandardModel[]> => {
  const response = await api.get("/standard-models/");
  return response.data;
};
