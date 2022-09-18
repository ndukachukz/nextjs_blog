import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { Post } from "../types";
import { getRecentPosts, getSimilarPosts } from "../services";
interface Props {
  categories?: Array<String> | string;
  slug?: string;
}

const PostWidget = ({ categories, slug }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<Array<Post.RelatedPost>>([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts?.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              className="align-middle rounded-full"
              height="60px"
              width="60px"
              alt={post.title}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            {
              <Link
                key={post.title}
                href={`/post/${post.slug}`}
                className="text-md"
              >
                {post.title}
              </Link>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
