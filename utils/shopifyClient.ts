import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const shopifyClient = createStorefrontApiClient({
  storeDomain: 'https://gt-test-demo.myshopify.com/',
  apiVersion: '2025-07',
  publicAccessToken: '33cbf6f71edaae328c46e45c01233106'
});

export { shopifyClient }
