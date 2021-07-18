import fetch from 'node-fetch'

export default async ({ query, variables }) => {
  const endpoint = __SNOWPACK_ENV__?.SNOWPACK_PUBLIC_SHOPIFY_API_ENDPOINT || import.meta.env.SNOWPACK_PUBLIC_SHOPIFY_API_ENDPOINT
  const token = __SNOWPACK_ENV__?.SNOWPACK_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || import.meta.env.SNOWPACK_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json())

    if (result.errors) {
      console.log({ errors: result.errors })
    } else if (!result || !result.data) {
      console.log({ result })
      return 'No results found.'
    }

    return result.data
  } catch (error) {
    console.log(error)
  }
}
