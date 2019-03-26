import * as React from 'react'
import Bubble from './Bubble'
import Company from './Company'
import { $v } from 'graphcool-styles'

export default function Team() {
  return (
    <section>
      <style jsx={true}>{`
        section {
          @p: .pb96, .relative, .z0;
          background-color: #fafafa;
          border-top: 2px solid rgba(0, 0, 0, 0.1);
        }
        .team {
          @p: .center;
          max-width: 1100px;
        }
        p {
          @p: .tc, .mt38;
        }
        .bubbles {
          @p: .mt60, .flex, .flexWrap;
        }
        @media (max-width: 1100px) {
          section {
            padding-bottom: 0 !important;
          }
          .bubbles-container {
            overflow: auto;
            padding-left: 30px;
            padding-bottom: 38px;
            margin-bottom: -180px;
          }
          div.bubbles {
            min-width: 1020px;
            transform: scale(0.7);
            transform-origin: top left;
          }
          h2, p {
            padding-left: 30px;
            padding-right: 30px;
          }
          p {
            text-align: left !important;
          }
        }
      `}</style>
      <div className="team">
        <h2>CORE Academy Contributors</h2>
        <p>
          CORE Academy is a US-based organization and is a collaboration between mutliple universities and academics.
        </p>
        <div className="bubbles-container">
          <div className="bubbles">
            <div className='flex'>
              <Bubble
                avatar={require('../../assets/graphics/contributors/rajiv.jpg')}
                name="Rajiv Sethi"
                description="Barnard College"
                x={0}
                y={0}
              />
              <Company
                src={require('../../assets/icons/companies/prisma.svg')}
                color={$v.white}
                y={90}
              />
              <Bubble
                avatar={require('../../assets/graphics/contributors/sarah.jpg')}
                name="Sarah Thomas"
                description="CORE Academy"
                x={0}
                y={-30}
              />
              <Bubble
                avatar={require('../../assets/graphics/contributors/homa.png')}
                name="Homa Zarghamee"
                description="Barnard College"
                x={0}
                y={60}
              />
              <Bubble
                avatar={require('../../assets/graphics/contributors/suresh.jpg')}
                name="Suresh Naidu"
                description="Columbia University"
                x={0}
                y={-30}
              />
              <Company
                src={require('../../assets/icons/companies/prisma.svg')}
                color={$v.white}
                y={90}
              />
              <Bubble
                avatar={require('../../assets/graphics/contributors/belinda.png')}
                name="Belinda Archibong"
                description="Barnard College"
                x={0}
                y={20}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
