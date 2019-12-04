import React from "react"
import { css, cx } from "emotion"
import { useFireBaseContext } from "providers/Firebase"

const classNames = {
  navbarInverse: css`
      background-color: transparent;
      .navbar-brand {
        color: #333;
        font-size: 24px;
        margin-top: 40px;
      `,
  containerFluid: css`
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
  `,
  signOut: css`
    align-self: flex-end;
    cursor: pointer;
  `,
}

function NavigationBar() {
  const fire = useFireBaseContext()
  const u = fire.auth.currentUser && fire.auth.currentUser.email
  return (
    <nav className={cx([classNames.navbarInverse, "navbar"])}>
      <div className={classNames.containerFluid}>
        <div className="navbar-header">
          <a className="navbar-brand" href="#brand">
            The BirthDay Project
          </a>
        </div>
        <div className={classNames.signOut}>
          <h4 onClick={fire.doSignOut}>Sign out</h4>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
