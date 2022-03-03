import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button,
   Form, 
   FormGroup, 
   Label, 
   Input, 
   FormFeedback,
   } from 'reactstrap'
import { BackLoader } from 'components/Loader'
import moment from 'moment'
import { addproduct, getproduct, updateproduct, loadNewProduct } from 'redux/modules/product/actions'
import { Link } from 'react-router-dom'
import { currentUserSelector } from 'redux/modules/auth/selectors'
import { productDetailSelector } from 'redux/modules/product/selectors'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './AddProduct.css'


const AddProduct = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(currentUserSelector)
  const productdetails = useSelector(productDetailSelector)

  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [productname, setProductName] = useState('')
  const [validationStr, setValidationStr] = useState('')
  const verify = props.match.params.id

  //Get data from store 
  useEffect(() => {
    if (productdetails && verify !== 'add') {
      // console.log('her -0--', productdetails.date)
      setDate(moment(productdetails.date).format('YYYY-MM-DD'))
      setPrice(productdetails.price)
      setProductName(productdetails.productname)
    }
  }, [productdetails, verify])

  //set props as parameter to get "ID" in absolute URL
  // const verify = props.match.params.id

  useEffect(() => {

    if (props.match.params.id !== 'add') {
      console.log("true")
      dispatch(getproduct({
        id: props.match.params.id
      }))
    }
    else {
      dispatch(loadNewProduct())
    }
  }, [props, dispatch])


  const doAddproduct = useCallback(() => {
    const userID = currentUser._id
    const recordID = verify

    setIsLoading(true)
    if (props.match.params.id === 'add') {
      console.log("This is URL add section")
      dispatch(addproduct({
        body: {
          date, price, productname, userID
        },
        success: (res) => {
          setIsLoading(false)
          // toast('message', {
          //   type: toast.TYPE.ERROR,
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   pauseOnHover: true,
          // })
          alert("success")
          
          history.push('/products')
        },
        fail: (e) => {
          alert("falied")
          setIsLoading(false)
        }
      }))
    } else {
      console.log(" This is URL id condition", recordID)
      dispatch(updateproduct({
        body: {
          date, price, productname, recordID
        },
        success: (res) => {
          setIsLoading(false)
          alert("success")
          history.push('/products')
        },
        fail: (e) => {
          alert("failed")
          setIsLoading(false)
        }
      }))
    }
  }, [currentUser._id, verify, props.match.params.id, dispatch, date, price, productname, history])


  return (
    <div className="addproduct">
      <BackLoader open={isLoading} />
      { verify === "add" ? <h2> Add Product</h2> : <h2>Edit Product</h2> }
      <br></br>
      <Form>
        <h5>Product Info</h5>
        <hr></hr>
        <FormGroup>
          <Label>Date</Label>
          <Input type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="39.99$" 
            />
        </FormGroup>
        <FormGroup>
          <Label>ProductName</Label>
          <Input type="text"
            value={productname}
            onChange={e => setProductName(e.target.value)}
            placeholder="Necklace" 
            />
        </FormGroup>
        <Button color="primary" 
          onClick={doAddproduct}>
          { verify === "add" ? "Save" : "Update" }
          </Button>
        <Button className="float-right" 
          outline color="primary"
          tag = {Link}
          to = "/">
            Cancel
        </Button>
      </Form>
    </div>
  )
}

export default AddProduct
