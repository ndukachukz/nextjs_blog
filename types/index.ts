import * as Post from "./Post.type";
import Author from "./Author.type";
import { ReactNode } from "react";

type createdAt = string;

interface featuredImage {
  url: string;
}

export type GetContentFragment = (
  index?: number,
  text?: any[] | string,
  obj?: Post.ContentType | Post.ContentChildren,
  type?: string
) => any | string;

export type { Post, Author, createdAt, featuredImage };
