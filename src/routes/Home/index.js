import * as R from "ramda"
import React, { Component } from "react"
import Header from "components/Header"
import {
  Grid,
  Row,
  Col,
  Button,
  Modal,
  Glyphicon,
  FormGroup,
  FormControl,
} from "react-bootstrap"
import AppActions from "actions/AppActions"
import AppStore from "stores/AppStore"
import AddParent from "components/AddParent"
import Parents from "components/Parents"
import NavigationBar from "components/NavigationBar"

import "bootstrap/dist/css/bootstrap.min.css"
import "App.css"

import { FireBaseContext } from "providers/Firebase"
import { css } from "emotion"

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

function filterData(searchField, parents) {
  // search sanitization
  const sf = searchField
    ? searchField.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    : ""
  const searchRegex = new RegExp(sf, "gi")
  let p = []
  p = R.filter(
    R.anyPass([
      R.compose(R.test(searchRegex), R.path(["firstName"])),
      R.compose(R.test(searchRegex), R.path(["lastName"])),
      R.compose(R.test(searchRegex), R.path(["phone"])),
      R.compose(
        R.test(searchRegex),
        R.converge(R.concat, [
          R.path(["firstName"]),
          R.compose(R.concat(" "), R.path(["lastName"])),
        ])
      ),
    ]),
    parents
  )

  return p
}

class Home extends Component {
  static contextType = FireBaseContext
  constructor() {
    super()
    // this.ref = this.context.collection("contacts")
    this.state = {
      openAdd: false,
      searchField: "",
      parents: [],
      error: "",
    }
  }

  UNSAFE_componentWillMount() {
    AppStore.addChangeListener(this.onChange)
  }

  componentDidMount() {
    // AppActions.getParents()
    // this.getContacts = this.context
    const contacts = this.context.db
      .collection("contacts")
      .where("userId", "==", "6XLzALR7LSeGJ1vxyrgnwvMVKGy1")
    // .doc("f25q9NvpPm7VTaEHDAgd")

    contacts
      .get()
      .then(qs => {
        // if (doc.exists) {
        //   // this.setState(s => ({
        //   //   ...s,
        //   //   parents: doc.data(),
        //   // }))
        //   console.log(">>>", doc.exists, "Document data:", doc.data())
        // } else {
        //   // doc.data() will be undefined in this case
        //   console.log("No such document!")
        // }
        const docs = qs.docs.map(doc => {
          console.log(">>>", doc.exists, "Document data:", doc.data())
          return { id: doc.id, ...doc.data() }
        })
        console.log("docs", docs)
        this.setState(s => ({
          ...s,
          parents: docs,
        }))
      })
      .catch(function(error) {
        console.log("Error getting document:", error)
      })
    this.unsubscribe = this.context.onAuthUserListener(
      u => {
        //gdhdgd
        console.log("user is loggedin")
      },
      () => {
        this.props.history.replace("/auth/login")
      }
    )
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange)
    this.unsubscribe()
  }

  onChange = () =>
    this.setState({
      parents: AppStore.getParents(),
      error: AppStore.getError(),
    })

  onSearchChange = evt => {
    const searchField = evt.target.value
    this.setState(state => ({ ...state, searchField }))
  }

  closeAdd = () => {
    this.setState({ openAdd: false })
  }

  openAdd = () => {
    this.setState({ openAdd: true })
  }

  onParentChanged = () => {
    this.closeAdd()
  }

  submitHandler = e => {
    e.preventDefault()
  }

  render() {
    const { parents, error, openAdd, searchField } = this.state
    const online = window.navigator.onLine

    function whichErr(err) {
      if (err === "404") {
        return <div>This page cannot load</div>
      } else if (!online) {
        return <div>Check your internet connection</div>
      } else if (err === "500") {
        return <div>Internal server error</div>
      } else {
        return <div>Don't know what's happening</div>
      }
    }

    return !!error ? (
      whichErr(error)
    ) : (
      <div>
        <div>
          <NavigationBar />
        </div>
        <div className="App">
          <Header />
          <Grid>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <div className={classNames.containerDiv}>
                  <div>
                    <Button className="custom" onClick={this.openAdd}>
                      <Glyphicon glyph="glyphicon glyphicon-plus" />
                    </Button>
                    <Modal
                      show={openAdd}
                      onHide={this.closeAdd}
                      keyboard={true}
                    >
                      <Modal.Body className="add-modal">
                        <AddParent callbackParent={this.onParentChanged} />
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div>
                    <form onSubmit={this.submitHandler}>
                      <FormGroup
                        controlId={"formControlsText"}
                        onChange={this.onSearchChange}
                      >
                        <FormControl
                          className={classNames.formControl}
                          placeholder="search"
                        />
                      </FormGroup>
                    </form>
                  </div>
                </div>
                <div>
                  <Parents parents={filterData(searchField, parents)} />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Home
