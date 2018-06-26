import React  from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import client from 'axios'
import thunk from 'redux-thunk'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ipcRenderer } from 'electron'

import App from 'containers/App'
import reducer from 'modules/reducer'
import theme from 'lib/mui'

// redux-devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()
const thunkWithClient = thunk.withExtraArgument(client)
const store = createStore(reducer, composeEnhancers(applyMiddleware(routerMiddleware(history),thunkWithClient)))

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App history={history} client={client} />
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
hot(module)(Root)

ipcRenderer.on('ipc::dispatch', (e, action) => {
  store.dispatch(action)
})