import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'
// import { omit, reject } from 'lodash'

const initialState = {
  record: null,
  status: 'INIT',
  records: [],
}

export default handleActions({
  //  Get_product operation
  [requestSuccess(CONSTANTS.DO_GETPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_GETPRODUCT),
    record: payload,
    error: null
  }),

  [requestFail(CONSTANTS.DO_GETPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_GETPRODUCT),
    error: payload
  }),
  // Get_products operation
  [requestSuccess(CONSTANTS.DO_GETPRODUCTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_GETPRODUCTS),
    records: payload,
    error: null
  }),

  [requestFail(CONSTANTS.DO_GETPRODUCTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_GETPRODUCTS),
    error: payload
  }),
  // Add_product operation
  [requestSuccess(CONSTANTS.DO_ADDPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_ADDPRODUCT),
    record: payload,
    error: null
  }),

  [requestFail(CONSTANTS.DO_ADDPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_ADDPRODUCT),
    error: null
  }),
  //Updateproduct operation
  [requestSuccess(CONSTANTS.DO_UPDATEPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_UPDATEPRODUCT),
    record: payload,
    error: null
  }),

  [requestFail(CONSTANTS.DO_UPDATEPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_UPDATEPRODUCT),
    error: null
  }),
  //Deleteproduct operation
  [requestSuccess(CONSTANTS.DO_DELETEPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CONSTANTS.DO_DELETEPRODUCT),
    record: payload,
    error: null
  }),

  [requestFail(CONSTANTS.DO_DELETEPRODUCT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.DO_DELETEPRODUCT),
    error: null
  }),

  [CONSTANTS.LOAD_NEW_PRODUCT]: (state) => ({
    ...state,
    record: null
  }),

  [CONSTANTS.DO_UPDATEFIELD]: (state, action) => ({
    ...state,
    record: action.value
  }),

}, initialState)

  

