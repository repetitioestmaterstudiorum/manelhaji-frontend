import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import Menu from "./menu"
import "./dark.min.css"
import "./water-css-overrides.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || ""} />
      <div
        style={{
          margin: "0 auto",
          maxWidth: 960,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Menu />
          <p>
            © {new Date().getFullYear()} - manelhaji.com -{" "}
            <Link to="/imprint">Imprint</Link>
          </p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
