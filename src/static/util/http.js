import axios from "axios";
//获得csrfToken
function getCsrf() {
  let o = document.cookie.match(/(^| )_csrf=([^;]*)(;|$)/);
  return o === null ? null : o[2];
}

function getAccessToken() {
  let o = document.cookie.match(/(^| )accessToken=([^;]*)(;|$)/);
  return o === null ? null : o[2];
}
axios.defaults.baseURL = 'http://localhost:7001/api';
export default {
  initial() {
    axios({
      url: '/',
      method: 'get',
      withCredentials: true
    }).then(function (response) {}).catch(function (err) {});
  },
  login(userKey) {
    return axios({
      url: '/signIn',
      method: 'post',
      data: {
        userMail: userKey.mail,
        userPassword: userKey.pwd
      },
      headers: {
        "x-csrf-token": getCsrf()
      },
      withCredentials: true
    });
  },
  register(userKey) {
    return axios({
      url: '/signUp',
      method: 'post',
      data: {
        userMail: userKey.mail,
        userPassword: userKey.pwd
      },
      headers: {
        "x-csrf-token": getCsrf()
      },
      withCredentials: true
    });
  }
};
