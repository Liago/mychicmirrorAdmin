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

export const getAllComments = () => {
	return async (dispatch) => {
		dispatch(allCommentsStart());
		try {
			const response = await rest.getAllComments();
			if (response.status === 200) {
				dispatch(allCommentsSuccess());
				return { allComments: response.data, loading: false };
			} else {
				dispatch(allCommentsFail({error: "qualcosa è andato storto"}));
				return { allComments: null, loading: false };
			}
		} catch (error) {
			dispatch(allCommentsFail(error));
			console.log("getAllComments error", error);
			return { allComments: null, loading: false };
		}
	};
};
