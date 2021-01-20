import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

const Image = ({ drawingItem }) => {
  if (!drawingItem?.drawing?.asset?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img fluid={drawingItem.drawing.asset.fluid} />
}

Image.propTypes = {
  drawingItem: PropTypes.object,
}

export default Image
