

export interface Video {
  id?: number;
  slug?: string;
  title: string;
  description: string;
  poster: File | Blob | null | string;
  posterLink?: string | null;
  link: File | Blob | null | string;
  videoLink?: string | null;
  author?: string;
  category: string;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
