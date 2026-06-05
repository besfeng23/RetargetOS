export interface Connector {
  id: string;
  name: string;
  description: string;
  getProfiles: () => Promise<Profile[]>;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
}