import {Builder, builder, BuilderComponent} from '@builder.io/react';
import "@builder.io/widgets";
import { fetchSync } from '@shopify/hydrogen';
import { Product } from '@shopify/hydrogen/storefront-api-types';



builder.init('5392aabdddfe455c892d9897f30391a0');

const ProductByCollection = ({ handle }) => {
  const products: Product[] = fetchSync('/api/productByCollectionHandle?handle='+handle).json();
  console.log(products);
    return (
      <div>
        {products.map((product, i) => (
         
          <h1 key={`product-${i}`}>
            {product.title}
          </h1>
        ))}
      </div>
    );
  }
  Builder.registerComponent(ProductByCollection, {
    name: 'ProductByCollection',
    inputs: [
      {
        name: 'handle',
        type: 'ShopifyCollectionHandle',
      },
    ],
  });


export { ProductByCollection,BuilderComponent };
