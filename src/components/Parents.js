import React from "react"
import ParentListItem from "./ParentListItem"

const Parents = ({ parents }) => {
  let parentListItems

  if (parents) {
    parentListItems = parents.map(parent => {
      return <ParentListItem key={parent.id} parent={parent} />
    })
  }
  return <div>{parentListItems}</div>
}

export default Parents
