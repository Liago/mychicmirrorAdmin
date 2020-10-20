import * as rest from "../../helpers/rest";
import * as actionTypes from "./actionTypes";

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
		payload: response,
	};
};

export const getAllComments = () => {
	return (dispatch) => {
		dispatch(allCommentsStart());
		rest.getAllComments()
			.then((response) => {
				dispatch(allCommentsSuccess(response.data));
			})
			.catch((error) => {
				dispatch(allCommentsFail(error));
			});
	};
};
