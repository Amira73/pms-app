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
};

export const TASK_URLS = {
  CREATE_TASK: "/Task", // Create task by manager
  GET_ASSIGNED_TASKS: "/Task", // Get all my assigned tasks
  GET_TASKS_BY_MANAGER: "/Task/manager", // Get all tasks by manager
  GET_TASK: (id: number) => `/Task/${id}`, // Get task by id
  UPDATE_TASK: (id: number) => `/Task/${id}`, // Update task by id
  DELETE_TASK: (id: number) => `/Task/${id}`, // Delete task by id
  COUNT_TASKS: "/Task/count", // Count tasks for manager and employee
  CHANGE_STATUS: (id: number) => `/Task/${id}/change-status`, // Change task status
  GET_TASKS_BY_PROJECT: (id: number) => `/Task/project/${id}`, // Get tasks by project id
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
