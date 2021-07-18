
export default async (handle) => {
  const postToShopify = (await import('../api/postToShopify.js')).default
  const Cache = (await import('../api/Cache.js')).default

  if (!handle) return {}

  try {
    console.log('--------------------------------')
    console.log('Retrieving product details...', handle)
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
      console.log('Using 📡 fetched product details', handle)
      console.log('Setting', `getProduct-${handle}`)
      return shopifyResponse.productByHandle

    } else {
      const cachedFullProduct = Cache.get(`getProduct-${handle}`)
      console.log(`Using 🏧 cached product details`, cachedFullProduct.handle)
      return cachedFullProduct
    }
  } catch (error) {
    console.log('error', error.message)
  }
}
