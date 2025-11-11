import api from './api'

export interface AreaName {
  id: number;
  name: string;
}

export interface ElementType {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface Element {
  id: number;
  element_type: ElementType;
  materials: Material[];
}

export interface Area {
  id: number;
  area_name: AreaName;
  elements: Element[];
}

export const getAreas = async (): Promise<Area[]> => {
  const response = await api.get("/areas/");
  return response.data.data;
};