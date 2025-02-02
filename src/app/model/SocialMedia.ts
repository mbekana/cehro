export interface SocialMedia {
    id?: string;
    title: string;
    link?: string;
    impact: string;
    file: File | null;
    video: File | null;
    region: string;
    woreda_kebele?: string;
    zone_subcity: string;
    metrics: string;
    source?: string;
    cehro_insights: string;
    status: string;
    isDeleted?: boolean;
}
