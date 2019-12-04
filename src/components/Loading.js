import React from "react"
import { css } from "emotion"

const Loading = () => (
  <div
    className={css`
      height: calc(100vh - 600px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
    `}
  >
    Loading...
  </div>
)

export default Loading
