import React, { createContext, useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

export const PersistantDataContext = createContext({})

const drawingsAndTagsQuery = graphql`
  query drawingsAndTags {
    allSanityDrawings {
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
          shortDescription
          tags
        }
      }
      nodes {
        tags
      }
    }
  }
`

export const PersistantDataProvider = ({ children }) => {
  // drawings data and tags
  const [tags, setTags] = useState([])

  const data = useStaticQuery(drawingsAndTagsQuery)

  useEffect(() => {
    if (window.location.pathname === "/") {
      getAndSetTags()
    } else {
      setTimeout(() => {
        getAndSetTags()
      }, 500)
    }
    function getAndSetTags() {
      const allTags = data?.allSanityDrawings?.nodes?.reduce(
        (acc, cur) => acc.concat(cur.tags),
        []
      )
      const uniqueTags = [...new Set(allTags)]

      setTags(
        uniqueTags.map((uT, index) => {
          return { tag: uT, active: true, selected: false, index }
        })
      )
    }
  }, [data])

  // drawing (lines) data
  const [drawing, setDrawing] = useState(null)

  return (
    <PersistantDataContext.Provider
      value={{ data, tags, setTags, drawing, setDrawing }}
    >
      {children}
    </PersistantDataContext.Provider>
  )
}
