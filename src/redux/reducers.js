import { combineReducers } from 'redux'

import auth from './modules/auth/reducers'
import product from './modules/product/reducers'

export default combineReducers({
  auth,
  product
})
