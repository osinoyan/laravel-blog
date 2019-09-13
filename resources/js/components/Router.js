import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PostList from './Post/PostList'
import PostCreate from './Post/PostCreate'
import PostShow from './Post/PostShow'

import NotFound from './NotFound'

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/w/' component={PostList} />
        <Route exact path='/w/post/new' component={PostCreate} />
        <Route path='/w/post/show/:id' component={PostShow} />

        <Route path='/w/*' render={() => <NotFound />} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router

if (document.getElementById('root')) {
  ReactDOM.render(<Router />, document.getElementById('root'))
}



