import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "./image"

const query = graphql`
  {
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
    return <div>Gallery not found</div>
  }
  return (
    <div>
      {data.allSanityDrawing.edges.map(({ node: drawingItem }) => (
        <Image drawingItem={drawingItem} key={drawingItem._id} />
      ))}
    </div>
  )
}

export default Gallery
