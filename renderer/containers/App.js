import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import Top from 'containers/Top'

export default class App extends React.Component {
  static childContextTypes = {
    client: PropTypes.func,
  }

  getChildContext() {
    return {
      client: this.props.client,
    }
  }

  render() {
    const { history } = this.props

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Top} />
        </Switch>
      </Router>
    )
  }
}