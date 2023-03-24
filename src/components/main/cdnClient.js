import {createClient} from "@sanity/client";
import  ImageUrlBuilder from "@sanity/image-url";
export const  client = createClient({
  projectId:  import.meta.env.VITE_REACT_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-08-31', // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
  token: import.meta.env.VITE_REACT_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
})
 
const builder = ImageUrlBuilder(client)

export const urlFor  = (source) => builder.image(source)