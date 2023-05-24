import React from "react"

const Arrow = (): JSX.Element => {
  return (
    <svg
      className="arrow-svg"
      fill="none"
      height="8"
      viewBox="0 0 21 8"
      width="21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M20.354 4.35457C20.4477 4.26081 20.5004 4.13366 20.5004 4.00107C20.5004 3.86849 20.4477 3.74134 20.354 3.64757L17.172 0.464575C17.0777 0.373496 16.9514 0.323098 16.8203 0.324238C16.6892 0.325377 16.5638 0.377961 16.4711 0.470665C16.3784 0.563369 16.3258 0.688776 16.3247 0.819874C16.3235 0.950972 16.3739 1.07727 16.465 1.17157L19.293 4.00057L16.465 6.82857C16.3739 6.92288 16.3235 7.04918 16.3247 7.18027C16.3258 7.31137 16.3784 7.43678 16.4711 7.52948C16.5638 7.62219 16.6892 7.67477 16.8203 7.67591C16.9514 7.67705 17.0777 7.62665 17.172 7.53557L20.354 4.35457ZM0 4.50057H20V3.50057H0V4.50057Z"
        fill="#111111"
      />
    </svg>
  )
}

export default Arrow