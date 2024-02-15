import { Link } from "gatsby"
import get from "lodash/get"
import React from "react"
import Img from "gatsby-image"

import "./style.scss"
import RecommendPost from "components/RecommendPosts"
import Badges from "components/Badges"

const Post = ({ data, options, allPosts }) => {
  if (!data) {
    return
  }
  const { category, tags, description, title, path, date, image } =
    data.frontmatter
  const { isIndex } = options
  const html = get(data, "html")
  const isMore = isIndex && !!html.match("<!--more-->")
  const fixed = get(image, "childImageSharp.fixed")
  let recommendPost = []
  if (allPosts) {
    const categoryBased =
      allPosts?.edges
        ?.filter(it => it?.node?.frontmatter?.category === category)
        .slice(0, 5) ?? []
    const latestBased = allPosts.edges
      .filter(
        it => !categoryBased?.map(it => it?.node?.id).includes(it?.node?.id)
      )
      .slice(0, 5 - categoryBased.length)

    console.log(allPosts)

    recommendPost = [...categoryBased, ...latestBased]
  }

  return (
    <div className="article" key={path}>
      <div className="container">
        <div className="info">
          <Link style={{ boxShadow: "none" }} to={path}>
            <h1>{title}</h1>
            <time dateTime={date}>{date}</time>
          </Link>
          <Badges items={[category]} primary={true} />
          <Badges items={tags} primary={true} />
        </div>
        <div className="content">
          <p>{description}</p>
          {fixed ? (
            <div className="col-12">
              <Img fixed={fixed} style={{ width: "100%" }} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: isMore ? getDescription(html) : html,
          }}
        />
        {isMore ? Button({ path, label: "MORE", primary: true }) : ""}
        <RecommendPost posts={recommendPost} />
      </div>
    </div>
  )
}

export default Post

const getDescription = body => {
  body = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
  if (body.match("<!--more-->")) {
    body = body.split("<!--more-->")
    if (typeof body[0] !== "undefined") {
      return body[0]
    }
  }
  return body
}

const Button = ({ path, label, primary }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn btn-outline-primary btn-block ${
        primary ? "btn-outline-primary" : "btn-outline-secondary"
      }`}
    >
      {label}
    </span>
  </Link>
)
