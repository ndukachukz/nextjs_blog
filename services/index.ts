import { request, gql } from "graphql-request";

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
console.log({ graphqlApi });

export const getPost = async () => {
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

  const res = await request(String(graphqlApi), query);

  return res.postsConnection.edges;
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
  const res = await request(String(graphqlApi), query);

  return res.posts;
};

export const getSimilarPosts = async (
  categories?: Array<String> | string,
  slug?: string
) => {
  const query = gql`
  query GetPostDetails($slug: String!, $categories: [String!]){
    posts(
      where: {slug_not:$slug, AND: [categories_some: {slug_in: $categories}]}
    last: 3
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
  const res = await request(String(graphqlApi), query);

  return res.posts;
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
    console.log({ error });
  }
};
