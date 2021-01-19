import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
    <ul>
      {data.allSanityDrawing.edges.map(({ node: drawing }) => (
        <li key={drawing._id}>
          <h3>{drawing.title}</h3>
        </li>
      ))}
    </ul>
  )
}

export default Gallery
