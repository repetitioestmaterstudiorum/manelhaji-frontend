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
          drawing {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          description
          slug {
            current
          }
          publishedAt
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
      {data.allSanityDrawing.edges.map(({ node: item }) => (
        <Image drawingItem={item} key={item._id} />
      ))}
    </div>
  )
}

export default Gallery
