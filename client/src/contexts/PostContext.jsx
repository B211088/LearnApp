import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  FIND_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAILED,
      });
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.posts,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //find update post user is allowed to updating
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({
      type: FIND_POST,
      payload: post,
    });
    return post;
  };

const updatePost = async (updatedPost) => {
  try {
    const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
    if (response.data.success) {
      dispatch({
        type: UPDATE_POST,
        payload: response.data.post, // Đảm bảo payload là post được cập nhật
      });
      return response.data;
    }
  } catch (error) {
    return error.response?.data
      ? error.response.data
      : { success: false, message: "Server Error" };
  }
};

  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
