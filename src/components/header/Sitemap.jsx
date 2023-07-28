import React from 'react'
import { Routes, Route} from "react-router-dom"

const sitemap = () => {
  return (
    <>
    
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">


<url>
  <loc>https://edulisting.in
/</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>
<url>
  <loc>https://edulisting.in
/allchats</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>
<url>
  <loc>https://edulisting.in
/profile</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>
<url>
  <loc>https://edulisting.in
/sell</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>
<url>
  <loc>https://edulisting.in
/login</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>
<url>
  <loc>https://edulisting.in
/ads</loc>
  <lastmod>2023-03-15T16:59:20+00:00</lastmod>
</url>


</urlset>
</>
  )
}


<Routes>
      <Route path="/sitemap" element={ sitemap } />
</Routes>
export default sitemap