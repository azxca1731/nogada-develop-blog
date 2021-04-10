import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

import {
  faAndroid,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faJava,
  faDocker,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons'
import './style.scss'

library.add(
  faAndroid,
  faAws,
  faJava,
  faDocker,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs
)

const Icon = ({ name }) => (
  <div className="icon" title={name}>
    <FontAwesomeIcon icon={['fab', name]} />
  </div>
)

export default Icon
