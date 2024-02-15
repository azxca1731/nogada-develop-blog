import React from "react"
import "./style.scss"

const Badges = ({ items, primary }) =>
  items?.map((item, i) => {
    return (
      <span
        className={`badge ${primary ? "text-bg-primary" : "text-bg-secondary"}`}
        key={i}
      >
        {item}
      </span>
    )
  }) ?? []

export default Badges
