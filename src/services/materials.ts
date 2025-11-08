import api from "./api";
import { Material } from "@/app/types/material";

type MaterialInput = Omit<Material, "id">;

export const getMaterials = async (): Promise<Material[]> => {
  const response = await api.get("/materials/");
  return response.data;
};

export const getMaterialById = async (id: number): Promise<Material> => {
  const response = await api.get(`/materials/${id}/`);
  return response.data;
};

export const createMaterial = async (
  data: MaterialInput
): Promise<Material> => {
  const response = await api.post("/materials/", data);
  return response.data;
};

export const updateMaterial = async (
  id: number,
  data: MaterialInput
): Promise<Material> => {
  const response = await api.put(`/materials/${id}/`, data);
  return response.data;
};

export const deleteMaterial = async (
  id: number
): Promise<{ detail: string }> => {
  const response = await api.delete(`/materials/${id}/`);
  return response.data;
};
