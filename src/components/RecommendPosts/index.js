import React from "react"
import { Link } from "gatsby"

import "./style.scss"
import Badges from "components/Badges"

const RecommendPost = ({ posts }) => {
  console.log(posts)

  return (
    <div>
      <hr />
      <h1 className="mb-2">이런 글은 어떠세요?</h1>
      <hr />
      {posts.map(
        (
          {
            node: {
              frontmatter: { category, date, path, tags, title },
            },
          },
          i
        ) => (
          <div className="mb-4">
            <Link
              style={{ boxShadow: "none" }}
              to={path}
              className="text-bg-secondary"
            >
              <h3>{title}</h3>
            </Link>
            <time dateTime={date}>{date}</time>
            <Badges items={[category]} primary={true} />
            <Badges items={tags} primary={true} />
          </div>
        )
      )}
    </div>
  )
}

export default RecommendPost
