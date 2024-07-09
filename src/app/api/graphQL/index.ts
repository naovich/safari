// your-graphql-file.ts (ou un autre fichier approprié)
import { gql, GraphQLClient } from "graphql-request";

export interface GetContactEmailResponse {
  backend: {
    email: string;
  };
}

interface HeroProps {
  nom: string;
  compagnie: string;
  titre: string;
  sousTitre: string;
  image: {
    url: string;
    alt?: string;
  };
  liens: {
    label: string;
    scr: string;
  };
}

export interface AccueilResponse {
  accueil: {
    heroHaut: HeroProps;
    heroBas: HeroProps;
    presentation: {
      titre: string;
      description: string;
    };

    lieu: {
      id: string;
      titre: string;
      image: {
        url: string;
      };
    }[];
    titreActivite: string;
    descriptionActivite: string;
    activite: {
      id: string;
      titre: string;
      image: {
        url: string;
      };
    }[];
  };
}

export interface ProfilResponse {
  profil: {
    siteurl: string;
    email: string;
    facebook: string;
    instagram: string;
    nom: string;
    phone: string;
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
          image {
            url
            alt
          }
          liens {
            label
          }
        }
        heroBas {
          nom
          compagnie
          titre
          sousTitre
          image {
            url
            alt
          }
          liens {
            label
          }
        }

        lieu {
          id
          titre
          description
          image {
            url
          }
        }
        titreActivite
        descriptionActivite
        activite {
          id
          titre
          description
          image {
            url
          }
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

export const getProfil = async (): Promise<ProfilResponse> => {
  const GET_DATA = gql`
    query {
      profil {
        siteurl
        email
        facebook
        instagram
        nom
        phone
      }
    }
  `;
  return await client.request<ProfilResponse>(GET_DATA);
};
