import React from "react"
import { Link } from "gatsby"
import SimpleReactLightbox from "simple-react-lightbox"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "../components/gallery"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>Drawings</h2>
    <SimpleReactLightbox>
      <Gallery />
    </SimpleReactLightbox>
    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
