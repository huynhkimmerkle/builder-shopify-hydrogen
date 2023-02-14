import {builder, BuilderComponent, Builder} from '@builder.io/react';
import "@builder.io/widgets";

builder.init('3636687a3f434e1fb3bf09ca71639c49');

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


const Heading = props => (
  <h1 className="my-heading">{props.title}</h1>
)

Builder.registerComponent(Heading,
  {
    name: 'Heading',
    inputs: [{ name: 'title', type: 'text' }],
    image: 'https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png'
  }
)

export { BuilderComponent };
