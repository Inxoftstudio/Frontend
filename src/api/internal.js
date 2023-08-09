import axios from "axios";
import { REACT_APP_INTERNAL_API_PATH } from "../utils";


const api = axios.create({
  baseURL: REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



// Auth api 

export const LoginApi = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const SignUpApi = async (data) => {
  let response;

  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const LogoutApi = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }
  return response;
};



// Blog api 

export const BlogsApi = async () => {
  let response;
  try {
    response = await api.get("/blog/all");
  } catch (error) {
    return error;
  }
  return response;
}

export const BlogApi = async (id) => {
  let response;
  try {
    response = await api.get(`/blog/${id}`);
  } catch (error) {
    return error
  }
  return response;
}

export const SubmitBlogApi = async (data) => {
  let response;
  try {
    response = await api.post("/blog", data);
  } catch (error) {
    return error
  }
  return response;
}

export const UpdateBlogApi = async (data) => {
  let response;
  try {
    response = await api.put(`/blog`, data);
  } catch (error) {
    return error
  }
  return response;
}

export const DeleteBlogApi = async (id) => {
  let response;
  try {
    response = await api.delete(`/blog/${id}`);
  } catch (error) {
    return error
  }
  return response;
}


// Comment api

export const GetCommentBlogApi = async (id) => {
  let response;
  try {
    response = await api.get(`/comment/${id}`, {
      ValidityState: false
    });

  } catch (error) {
    return error
  }
  return response;
}

export const PostCommentBlogApi = async (data) => {
  let response;
  try {
    response = await api.post(`/comment`, data);
  } catch (error) {
    return error
  }
  return response;
}


// Refresh Token
// api.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalReq = error.config;

//     if (
//       (error.response.status === 401 || error.response.status === 500) &&
//       originalReq &&
//       !originalReq._isRetry
//     ) {
//       originalReq.isRetry = true;

//       try {
//         await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
//           withCredentials: true,
//         });

//         return api.request(originalReq);
//       } catch (error) {
//         return error;
//       }
//     }
//   }
// );





api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (refreshError) {
        // Retry failed even after refresh attempt, handle the original error
        return Promise.reject(error);
      }
    } else {
      // Handle non-retryable errors by displaying error messages
      // Use toast.error to show appropriate error messages
      // You can access error.response.data or error.message to extract details
      toast.error("An error occurred: " + (error.response.data.message || error.message));
      return Promise.reject(error);
    }
  }
);
