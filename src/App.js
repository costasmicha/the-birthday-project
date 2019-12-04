import React from "react"
import { Switch, Route, Router } from "react-router-dom"

import Auth from "routes/Auth"
import Home from "routes/Home"
import { frbs } from "host/firebaseSetup"
import FireBaseProvider from "providers/Firebase"
import { history } from "host/history"

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <FireBaseProvider config={frbs}>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route component={Home} />
          </Switch>
        </FireBaseProvider>
      </Router>
    </div>
  )
}

export default App
