import { makeRequest } from "./makeRequest";

const URL = "/v2/group-10/posts";

export const getPhotos = (config) =>
  makeRequest({
    method: "GET",
    url: URL,
    headers: {
      'content-type': 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2MTVkNzU5Yjk4YjAzOGY3N2I0ZWYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MDIzNDI1LCJleHAiOjE3MDc1NTk0MjV9.sN3kyESC9Qlq9Xg2R2guEDXp3ErtuwfBUD4d9pQP2IM'
  },
    ...config,
  });

export const mutatePhoto = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    // method: "PUT",
    ...config,
  });
};

export const getUserCommentNames = (postId) =>{
  return makeRequest({
  method: "GET",
  url: `${URL}/comments/${postId}`
})
}
