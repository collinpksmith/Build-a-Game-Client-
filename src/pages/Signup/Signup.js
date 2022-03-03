import React, { useState, useCallback } from 'react'
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import { BackLoader } from 'components/Loader'
import { validator } from 'helpers/validator'
import { useDispatch } from 'react-redux'
import { signup } from 'redux/modules/auth/actions'
import { useHistory } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationStr, setValidationStr] = useState([])
  const [errorMessage, setErrorMessage] = useState('Error on Signup')
  const [openAlert, setOpenAlert] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const doSignup = useCallback(() => {
    setIsloading(true)
    dispatch(signup({
      body: {
        firstName, lastName, email, password
      },
      success: (res) => {
        setIsloading(false)
        history.push('/')
      },
      fail: (e) => {
        if (e.status === 422) {
          console.log(e.status)
          alert("Please input another email")
          setOpenAlert(true)
        } else {
          setOpenAlert(true)
        }
        setIsloading(false)
      }
    }))
  }, [dispatch, history, firstName, lastName, email, password])

  const handleSignup = () => {
    console.log("Is it still working?")
    let validation_str = []
    validation_str.push(validator(firstName, ['require']))
    validation_str.push(validator(lastName, ['require']))
    validation_str.push(validator(email, ['require', 'email']))
    validation_str.push(validator(password, ['require', 'password']))
    validation_str.push(validator(password, ['require', 'confirm_password'], confirmPassword))

    setValidationStr(validation_str)

    const isValid = !validation_str.filter(item => item).length
    if (!isValid) {
      return
    }

    doSignup()
  }

  console.log('Display---------> ', firstName, lastName, email, password )

  return (
    <div className="signup">
      <BackLoader open={isLoading} />
      <h2>Sign Up</h2>
      <Form className="form">
        <FormGroup>
          <Label>FirstName</Label>
          <Input
            invalid={validationStr[0] && true}
            type="text"
            placeholder="Tom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <FormFeedback>{validationStr[0]}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>LastName</Label>
          <Input
            invalid={validationStr[1] && true}
            type="text"
            placeholder="Jerry"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <FormFeedback>{validationStr[1]}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            invalid={validationStr[2] && true}
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormFeedback>{validationStr[2]}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            invalid = {validationStr[3] && true} 
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormFeedback>{validationStr[3]}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>ConfirmPassword</Label>
          <Input
            invalid = {validationStr[4] && true}
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <FormFeedback>{validationStr[4]}</FormFeedback>
        </FormGroup>
        <Button onClick={handleSignup}>Submit</Button>
      </Form>
    </div>
  )
}

export default Signup