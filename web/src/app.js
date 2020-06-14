import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Bundle from './bundle'
import loadHome from 'bundle-loader?lazy!./views/home'
import './app.css'

//lazy load chunks
const bundle = (load) => () => {
  return (
    <Bundle load={load}>
      {(Component) => <Component />}
    </Bundle>
  )
}

const route = [
  {
    path: '/',
    component: bundle(loadHome)
  }
]

function App() {
  return (
    <Router>
      <Switch>
        {
          route.map(item => (
            <Route exact strict path={item.path} key={item.path}>
              <item.component />
            </Route>
          ))
        }
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
