import * as actionTypes from "../actions/actionTypes";

const initialState = {
	app: {
		darkMode: false,
		loading: false,
		error: null,
		notificationMessage: null,
		allComments: [],
	},
	user: {
		message: null,
		loaded: false,
		deleted: false,
		created: false,
		notified: false,
		userList: [],
		commentsList: [],
	},
};

const app = (state = initialState.app, action) => {
	switch (action.type) {
		case actionTypes.DARK_MODE_SET:
			return {
				...state,
				darkMode: true,
			};
		case actionTypes.NORMAL_MODE_SET:
			return {
				...state,
				darkMode: false,
			};
		case actionTypes.SEND_NOTIFICATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				notificationMessage: null,
			};
		case actionTypes.SEND_NOTIFICATION_START:
			return {
				...state,
				loading: true,
				notificationMessage: null,
			};
		case actionTypes.SEND_NOTIFICATION_SUCCESS:
			return {
				...state,
				loading: false,
				notificationMessage: action.message,
			};
		case actionTypes.ALL_COMMENTS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ALL_COMMENTS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case actionTypes.ALL_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				allComments: action.payload,
			};
		default:
			return state;
	}
};

const user = (state = initialState.user, action) => {
	switch (action.type) {
		case actionTypes.LOAD_USER_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.LOAD_USER_SUCCESS:
			console.log("action", action);
			return {
				...state,
				loading: false,
				loaded: true,
				userList: action.userList.data,
			};
		case actionTypes.LOAD_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};

		case actionTypes.USER_REGISTRATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				message: null,
			};
		case actionTypes.USER_REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				created: true,
				message: action.message,
			};
		case actionTypes.USER_REGISTRATION_START:
			return {
				...state,
				loading: true,
				message: null,
			};
		case actionTypes.USER_DELETE_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				message: null,
			};
		case actionTypes.USER_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				deleted: true,
				message: action.message,
			};
		case actionTypes.USER_DELETE_START:
			return {
				...state,
				loading: true,
				message: null,
			};
		case actionTypes.LOAD_COMMENTS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				commentsList: [],
			};
		case actionTypes.LOAD_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				commentsList: action.commentsList,
			};
		case actionTypes.LOAD_COMMENTS_START:
			return {
				...state,
				loading: true,
				commentsList: [],
			};
		default:
			return state;
	}
};

export default { app, user };
