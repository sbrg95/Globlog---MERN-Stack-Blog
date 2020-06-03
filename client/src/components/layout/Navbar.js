/** @jsx jsx */
import { useContext, useEffect, Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { Link, navigate } from '@reach/router';
import UserContext from '../../context/user/UserContext';
import { formatName } from '../../Utilities';

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { isAuthenticated, user, logout, loadUser } = userContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const HandleLogout = () => {
    navigate('/');
    logout();
  };

  const handleUserPosts = (e) => {
    e.preventDefault();
    navigate(`/user/${user._id}`);
  };

  return (
    <nav css={styledNavbar}>
      <Link to='/' className='nav-brand'>
        <i className='fas fa-globe fa-2x' />
        <h1>Globlog</h1>
      </Link>
      <div className='nav-container'>
        <ul className='nav-list'>
          <Link to='/' className='nav-list-item'>
            <li>
              <i className='fas fa-home'></i> Home
            </li>
          </Link>
          {isAuthenticated && (
            <Fragment>
              <Link
                to={'/'}
                className='nav-list-item'
                onClick={handleUserPosts}
              >
                <li>My Posts</li>
              </Link>
              <Link to='/post/new' className='nav-list-item'>
                <li>New Post</li>
              </Link>
            </Fragment>
          )}
        </ul>

        <ul className='nav-list'>
          {isAuthenticated ? (
            <Fragment>
              <li className='greeting'>
                Hello {user && formatName(user.name)}
              </li>
              <Link to='/' className='nav-list-item' onClick={HandleLogout}>
                <li className='name'>
                  <i className='fas fa-sign-out-alt'></i> Logout
                </li>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/signup' className='nav-list-item'>
                <li>
                  <i className='fas fa-user-plus'></i> Signup
                </li>
              </Link>
              <Link to='/login' className='nav-list-item'>
                <li>
                  <i className='fas fa-sign-in-alt'></i> Login
                </li>
              </Link>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

const styledNavbar = css`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1rem 2rem;
  background-color: #fff;
  color: #333;

  a {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    h1 {
      color: #333;
      margin: 0;
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
    i {
      color: #772ce8;
    }
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;
    .nav-list {
      display: flex;
      align-items: center;
      .greeting {
        padding: 0.5rem 0;
      }
      .name {
        margin: 0 0.5rem;
      }
      &-item {
        padding: 0.5rem 0;
        margin: 0 0.5rem;
        color: #333;
        font-size: 1rem;
        border-bottom: 2px solid #fff;
      }
      &-item:hover {
        color: #772ce8;
        border-bottom: 2px solid #a970ff;
      }
    }
  }

  @media (max-width: 750px) {
    padding: 1rem;
    grid-template-columns: 1fr;
    .nav-brand {
      justify-content: center;
      margin-bottom: 1rem;
    }
    .nav-container {
      margin-left: 0;
      align-items: flex-start;
      .nav-list {
        flex-direction: column;
        &-item {
          margin: 0;
        }
        .name {
          margin: 0;
        }
      }
      .nav-list:first-of-type {
        align-items: flex-start;
      }
      .nav-list:last-of-type {
        align-items: flex-end;
      }
    }
  }
`;

export default Navbar;
