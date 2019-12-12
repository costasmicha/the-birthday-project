import React, { useCallback, useState } from "react"
import { css } from "emotion"

//
import { Button, FormControl } from "react-bootstrap"
import { useFirebaseContext } from "providers/Firebase"

const styles = {
  container: css`
    display: flex;
    align-items: center;
    height: 100%;
  `,
  card: css`
    background-color: #fff;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    padding: 3rem 4rem;
  `,
  form: css`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;

    .form_el {
      width: 100%;
      margin-bottom: 1rem;
    }
    .submit_btn {
      margin-top: 1rem;
    }
  `,
}

const initialValues = {
  email: "",
  password: "",
}

const Register = () => {
  const [values, setValues] = useState(initialValues)
  const fire = useFirebaseContext()
  const onChange = useCallback(
    evt => {
      const {
        target: { name, value },
      } = evt
      setValues(s => ({ ...s, [name]: value }))
    },
    [setValues]
  )

  const handleSubmit = evt => {
    evt.preventDefault()
    fire.doCreateUserWithEmailAndPassword(values.email, values.password)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form_el">
            <FormControl
              name="email"
              type="text"
              value={values.email}
              placeholder="email"
              onChange={onChange}
            />
          </div>
          <div className="form_el">
            <FormControl
              name="password"
              type="password"
              value={values.password}
              placeholder="password"
              onChange={onChange}
            />
          </div>
          <div>
            <Button className="custom-submit" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
