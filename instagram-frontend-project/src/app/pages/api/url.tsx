
// const base_url = "http://localhost:8080/";
const base_url = "https://instagram-backend-api.vercel.app/";  
export const api = {
  userLogin: `${base_url}auth/login`,
  loginByUsername: `${base_url}auth/loginbyUsername`,
  register: `${base_url}auth/register`,
  verify: `${base_url}auth/verify-email-otp`,
  changepassword: `${base_url}auth/change-password`,
  forgotPassword: `${base_url}auth/forgot-password`,
  verifyResetOtp: `${base_url}auth/verify-reset-otp`,

  userProfile: `${base_url}user/profile`,
  updateProfile: `${base_url}user/update`,
  getProfileByUserId:`${base_url}user/getProfileByUserId`,

  getOwnAllPosts: `${base_url}post/getOwnAllPosts`,
  uploadPost: `${base_url}post/upload-multiple-post`,
  getownAllPosts: `${base_url}post/getOwnAllPosts`,
  getAllPosts: `${base_url}post/getAllPosts`,
  deletePerticularPost: `${base_url}post/deletePerticularPost`,
  getpostbyuserId: `${base_url}post/getPostsByUserId`,

  likePost: `${base_url}like/like-post`,
  unlikePost: `${base_url}like/unlike-post`,

  postComment: `${base_url}comment/CommentPost`,
  getComment: `${base_url}comment/getComment`,
  deleteComment: `${base_url}comment/DeleteComment`,

  follow:`${base_url}followUnfollow/follow`,
  unfollow:`${base_url}followUnfollow/unfollow`,
  
  followers:`${base_url}followUnfollow/followers`,
  following:`${base_url}followUnfollow/following`,

  SearchUser:`${base_url}user/search-users`,

  Notification:`${base_url}UserNotification/notifications`
  
};