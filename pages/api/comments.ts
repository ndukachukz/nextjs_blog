// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { graphqlApi, GRAPHCMS_TOKEN } from "../../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
  const graphQlClient = new GraphQLClient(String(graphqlApi), {
    headers: {
      authorization: `Bearer ${GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQlClient.request(query, req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("ERROR CREATING COMMENT! =>", error);
    res.status(500).json({ error });
  }
}
