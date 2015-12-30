const initialState = {
  isFetching: false,
  message: '点击加载',
  posts: []
};

export default function(state = initialState, action) {
  let nextState = {};
  switch(action.type) {
    case "REQUEST_POSTS":
      nextState.isFetching = true
      nextState.message = '正在加载'
      nextState.posts = []
      return Object.assign({}, state, nextState)
    case "RECEIVE_POSTS":
      nextState.isFetching = false
      nextState.message = '加载成功'
      nextState.posts = action.payload.posts
      return Object.assign({}, state, nextState)
    case "POSTS_FAILURE":
      nextState.isFetching = false
      nextState.message = '加载失败'
      nextState.posts = []
      return Object.assign({}, state, nextState)
    default:
      return state;
  }
}
