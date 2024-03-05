type Reservation = {
  reservation_id: number;
  facility_id: number;
  facility_name: string;
  reservation_date: Date;
  remark: string | null;
  reservation_furniture: {
    furniture_id: number;
    name: string;
  }[];
  created_at: string;
};
