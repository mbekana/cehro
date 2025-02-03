export interface AuthorityDecision {
  id?: string;
  title: string;
  scope: string;
  file: File | null;
  video?:  File | null;
  date?: string;
  origin?: string;
  impact: string;
  region: string;
  woreda_kebele?: string;
  zone_subcity: string;
  metrics: string;
  category?: string;
  summary?: string;
  source?: string;
  cehro_insights: string;
  status?:string;
}
