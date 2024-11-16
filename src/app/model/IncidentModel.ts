export interface Incident {
  region: string;
  residence: string;
  gender: string;
  age_group: string;
  education: string;
  occupation: string;
  date: string;
  location?: string;
  incident_happened: {
    woreda: string;
    zone: string;
  };
  category: string;
  source_of_information: string;
}
