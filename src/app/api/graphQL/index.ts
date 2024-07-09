// your-graphql-file.ts (ou un autre fichier approprié)
import { gql, GraphQLClient } from "graphql-request";

export interface GetContactEmailResponse {
  backend: {
    email: string;
  };
}
const endpoint = "https://graphql.datocms.com/";
const apiToken = process.env.NEXT_PUBLIC_DATO_API_TOKEN;

export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${apiToken}`,
  },
});

const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      title
      content
    }
  }
`;

export const getAllPosts = async () => {
  return await client.request(GET_ALL_POSTS);
};

export const getContactEmail = async (): Promise<GetContactEmailResponse> => {
  const GET_EMAILS = gql`
    query {
      backend {
        email
      }
    }
  `;
  return await client.request<GetContactEmailResponse>(GET_EMAILS);
};
