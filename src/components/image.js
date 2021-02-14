import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

const img = {
  maxHeight: "100%",
  minWidth: "100%",
}

const Image = ({ imageData }) => {
  if (!imageData?.image?.asset?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <Img
      fluid={imageData.image.asset.fluid}
      alt={imageData.shortDescription || imageData.alt || ""}
      style={img}
    />
  )
}

Image.propTypes = {
  drawing: PropTypes.object,
}

export default Image
