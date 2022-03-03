import React, { useState, useCallback } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label, Alert } from 'reactstrap'
import { validator } from 'helpers/validator'
import { BackLoader } from 'components/Loader'
import { useDispatch } from 'react-redux'
import { login } from 'redux/modules/auth/actions'
import { useHistory } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[validationStr, setValidationStr] = useState('')
  const[errorMessage, setErrorMessage] = useState('Error on LogIn')
  const[isLoading, setIsloading] = useState(false)


  const doLogin = useCallback(() => {
    setIsloading(true)
    dispatch(login({
      body: {
        email, password
      },
      success: (res) => {
        setIsloading(false)
        history.push('/')
      },
      fail: (e) => {
        alert(errorMessage)
        setIsloading(false)
      }
    }))
  }, [dispatch, email, password, history, errorMessage])

  const handleLogin = () => {
    let validation_str= []
    validation_str.push(validator(email, ['require', 'email']))
    validation_str.push(validator(password, ['require']))

    setValidationStr(validation_str)
    const isValid = !validation_str.filter(item => item).length
    if (!isValid) {
      return
    }
    doLogin()
  }

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleLogin()
  //   }
  // }


  return (
    <div className="login">
      <BackLoader open={isLoading} />
        <h2>Sign In</h2>
        <Form className="form">
          <FormGroup>
            <Label>Email</Label>
            <Input
              invalid={validationStr[0]}
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormFeedback>{validationStr[0]}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              invalid = {validationStr[1]}
              type="password"
              placeholder="********"
              valude={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormFeedback>{validationStr[1]}</FormFeedback>
          </FormGroup>
        <Button onClick={handleLogin}>Submit</Button>
        <Button className="float-right" href="Signup">Please Signup</Button>
      </Form>
    </div>
  )
}

export default Login