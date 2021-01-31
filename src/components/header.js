import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Menu from "./menu"

const headerStyle = {
  margin: `0 auto`,
  maxWidth: 900,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

// link styles in water-css-overrides.css
const Header = ({ siteTitle }) => (
  <header style={headerStyle}>
    <div>
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
    <Menu />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
