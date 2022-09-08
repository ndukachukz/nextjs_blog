import { Author, createdAt } from "./";

export default interface Post {
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  exerpt?: string;
  author: Author;
  createdAt: createdAt;
}
