import * as actionTypes from "../actions/actionTypes";

const initialState = {
	darkMode: false,
	userList: [],
	loading: false,
	error: null,
	message: null,
	notificationMessage: null,
	
	commentsList:[],
	loaded:false,
	deleted: false,
	created: false,
	notified: false,
	
};

const darkModeNormal = (state, action) => {
	return {
		...state,
		darkMode: false,
	};
};
const darkModeSet = (state, action) => {
	return {
		...state,
		darkMode: true,
	};
};
const sendNotificationStart = (state, action) => {
	return {
		...state,
		loading: true,
		notificationMessage: null,
	};
};
const sendNotificationFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		notificationMessage: null,
	};
};
const sendNotificationSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		notified: true,
		notificationMessage: action.message,
	};
};
const loadUserCommentStart = (state, action) => {
	return {
		...state,
		loading: true,
		commentsList: [],
	};
};
const loadUserCommentFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		commentsList: [],
	};
};
const loadUserCommentSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		commentsList: action.commentsList,
	};
};

const loadUsersStart = (state, action) => {
	return {
		...state,
		loading: true,
	};
};
const loadUsersSuccess = (state, action) => {
	console.log("action", action);
	return {
		...state,
		loading: false,
		loaded:true,
		userList: action.userList.data,
	};
};
const loadUsersFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};
const userRegistrationStart = (state, action) => {
	return {
		...state,
		loading: true,
		message: null,
	};
};
const userRegistrationFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		message: null,
	};
};
const userRegistrationSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		created:true,
		message: action.message,
	};
};
const userDeleteStart = (state, action) => {
	return {
		...state,
		loading: true,
		message: null,
	};
};
const userDeleteFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
		message: null,
	};
};
const userDeleteSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		deleted:true,
		message: action.message,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DARK_MODE_SET: return darkModeSet(state, action);
		case actionTypes.NORMAL_MODE_SET: return darkModeNormal(state, action);
		case actionTypes.LOAD_USER_START: return loadUsersStart(state, action);
		case actionTypes.LOAD_USER_SUCCESS: return loadUsersSuccess(state, action);
		case actionTypes.LOAD_USER_FAIL: return loadUsersFail(state, action);
		case actionTypes.SEND_NOTIFICATION_FAIL: return sendNotificationFail(state, action);
		case actionTypes.SEND_NOTIFICATION_START: return sendNotificationStart(state, action);
		case actionTypes.SEND_NOTIFICATION_SUCCESS: return sendNotificationSuccess(state, action);
		case actionTypes.USER_REGISTRATION_FAIL: return userRegistrationFail(state, action);
		case actionTypes.USER_REGISTRATION_SUCCESS: return userRegistrationSuccess(state, action);
		case actionTypes.USER_REGISTRATION_START: return userRegistrationStart(state, action);
		case actionTypes.USER_DELETE_FAIL: return userDeleteFail(state, action);
		case actionTypes.USER_DELETE_SUCCESS: return userDeleteSuccess(state, action);
		case actionTypes.USER_DELETE_START: return userDeleteStart(state, action);
		case actionTypes.LOAD_COMMENTS_FAIL: return loadUserCommentFail(state, action);
		case actionTypes.LOAD_COMMENTS_SUCCESS: return loadUserCommentSuccess(state, action);
		case actionTypes.LOAD_COMMENTS_START: return loadUserCommentStart(state, action);
		default: return state;
	}
};
export default reducer;
