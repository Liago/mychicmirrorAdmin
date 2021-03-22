import { wrappedApi } from "../common/api";
import { store } from "./store";

const { useApi, useLazyApi, useLazyRestApi } = wrappedApi({ store })

export const GetUserList = () => useLazyApi("GET","getAllUsers.php");

export const UserRegistration = (params) => useApi("POST","registration.php", params);

export const UserDelete = (params) => useApi("POST","deleteUser.php", params);

export const GetUserComments = (params) => useLazyApi('POST',"getTotalCommentsByUser.php", params);

export const SendNotification = (params) => useApi("POST","sendAppNotification.php", params);

export const SendCommentReply = (params) => useApi("POST","newCommentReply.php", params);

// export const GetAllComments = () => useApi("GET","/getAllAdminComments.php");

export const UpdateComment = () => useLazyApi("POST","/commentManager.php");

export const GetUserAvatar = (params) => useApi('POST', 'getAvatarFromUsername.php', params);


export const GetAllCommentsHandler = () => useLazyApi('GET', "getAllAdminComments.php");

export const GetPost = (postId) => useLazyRestApi('GET', `/wp/v2/posts/${postId}`);


// export const getOtherProductsHandler = (sku) => useLazyApi('GET', `/api/v1/showroom/catalog/product/${sku}/others`);



// import axios from "axios";
// import { UseApi } from "./api";


// export const instance = axios.create({
// 	baseURL: "https://www.mychicmirror.com/API",
// });
// export const wpRestAPI = axios.create({
// 	baseURL: "https://www.mychicmirror.com/wp-json/wp/v2",
// });

// export const register = (params) => {
// 	return instance.post("/register", params);
// };

// export const forgotPassword = (params) => {
// 	return instance.post("/forgot", params);
// };



// export const _sendNotification = (params) => {
// 	console.log("params", params);
// 	const instance = axios.create({
// 		baseURL: "https://onesignal.com/api/v1/",
// 		headers: ["Content-Type: application/json", "Authorization: Basic NTI2MWMyZTMtNGIyNy00YzgwLWI3ZTEtMjVkN2Q5Y2Q5MzNh"],
// 	});

// 	return instance.post("notifications", params);
// };




// export const getUserAvatar = (params) => UseApi('POST', 'getAvatarFromUsername.php', params);
