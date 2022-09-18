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

export interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

export interface ContentType {
  text?: string;
  mimeType?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  src?: string;
  title?: string;
  width?: number;
  handle?: string;
  height?: number;
  altText?: string;
}

export interface ContentChildren {
  children: ContentType[];
  type: string;
  text?: string;
  mimeType?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  src?: string;
  title?: string;
  width?: number;
  handle?: string;
  height?: number;
  altText?: string;
}

export interface RawChildren {
  raw?: {
    children: ContentChildren[];
  };
}

export default interface Post {
  title: string;
  excerpt: string;
  featuredImage: featuredImage;
  slug: string;
  exerpt?: string;
  author: Author;
  createdAt: createdAt;
  categories?: Category[];
  content?: RawChildren;
}
