export interface Project {
  id: number
  userId: number
  name: string
  description: string
  launchDate: Date
  image: string
  reward: string
  isDelete: boolean
  createdAt: string
  updatedAt: string
}


export type User = {
  id: number;
  solAddress: string;
  username?: string;
  connectAt: Date;
  _count: {
    ProjectReferrel: number
  }
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
