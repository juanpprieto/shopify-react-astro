/**
 * API Endpoint
 *
 * Purpose: Fetch first 100 products of the store
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product-list', {
 *   method: 'POST'
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */

const { postToShopify } = require('./utils/postToShopify')
const Cache = require('./utils/Cache')

exports.handler = async () => {
  try {
    console.log('--------------------------------')
    console.log('Retrieving product list...')
    console.log('--------------------------------')

    if (!Cache.has('getProductList')) {
        const shopifyResponse = await postToShopify({
          query: `
            query getProductList {
              products(sortKey: TITLE, first: 100) {
                edges {
                  node {
                    id
                    handle
                    description
                    title
                    totalInventory
                    variants(first: 5) {
                      edges {
                        node {
                          id
                          title
                          quantityAvailable
                          priceV2 {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                    priceRange {
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                    images(first: 1) {
                      edges {
                        node {
                          src
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        })

      Cache.set('getProductList', shopifyResponse)

      return {
        statusCode: 200,
        body: JSON.stringify(shopifyResponse),
      }
    } else {
      const shopifyResponse = Cache.get('getProductList')
      console.log('Using cached products response')
      return {
        statusCode: 200,
        body: JSON.stringify(shopifyResponse),
      }
    }
  } catch (error) {
    console.log(error)
  }
}
