import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import Contact from "../components/contact"

const query = graphql`
  query aboutPageInfo {
    sanityAbout {
      title
      text
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`

const About = () => {
  const data = useStaticQuery(query)

  const imageData = {
    image: data.sanityAbout.image,
    alt: data.sanityAbout.title,
  }

  if (!data?.sanityAbout) {
    return <div>About page content is empty</div>
  }

  return (
    <Layout>
      <SEO title="About" />
      <h2>{data.sanityAbout.title}</h2>
      <p>{data.sanityAbout.text}</p>
      {imageData.image && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Image imageData={imageData} />
        </div>
      )}
      <h3>Contact</h3>
      <Contact />
    </Layout>
  )
}

export default About
