import React from "react"

import Navi from "components/Navi"
import Footer from "components/Footer"
import { siteMetadata } from "../../../gatsby-config"

import "scss/gatstrap.scss"

const Layout = props => (
  <div>
    <Navi title={siteMetadata.title} {...props} />
    {props.children}
    <Footer title={siteMetadata.title} author={siteMetadata.author} />
  </div>
)

export default Layout
