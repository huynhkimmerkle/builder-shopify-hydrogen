import {Suspense} from 'react';

import {PageHeader} from '~/components';
import {NotFound, Layout} from '~/components/index.server';
import {BuilderComponent} from '~/components/BuilderComponent.client';

import {CacheLong, gql, Seo, useQuery, useShopQuery} from '@shopify/hydrogen';
import {builder} from '@builder.io/react';

builder.init('3636687a3f434e1fb3bf09ca71639c49');

const MODEL_NAME = 'page';

export default function Homepage(props: any) {
    console.log('Homepage builder', props.pathname);
    const content = useQuery([MODEL_NAME, '/'], async () => {
      return await builder
        .get(MODEL_NAME, {
          userAttributes: {
            urlPath: props.pathname,
          },
        })
        .promise();
    });

    const featuredProduct = useQuery(['product-hero'], async () => {
      return await builder
        .get('product-hero', {
          entry: '2c872f07f1c5432e9ef8116c8e95f11d'
        })
        .promise();
    });

    const params = new URLSearchParams(props.search);
    const isPreviewing = params.has('builder.preview');
    //console.log('get content builder homepage', JSON.stringify(content));

    return (
        <div>
            {!content.data && !isPreviewing ? (
                <NotFound></NotFound>
            ) : (
                <Layout>
                    <Suspense>
                        <SeoForHomepage />
                    </Suspense>
                    <Suspense>
                        <BuilderComponent model={MODEL_NAME} content={content?.data} />
                        <BuilderComponent model='product-hero' content={featuredProduct.data} />
                    </Suspense>
                </Layout>
            )}
        </div>
    );
}
function SeoForHomepage() {
    const {
        data: {
            shop: {title, description},
        },
    } = useShopQuery({
        query: HOMEPAGE_SEO_QUERY,
        cache: CacheLong(),
        preload: true,
    });

    return (
        <Seo
            type="homepage"
            data={{
                title,
                description,
                titleTemplate: '%s · Powered by Hydrogen',
            }}
        />
    );
}
const HOMEPAGE_SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      title: name
      description
    }
  }
`;