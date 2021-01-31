import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

const Image = ({ drawingItem }) => {
  if (!drawingItem?.image?.asset?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img fluid={drawingItem.image.asset.fluid} alt={drawingItem.alt} />
}

Image.propTypes = {
  drawingItem: PropTypes.object,
}

export default Image
