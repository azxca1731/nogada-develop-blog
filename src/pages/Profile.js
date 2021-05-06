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
    const profile = get(data, 'profile.childImageSharp.sizes')
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
              <Img sizes={profile} />
              <h1>azxca1731</h1>
              <p className="lead text-muted">backend engineer.</p>
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
                <div className="col-lg-4 col-6">
                  <Icon title="Aws" name="aws" />
                </div>
                <div className="col-lg-4 col-6">
                  <Icon title="Aws" name="java" />
                </div>
                <div className="col-lg-4 col-6">
                  <Icon title="Docker" name="docker" />
                </div>
                <div className="col-lg-4 col-6">
                  <Icon title="React.js" name="react" />
                </div>
                <div className="col-lg-4 col-6">
                  <Icon title="JavaScript" name="js" />
                </div>
                <div className="col-lg-4 col-6">
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
                  <h2 className="section-heading">Records</h2>
                  <li>
                    2014.03 ~ 2020.02: Myongji University Dept.Computer
                    Engineering
                  </li>
                  <li>2018.09 ~ 2018.12 : Codigm Intern (Goorm EDU,TEST)</li>
                  <li>2019.01 ~ 2019.12: MJU Likelion Organizer</li>
                  <li>2019.07 ~ 2019.08 : Naver Intern (Naver Shopping)</li>
                  <li>2020.03 ~ : Coupang (Backend Developer)</li>
                </div>
              </div>
            </div>
          </section>

          <section id="repos">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12 text-left">
                  <h2 className="section-heading">Repositories</h2>
                  <li>
                    <a href="https://github.com/azxca1731/react-calenpicker">
                      React Calenpicker
                    </a>{' '}
                    : You can make picker Easily! with react-calenpicker!
                  </li>
                  <li>
                    <a href="https://github.com/remody/remody-dashboard">
                      Remody
                    </a>{' '}
                    : 논문 검색 및 논문 키워드 추출 서비스
                  </li>
                  <li>
                    <a href="https://github.com/azxca1731/shopping-recommend">
                      Shopping-recommend
                    </a>
                    : 검색 엔진을 이용한 채팅 어플리케이션 내 쇼핑 상품 검색,
                    추천 기능 구현
                  </li>
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
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
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
