import * as actionTypes from "./actionTypes";

export const replyCommentStart = () => {
	return {
		type: actionTypes.REPLY_COMMENTS_START,
		loading: true
	}
}
export const replyCommentSuccess = (response) => {
	return {
		type: actionTypes.REPLY_COMMENTS_SUCCESS,
		loading:false,
		payload: response
	}
}
export const replyCommentFail = (error) => {
	return {
		type: actionTypes.REPLY_COMMENTS_FAIL,
		loading:false,
		payload: error
	}
}
export const commentUpdateStart = () => {
	return {
		type: actionTypes.COMMENT_UPDATE_START,
		loading: true,
		payload: null
	}
}
export const commentUpdateSuccess = (response, isDelete) => {
	return {
		type: actionTypes.COMMENT_UPDATE_SUCCESS,
		loading:false,
		isMessageDelete:isDelete,
		payload: response
	}
}
export const commentUpdateFail = (error) => {
	return {
		type: actionTypes.COMMENT_UPDATE_FAIL,
		payload: error
	}
}


export const setDarkMode = (dark) => {
	if (dark) {
		return {
			type: actionTypes.DARK_MODE_SET,
		};
	} else {
		return {
			type: actionTypes.NORMAL_MODE_SET,
		};
	}
};
export const setDevMode = (dark) => {
	if (dark) {
		return {
			type: actionTypes.DEV_MODE_SET,
		};
	} else {
		return {
			type: actionTypes.PROD_MODE_SET,
		};
	}
};

export const allCommentsStart = () => {
	return {
		type: actionTypes.ALL_COMMENTS_START,
	};
};
export const allCommentsFail = (error) => {
	return {
		type: actionTypes.ALL_COMMENTS_FAIL,
		payload: error,
	};
};
export const allCommentsSuccess = (response) => {
	return {
		type: actionTypes.ALL_COMMENTS_SUCCESS,
	};
};

export const toastClear = () => {
    return {
        type: actionTypes.TOAST_CLEAR
    }
};

export const toastSetValue = (payload) => {
    return {
        type: actionTypes.TOAST_SET_VALUE,
        payload
    }
};

export const loadUserStart = () => {
	return {
		type: actionTypes.LOAD_USER_START,
		loading: true
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