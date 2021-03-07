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
  // images (manel's drawings) data and tags state
  const [tags, setTags] = useState([])

  const data = useStaticQuery(drawingsAndTagsQuery)

  useEffect(() => {
    if (window.location.pathname === "/") {
      getAndSetTags()
    } else {
      console.info("image loading delayed by 1s")
      setTimeout(() => {
        console.info("loading images now")
        getAndSetTags()
      }, 1000)
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

  // drawing (lines) data in /draw
  const [drawing, setDrawing] = useState(null)

  return (
    <PersistantDataContext.Provider
      value={{ data, tags, setTags, drawing, setDrawing }}
    >
      {children}
    </PersistantDataContext.Provider>
  )
}
