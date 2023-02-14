import {Suspense} from 'react';
import {useShopQuery, useLocalization, gql, Seo} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

import {PageHeader, Section, Grid} from '~/components';
import {Layout, CollectionCard} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

import {BuilderComponent} from '~/components/BuilderComponent.client';
import {builder} from '@builder.io/react';
import {useQuery} from '@shopify/hydrogen';

builder.init('3636687a3f434e1fb3bf09ca71639c49');

const MODEL_NAME = 'product-hero';

export default function Collections() {

    const hero = useQuery([MODEL_NAME], async () => {
      return await builder
        .get(MODEL_NAME, {
          entry: '2c872f07f1c5432e9ef8116c8e95f11d'
        })
        .promise();
    });

  return (
    <Layout>
      <BuilderComponent model={MODEL_NAME} content={hero.data} />
      <Seo type="page" data={{title: 'All Collections'}} />
      <PageHeader heading="Collections" />
      <Section>
        <Suspense>
          <CollectionGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function CollectionGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery<any>({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: PAGINATION_SIZE,
      country: countryCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections: Collection[] = data.collections.nodes;

  return (
    <Grid items={collections.length === 3 ? 3 : 2}>
      {collections.map((collection, i) => (
        <CollectionCard
          collection={collection}
          key={collection.id}
          loading={getImageLoadingPriority(i, 2)}
        />
      ))}
    </Grid>
  );
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
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
