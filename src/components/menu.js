import React from "react"
import { Link } from "gatsby"

const menuStyle = {
  display: "flex",
  alignItems: "center",
}

export default function Menu() {
  return (
    <div className="menu" style={menuStyle}>
      <Link to="/">Home</Link>
      <Link to="/draw/">Draw</Link>
      <Link to="/contact/">Contact</Link>
    </div>
  )
}
