import { all } from 'redux-saga/effects'
import auth from './auth'
import product from './product'

export default function* rootSaga () {
  yield all([
    auth(),
    product()
  ])
}
