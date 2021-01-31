import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SRLWrapper } from "simple-react-lightbox"

import Image from "./image"

const allTags = graphql`
  query allTags {
    allSanityDrawings {
      nodes {
        tags
      }
    }
  }
`

const query = graphql`
  query danymicDrawings {
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
    }
  }
`

const galleryOptions = {
  settings: {
    overlayColor: "rgb(19 19 19 / 95%)",
    autoplaySpeed: 4000,
    slideTransitionSpeed: 0.2,
  },
  buttons: {
    showDownloadButton: false,
    showThumbnailsButton: false,
  },
  caption: {
    captionColor: "#ccc",
    captionContainerPadding: "0 0",
    captionAlignment: "center",
    captionFontWeight: "300",
  },
}

function Gallery() {
  const [selectedTags, setSelectedTags] = useState()

  const data = useStaticQuery(query)
  if (!data?.allSanityDrawings?.edges) {
    return <div>Gallery empty</div>
  }

  return (
    <div>
      <p>some tag menu to come here</p>
      <SRLWrapper options={galleryOptions}>
        {data.allSanityDrawings.edges.map(({ node: drawingItem }) => (
          <Image drawingItem={drawingItem} key={drawingItem._id} />
        ))}
      </SRLWrapper>
    </div>
  )
}

export default Gallery
