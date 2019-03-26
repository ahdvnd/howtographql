import * as React from 'react'
import GraphQLConf from '../assets/icons/GraphQLConf'
import LinkArrow from '../assets/icons/LinkArrow'

export const Banner = () =>
  <a className="banner" href="https://www.graphqlconf.org/" target="_blank">


    <GraphQLConf />

    <span className="link-arrow-wrapper">
      <LinkArrow />
    </span>
  </a>
