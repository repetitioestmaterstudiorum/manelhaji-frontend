import React from "react"
import { Link } from "gatsby"

const menuStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "min(4.5vw, 20px)",
}

export default function Menu() {
  return (
    <div className="menu" style={menuStyle}>
      <Link to="/">Drawings</Link>
      <Link to="/about/">About</Link>
      <Link to="/draw/">Draw!</Link>
    </div>
  )
}
