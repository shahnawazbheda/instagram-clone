
import axios, { AxiosRequestConfig } from "axios";
import { api } from "../pages/api/url";

axios.interceptors.request.use, (async function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${token}`
      };
    }
  }
  return config;
});

axios.interceptors.request.use(async function (config) {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserData = () => {
  return axios.get<string>(api.userProfile);
};

interface UserLoginData {
  email: string;
  password: string;
}

interface register {
  email: string;
}

interface verifyemailotp {
  name: string;
  email: string;
  mobile: string;
  userName: string;
  password: string;
  bio: string;
  otp: string;
}

interface userProfile {
  name: string,
  userName: string
}


interface UpdateProfile {
  name: string,
  mobile: number,
  userName: string,
  bio: string,
}


interface ChangePasswordData {
  password: string;
  newpassword: string;
}

interface VerifyResetOtpData {
  email: string;
  otp: number;
  newpassword: string;
}


interface UploadPost {
  caption: string;
  file: string;
}


interface followUser {
  userId: string;
  token: string;
}

interface ForgotPasswordData {
  email: string;
}


export const LoginUser = (data: UserLoginData) => {
  return axios.post(api.userLogin, data);
};

export const LoginUserByUserName = (data: UserLoginData) => {
  return axios.post(api.loginByUsername, data);
};

export const registerUser = (data: register) => {
  return axios.post(api.register, data);
};

export const VerifyUser = (data: verifyemailotp) => {
  return axios.post(api.verify, data);
};

export const GetData = () => {
  return axios.get(api.userProfile);
}

export const updateUserData = (data: UpdateProfile) => {
  return axios.put(api.updateProfile, data);
};

export const  getOwnAllPosts = () => {
  return axios.get(api.getOwnAllPosts);
};

export const getAllPosts = () => {
  return axios.get(api.getAllPosts);
};

export const DeletePost = (postId: string) => {
  return axios.delete(api.deletePerticularPost, {
    data: { postId },
  });
};


export const changePassword = (data: ChangePasswordData) => {
  return axios.post(api.changepassword, data);
}


export const forgotPassword = (data: ForgotPasswordData) => {
  return axios.post(api.forgotPassword, data);
};


export const verifyResetOtp = (data: VerifyResetOtpData) => {
  return axios.post(api.verifyResetOtp, data);
};

export const uploadPost = (data: UploadPost) => {
  return axios.post(api.uploadPost, data);
}

export const getPostsByUserId = (userId: any) => {
  return axios.get(api.getpostbyuserId, {
    params: { userId },
  });
}

export const getProfileByUserId = (userId: any) => {
  return axios.get(api.getProfileByUserId, {
    params: { userId },
  });
}

export const likePost = (postId: string) => {
  return axios.post(api.likePost, { postId });
};

export const unlikePost = (postId: string) => {
  return axios.post(api.unlikePost, { postId });
};

export const Addcomments = (postId: string, comment: string) => {
  return axios.post(api.postComment, { postId, comment });
};

export const GetCommentFunction = (postId: string) => {
  return axios.get(api.getComment, {
    params: { postId },
  });
};

export const CommentDelete = (commentId: string) => {
  return axios.delete(api.deleteComment, {
    params: { commentId },
  });
};

export const followUser = (userId: any, token: any) => {
  return axios.post(api.follow, null, {
    params: { userId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unfollowUser = (userId: any, token: any) => {
  return axios.post(api.unfollow, { userId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllFollowers = (userId: any) => {
  console.log('userId-> getallfollowes',userId);

  return axios.get(api.followers, {
    params: { userId },
  })
}


export const getAllFollowing = (userId: any) => {
  return axios.get(api.following, {
    params: { userId },
  })
}



export const SearchUser = (userName: any, token:any) => {
  return axios.get(api.SearchUser, {
    params: { userName   },
    headers: { Authorization: `Bearer ${token}` },
  })
}


export const getNotification = (token:string)=>{
  return axios.get(api.Notification,{
    headers:{Authorization:`Bearer ${token}`},
  }); 
}

export default api;

