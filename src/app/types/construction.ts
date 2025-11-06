export interface Construction {
  id: number;
  project_name: string;
  location: string;
  description: string;
  referentials: number[];
  observations: number[];
  is_active: boolean;
}
