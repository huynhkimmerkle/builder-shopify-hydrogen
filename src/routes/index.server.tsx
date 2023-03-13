import {Suspense} from 'react';

import {PageHeader} from '~/components';
import {NotFound, Layout} from '~/components/index.server';
import {BuilderComponent} from '~/components/BuilderComponent.client';

import {CacheLong, gql, Seo, useQuery, useShopQuery} from '@shopify/hydrogen';
import {builder} from '@builder.io/react';

builder.init('ab7093ff986049da9a110f39ac9cd5ec');

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

    const featuredProduct = useQuery(['featured-products'], async () => {
      return await builder
        .get('featured-products', {
          entry: 'ba7028a458ab4602996ebe0aaebda760'
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
                        <BuilderComponent model='featured-products' content={featuredProduct.data} />
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