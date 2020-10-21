import axios from "axios";

export const instance = axios.create({
	baseURL: "https://www.mychicmirror.com/API",
});
export const wpRestAPI = axios.create({
	baseURL: "https://www.mychicmirror.com/wp-json/wp/v2",
});

export const register = (params) => {
	return instance.post("/register", params);
};

export const forgotPassword = (params) => {
	return instance.post("/forgot", params);
};

export const getUserList = () => {
	return instance.get("/getAllUsers.php");
};
export const userRegistration = (params) => {
	return instance.post("/registration.php", params);
};
export const userDelete = (params) => {
	return instance.post("/deleteUser.php", params);
};
export const getUserComments = (params) => {
	return instance.post("/getTotalCommentsByUser.php", params);
};
export const sendNotification = (params) => {
	return instance.post("/sendAppNotification.php", params);
};
export const sendCommentReply = (params) => {
	return instance.post("/newCommentReply.php", params);
};
export const getAllComments = () => {
	return instance.get("/getAllAdminComments.php");
};
export const updateComment = (params) => {
	return instance.post("/commentManager.php");
};
export const _sendNotification = (params) => {
	console.log("params", params);
	const instance = axios.create({
		baseURL: "https://onesignal.com/api/v1/",
		headers: ["Content-Type: application/json", "Authorization: Basic NTI2MWMyZTMtNGIyNy00YzgwLWI3ZTEtMjVkN2Q5Y2Q5MzNh"],
	});

	return instance.post("notifications", params);
};
