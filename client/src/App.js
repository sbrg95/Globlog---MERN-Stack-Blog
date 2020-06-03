/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Router } from '@reach/router';
import Navbar from './components/layout/Navbar';
import PostList from './components/post/PostList';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import NewPost from './components/post/NewPost';
import EditPost from './components/post/EditPost';
import PostContent from './components/post/PostContent';
import UserState from './context/user/UserState';
import NotFound from './components/layout/NotFound';
import './App.css';

function App() {
  return (
    <UserState>
      <div css={styledApp} className='App'>
        <div className='container'>
          <Navbar />
          <Router primary={false}>
            <PostList path='/' />
            <PostList path='/user/:id' />
            <PostContent path='/post/:id' />
            <NewPost path='/post/new' />
            <EditPost path='/post/edit/:id' />
            <Login path='/login' />
            <Signup path='/signup' />
            <NotFound default />
          </Router>
        </div>
      </div>
    </UserState>
  );
}

const styledApp = css``;

export default App;
