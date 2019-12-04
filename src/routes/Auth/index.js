import React, { lazy, Suspense } from "react"
import { Switch, Route } from "react-router-dom"

import Login from "./Login"
import Loading from "components/Loading"

const Register = lazy(() => import("./Register"))

function Auth() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth" component={Login} />
      </Switch>
    </Suspense>
  )
}

export default Auth
