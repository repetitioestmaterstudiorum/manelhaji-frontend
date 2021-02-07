import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SRLWrapper } from "simple-react-lightbox"

import Image from "./image"

const query = graphql`
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

const galleryFlexContainer = {
  display: "flex",
  flexWrap: "wrap",
  // flexDirection: "row",
  listStyle: "none",
  marginBlockStart: 0,
  marginInlineStart: 0,
  paddingInlineStart: 0,
}
const galleryFlexItem = {
  display: "flex",
  height: "50vh",
  width: "40vh",
  margin: "0.5rem",
  flexGrow: "1",
}

const tagUlist = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  listStyle: "none",
  marginBlockStart: 0,
  marginInlineStart: 0,
  paddingInlineStart: 0,
}
const tagButton = {
  fontSize: "1.2em",
  padding: "0 5px",
  backgroundColor: "#ffffff00",
}
const tagActiveButton = {
  fontWeight: 300,
}
const tagInactiveButton = {
  fontWeight: 100,
  color: "#dcdbdb",
}
const tagActive = Object.assign({}, tagButton, tagActiveButton)
const tagInactive = Object.assign({}, tagButton, tagInactiveButton)

function Gallery() {
  const [selectedTags, setSelectedTags] = useState([])

  const data = useStaticQuery(query)

  const allTags = data?.allSanityDrawings?.nodes?.reduce(
    (acc, cur) => acc.concat(cur.tags),
    []
  )
  const uniqueTags = [...new Set(allTags)]
  useState(() => {
    setSelectedTags(
      uniqueTags.map((uT, index) => {
        return { tag: uT, active: true, index }
      })
    )
  }, [uniqueTags])

  function toggleActive(tagIndex) {
    const negateActivity = ({ tag, active, index }) => {
      return { tag, active: !active, index }
    }
    const newSelectedTags = selectedTags.map(sT =>
      sT.index === tagIndex ? negateActivity(sT) : sT
    )
    setSelectedTags(newSelectedTags)
  }

  if (!data?.allSanityDrawings?.edges || !data?.allSanityDrawings?.nodes) {
    return <div>Gallery empty</div>
  }
  return (
    <div>
      <ul style={tagUlist}>
        {selectedTags.map(t => (
          <li key={t.index}>
            <button
              value={t.tag}
              style={t.active ? tagActive : tagInactive}
              onClick={() => toggleActive(t.index)}
              onKeyDown={() => toggleActive(t.index)}
            >
              #{t.tag}
            </button>
          </li>
        ))}
      </ul>
      <SRLWrapper options={galleryOptions}>
        <ul style={galleryFlexContainer}>
          {data.allSanityDrawings.edges
            .filter(e =>
              e.node?.tags?.some(t =>
                selectedTags
                  ?.filter(sT => sT.active)
                  .map(sT => sT.tag)
                  .includes(t)
              )
            )
            .map(({ node: drawing }) => (
              <li key={drawing._id} style={galleryFlexItem}>
                <Image drawing={drawing} />
              </li>
            ))}
        </ul>
      </SRLWrapper>
    </div>
  )
}

export default Gallery
