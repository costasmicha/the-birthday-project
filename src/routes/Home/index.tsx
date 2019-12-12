import React from "react"
// import { css } from "emotion"
import "bootstrap/dist/css/bootstrap.min.css"
import "App.css"

// import {
//   Grid,
//   Row,
//   Col,
//   Button,
//   Modal,
//   Glyphicon,
//   FormGroup,
//   FormControl,
// } from "react-bootstrap"
import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import Parents from "./Parents"
import { useAuthenticatedRoute } from "providers/Firebase"
// import AddParent from "components/AddParent"

// import { FireBaseContext } from "providers/Firebase"

function Home() {
  useAuthenticatedRoute()
  // const online = window.navigator.onLine

  // function whichErr(err) {
  //   if (err === "404") {
  //     return <div>This page cannot load</div>
  //   } else if (!online) {
  //     return <div>Check your internet connection</div>
  //   } else if (err === "500") {
  //     return <div>Internal server error</div>
  //   } else {
  //     return <div>Don't know what's happening</div>
  //   }
  // }

  // return !!error ? (
  //   whichErr(error)
  // ) : (
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div className="App">
        <Header />
      </div>
      <div>
        <Parents />
      </div>
    </div>
  )
}

export default Home
