import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authTokenSelector } from 'redux/modules/auth/selectors'
import { logout } from 'redux/modules/auth/actions'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const currentUser = useSelector(currentUserSelector)
  const currentUser = useSelector(authTokenSelector)

  const doLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <NavbarBrand href="/"><h4>Product Management System</h4></NavbarBrand>
        <Nav className="ml-auto" navbar>
          {
            // Hired component by authentication
            currentUser &&
              <NavItem>
                <NavLink onClick={doLogout}>Logout</NavLink>
              </NavItem>
          }
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
          </NavItem>
          {
            currentUser && 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Products
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/product/add"> Add product </DropdownItem>
                <DropdownItem tag={Link} to="/products">Products list</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  View Favourites
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          }
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header
