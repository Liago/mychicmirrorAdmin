import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import * as actionTypes from "./actionTypes";

const initialState = {
	app: {
		darkMode: false,
		devMode: false,
		notificationSegment: "Subscribed Users",
		loading: false,
		error: null,
		isMessageDelete: false,
		notificationMessage: null,
	},
	user: {
		message: null,
		loaded: false,
		deleted: false,
		created: false,
		notified: false,
		userList: [],
		replied: false
	},
	toast: null,
};
const toast = (state = initialState.toast, action) => {
	switch (action.type) {
		case actionTypes.TOAST_CLEAR:
			return initialState.toast
		case actionTypes.TOAST_SET_VALUE:
			return { ...action.payload };
		default:
			return state;
	}
}
const app = (state = initialState.app, action) => {
	switch (action.type) {

		case actionTypes.DEV_MODE_SET:
			return {
				...state,
				devMode: true,
				notificationSegment: "TEST USERS"
			};
		case actionTypes.PROD_MODE_SET:
			return {
				...state,
				devMode: false,
				notificationSegment: "Subscribed Users"
			};
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
		case actionTypes.COMMENT_UPDATE_START:
			return {
				...state,
				loading: true,
				error: false
			}
		case actionTypes.COMMENT_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case actionTypes.COMMENT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				isMessageDelete: action.isMessageDelete,
				notificationMessage: action.payload
			}
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
		case actionTypes.REPLY_COMMENTS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				replied: false,
			};
		case actionTypes.REPLY_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				replied: action.payload,
			};
		case actionTypes.REPLY_COMMENTS_START:
			return {
				...state,
				loading: true,
				replied: false
			};
		default:
			return state;
	}
};


const createRootReducer = (history) => combineReducers({
	app, user, toast, router: connectRouter(history),
});

export default createRootReducer;