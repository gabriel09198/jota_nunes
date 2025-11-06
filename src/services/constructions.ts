import api from "./api";

import { Construction } from "@/app/types/construction";

type ConstructionInput = Omit<Construction, "id">;

export const getConstructions = async (): Promise<Construction[]> => {
  const response = await api.get("/constructions/");
  return response.data;
};

export const getConstructionById = async (
  id: number
): Promise<Construction> => {
  const response = await api.get(`/constructions/${id}/`);
  return response.data;
};

export const createConstruction = async (
  data: ConstructionInput
): Promise<Construction> => {
  const response = await api.post(`/constructions/`, data);
  return response.data;
};

export const updateConstruction = async (
  id: number,
  data: ConstructionInput
): Promise<Construction> => {
  const response = await api.put(`/constructions/${id}/`, data);
  return response.data;
};

export const deleteConstruction = async (
  id: number
): Promise<{ detail: string }> => {
  const response = await api.delete(`/constructions/${id}/`);
  return response.data;
};
