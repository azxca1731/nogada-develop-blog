import React from "react"
import { Link } from "gatsby"

class Navi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column bg-primary">
        <div className="container">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">{title}</h1>
          </Link>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <li
                className={
                  location.pathname === "/" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li
                className={
                  location.pathname === "/profile/"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link to="/Profile/" className="nav-link">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="text-center NavBio">
            내가 겪은 일, 알고 싶은 정보를 담습니다.
          </div>
          <style jsx>{`
            .NavBio {
              color: #fff;
            }
          `}</style>
        </div>
      </nav>
    )
  }
}

export default Navi
