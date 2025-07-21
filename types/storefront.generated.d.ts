/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
  country?: StorefrontTypes.InputMaybe<StorefrontTypes.CountryCode>;
  language?: StorefrontTypes.InputMaybe<StorefrontTypes.LanguageCode>;
}>;


export type GetProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'description'>
        & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, variants: { edges: Array<{ node: { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }> } }
      ) }> } };

export type ShopQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type ShopQuery = { shop: Pick<StorefrontTypes.Shop, 'name' | 'id'> };

interface GeneratedQueryTypes {
  "\n          #graphql\n          query getProducts($first: Int!, $country: CountryCode, $language: LanguageCode)\n          @inContext(country: $country, language: $language) {\n            products(first: $first) {\n              edges {\n                node {\n                  id\n                  title # 返回翻译后的标题（如果配置了多语言）\n                  description # 返回翻译后的描述\n                  featuredImage {\n                    url\n                  }\n                  variants(first: 1) {\n                    edges {\n                      node {\n                        price {\n                          # 返回该国家的价格\n                          amount\n                          currencyCode\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        ": {return: GetProductsQuery, variables: GetProductsQueryVariables},
  "\n        #graphql\n        query shop {\n          shop {\n            name\n            id\n          }\n        }\n      ": {return: ShopQuery, variables: ShopQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
