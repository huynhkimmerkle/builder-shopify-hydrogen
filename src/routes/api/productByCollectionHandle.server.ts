import {flattenConnection, gql} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';
import {CollectionConnection, Product, ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function api(
  request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
 const url = new URL(request.url);
 const handle = url.searchParams.get('handle');
  const {
    data: {collection},
  } = await queryShop<{
    collection: CollectionConnection;
    
  }>({
    query: QUERY,
    variables: {
        handle,
        pageBy: 10
    },
  });

  const  newProducts: Product[] = flattenConnection<Product>(
    collection?.products || products || [],
  );
  return newProducts;
}

const QUERY = gql`
  query collectionByHandle(
    $handle: String!
    $pageBy: Int
    ) {
        collection(handle: $handle) {
            id
            title
            description
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
            products(first: $pageBy) {
                edges {
                  cursor
                  node {
                    id
                    title
                    publishedAt
                    handle
                    variants(first: 1) {
                      nodes {
                        id
                        image {
                          url
                          altText
                          width
                          height
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                        compareAtPriceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
          }
}`;

