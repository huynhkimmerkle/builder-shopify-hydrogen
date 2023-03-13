import {Suspense} from 'react';

import {PageHeader} from '~/components';
import {NotFound, Layout} from '~/components/index.server';
import {BuilderComponent} from '~/components/BuilderComponent.client';

import {useQuery} from '@shopify/hydrogen';
import {builder} from '@builder.io/react';
import ShopifyCollection from '../components/BuilderComponent.server';

builder.init('ab7093ff986049da9a110f39ac9cd5ec');

const MODEL_NAME = 'page';

export default function Page(props: any) {
  const content = useQuery([MODEL_NAME, props.pathname], async () => {
    return await builder
      .get(MODEL_NAME, {
        userAttributes: {
          urlPath: props.pathname,
        },
      })
      .promise();
  });

  const params = new URLSearchParams(props.search);
  const isPreviewing = params.has('builder.preview');
  console.log(content);

  return (
    <div>
      {!content.data && !isPreviewing ? (
        <NotFound></NotFound>
      ) : (
        <Layout>
          <Suspense></Suspense>
          <PageHeader heading={content?.data?.data?.title}></PageHeader>
          <BuilderComponent model={MODEL_NAME} content={content?.data} />
          <ShopifyCollection content={content?.data} />
        </Layout>
      )}
    </div>
  );
}
