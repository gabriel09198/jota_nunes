export interface Construction {
  id: number;
  project_name: string;
  location: string;
  description: string;
  referentials: number[];
  observations: string[];
  is_active: boolean;
}
