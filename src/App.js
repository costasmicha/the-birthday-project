import React from "react"
import { Switch, Route, Router } from "react-router-dom"

import { history } from "host/history"
import { frbs } from "host/firebaseSetup"

import FirebaseProvider from "providers/Firebase"
import ApiProvider from "providers/Api"

import Auth from "routes/Auth"
import Home from "routes/Home"

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <FirebaseProvider base={frbs}>
          <ApiProvider db={frbs.db}>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route component={Home} />
            </Switch>
          </ApiProvider>
        </FirebaseProvider>
      </Router>
    </div>
  )
}

export default App
