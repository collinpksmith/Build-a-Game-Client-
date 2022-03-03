import { get } from 'lodash'

export const productDetailSelector = (state) =>
  get(state, 'product.record',{})

export const productsListSelector = (state) =>
  get(state, 'product.records', [])

export const productStateSelector = (state) => 
  get(state, 'product', {})