import { isNil } from "lodash";
import * as rest from "../../helpers/rest";
import * as actionTypes from "./actionTypes";
import { toastSetValue } from "./toast";

export const loadUserStart = () => {
	return {
		type: actionTypes.LOAD_USER_START,
	};
};
export const loadUserSuccess = (response) => {
	return {
		type: actionTypes.LOAD_USER_SUCCESS,
		userList: response,
	};
};
export const loadUserFail = (error) => {
	return {
		type: actionTypes.LOAD_USER_FAIL,
		error: error,
	};
};
export const loadUserCommentsStart = () => {
	return {
		type: actionTypes.LOAD_COMMENTS_START,
	};
};
export const loadUserCommentsSuccess = (response) => {
	return {
		type: actionTypes.LOAD_COMMENTS_SUCCESS,
		commentsList: response,
	};
};
export const loadUserCommentsFail = (error) => {
	return {
		type: actionTypes.LOAD_COMMENTS_FAIL,
		error: error,
	};
};
export const sendNotificationStart = () => {
	return {
		type: actionTypes.SEND_NOTIFICATION_START,
	};
};
export const sendNotificationFail = (error) => {
	return {
		type: actionTypes.SEND_NOTIFICATION_FAIL,
		error: error,
	};
};
export const sendNotificationSuccess = (response) => {
	return {
		type: actionTypes.SEND_NOTIFICATION_SUCCESS,
		message: response,
	};
};
export const userRegistrationStart = () => {
	return {
		type: actionTypes.USER_REGISTRATION_START,
	};
};
export const userRegistrationFail = (error) => {
	return {
		type: actionTypes.USER_REGISTRATION_FAIL,
		error: error,
	};
};
export const userRegistrationSuccess = (response) => {
	return {
		type: actionTypes.USER_REGISTRATION_SUCCESS,
		message: response,
	};
};
export const userDeleteStart = () => {
	return {
		type: actionTypes.USER_DELETE_START,
	};
};
export const userDeleteFail = (error) => {
	return {
		type: actionTypes.USER_DELETE_FAIL,
		error: error,
	};
};
export const userDeleteSuccess = (response) => {
	return {
		type: actionTypes.USER_DELETE_SUCCESS,
		message: response,
		deleted: true,
	};
};
export const loadUserComments = (params) => {
	return async (dispatch) => {
		dispatch(loadUserCommentsStart());
		try {
			const response = await rest.getUserComments(params);
			console.log("[loadUserComments]", response);
			if (response.status === 200 && isNil(response.data.count)) {
				dispatch(loadUserCommentsSuccess());
				return { count: 0, comments: null, loading: false };
			} else if (response.status === 200 && !isNil(response.data.count)) {
				dispatch(loadUserCommentsSuccess());
				return { count: response.data.count, comments: response.data.comments, loading: false };
			} else {
				dispatch(loadUserCommentsFail({ error: "qualcosa è andato storto" }));
				return { comments: null, loading: false };
			}
		} catch (error) {
			dispatch(loadUserCommentsFail(error));
			console.log("getAllComments error", error);
			return { comments: null, loading: false };
		}
	};
};
export const userDelete = (params) => {
	return (dispatch) => {
		dispatch(userDeleteStart());
		rest.userDelete(params)
			.then((response) => {
				dispatch(
					toastSetValue({
						isCompleted: true,
						color: "success",
						position: "bottom",
						message: `User <strong>${params.name}</strong> has been deleted succesfully!`,
					})
				);
				dispatch(userDeleteSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(userDeleteFail(error));
			});
	};
};
export const userRegistration = (params) => {
	return (dispatch) => {
		dispatch(userRegistrationStart());
		rest.userRegistration(params)
			.then((response) => {
				dispatch(
					toastSetValue({
						isCompleted: true,
						color: "success",
						position: "bottom",
						message: `User <strong>${params.name}</strong> has been inserted succesfully!`,
					})
				);
				dispatch(userRegistrationSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(userRegistrationFail(error));
			});
	};
};
export const sendNotification = (params) => {
	return (dispatch) => {
		dispatch(sendNotificationStart());
		rest.sendNotification(params)
			.then((response) => {
				dispatch(sendNotificationSuccess(response.data.success));
				dispatch(
					toastSetValue({
						isCompleted: true,
						color: "warning",
						position: "top",
						message: `Notification successfully sent`,
						duration: 1000,
					})
				);
			})
			.catch((error) => {
				dispatch(sendNotificationFail(error));
			});
	};
};

export const loadUsers = () => {
	return (dispatch) => {
		dispatch(loadUserStart());
		rest.getUserList()
			.then((response) => {
				dispatch(loadUserSuccess(response.data));
			})
			.catch((error) => {
				dispatch(loadUserFail(error));
			});
	};
};
