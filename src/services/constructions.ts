import api from "./api";

export const getConstructions = async () => {
  const response = await api.get("/constructions/");
  return response.data;
};

export const getConstructionById = async (id: number) => {
  const response = await api.get(`/constructions/${id}/`);
  return response.data;
};

export const createConstruction = async (data: any) => {
  const response = await api.post(`/constructions/`, data);
  return response.data;
};

export const updateConstruction = async (id: number, data: any) => {
  const response = await api.put(`/constructions/${id}/`, data);
  return response.data;
};

export const deleteConstruction = async (id: number) => {
  const response = await api.delete(`/constructions/${id}/`);
  return response.data;
};
