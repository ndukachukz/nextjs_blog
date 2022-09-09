import * as Post from "./Post.type";
import Author from "./Author.type";

type createdAt = string;

interface featuredImage {
  url: string;
}

export type { Post, Author, createdAt, featuredImage };
