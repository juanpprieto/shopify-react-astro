

export default {
  /**
    * Snowpack automatically exposes these values on `import.meta.env`
    */
  // buildOptions: {
  //   site: 'https://my-site.dev/',            // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  //   sitemap: true, // Generate sitemap (set to "false" to disable)
  // },
  // env: {
  //   NETLIFY_URL: process.env.NETLIFY ? process.env.DEPLOY_URL : 'http://localhost:8888',
  //   SHOPIFY_API_ENDPOINT: process.env.SNOWPACK_PUBLIC_SHOPIFY_API_ENDPOINT,
  //   SHOPIFY_STOREFRONT_API_TOKEN: process.env.SNOWPACK_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
  //   TEST: 'Juan'
  // },
  env: {
    TEST: 'my variable',
    NETLIFY_URL: process.env.NETLIFY
      ? process.env.DEPLOY_URL
      : 'http://localhost:8888',
  },
  plugins: ["@snowpack/plugin-dotenv"]
}
