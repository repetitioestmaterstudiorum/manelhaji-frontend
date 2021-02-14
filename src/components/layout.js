import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import ScrollToTop from "react-scroll-up"

import Header from "./header"
import Menu from "./menu"
import "../water-css/dark.min.css"
import "../water-css/overrides.css"

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
        <ScrollToTop style={{ bottom: "44px", right: "13px" }} showUnder={180}>
          <button style={{ padding: "8px 10px", backgroundColor: "#545454d9" }}>
            ▲ up
          </button>
        </ScrollToTop>
        <footer
          style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderTop: "none",
            textAlign: "center",
          }}
        >
          <Menu />
          <p>
            © {new Date().getFullYear()} - manelhaji.com -{" "}
            <Link to="/site-notice">Site Notice</Link>
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
