import React, { ReactNode } from "react"
import { Frbs } from "host/firebaseSetup"

export const FireBaseContext = React.createContext<Frbs | undefined>(undefined)

type FireType = {
  children: ReactNode
  config: Frbs
}

export function useFireBaseContext() {
  const ctx = React.useContext(FireBaseContext)
  if (ctx === undefined) {
    throw new Error("Oops u did it again")
  }
  return ctx
}

function FireBaseProvider({ children, config }: FireType) {
  return (
    <FireBaseContext.Provider value={config}>
      {children}
    </FireBaseContext.Provider>
  )
}

export default FireBaseProvider
