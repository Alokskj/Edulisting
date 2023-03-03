import SanityClient from "@sanity/client";

const client = SanityClient({
  projectId: 'wuy8smzl',
  dataset: 'production',
  apiVersion: '2021-08-31', // use a UTC date string
  useCdn: false, // `false` if you want to ensure fresh data
})

export default client