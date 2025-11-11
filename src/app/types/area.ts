export interface AreaName {
  id: number;
  name: string;
}

export interface Element {
  id: number;
  element_type: {
    id: number;
    name: string;
  };
  materials: string[];
}

export interface Area {
  id: number;
  area_name: AreaName;
  elements: Element[];
}