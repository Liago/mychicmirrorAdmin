import { isNil } from "lodash";
import * as rest from "../../helpers/rest";
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
		payload: response
	}
}
export const replyCommentFail = (error) => {
	return {
		type: actionTypes.REPLY_COMMENTS_FAIL,
		payload: error
	}
}

export const sendCommentReply = (params) => {
	return (dispatch) => { 
		dispatch(replyCommentStart());
		rest.sendCommentReply(params)
		.then((response) => {
			console.log('comments response', response )
			// dispatch(replyCommentSuccess(response.data))
		})
		.catch((error) => {
			dispatch(replyCommentFail(error))
		})
	}
}