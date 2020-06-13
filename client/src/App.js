import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faAddressCard, faBars, faEdit, faChevronLeft, faComment, faCommentAlt, faPaperPlane, faPlus, faThumbsUp, faTimes, faTrashAlt, faUsers, faCheckDouble, faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'

import { AuthProvider } from './context/auth'
import ProtectedRoute from './util/ProtectedRoute'
import Header from './Components/Header/Header'
import NavBar from './Components/NavBar/NavBar'
import About from './Pages/About/About'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Members from './Pages/Members/Members'
import Register from './Pages/Register/Register'
import SinglePost from './Pages/SinglePost/SinglePost'
import SingleMember from './Pages/SingleMember/SingleMember'

import './App.css'
import 'semantic-ui-css/semantic.css';

library.add(faAddressCard, faBars, faPlus, faEdit, faChevronLeft, faComment, faCommentAlt, faPaperPlane, faThumbsUp, faTimes, faTrashAlt, faUsers, faCheckDouble, faPencilAlt)



function App() {

  return (
      <AuthProvider>
        <Router>
          <div className='App'>
            <div className='App__sidebar'>
            <NavBar/>
            </div>
            <div className='navigation'>
              <Header />
            </div>
            <main className='App__main'>
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/posts" component={Home} />
              <ProtectedRoute exact path="/posts/:postId" component={SinglePost} />
              <ProtectedRoute exact path="/members" component={Members} />
              <ProtectedRoute exact path="/members/:memberId" component={SingleMember} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </main>
          </div>
        </Router>
      </AuthProvider>
  )
}

export default App