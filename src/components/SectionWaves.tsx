import React from 'react'

export default function SectionWaves() {
  return (
    <>
      <svg
        className="section-wave__svg section-wave__svg--back"
        viewBox="-220 0 2040 260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-220 148C-32 74 168 34 392 34C618 34 790 176 1008 176C1238 176 1418 54 1628 54C1702 54 1768 66 1820 82V260H-220V148Z"
          fill="#efefef"
        />
      </svg>
      <svg
        className="section-wave__svg section-wave__svg--front"
        viewBox="-260 0 2120 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-260 78C-46 144 166 182 394 172C624 160 816 72 1036 72C1266 72 1452 176 1688 186C1762 188 1822 182 1860 172V280H-260V78Z"
          fill="#e4e4e4"
        />
      </svg>
    </>
  )
}
