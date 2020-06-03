import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/user/UserContext';
import PostItem from './PostItem';
import PostLoader from './PostLoader';
import { navigate } from '@reach/router';
import axios from 'axios';
import SearchPost from './SearchPost';

const PostList = (props) => {
  const userContext = useContext(UserContext);
  const { isAuthenticated } = userContext;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    if (!isAuthenticated && props.id && !loading) {
      navigate('/login');
    }

    axios.get('/api/post').then((res) => {
      if (mounted) {
        setPosts(res.data.data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, props.id, loading]);

  if (loading) {
    return <PostLoader />;
  }

  const searchedPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchPost value={query} onChange={setQuery} />
      {props.id
        ? searchedPosts
            .filter((post) => post.createdBy === props.id)
            .map((post) => <PostItem key={post._id} post={post} admin={true} />)
        : searchedPosts.map((post) => <PostItem key={post._id} post={post} />)}
    </div>
  );
};

export default PostList;
