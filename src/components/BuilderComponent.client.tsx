import {Builder, builder, BuilderComponent} from '@builder.io/react';
import "@builder.io/widgets";



builder.init('5392aabdddfe455c892d9897f30391a0');

const ProductShopify = ({ product }) => {
    return (
      <div>
          <h1>
            this is a product handle: "<strong>{product}</strong>"
            need to find a way to use this handle
          </h1>
     
      </div>
    );
  }
  Builder.registerComponent(ProductShopify, {
    name: 'ProductShopify',
    inputs: [
      {
        name: 'product',
        type: 'ShopifyProductHandle',
      },
    ],
  });


export { BuilderComponent };
