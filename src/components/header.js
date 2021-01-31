import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const flexLvl1 = {
  margin: `0 auto`,
  maxWidth: 900,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}
const flexLvl2 = {
  display: "flex",
  alignItems: "center",
}

// link styles in water-css-overrides.css
const Header = ({ siteTitle }) => (
  <header style={flexLvl1}>
    <div style={flexLvl2}>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div style={flexLvl2}>
      <Link to="/">Home</Link>
      <Link to="/draw/">Draw</Link>
      <Link to="/contact/">Contact</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
