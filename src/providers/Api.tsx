import React, { ReactNode } from "react"

export const ApiContext = React.createContext<Operations | undefined>(undefined)

type ApiProviderProps = {
  children: ReactNode
  db: firebase.firestore.Firestore
}

type Operations = {
  getMyContacts: (params: { uid: string }) => Promise<Array<any>>
}

function operations(db: firebase.firestore.Firestore): Operations {
  const contacts = db.collection("contacts")
  return {
    getMyContacts: ({ uid }) => {
      return contacts
        .where("userId", "==", uid)
        .get()
        .then(qs => {
          if (qs.empty) {
            return []
          } else {
            return qs.docs.map(doc => {
              return { id: doc.id, ...doc.data() }
            })
          }
        })
    },
  }
}

export function useApi() {
  const ctx = React.useContext(ApiContext)
  if (ctx === undefined) {
    throw new Error("Oops! u must access useApi inside ApiProvider")
  }
  return ctx
}

function ApiProvider(props: ApiProviderProps) {
  const { children, db } = props
  const dbRef = React.useRef(db)

  const contextValue = React.useMemo(() => {
    return operations(dbRef.current)
  }, [])

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  )
}

export default ApiProvider
