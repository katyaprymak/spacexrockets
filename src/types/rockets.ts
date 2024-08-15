export interface Rocket {
  id: string;
  name: string;
  description: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  flickr_images: string[];
}
