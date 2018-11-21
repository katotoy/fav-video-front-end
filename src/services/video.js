import http from "../utils";

const apiUrl = http.getApiUrl();
const videosApiEndpoint = apiUrl + "/videos";
const galleryApiEndpoint = apiUrl + "/gallery";
const userGalleryApiEndpoint = apiUrl + "/user-videos";

export function saveVideo(video, member_id, videoID = null) {
  const { url, title, description } = video;
  const payload = {
    url: url,
    title: title,
    description: description,
    member_id: member_id
  };

  if (videoID) return http.post(`${videosApiEndpoint}/${videoID}`, payload);
  else return http.post(videosApiEndpoint, payload);
}

export function getAllVideos() {
  return http.get(galleryApiEndpoint);
}

export function getVideoDetail(videoID) {
  return http.get(`${videosApiEndpoint}/${videoID}`);
}

export function getUserVideos() {
  const currentUser = http.getCurrentUser();
  if (!currentUser) return null;

  return http.get(userGalleryApiEndpoint);
}

export function deleteVideo(video_id) {
  const currentUser = http.getCurrentUser();
  if (!currentUser) return null;

  return http.delete(`${videosApiEndpoint}/${video_id}`);
}

export default {
  saveVideo: saveVideo,
  getAllVideos: getAllVideos,
  getUserVideos: getUserVideos,
  getVideoDetail: getVideoDetail,
  deleteVideo: deleteVideo
};
