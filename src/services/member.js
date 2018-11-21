import http from "../utils";

const apiUrl = http.getApiUrl();
const userApiEndpoint = apiUrl + "/user";

export function register(user) {
  return http.post(userApiEndpoint, {
    email: user.email,
    password: user.password,
    call_sign: user.call_sign
  });
}

export function getMemberProfile() {
  return http.get(userApiEndpoint);
}

export default {
  registerUser: register,
  getMemberProfile: getMemberProfile
};
