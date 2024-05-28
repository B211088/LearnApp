export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://polar-fortress-55465-1f2d8f99b0c5.herokuapp.com/api"
    : "somedeployedUrl";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";


export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAILED = "POSTS_LOADED_FAILED";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_PO ST";
export const FIND_POST = "FIND_POST";
