import notification from "../../components/forms/notification";
import * as rest from "../../helpers/rest";
import * as actionTypes from "./actionTypes";
import { toastSetValue } from "./toast";
import {sendNotification } from "./users";

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
export const commentUpdateStart = () => {
	return {
		type: actionTypes.COMMENT_UPDATE_START,
		loading: true,
		payload: null
	}
}
export const commentUpdateSuccess = (response) => {
	return {
		type: actionTypes.COMMENT_UPDATE_SUCCESS,
		loading:false,
		payload: response
	}
}
export const commentUpdateFail = (error) => {
	return {
		type: actionTypes.COMMENT_UPDATE_FAIL,
		payload: error
	}
}
export const updateComment = (params) => {
	return (dispatch) => {
		dispatch(commentUpdateStart());
		rest.updateComment(params)
		.then((response) => {
			response.data.success ? dispatch(commentUpdateSuccess(response.data.success)) : dispatch(commentUpdateFail(response.data))
		})
		.catch((error) => {
			dispatch(commentUpdateFail(error))
		})
	}
}
export const sendCommentReply = (params, notificationParams) => {
	console.log('[Action sendCommentReply] notificationparams', notificationParams)
	return (dispatch) => { 
		dispatch(replyCommentStart());
		rest.sendCommentReply(params)
		.then((response) => {
			dispatch(toastSetValue({
				isCompleted: true,
				color: "success",
				position: "bottom",
				message: `Comment sent!`,
				duration: 1000
			}))
			dispatch(replyCommentSuccess(response.data))
			dispatch(sendNotification(notificationParams))
		})
		.catch((error) => {
			dispatch(replyCommentFail(error))
		})
	}
}