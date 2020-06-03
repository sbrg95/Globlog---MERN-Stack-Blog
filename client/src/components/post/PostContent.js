/** @jsx jsx */
import { useState, useEffect, Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { formatDate, formatName } from '../../Utilities';
import PostLoader from './PostLoader';
import axios from 'axios';
import { Parser } from 'html-to-react';

const PostContent = ({ id }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const htmlParser = new Parser();

  useEffect(() => {
    let mounted = true;
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios
      .get(`/api/post/${id}`, config)
      .then((res) => {
        if (mounted) {
          setPost(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const { title, body, author, createdAt } = post;

  if (loading) {
    return <PostLoader />;
  }
  return (
    <div css={styledPostContent}>
      {error ? (
        <h1>Post Not Found! Something Went Wrong...</h1>
      ) : (
        <Fragment>
          <h1>{title}</h1>
          <p className='post-info'>
            <em>
              <small>{`${formatDate(createdAt)} / ${formatName(
                author
              )}`}</small>
            </em>
          </p>
          <hr />
          <div className='html-render'>{htmlParser.parse(body)}</div>
        </Fragment>
      )}
    </div>
  );
};

const styledPostContent = css`
  background-color: #fff;
  margin: 2rem 0;
  padding: 2rem;
  .html-render {
    overflow-wrap: break-word;
    word-break: keep-all;
  }
  &:after {
    content: '.';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  .post-info {
    margin: 0;
  }
  h1 {
    font-size: 1.5rem;
    color: #333;
  }
  h1,
  h2,
  h3 h4 {
    margin: 1rem 0;
  }
  p {
    text-align: justify;
    margin: 1rem 0;
  }
  figure.image {
    width: 100%;
    margin: 2rem 0;
    img {
      display: block;
      width: 100%;
      margin: auto;
    }
    figcaption {
      text-align: center;
      padding: 0.5rem;
      font-style: italic;
    }
  }
  figure.image.image-style-side {
    margin: 0.5rem 0 0.5rem 1rem;
    float: right;
    width: 50%;
  }

  blockquote {
    background-color: #f4f4f4;
    margin: 0.5rem 0;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-left: 10px solid #333;
  }
  figure.table {
    width: 100%;
    margin: 2rem 0;
    table {
      width: 80%;
      margin: auto;
      border-collapse: collapse;
      td,
      th {
        border: 1px solid #333;
        text-align: center;
        padding: 0.25rem 0.5rem;
      }
    }
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
    figure.image.image-style-side {
      margin: 0.5rem 0;
      float: none;
      width: 100%;
    }
  }
`;

export default PostContent;
