import { ApiType, shopifyApiProject } from '@shopify/api-codegen-preset';

export default {
  schema: 'https://shopify.dev/storefront-graphql-direct-proxy',
  documents: ['!node_modules', '**/*.{graphql,js,ts,jsx,tsx}'],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: '2025-07',
      outputDir: './types',
    }),
  },
};
