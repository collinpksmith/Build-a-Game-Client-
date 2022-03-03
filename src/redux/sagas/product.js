import { takeLatest } from 'redux-saga/effects'
// import { get, pick } from 'lodash'
import { 
  DO_GETPRODUCT,
  DO_GETPRODUCTS,
  DO_UPDATEPRODUCT,
  DO_DELETEPRODUCT,
  DO_ADDPRODUCT
} from 'redux/modules/product/constants'
import apiCall from '../api/apiCall'

const dogetproduct = apiCall({
  type : DO_GETPRODUCT,
  method : 'get',
  path: ({ payload }) => `/products/${payload.id}/`
})

const dogetproducts = apiCall({
  type: DO_GETPRODUCTS,
  method: 'get',
  path: 'products',
})

const doaddproduct = apiCall({
  type: DO_ADDPRODUCT,
  method: 'post',
  path: 'products'
})

const doupdateproduct = apiCall({
  type: DO_UPDATEPRODUCT,
  method: 'put',
  path: ({ payload }) => `/products/${payload.id}/`
})

const dodeleteproduct = apiCall({
  type: DO_DELETEPRODUCT,
  method: 'delete',
  path: ({ payload }) => `/products/${payload.id}`,
})

export default function*rootSaga () {
  yield takeLatest (DO_ADDPRODUCT, doaddproduct)
  yield takeLatest (DO_DELETEPRODUCT, dodeleteproduct)
  yield takeLatest (DO_UPDATEPRODUCT, doupdateproduct)
  yield takeLatest (DO_GETPRODUCTS, dogetproducts)
  yield takeLatest (DO_GETPRODUCT, dogetproduct)
}