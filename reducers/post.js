import axios from 'axios'

import Produce from '../util/produce'

// 초기 데이터 구조
export const initialState = {
  Posts: [],
  loadPostsDone: false,
  loadPostsError: null,
  addPostDone: false,
  addPostError: null,
  updatePostDone: false,
  updatePostError: null,
  removePostDone: false,
  removePostError: null,
  filterWeather: []
}

// 액션 상수
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'
export const ADD_COMMENT_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_POST_FAILURE'
export const FILTER_WEATHER = 'FILTER_WEATHER'

// 액션 크리에이터
export const loadPost = (accessToken) => async (dispatch) => {
  try {
    const headers = {
      Authorization: accessToken
    }
    const response = await axios.get(`http://localhost:5000/api/posts?page=${1}`, { headers })
    dispatch({
      type: LOAD_POST_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: LOAD_POST_FAILURE,
      payload: err.response.data
    })
  }
}

export const addPost = (data, accessToken) => async (dispatch) => {
  try {
    const headers = {
      Authorization: accessToken
    }
    const response = await axios.post('http://localhost:5000/api/post/', data, { headers })
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: ADD_POST_FAILURE,
      payload: err.response.data
    })
  }
}

export const updatePost = (id, data, accessToken) => async (dispatch) => {
  try {
    const headers = {
      Authorization: accessToken
    }
    const response = await axios.patch(`http://localhost:5000/api/post/${id}`, data, { headers })
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload: err.response.data
    })
  }
}

export const removePost = (id, accessToken) => async (dispatch) => {
  try {
    const headers = {
      Authorization: accessToken
    }
    await axios.delete(`http://localhost:5000/api/post/${id}`, { headers })
    dispatch({
      type: REMOVE_POST_SUCCESS,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: REMOVE_POST_FAILURE,
      payload: err.response.data
    })
  }
}

export const addComment = (data) => (dispatch) => {
  try {
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: err.data
    })
  }
}

// export const addComment = (data) => async (dispatch) => {
//   try {
//     const response = await axios.post('url', data)
//     dispatch({
//       type: ADD_COMMENT_SUCCESS,
//       payload: response.data
//     })
//   } catch (err) {
//     dispatch({
//       type: ADD_COMMENT_FAILURE,
//       payload: err.response.data
//     })
//   }
// }

const reducer = (state = initialState, action) => Produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POST_SUCCESS:
      console.log('LOAD_POST_SUCCESS : ', action.payload)
      draft.loadPostsDone = true
      draft.Posts = action.payload.posts
      break
    case LOAD_POST_FAILURE:
      draft.loadPostsDone = false
      draft.loadPostsError = action.payload.message
      break
    case ADD_POST_SUCCESS:
      draft.addPostDone = true
      draft.Posts.unshift(action.payload)
      break
    case ADD_POST_FAILURE:
      draft.addPostDone = true
      draft.addPostsError = action.payload.message
      break
    case UPDATE_POST_SUCCESS:
      draft.updatePostDone = true
      draft.Posts.find((v) => v.id === action.payload.PostId).content = action.payload.content
      break
    case UPDATE_POST_FAILURE:
      draft.updatePostDone = false
      draft.updatePostsError = action.payload.message
      break
    case REMOVE_POST_SUCCESS:
      draft.removePostDone = true
      draft.Posts = draft.Posts.filter((v) => v._id !== action.payload)
      break
    case REMOVE_POST_FAILURE:
      draft.removePostDone = false
      draft.removePostError = action.payload.message
      break
    case ADD_COMMENT_SUCCESS: {
      const post = draft.Posts.find((v) => v._id === action.data.postId)
      post.comments.unshift({ user: action.data.user, content: action.data.user })
      draft.addCommentDone = true
      break
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentDone = false
      draft.addCommentError = action.payload.message
      break
    case FILTER_WEATHER:
      draft.filterWeather = action.payload
      break
    default:
      break
  }
})

export default reducer
