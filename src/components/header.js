import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Menu from "./menu"

const headerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const logoText = {
  margin: 0,
  color: "#ececec",
  fontSize: "min(8vw, 40px)",
}

const Header = ({ siteTitle }) => (
  <header style={headerStyle}>
    <div>
      <h1>
        <Link style={logoText} to="/">
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
