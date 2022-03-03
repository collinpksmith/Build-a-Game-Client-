import { takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from 'redux/modules/auth/constants'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: CONSTANTS.DO_LOGIN,
  method: 'post',
  path: 'auth/login',
  success: (res, action) => {
    localStorage.setItem('jogging_auth', JSON.stringify(res.data))
  }
})

const doSignup = apiCall({
  type: CONSTANTS.DO_SIGNUP,
  method: 'post',
  path: 'auth/signup',
  success: () => {
    localStorage.setItem('jogging_auth') 
  },
  fali: () => {
    localStorage.removeItem('jogging_auth')
  }
})



export default function* rootSaga() {
  yield takeLatest(CONSTANTS.DO_SIGNUP, doSignup)
  yield takeLatest(CONSTANTS.DO_LOGIN, doLogin)
}
