import gql from "graphql-tag";

export const GET_SINGLE_CATEGORY = gql`
  query getCategories($slug: JSON!, $limit: Int, $start: Int) {
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
      nfts(limit: $limit, start: $start) {
        name
        tokenId
        tokenAddress
        previewImage {
          url
        }
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
