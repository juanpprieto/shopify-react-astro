/**
 * Get Product API Endpoint
 *
 * * Purpose: Retrieve data on a specific product
 * @param {string} itemHandle - kebab-cased-product-name
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product', {
 *   method: 'POST',
 *   body: JSON.stringify({ itemHandle: 'my-product' })
 * })
 * ```
 */

const { postToShopify } = require('./utils/postToShopify')
const Cache = require('./utils/Cache')

exports.handler = async (event) => {
  // const { itemHandle } = JSON.parse(event.body)
  const handle = event?.queryStringParameters?.handle

  try {
    console.log('--------------------------------')
    console.log('Retrieving product details...')
    console.log('--------------------------------')
    if (!Cache.has(`getProduct-${handle}`)) {
      const shopifyResponse = await postToShopify({
        query: `
          query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
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
              images(first: 2) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
        `,
        variables: {
          handle: handle,
        },
      })

      Cache.set(`getProduct-${handle}`, shopifyResponse.productByHandle)

      return {
        statusCode: 200,
        body: JSON.stringify(shopifyResponse.productByHandle),
      }
    } else {
      const cachedProductResponse = Cache.get(`getProduct-${handle}`)
      console.log('Using cached product', cachedProductResponse)
      return {
        statusCode: 200,
        body: JSON.stringify(cachedProductResponse),
      }

    }
  } catch (error) {
    console.log(error)
  }
}
