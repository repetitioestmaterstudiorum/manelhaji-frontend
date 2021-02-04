import React from "react"
import SimpleReactLightbox from "simple-react-lightbox"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "../components/gallery"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>- Drawings -</h2>
    <SimpleReactLightbox>
      <Gallery />
    </SimpleReactLightbox>
  </Layout>
)

export default IndexPage
