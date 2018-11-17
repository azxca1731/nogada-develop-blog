import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

const Footer = ({ author, title }) => (
  <div className="footer">
    <div className="container">
      <div className="text-center p-3">
        <hr className="border-primary" />
        <p>
          {title}
          <Link to="/profile/">
            <br />
            <strong>{author}</strong> on Profile
          </Link>
        </p>
      </div>
    </div>
    <style jsx>{`
      .footer{
        background-color: #eee;
      }
    `}</style>
  </div>
)

export default Footer
