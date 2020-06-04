import React, { useContext, useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faAddressCard, faBars, faEdit, faChevronLeft, faComment, faCommentAlt, faPaperPlane, faPlus, faThumbsUp, faTimes, faTrashAlt, faUsers, faCheckDouble, faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'

import 'semantic-ui-css/semantic.css';
import './App.css'

import reducer from './reducer'
import { AuthProvider, AuthContext } from './context/auth'
import AuthRoute from './util/AuthRoute'

import Header from './Components/Header/Header'
import NavBar from './Components/NavBar/NavBar'
import About from './Pages/About/About'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import SinglePost from './Pages/SinglePost/SinglePost'

library.add(faAddressCard, faBars, faPlus, faEdit, faChevronLeft, faComment, faCommentAlt, faPaperPlane, faThumbsUp, faTimes, faTrashAlt, faUsers, faCheckDouble, faPencilAlt)



function App() {
  const initialState = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)
 
  return (
    <AuthProvider value={{ state, dispatch }}>
      <Router>
        <div className='App'>
          <div className='App__sidebar'>
          <NavBar/>
          </div>
          <div className='navigation'>
            <Header />
          </div>
          <main className='App__main'>
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute exact path="/posts" component={Home} />
            <AuthRoute exact path="/posts/:postId" component={SinglePost} />
            <AuthRoute exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

