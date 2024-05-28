import {
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };

    case POSTS_LOADED_FAILED:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case ADD_POST:
      return {
        ...state.posts,
        posts: [...state.posts, payload],
      };
    case DELETE_POST:
      return {
        ...state.posts,
        posts: state.posts.filter((post) => post.id !== payload),
        postLoading: false,
      };
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === payload._id ? payload : post
          ),
        };
      

    case FIND_POST:
        return {
            ...state,
            post: payload
        }

    default:
      return state;
  }
};
