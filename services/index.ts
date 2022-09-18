import { request, gql } from "graphql-request";
import { graphqlApi } from "../constants";

console.log({ graphqlApi });

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              createdAt
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  try {
    const res = await request(String(graphqlApi), query);

    return res.postsConnection.edges;
  } catch (error) {
    console.log("ERROR getPosts =>", error);
  }
};
export const getPostDetails = async (slug?: string | string[]) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          createdAt
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  try {
    const res = await request(String(graphqlApi), query, { slug });

    console.log({ service_post: await res.post });
    return res.post;
  } catch (error) {
    console.log("ERROR getPosts =>", error);
  }
};

/**
 * getRecentPosts
 */
export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(orderBy: createdAt_ASC
    last:3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
  }
  `;
  try {
    const res = await request(String(graphqlApi), query);

    return res.posts;
  } catch (error) {
    console.log("ERROR getRecentPosts =>", error);
  }
};

export const getSimilarPosts = async (
  categories?: Array<String> | string,
  slug?: string
) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  try {
    const res = await request(String(graphqlApi), query, { slug, categories });

    return res.posts;
  } catch (error) {
    console.log("ERROR GET SIMILAR POSTS =>", error);
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  try {
    const res = await request(String(graphqlApi), query);
    return res.categories;
  } catch (error: any) {
    console.log("ERROR getCategories =>", { error });
  }
};

export const submitComment = async (obj: {
  name: string;
  email: string;
  comment: string;
  slug: string | undefined;
}) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });

  return result.json();
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        comment
        createdAt
      }
    }
  `;

  try {
    const result = await request(String(graphqlApi), query, { slug });

    return result.comments;
  } catch (error) {
    console.log("ERROR GETTING COMMENTS =>", error);
  }
};
