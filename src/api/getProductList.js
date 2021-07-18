import postToShopify from './postToShopify.js'
import Cache from './Cache'

export default async () => {
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

      if (!shopifyResponse?.products?.edges) return null
      console.log('Using 📡 fetched products list')
      Cache.set('getProductList', shopifyResponse.products.edges)
      return shopifyResponse.products.edges
    } else {
      const cachedProductList = Cache.get('getProductList')
      console.log(`Using 🏧 cached products list`)
      return cachedProductList
    }
  } catch (error) {
    console.log(error)
  }
}
