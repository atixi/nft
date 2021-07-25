import gql from "graphql-tag";

export const GET_SINGLE_CATEGORY = gql`
  query getCategories($slug: JSON!) {
    categories(where: { slug: $slug }) {
      categoryName
      slug
      icon
      categoryImage {
        url
      }
      categoryBanner {
        url
      }

      nfts {
        name
        talent {
          talentName
          talentAvatar {
            url
          }
          userName
          walletAddress
        }
      }
    }
  }
`;
