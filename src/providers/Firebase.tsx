import React, { ReactNode } from "react"
import { Frbs } from "host/firebaseSetup"
import { useHistory } from "react-router"

export const FirebaseContext = React.createContext<Frbs | undefined>(undefined)

type FirebaseProviderProps = {
  children: ReactNode
  base: Frbs
}

export function useFirebaseContext() {
  const ctx = React.useContext(FirebaseContext)
  if (ctx === undefined) {
    throw new Error("Oops u did it again")
  }
  return ctx
}

export function useAuthenticatedRoute() {
  const frbs = useFirebaseContext()
  const history = useHistory()
  React.useEffect(() => {
    let unlisten = frbs.onAuthUserListener(
      _ => {
        //
      },
      () => {
        console.log(
          "Unauthenticated user tried to access a private route, redirecting to /auth/login"
        )
        history.replace("/auth/login")
      }
    )
    return () => {
      unlisten()
    }
    //eslint-disable-next-line
  }, [])
  return null
}

type WithUser =
  | {
      isLoading: true
      user: undefined
    }
  | {
      isLoading: false
      user: firebase.User
    }

export function useWithUser(): WithUser {
  const frbs = useFirebaseContext()
  const [isLoading, setLoading] = React.useState<boolean>(() => true)
  const [currentUser, setCurrentUser] = React.useState<
    firebase.User | undefined
  >(() => undefined)

  React.useEffect(() => {
    let unlisten = frbs.onAuthUserListener(
      authUser => {
        setCurrentUser(authUser)
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )
    return () => {
      unlisten()
    }
    //eslint-disable-next-line
  }, [])
  return isLoading
    ? { isLoading: true, user: undefined }
    : { isLoading: false, user: currentUser!! }
}

function FirebaseProvider(props: FirebaseProviderProps) {
  const { children, base } = props

  return (
    <FirebaseContext.Provider value={base}>{children}</FirebaseContext.Provider>
  )
}

export default FirebaseProvider
