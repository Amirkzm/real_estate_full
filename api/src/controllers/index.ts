export {
  logout,
  login,
  register,
  isAuthenticated,
  googleLogin,
} from "./auth.controller";
export {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePosts,
  getNotifications,
} from "./user.controller";
export {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "./post.controller";

export {
  getChat,
  getChats,
  createChat,
  readChat,
  recieveNewMessage,
} from "./chat.controller";
