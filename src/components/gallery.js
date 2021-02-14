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
  cursor: "pointer",
}

const tagList = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  listStyle: "none",
  lineHeight: "40px",
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
  color: "#e9e9e9",
}
const tagInactiveButton = {
  fontWeight: 100,
  padding: "0px 6px",
  color: "#dcdbdb",
}
const tagActive = Object.assign({}, tagButton, tagActiveButton)
const tagInactive = Object.assign({}, tagButton, tagInactiveButton)

const resetBtn = {
  textTransform: "uppercase",
  fontWeight: "200",
  padding: "8px 14px",
  marginRight: "14px",
  backgroundColor: "rgb(63 63 63 / 50%)",
}

function Gallery() {
  const [tags, setTags] = useState([])

  const data = useStaticQuery(query)

  const allTags = data?.allSanityDrawings?.nodes?.reduce(
    (acc, cur) => acc.concat(cur.tags),
    []
  )
  const uniqueTags = [...new Set(allTags)]

  useState(() => {
    setTags(
      uniqueTags.map((uT, index) => {
        return { tag: uT, active: true, selected: false, index }
      })
    )
  }, [uniqueTags])

  function toggleTags(tagIndex) {
    const negateSelected = ({ tag, active, selected, index }) => {
      return { tag, active, selected: !selected, index }
    }
    const negateActive = ({ tag, active, selected, index }) => {
      return { tag, active: !active, selected, index }
    }
    const setSelectedToActive = ({ tag, active, selected, index }) => {
      return { tag, active: selected, selected, index }
    }
    const newSelectedTags = tags.map(t =>
      t.index === tagIndex ? negateSelected(t) : t
    )
    const nmbOfSelectedTags = newSelectedTags.filter(t => t.selected).length
    const nmbOfTags = tags.length
    const allOrNoTagsSelected =
      nmbOfSelectedTags === 0 || nmbOfSelectedTags === nmbOfTags ? true : false
    if (allOrNoTagsSelected) {
      setTags(newSelectedTags.map(t => (!t.active ? negateActive(t) : t)))
    } else {
      setTags(newSelectedTags.map(t => setSelectedToActive(t)))
    }
  }

  function resetTags() {
    setTags(
      tags.map(({ tag, active, selected, index }) => ({
        tag,
        active: true,
        selected: false,
        index,
      }))
    )
  }

  if (!data?.allSanityDrawings?.edges || !data?.allSanityDrawings?.nodes) {
    return <div>Gallery empty</div>
  }

  return (
    <div>
      <ul style={tagList}>
        <li>
          <button
            style={resetBtn}
            onClick={() => resetTags()}
            onKeyDown={() => resetTags()}
          >
            reset
          </button>
        </li>
        {tags.map(t => (
          <li key={t.index}>
            <button
              value={t.tag}
              style={t.active ? tagActive : tagInactive}
              onClick={() => toggleTags(t.index)}
              onKeyDown={() => toggleTags(t.index)}
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
                tags
                  ?.filter(t => t.active)
                  .map(t => t.tag)
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
