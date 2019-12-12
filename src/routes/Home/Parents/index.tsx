import React from "react"
import { css } from "emotion"
import { useApi } from "providers/Api"
import { useQuery } from "react-query"
import { useWithUser } from "providers/Firebase"
import Parents from "components/Parents"
// import {
//   // Grid,
//   // Row,
//   // Col,
//   // Button,
//   // Modal,
//   // Glyphicon,
//   // FormGroup,
//   // FormControl,
// } from "react-bootstrap"

const classNames = {
  containerDiv: css`
    display: flex;
    justify-content: space-between;
    margin: 15px;
  `,
  formControl: css`
    border: 1px solid #333;
    height: 36px;
  `,
}

function Contacts() {
  const { user, isLoading } = useWithUser()
  const { getMyContacts } = useApi()

  const { data, isFetching } = useQuery(
    !user ? false : ["my-contacts", { uid: user.uid }],
    getMyContacts
  )

  const parents = data || []
  console.log("parents", parents)

  return (
    <div>
      <div className={classNames.containerDiv}>
        <div>
          {/* <Button className="custom" onClick={this.openAdd}>
            <Glyphicon glyph="glyphicon glyphicon-plus" />
          </Button>
          <Modal show={openAdd} onHide={this.closeAdd} keyboard={true}>
            <Modal.Body className="add-modal">
              <AddParent callbackParent={this.onParentChanged} />
            </Modal.Body>
          </Modal> */}
        </div>
        <div>
          <div>search</div>
          {/* <form onSubmit={this.submitHandler}>
            <FormGroup
              controlId={"formControlsText"}
              onChange={this.onSearchChange}
            >
              <FormControl
                className={classNames.formControl}
                placeholder="search"
              />
            </FormGroup>
          </form> */}
        </div>
      </div>
      <div>
        <Parents parents={parents} />
      </div>
    </div>
  )
}

export default Contacts
