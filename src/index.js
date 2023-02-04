import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
import './index.css';

import { addPost, getAuthorsLength, getPostsLength, getPosts, getPostsByAuthor } from './features/postSlice';
import { setName, getName } from './features/profileSlice';

const container = document.getElementById('root');
const root = createRoot(container);

function Details(props) {
  return (
    <div id="details-section">
      <UserDetails />
      <AppDetails />
    </div>
  );
}

function AppDetails(props) {
  const totalPosts = useSelector(getPostsLength);
  const totalAuthors = useSelector(getAuthorsLength);

  return (
    <div className="details" id="stats-section">
      <h2>App</h2>
      <p>Users: {totalAuthors}</p>
      <p>Total Posts: {totalPosts}</p>
    </div>
  );
}

function UserDetails(props) {
  const dispatch = useDispatch();

  const name = useSelector(getName);
  const posts = useSelector(getPostsByAuthor(name));

  const [nameFieldState, setNameFieldState] = useState(true);

  return (
    <div className="details" id="profile-section">
      <h2>Profile</h2>

      <label htmlFor="name">Name: </label>
      <input 
        disabled={nameFieldState} 
        id="name" value={name} 
        onChange={(e) => dispatch(setName(e.target.value))} 
      />
      <button onClick={() => setNameFieldState(!nameFieldState)}>
        {nameFieldState ? "Change" : "Save"}
      </button>

      <p>Posts: {posts}</p>
    </div>
  );
}

function CreatePost(props) {
  const dispatch = useDispatch();
  const name = useSelector(getName);
  const [text, setText] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    if(text !== '') {
      dispatch(addPost({ 
        author: name,
        text: text
      }));
      setText('');
    }
  };

  return (
    <form id="create-post">
      <textarea 
        id="create-post-textarea" value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button id="create-post-button" onClick={handleSubmit}>Create Post</button>
    </form>
  );
}

function Posts(props) {
  const posts = useSelector(getPosts);
  return (
    <div>
      {posts.map(
        post => (
          <div key={post.id} className="post">
            <p>{post.text}</p>
            <p className="post-author">Posted By: {post.author}</p>
          </div>
        )
      )}
    </div>
  );
}

function Main(props) {
  return (
    <div id="main">
      <Details />
      <div id="posts-section">
        <CreatePost id="create-post" />
        <Posts />
      </div>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);
