import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import moment from 'moment'
import { getproducts, deleteproduct } from 'redux/modules/product/actions'
import { useDispatch, useSelector } from 'react-redux'
import { productsListSelector } from 'redux/modules/product/selectors'
import { BackLoader } from 'components/Loader'
import confirm from 'containers/ConfirmModal'

const ProductsList = () => {

  // const history = useHistory()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const productsList = useSelector(productsListSelector)

  //delete record operation
  const doDeleterecord = (id) => () => {
    confirm('Are you sure to delete the record?').then(() => {
    dispatch(deleteproduct({
      id,
      success: () => {
        dispatch(getproducts())
      }
    }))}
    )
  }

  useEffect(() => {
    dispatch(getproducts())
  }, [dispatch])


  return (
    <div>
      <BackLoader open={isLoading} />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>ProductName</th>
          <th>Price($)</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productsList?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.productname}</td>
            <td>{item.price}</td>
            <td>{moment(item.date).format('YYYY-MM-DD')}</td>
            <td>
              <Button
                outline color="primary"
                tag={Link}
                to={`/product/${item._id}`}
              >   
                Edit
              </Button>

              <Button
                style={{ marginLeft: '10px' }}
                outline color="danger"
                onClick={doDeleterecord(item._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
    </div>
    
  )
}

export default ProductsList