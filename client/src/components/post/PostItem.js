/** @jsx jsx */
import { useState } from 'react';
import Modal from 'react-modal';
import { css, jsx } from '@emotion/core';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import { formatDate, formatName } from '../../Utilities';

Modal.setAppElement('#root');

const PostItem = ({ post, admin }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { _id, title, description, author, createdAt } = post;

  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    navigate(`/post/edit/${_id}`);
  };

  const handleRemovePost = () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios.delete(`/api/post/${_id}`, config).then((res) => {
      navigate('/');
    });
  };
  return (
    <div css={styledPostItem}>
      <div className='post-head'>
        <Link to={`/post/${_id}`}>
          <h1>{title}</h1>
        </Link>
        {admin && (
          <div className='admin'>
            <Link to='/' title='Edit' onClick={handleUpdatePost}>
              <i className='fas fa-edit'></i>
            </Link>
            <Link
              to='/'
              title='Remove'
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              <i className='fas fa-trash-alt'></i>
            </Link>
          </div>
        )}
      </div>
      <p className='date-author'>
        <em>
          <small>{`${formatDate(createdAt)} / ${formatName(author)}`}</small>
        </em>
      </p>
      <p className='description'>{description}</p>
      <Link className='read-more' to={`/post/${_id}`}>
        Read More...
      </Link>
      <Modal isOpen={isOpened} style={modalStyles}>
        <div css={modalBody}>
          <h3>Are you sure about removing this post ?</h3>
          <div>
            <button className='btn btn-danger' onClick={handleRemovePost}>
              Yes
            </button>
            <button className='btn btn-primary' onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const modalBody = css`
  padding: 1rem;
  h3 {
    margin: 0 0 1rem 0;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    button {
      width: 5rem;
      margin: 0 0.5rem;
    }
  }
`;

const styledPostItem = css`
  background-color: #fff;
  color: #333;
  width: 100%;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 1px 3px 20px rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
  }
  p {
    text-align: justify;
  }
  h1 {
    color: #333;
    margin: 0;
    font-size: 1.3rem;
  }
  .date-author {
    margin: 0 0 0.5rem 0;
  }
  .read-more {
    text-decoration: underline;
    font-size: 1.2rem;
  }
  .post-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .admin {
      display: flex;
      font-size: 1.3rem;
      a:first-of-type {
        color: #0040f4;
        margin-right: 0.5rem;
      }
      a:last-of-type {
        color: #f41c24;
      }
      a:hover {
        opacity: 0.8;
      }
    }
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default PostItem;
