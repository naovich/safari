// your-graphql-file.ts (ou un autre fichier approprié)
import { gql, GraphQLClient } from "graphql-request";

export interface GetContactEmailResponse {
  backend: {
    email: string;
  };
}

export interface AccueilResponse {
  accueil: {
    heroHaut: {
      compagnie: string;
      sousTitre: string;
      titre: string;
    };
    heroBas: {
      compagnie: string;
      sousTitre: string;
      titre: string;
    };
    items: {
      description: string;
      image: {
        url: string;
      };
      id: string;
      titre: string;
    }[];
    lieu: {
      id: string;
      titre: string;
      image: {
        url: string;
      };
    }[];
    presentation: {
      titre: string;
      description: string;
    };
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

export const getAccueil = async (): Promise<AccueilResponse> => {
  const GET_DATA = gql`
    query {
      accueil {
        heroHaut {
          nom
          compagnie
          titre
          sousTitre
        }
        heroBas {
          nom
          compagnie
          sousTitre
          titre
        }
        items {
          description
          image {
            url
          }
          id
          titre
        }
        lieu {
          id
          titre
          image {
            url
          }
        }
        presentation {
          titre
          description
        }
      }
    }
  `;
  return await client.request<AccueilResponse>(GET_DATA);
};
