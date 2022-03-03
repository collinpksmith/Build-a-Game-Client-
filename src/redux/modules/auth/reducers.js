import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'

const getInitialState = () => {
  let authRestore = JSON.parse(localStorage.getItem('jogging_auth') || null)
  // let authUser = JSON.parse(localStorage.getItem('jogging_user'))

  return {
    token: authRestore?.token || null,
    me: authRestore,
    status: 'INIT',
    error: null
  }
}

export default handleActions({

  [requestSuccess(CONSTANTS.DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(CONSTANTS.DO_LOGIN),
    me: payload.token
  }),

  [requestFail(CONSTANTS.DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_LOGIN),
    me: null,
    error: payload,
  }),

  [CONSTANTS.DO_LOGOUT]: (state, { payload }) => {
    localStorage.removeItem('jogging_auth')

    return ({
      ...state,
      token: null,
      status: CONSTANTS.DO_LOGOUT,
      me: null,
      error: null
    })
  },


  [requestSuccess(CONSTANTS.DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_SIGNUP),
  }),
  [requestFail(CONSTANTS.DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_SIGNUP),
    token: null,
    me: null,
    error: payload
  })

}, getInitialState())
