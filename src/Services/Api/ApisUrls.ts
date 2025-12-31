
type Id = string | number;
// Base URL for API and Image
export const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const imgBaseURL = "https://upskilling-egypt.com:3006";

// Manager URLs
export const Manager_URLS = {
  LOGIN: "/Users/Login",
  REGISTER: "/Users/Register",
  RESET_REQUEST: "/Users/Reset/Request",
  RESET: "/Users/Reset",
  CHANGE_PASSWORD: "/Users/ChangePassword",
  GET_CURRENT_USER: "/Users/currentUser",
};

// Employee URLs
export const Employee_URLS = {
  GET_CATEGORIES: "/Category",
  DELETE_CATEGORY: (id:Id) => `/Category/${id}`,
  UPDATE_CATEGORY: (id:Id) => `/Category/${id}`,
  POST_CATEGORY: "/Category",
};
// //user recipies
// export const USER_RECIPIES_URLS={
//     GET_FAVS:`/userRecipe/`,
//     DELETE_FAV:(id:Id) => `/userRecipe/${id}`,
//     CREATE_FAV:`/userRecipe/`,
// }