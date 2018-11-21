import http, { isEmpty } from "../utils";

const apiUrl = http.getApiUrl();
const likeCountApiEndpoint = apiUrl + "/video-like-count";
const likesApiEndpoint = apiUrl + "/like-videos";
const userVideoLikeCountEndpoint = apiUrl + "/user-videos-like-count";

export function LikeTheVideo(videoID) {
  // if the user is not logged in, no need to check if he
  // liked the video or not
  const currentUser = http.getCurrentUser();
  if (!currentUser) return null;

  const payload = {
    member_id: currentUser
  };
  return http.post(`${likesApiEndpoint}/${videoID}`, payload);
}

export function didMemberLikedTheVideo(videoID) {
  const currentUser = http.getCurrentUser();
  if (isEmpty(!currentUser)) return;

  const urlGet = `${likesApiEndpoint}/${videoID}`;

  return http.get(urlGet);
}

export function getVideoLikesCount(videoID) {
  return http.get(`${likeCountApiEndpoint}/${videoID}`);
}

export function getUserVideosLikeCount() {
  const currentUser = http.getCurrentUser();
  if (!currentUser) return null;

  return http.get(`${userVideoLikeCountEndpoint}/${currentUser}`);
}

export default {
  LikeTheVideo: LikeTheVideo,
  didMemberLikedTheVideo: didMemberLikedTheVideo,
  getVideoLikesCount: getVideoLikesCount,
  getUserVideosLikeCount: getUserVideosLikeCount
};
