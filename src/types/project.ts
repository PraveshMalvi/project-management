export type Project = {
  id: string;
  title: string;
  location: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  images: string[];
  videos: string[];
};
