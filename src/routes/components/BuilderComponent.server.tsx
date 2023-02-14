// Do stuff here
import {BuilderComponent, builder, Builder} from '@builder.io/react';
import { flattenConnection, gql, useShopQuery } from '@shopify/hydrogen';
import { Product } from '@shopify/hydrogen/storefront-api-types';
import { ProductCard, ProductByCollection } from '~/components';
import { getImageLoadingPriority } from '~/lib/const';
builder.init('3636687a3f434e1fb3bf09ca71639c49');

// Add custom components
//
// Builder.registerComponent(Welcome, {
//   name: 'Welcome',
// });
export default function ShopifyCollection(props: any) {

  
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
const {data} = useShopQuery({
  query: QUERY,
  variables: {
      handle: 'apparel',
      pageBy: 10
    }
});
const  newProducts: Product[] = flattenConnection<Product>(
    data?.collection?.products || data?.products || [],
  );
return (
    <div>
       {newProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            loading={getImageLoadingPriority(i)}
          />
        ))}
    </div>
  );
}


