type Furniture = {
  furniture_id: number;
  facility_id: number;
  name: string;
  created_at: string;
};

type FacilityData = {
  facility_id: number;
  name: string;
  capacity: string | null;
  description: string | null;
  picture_url: string | null;
  created_at: string;
  furniture: Furniture[] | null;
};
