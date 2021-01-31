import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SRLWrapper } from "simple-react-lightbox"

import Image from "./image"

const query = graphql`
  query allDrawings {
    allSanityDrawing {
      edges {
        node {
          _id
          title
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          description
          galleries {
            title
            description
          }
        }
      }
    }
  }
`

const Gallery = () => {
  const data = useStaticQuery(query)
  if (!data?.allSanityDrawing?.edges) {
    return <div>Gallery empty</div>
  }

  return (
    <div>
      <p>hi there</p>
      <SRLWrapper>
        {data.allSanityDrawing.edges.map(({ node: drawingItem }) => (
          <Image drawingItem={drawingItem} key={drawingItem._id} />
        ))}
      </SRLWrapper>
    </div>
  )
}

export default Gallery
