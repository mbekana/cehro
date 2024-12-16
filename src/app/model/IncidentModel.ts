export interface Incident {
  id: number;
  region: string;
  residence: string;
  gender: string;
  age: string;
  education: string;
  occupation: string;
  date_of_incidence: string;
  location?: string;
  incident_happened: {
    woreda: string;
    zone: string;
  };
  category: string;
  source_of_information: string;
}
