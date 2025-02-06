export interface Incident {
    id?: string;
    gender: string;
    age: string;
    education: string;
    occupation: string;
    date?: string;
    location?: string;
    impact: string;
    region: string;
    respondent_address: string;
    woreda_kebele?: string;
    zone_subcity: string;
    metrics: string;
    source?: string;
    cehro_insights: string;
    status?:string;
    approvedBy?:any;
    postedBy?:any;
    postedById?:any;
    approvedById?:any;
  }