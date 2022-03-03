import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants' 

export const addproduct = createAction(CONSTANTS.DO_ADDPRODUCT)
export const deleteproduct = createAction(CONSTANTS.DO_DELETEPRODUCT)
export const updateproduct = createAction(CONSTANTS.DO_UPDATEPRODUCT)
export const getproducts = createAction(CONSTANTS.DO_GETPRODUCTS)
export const getproduct = createAction(CONSTANTS.DO_GETPRODUCT)
export const loadNewProduct = createAction(CONSTANTS.LOAD_NEW_PRODUCT)
export const updateField = createAction(CONSTANTS.DO_UPDATEFIELD)