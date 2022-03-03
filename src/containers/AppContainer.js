import React from 'react'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'
import store from 'redux/store'
import Routes from 'routes'

export default () => (
  <Provider store={store}>
    <Container style={{ height: '100%' }}>
      <Routes />
    </Container>
  </Provider>
)
