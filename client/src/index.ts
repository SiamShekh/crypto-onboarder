export type Project = {
  id: number;
  userId: number;
  user: User;
  name: string;
  tagline: string;
  image: string;
  reward: string;
  task: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  solAddress: string;
  username?: string;
  connectAt: Date;
  ips: IP[];
  project: Project[];
};

export type IP = {
  id: number;
  userId: number;
  user: User;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  info: string;
  createdAt: Date;
};
