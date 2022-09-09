import { Author, createdAt, featuredImage } from "./";

export interface RelatedPost {
  // name:string
  title: string;
  featuredImage: featuredImage;
  createdAt: createdAt;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}

export default interface Post {
  title: string;
  excerpt: string;
  featuredImage: featuredImage;
  slug: string;
  exerpt?: string;
  author: Author;
  createdAt: createdAt;
}
