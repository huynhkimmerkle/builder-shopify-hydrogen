import {builder, Builder, BuilderComponent} from '@builder.io/react';
import "@builder.io/widgets";
import { fetchSync } from '@shopify/hydrogen';
import { Product } from '@shopify/hydrogen/storefront-api-types';
import { Grid, ProductCard, CollectionCard} from '~/components';
import { getImageLoadingPriority } from '~/lib/const';

builder.init('3636687a3f434e1fb3bf09ca71639c49');

const ProductByCollection = ({ handle }) => {
  const products: Product[] = fetchSync('/api/productByCollectionHandle?handle='+handle).json();
  console.log(products);
  return (
    <Grid layout="products">
    {products.map((product, i) => (
      <ProductCard
        key={product.id}
        product={product}
        loading={getImageLoadingPriority(i)}
      />
    ))}
    </Grid>
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

const BestSellers = () => {
  const products: Product[] = fetchSync('/api/bestSellers').json();
  console.log(products);
  return (
    <section>
      <h2><strong>Best Sellers</strong></h2>
      <Grid layout="products">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={getImageLoadingPriority(i)}
        />
      ))}
      </Grid>
    </section>
  );
}
Builder.registerComponent(BestSellers, {
  name: 'BestSellers'
});

const CollectionList = () => {
  const collections: Collection[] = fetchSync('/api/collectionListHandle').json();
  console.log(collections, 'log in component collection list');
  return (
    <section>
      <h2><strong>Collections</strong></h2>
      <Grid items={collections.length === 3 ? 3 : 2}>
        {collections.map((collection, i) => (
          <CollectionCard
            collection={collection}
            key={collection.id}
            loading={getImageLoadingPriority(i, 2)}
          />
        ))}
      </Grid>
    </section>
  );
}
Builder.registerComponent(CollectionList, {
  name: 'CollectionList'
});

const Hyperlink = function (props: any) {
    return (
        <h1>{props.name}</h1>
    );
}
Builder.registerComponent(Hyperlink, {
    name: 'Hyperlink',
    inputs: [{ name: 'name', type: 'text' }],
    image: 'https://tabler-icons.io/static/tabler-icons/icons-png/link.png'
});

export { ProductByCollection,BuilderComponent };
