/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import UserContext from '../../context/user/UserContext';
import { navigate } from '@reach/router';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alert from '../layout/Alert';
import PostLoader from './PostLoader';
import { postValidation } from '../../Utilities';

const NewPost = () => {
  const userContext = useContext(UserContext);
  const { isAuthenticated } = userContext;
  const [post, setPost] = useState({
    title: '',
    description: '',
    body: '',
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const { title, description, body } = post;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = postValidation(post);
    if (errs.length !== 0) {
      setAlerts(errs);
      setTimeout(() => {
        setAlerts([]);
      }, 5000);
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      try {
        await axios.post(
          '/api/post/',
          {
            title,
            description,
            body,
          },
          config
        );

        navigate('/');
      } catch (err) {
        const errors = err.response.data.errors;
        const flatErrors = errors.map((error) => error[Object.keys(error)[0]]);
        setAlerts(flatErrors);
        setTimeout(() => {
          setAlerts([]);
        }, 5000);
      }
    }
  };

  if (!isAuthenticated) {
    return <PostLoader />;
  }

  return (
    <div css={styledNewPost}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          placeholder='Post title'
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          name='description'
          id='description'
          value={description}
          placeholder='Post description'
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        ></textarea>
        <div className='ckeditor-container'>
          <CKEditor
            editor={ClassicEditor}
            data={body}
            config={{
              simpleUpload: {
                uploadUrl: '/api/image',
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPost({ ...post, body: data });
            }}
          />
        </div>

        <button className='btn btn-primary btn-block' type='submit'>
          Publish
        </button>
      </form>
      {alerts.length !== 0 && <Alert errors={alerts} />}
    </div>
  );
};

const styledNewPost = css`
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #fff;
  form {
    width: 100%;
    .ck-editor__editable_inline {
      min-height: 200px;
    }
    input[type='text'],
    textarea {
      width: 100%;
    }
    button {
      margin-top: 2rem;
    }
    .ckeditor-container {
      text-align: justify;
    }
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default NewPost;
