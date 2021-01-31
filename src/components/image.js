import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

const Image = ({ drawing }) => {
  if (!drawing?.image?.asset?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <Img
      fluid={drawing.image.asset.fluid}
      alt={drawing.shortDescription || ""}
    />
  )
}

Image.propTypes = {
  drawing: PropTypes.object,
}

export default Image
