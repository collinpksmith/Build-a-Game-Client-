import { createAction } from 'redux-actions'
import * as CONSTANTS  from './constants'

export const signup = createAction(CONSTANTS.DO_SIGNUP)
export const login = createAction(CONSTANTS.DO_LOGIN)
export const logout = createAction(CONSTANTS.DO_LOGOUT)
