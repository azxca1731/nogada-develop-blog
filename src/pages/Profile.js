import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import React from 'react'

import { siteMetadata } from '../../gatsby-config'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import Icon from 'components/Icon'

class Profile extends React.Component {
  render() {
    const { location, data } = this.props
    const profile = get(data, 'profile.childImageSharp.fixed')
    const work1 = get(data, 'work1.childImageSharp.sizes')
    const work2 = get(data, 'work2.childImageSharp.sizes')
    const back1 = get(data, 'back1.childImageSharp.sizes')
    const back2 = get(data, 'back2.childImageSharp.sizes')

    return (
      <Layout location={location}>
        <Meta site={siteMetadata} title="Profile" />
        <div>
          <section className="text-center">
            <div className="container">
              <Img fixed={profile} className="rounded-circle" />
              <h1>jaxx2104</h1>
              <p className="lead text-muted">Front-end engineer.</p>
              <div>
                <a href="https://github.com/azxca1731" data-show-count="false">
                  Follow @azxca1731
                </a>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="section-heading">SKILL</h2>
                  <hr className="border-white" />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-lg-3 col-6">
                  <Icon title="JavaScript" name="js" />
                </div>
                <div className="col-lg-3 col-6">
                  <Icon title="React.js" name="react" />
                </div>
                <div className="col-lg-3 col-6 ">
                  <Icon title="android" name="android" />
                </div>
                <div className="col-lg-3 col-6">
                  <Icon title="Node.js" name="node" />
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="text-center jumboimage">
            <Img sizes={back1} className="cover-image" />
            <div className="container">
              <div className="row cover-over">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Features</h2>
                  <p>
                    I will be a front-end engineer in Korea
                    <br />
                    Used to be a designer of furniture and architecture.
                    <br />
                  </p>
                  <li>2014 ~ : Myongji University Dept.Computer Engineering</li>
                  <li>2018.09 ~ 2018.12 : Codigm Intern</li>
                </div>
              </div>
            </div>
          </section>

          <section id="repos">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Repositories</h2>
                  <p>나중에 모달넣구 더 꾸밀게요 ㅠㅠ</p>
                </div>
              </div>
            </div>
          </section>
          <section id="features" className="jumboimage">
            <Img sizes={back2} className="cover-image" />
            <div className="container">
              <div className="row cover-over">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Degree Works</h2>
                  <p>전 아직 졸업을 안했어요 ㅠㅠ</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Profile

export const query = graphql`
  query ProfilePageQuery {
    profile: file(name: { eq: "profile" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    work1: file(name: { eq: "work1" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    work2: file(name: { eq: "work2" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    work3: file(name: { eq: "work3" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    back1: file(name: { eq: "back1" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    back2: file(name: { eq: "back2" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`
