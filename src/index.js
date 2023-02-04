import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

function DetailsSection(props) {
  return (
    <div>
      <div>
        <h2>Profile</h2>

        <label htmlFor="name">Name: </label>
        <input id="name" />
        <button>Change</button>

        <p>Posts: </p>
      </div>

      <div>
        <h2>App</h2>

        <p>Users: </p>
        <p>Total Posts: </p>
      </div>
    </div>
  );
}

function PostsSection(props) {
  return (
    <div>
      <textarea />
      <button>Post</button>
    </div>
  );
}

function Main(props) {
  return (
    <div id="main">
      <DetailsSection />
      <PostsSection />
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
