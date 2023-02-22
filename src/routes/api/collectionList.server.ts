import {flattenConnection, gql, useLocalization} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';
import {CollectionConnection, Product, ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

export async function api(
  request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {

  const {data} = await queryShop<any>({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: 8
    },
    preload: true,
  });

  const collections: Collection[] = data.collections.nodes;
  console.log(data);

  return collections;
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $pageBy: Int!
  ) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`;

