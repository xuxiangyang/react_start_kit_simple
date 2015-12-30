import fetch from 'isomorphic-fetch'

export function requestPosts() {
  return {
    type: "REQUEST_POSTS"
  }
}

export function receivePosts(posts) {
  return {
    type: "RECEIVE_POSTS",
    payload: {
      posts: posts
    }
  }
}

export function errorPosts() {
  return {
    type: "POSTS_FAILURE"
  }
}

export function fetchPosts() {
    return function (dispatch) {
        dispatch(requestPosts());
        return fetch("http://www.reddit.com/r/reactjs.json", {
          method: "get"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            var posts = json.data.children.map(child => child.data)
            return dispatch(receivePosts(posts));
        }).catch(function (error) {
            return dispatch(errorPosts());
        });
    };
}