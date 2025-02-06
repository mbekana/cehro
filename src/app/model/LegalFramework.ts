export interface LegalFramework {
  id?: any;
  title: string;
  scope: string;
  origin: string;
  file: File | null;
  video: File | null;
  date: string;
  category:string;
  impact: string;
  source: string;
  region: string;
  woreda_kebele:string;
  zone_subcity:string
  metrics: string;
  cehro_insights: string;
  status?:string;
  postedBy?: string;
}

