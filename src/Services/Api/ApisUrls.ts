type Id = string | number;
// Base URL for API and Image
export const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const imgBaseURL = "https://upskilling-egypt.com:3006";

// Users URLs

export const USERS_URL = {
  LOGIN: "/Users/Login",
  REGISTER: "/Users/Register",
  CREATE: "/Users/Create", // Create a manager
  GET_USER: (id: Id) => `/Users/${id}`, // Get user by ID
  TOGGLE_USER: (id: Id) =>`/Users/${id}`, 
  GET_ALL_USERS: "/Users", // Get and filter users ..
  GET_COUNT: "/Users/count", // Get users count by manager
  GET_MANAGER_USERS: "/Users/Manager", // Get users by manager
  VERIFY_ACCOUNT: "/Users/verify", // Verify user account
  GET_CURRENT_USER: "/Users/currentUser", // Get current user
  UPDATE_PROFILE: "/Users", // Update current user profile
  CHANGE_PASSWORD: "/Users/ChangePassword", // Update user password
  RESET_REQUEST: "/Users/Reset/Request", // Request reset if forget
  RESET: "/Users/Reset", // Reset user password
  ForgetPassword: "/Users/Forget", //  Forget password
  GetAllProjects: "/Project/manager", //  Forget password
   DeleteProject: (id: Id) =>`/Project/${id}`, 
   CreateProject:'/Project'
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
